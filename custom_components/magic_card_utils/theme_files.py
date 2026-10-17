"""Theme file I/O, validation and YAML (theme-files 1.0.0).

Plain functions on a config directory, no Home Assistant state, so they are unit-testable with a
temp folder. Everything here is blocking: call it from the executor. Nothing outside
``<config>/themes`` is written or deleted, and files that are symlinks are never read, written or
removed.
"""

from __future__ import annotations

import datetime
import math
import os
import re
from pathlib import Path
from typing import Any

import yaml
from homeassistant.util.file import WriteError, write_utf8_file_atomic

from .themes_contract import (
    ERR_INVALID_FORMAT,
    ERR_NAME_TAKEN,
    ERR_NOT_EDITABLE,
    ERR_NOT_FOUND,
    ERR_CONFLICT,
    ERR_READ_FAILED,
    ERR_SAVE_FAILED,
    ERR_TOO_LARGE,
    MAX_FILE_BYTES,
    MAX_FILES_LISTED,
    MAX_VALUE_CHARS,
    MAX_VARS,
    MODE_NAMES,
    MODES_KEY,
    RESERVED_NAMES,
    THEME_NAME_RE,
    THEME_VAR_RE,
    THEMES_DIR,
    WRITTEN_HEADER,
)

MAX_ERRORS = 50
MTIME_TOLERANCE = 0.001

_BAD_CHARS_RE = re.compile("[\x00-\x08\x0b-\x1f\x7f\ud800-\udfff]")


class ThemeFileError(Exception):
    """A failure with a contract error code (and field errors for invalid_format)."""

    def __init__(self, code: str, message: str, errors: list[dict[str, str]] | None = None) -> None:
        super().__init__(message)
        self.code = code
        self.message = message
        self.errors = errors


# ---------------------------------------------------------------- names and paths


def validate_name(name: Any) -> str | None:
    """Return a message when ``name`` is not a usable theme name, else None."""
    if not isinstance(name, str) or not THEME_NAME_RE.fullmatch(name):
        return "Use 1 to 64 lowercase letters, digits, - or _, starting with a letter or digit."
    if name in RESERVED_NAMES:
        return f"'{name}' is a Home Assistant built-in name."
    return None


def _require_name(name: Any) -> None:
    message = validate_name(name)
    if message:
        raise ThemeFileError(
            ERR_INVALID_FORMAT, "Invalid theme name.", [{"path": "name", "message": message}]
        )


def themes_dir(config_dir: str | Path) -> Path:
    return Path(config_dir) / THEMES_DIR


def theme_path(config_dir: str | Path, name: str) -> Path:
    """Path of ``themes/<name>.yaml``; the name rule makes escaping the folder impossible."""
    _require_name(name)
    base = themes_dir(config_dir)
    path = base / f"{name}.yaml"
    if path.parent.resolve() != base.resolve():  # belt and braces
        raise ThemeFileError(ERR_INVALID_FORMAT, "Invalid theme name.")
    return path


def _rel(config_dir: str | Path, path: Path) -> str:
    return path.relative_to(Path(config_dir)).as_posix()


# ---------------------------------------------------------------- validation


def _value_error(value: Any) -> str | None:
    if isinstance(value, bool) or value is None:
        return "Use text or a number."
    if isinstance(value, int):
        return None
    if isinstance(value, float):
        return None if math.isfinite(value) else "Number must be finite."
    if isinstance(value, str):
        if len(value) > MAX_VALUE_CHARS:
            return f"Value is longer than {MAX_VALUE_CHARS} characters."
        if _BAD_CHARS_RE.search(value):
            return "Value contains a control character."
        return None
    return "Use text or a number."


def _check_vars(variables: Any, prefix: str, errors: list[dict[str, str]], in_mode: bool) -> None:
    where = prefix.rstrip(".")
    if not isinstance(variables, dict):
        errors.append({"path": where, "message": "Must be a mapping."})
        return
    for key, value in variables.items():
        path = f"{prefix}{key}"
        if not isinstance(key, str) or not THEME_VAR_RE.fullmatch(key):
            errors.append({"path": str(path), "message": "Variable names use letters, digits, - and _."})
            continue
        if key == MODES_KEY:
            if in_mode:
                errors.append({"path": path, "message": "Modes cannot be nested."})
            continue  # handled by the caller for the top level
        message = _value_error(value)
        if message:
            errors.append({"path": path, "message": message})


