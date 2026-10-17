"""Detect whether Home Assistant reads /config/themes (theme-files 1.0.0 IncludeState).

configuration.yaml is only read, never written. It is parsed with a SafeLoader subclass that
understands the include tags without executing anything:

- ``!include <file>`` is followed, only inside the config directory, at most MAX_INCLUDE_DEPTH deep.
- ``!include_dir_*`` is recorded as a marker (the directory is not read).
- ``!secret``, ``!env_var``, ``!input`` and every other tag become None.

The functions are blocking (file I/O); call them from the executor. They never raise: any problem
reads as "unknown" (configuration.yaml itself) or is ignored (an include that cannot be followed).
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

import yaml

from .themes_contract import INCLUDE_HINT, THEMES_DIR, IncludeState, IncludeStatus

MAX_INCLUDE_DEPTH = 5
MAX_INCLUDE_BYTES = 1024 * 1024
# Total budget for one scan (configuration.yaml plus everything it includes), so fan-out stays bounded.
MAX_INCLUDE_FILES = 100
MAX_INCLUDE_TOTAL_BYTES = 8 * 1024 * 1024

_INCLUDE_DIR_TAGS = (
    "!include_dir_list",
    "!include_dir_merge_list",
    "!include_dir_named",
    "!include_dir_merge_named",
)


class _IncludeDir:
    """Marker for an ``!include_dir_*`` tag."""

    def __init__(self, tag: str, path: Path | None) -> None:
        self.tag = tag
        self.path = path


class _Included:
    """Wrapper for data that came from ``!include`` (so ``themes: !include x`` is told apart)."""

    def __init__(self, data: Any) -> None:
        self.data = data


class _Budget:
    """Files and bytes a single scan may still read."""

    def __init__(self) -> None:
        self.files = MAX_INCLUDE_FILES
        self.bytes = MAX_INCLUDE_TOTAL_BYTES

    def take(self, size: int) -> bool:
        if self.files <= 0 or size > self.bytes:
            return False
        self.files -= 1
        self.bytes -= size
        return True


class _Loader(yaml.SafeLoader):
    def __init__(
        self, stream: str, base_dir: Path, root: Path, depth: int, budget: _Budget
    ) -> None:
        super().__init__(stream)
        self.mc_budget = budget
        self.mc_base_dir = base_dir
        self.mc_root = root
        self.mc_depth = depth


def _inside(root: Path, path: Path) -> bool:
    try:
        path.relative_to(root)
    except ValueError:
        return False
    return True


def _resolve(loader: _Loader, node: yaml.Node) -> Path | None:
    """Resolve the tag argument against the including file; None when outside the config dir."""
    try:
        arg = str(loader.construct_scalar(node))  # type: ignore[arg-type]
        path = (loader.mc_base_dir / arg).resolve()
    except Exception:  # noqa: BLE001 - never raise
        return None
    return path if _inside(loader.mc_root, path) else None


def _construct_include(loader: _Loader, node: yaml.Node) -> Any:
    if loader.mc_depth + 1 > MAX_INCLUDE_DEPTH:
        return None
    path = _resolve(loader, node)
    if path is None:
        return None
    return _Included(_load_file(path, loader.mc_root, loader.mc_depth + 1, loader.mc_budget))


def _construct_dir(tag: str):
    def construct(loader: _Loader, node: yaml.Node) -> _IncludeDir:
        return _IncludeDir(tag, _resolve(loader, node))

    return construct


def _construct_none(loader: _Loader, node: yaml.Node) -> None:
    return None


_Loader.add_constructor("!include", _construct_include)
for _tag in _INCLUDE_DIR_TAGS:
    _Loader.add_constructor(_tag, _construct_dir(_tag))
for _tag in ("!secret", "!env_var", "!input"):
    _Loader.add_constructor(_tag, _construct_none)
# Any other tag (custom HA tags, typos) is ignored as None.
_Loader.add_constructor(None, _construct_none)


def _load_file(path: Path, root: Path, depth: int, budget: _Budget) -> Any:
    """Parse one YAML file; None when it cannot be read, is too large or is invalid."""
    loader: _Loader | None = None
    try:
        if not path.is_file():
            return None
        size = path.stat().st_size
        if size > MAX_INCLUDE_BYTES or not budget.take(size):
            return None
        text = path.read_text(encoding="utf-8")
        loader = _Loader(text, path.parent, root, depth, budget)
        return loader.get_single_data()
    except Exception:  # noqa: BLE001 - never raise
        return None
    finally:
        if loader is not None:
            loader.dispose()


def _unwrap(value: Any) -> Any:
    while isinstance(value, _Included):
        value = value.data
    return value


def scan_include_state(config_dir: str | Path) -> IncludeState:
    """State of ``frontend.themes`` in configuration.yaml, without the "loaded now" upgrade."""
    try:
        root = Path(config_dir).resolve()
        config_file = root / "configuration.yaml"
        budget = _Budget()
        if not config_file.is_file() or config_file.stat().st_size > MAX_INCLUDE_BYTES:
            return "unknown"
        budget.take(config_file.stat().st_size)
        text = config_file.read_text(encoding="utf-8")
        loader = _Loader(text, root, root, 0, budget)
        try:
            data = _unwrap(loader.get_single_data())
        finally:
            loader.dispose()
        if not isinstance(data, dict):
            return "unknown"

        frontend = data.get("frontend")
        if isinstance(frontend, _IncludeDir):
            return "other_layout"
        frontend = _unwrap(frontend)
        if isinstance(frontend, _IncludeDir):
            return "other_layout"
        if not isinstance(frontend, dict):
            return "missing"

        themes = frontend.get("themes")
        if themes is None:
            return "missing"
        if isinstance(themes, _Included):
            return "other_layout"
        if isinstance(themes, _IncludeDir):
            expected = (root / THEMES_DIR).resolve()
            if themes.tag == "!include_dir_merge_named" and themes.path == expected:
                return "ok"
            return "other_layout"
        if isinstance(themes, dict):
            return "inline"
        return "missing"
    except Exception:  # noqa: BLE001 - detection must never raise
        return "unknown"


def include_status(config_dir: str | Path, file_theme_loaded: bool = False) -> IncludeStatus:
    """IncludeStatus for themes_list.

    ``file_theme_loaded`` is True when HA has a theme loaded whose name matches a file in
    THEMES_DIR; that proves HA reads the folder (packages, nested includes) and wins over the scan.
    """
    state = scan_include_state(config_dir)
    if file_theme_loaded:
        state = "ok"
    try:
        dir_exists = (Path(config_dir) / THEMES_DIR).is_dir()
    except OSError:
        dir_exists = False
    return {"state": state, "dir_exists": dir_exists, "hint": INCLUDE_HINT}