def validate_theme(theme: Any) -> list[dict[str, str]]:
    """Field errors ``[{path, message}]`` for a ThemeDoc; empty when it is valid."""
    errors: list[dict[str, str]] = []
    if not isinstance(theme, dict):
        return [{"path": "", "message": "A theme must be a mapping of variables."}]

    modes = theme.get(MODES_KEY)
    total = sum(1 for k in theme if k != MODES_KEY)
    if isinstance(modes, dict):
        total += sum(len(v) for v in modes.values() if isinstance(v, dict))
    if total > MAX_VARS:
        return [{"path": "", "message": f"A theme can hold at most {MAX_VARS} variables."}]

    _check_vars(theme, "", errors, in_mode=False)
    if MODES_KEY in theme:
        if not isinstance(modes, dict):
            errors.append({"path": MODES_KEY, "message": "Modes must be a mapping."})
        else:
            for mode, variables in modes.items():
                path = f"{MODES_KEY}.{mode}"
                if mode not in MODE_NAMES:
                    errors.append({"path": path, "message": "Only light and dark modes exist."})
                else:
                    _check_vars(variables, path + ".", errors, in_mode=True)
    return errors[:MAX_ERRORS]


def validate_save_request(name: Any, theme: Any) -> None:
    """Name rule, then theme rules; raises ThemeFileError(invalid_format)."""
    _require_name(name)
    errors = validate_theme(theme)
    if errors:
        raise ThemeFileError(ERR_INVALID_FORMAT, "The theme has invalid values.", errors)


# ---------------------------------------------------------------- reading


def _jsonable(value: Any) -> Any:
    if isinstance(value, dict):
        return {(k if isinstance(k, str) else str(k)): _jsonable(v) for k, v in value.items()}
    if isinstance(value, (list, tuple)):
        return [_jsonable(v) for v in value]
    if value is None or isinstance(value, (bool, int, str)):
        return value
    if isinstance(value, float):
        return value if math.isfinite(value) else str(value)
    if isinstance(value, (datetime.date, datetime.datetime)):
        return value.isoformat()
    return str(value)


def _count_vars(theme: dict) -> int:
    count = sum(1 for k in theme if k != MODES_KEY)
    modes = theme.get(MODES_KEY)
    if isinstance(modes, dict):
        count += sum(len(v) for v in modes.values() if isinstance(v, dict))
    return count


def _inspect(config_dir: Path, path: Path, base: Path) -> dict[str, Any]:
    """Classify one file. Returns {entry, theme}; ``entry`` follows ThemeFileEntry."""
    stem = path.name[: -len(".yaml")]
    entry: dict[str, Any] = {
        "name": stem,
        "file": _rel(config_dir, path),
        "editable": False,
        "has_modes": False,
        "var_count": 0,
        "mtime": 0.0,
    }
    theme: dict = {}

    def result(reason: str | None = None) -> dict[str, Any]:
        if reason is None:
            entry["editable"] = True
        else:
            entry["reason"] = reason
        return {"entry": entry, "theme": theme}

    try:
        entry["mtime"] = path.lstat().st_mtime
    except OSError:
        return result("parse_error")
    if path.is_symlink():
        return result("symlink")
    try:
        if path.stat().st_size > MAX_FILE_BYTES:
            return result("too_large")
        data = yaml.safe_load(path.read_text(encoding="utf-8"))
    except yaml.constructor.ConstructorError as err:
        if "could not determine a constructor for the tag" in (err.problem or ""):
            return result("yaml_tags")
        return result("parse_error")
    except (OSError, UnicodeDecodeError, yaml.YAMLError, ValueError, RecursionError):
        return result("parse_error")

    if not isinstance(data, dict) or not data:
        return result("parse_error")
    if len(data) == 1:
        (key, value), = data.items()
        if not isinstance(value, dict):
            return result("parse_error")
        theme = _jsonable(value)
    else:
        value = data.get(stem)
        theme = _jsonable(value) if isinstance(value, dict) else {}
        key = None
    entry["has_modes"] = MODES_KEY in theme
    entry["var_count"] = _count_vars(theme)

    if path.parent != base:
        return result("subfolder")
    if len(data) > 1:
        return result("multiple_themes")
    if key != stem:
        return result("name_mismatch")
    if validate_name(stem):
        return result("invalid_name")
    return result(None)


def _walk(config_dir: str | Path) -> tuple[list[dict[str, Any]], bool]:
    base = themes_dir(config_dir)
    if not base.is_dir():
        return [], False
    paths: list[Path] = []
    for root, dirs, files in os.walk(base, followlinks=False):
        dirs.sort()
        for filename in files:
            if filename.endswith(".yaml"):
                paths.append(Path(root) / filename)
    paths.sort(key=lambda p: p.relative_to(base).as_posix())
    truncated = len(paths) > MAX_FILES_LISTED
    return [_inspect(Path(config_dir), p, base) for p in paths[:MAX_FILES_LISTED]], truncated


def scan_themes(config_dir: str | Path) -> dict[str, Any]:
    """``{files: [ThemeFileEntry], truncated}`` for every *.yaml under the themes folder."""
    records, truncated = _walk(config_dir)
    return {"files": [r["entry"] for r in records], "truncated": truncated}


def read_theme(config_dir: str | Path, name: str) -> dict[str, Any]:
    """ThemeGetResult for ``name`` (an editable top-level file wins over a same-named other file)."""
    if not isinstance(name, str):
        raise ThemeFileError(ERR_NOT_FOUND, "Theme not found.")
    try:
        records, _ = _walk(config_dir)
    except OSError as err:
        raise ThemeFileError(ERR_READ_FAILED, f"Could not read the themes folder: {err}") from err
    matches = [r for r in records if r["entry"]["name"] == name]
    if not matches:
        raise ThemeFileError(ERR_NOT_FOUND, "Theme not found.")
    matches.sort(key=lambda r: not r["entry"]["editable"])
    record = matches[0]
    entry = record["entry"]
    out: dict[str, Any] = {
        "name": entry["name"],
        "file": entry["file"],
        "editable": entry["editable"],
        "mtime": entry["mtime"],
        "theme": record["theme"],
    }
    if "reason" in entry:
        out["reason"] = entry["reason"]
    return out


# ---------------------------------------------------------------- writing


def dump_theme(name: str, theme: dict) -> str:
    """File text: WRITTEN_HEADER + ``{name: theme}`` through safe_dump (order kept)."""
    text = WRITTEN_HEADER + yaml.safe_dump(
        {name: theme}, sort_keys=False, allow_unicode=True, default_flow_style=False
    )
    if len(text.encode("utf-8")) > MAX_FILE_BYTES:
        raise ThemeFileError(
            ERR_TOO_LARGE, f"The theme file would be larger than {MAX_FILE_BYTES // 1024} KB."
        )
    return text


def check_existing(
    config_dir: str | Path, name: str, overwrite: bool, base_mtime: float | None
) -> None:
    """Rules for an existing file: name_taken, not_editable, conflict. No-op when absent."""
    path = theme_path(config_dir, name)
    if not os.path.lexists(path):
        return
    if not overwrite:
        raise ThemeFileError(ERR_NAME_TAKEN, f"A theme file named {name} already exists.")
    entry = _inspect(Path(config_dir), path, themes_dir(config_dir))["entry"]
    if not entry["editable"]:
        raise ThemeFileError(ERR_NOT_EDITABLE, "This theme file cannot be edited here.")
    if base_mtime is not None and abs(entry["mtime"] - base_mtime) > MTIME_TOLERANCE:
        raise ThemeFileError(ERR_CONFLICT, "The file changed since you opened it.")


def write_theme(
    config_dir: str | Path,
    name: str,
    theme: dict,
    overwrite: bool = False,
    base_mtime: float | None = None,
) -> dict[str, Any]:
    """Validate and atomically write ``themes/<name>.yaml``. Returns {name, file, mtime}."""
    validate_save_request(name, theme)
    check_existing(config_dir, name, overwrite, base_mtime)
    text = dump_theme(name, theme)
    path = theme_path(config_dir, name)
    try:
        path.parent.mkdir(parents=True, exist_ok=True)
        write_utf8_file_atomic(str(path), text.encode("utf-8"), mode="wb")
        mtime = path.stat().st_mtime
    except (OSError, WriteError) as err:
        raise ThemeFileError(ERR_SAVE_FAILED, f"Could not write the theme file: {err}") from err
    return {"name": name, "file": _rel(config_dir, path), "mtime": mtime}


def delete_theme(config_dir: str | Path, name: str) -> None:
    """Delete an editable theme file."""
    path = theme_path(config_dir, name)
    if not os.path.lexists(path):
        raise ThemeFileError(ERR_NOT_FOUND, "Theme not found.")
    entry = _inspect(Path(config_dir), path, themes_dir(config_dir))["entry"]
    if not entry["editable"]:
        raise ThemeFileError(ERR_NOT_EDITABLE, "This theme file cannot be deleted here.")
    try:
        path.unlink()
    except OSError as err:
        raise ThemeFileError(ERR_SAVE_FAILED, f"Could not delete the theme file: {err}") from err
