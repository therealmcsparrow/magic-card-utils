"""WebSocket commands of the theme editor and its theme store (contract theme-files 2.0.0, themes_contract.py).

All four commands are admin only. Themes are kept in the integration's storage; a save can also
publish the theme to ``themes/<name>.yaml``, which needs the "Allow themes to be saved in the themes
folder" option (off by default). File work (theme_files.py, include_scan.py) is blocking and runs in
the executor. After a file is written or removed, HA's ``frontend.reload_themes`` service is called so
the change is live; ``loaded`` in the save result says whether HA now knows the theme.
"""

from __future__ import annotations

import asyncio
import copy
import logging
import time
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from . import theme_files as tf
from .const import DOMAIN
from .include_scan import include_status
from .settings import theme_files_enabled
from .themes_contract import (
    CMD_DELETE,
    CMD_GET,
    CMD_LIST,
    CMD_SAVE,
    ERR_CONFLICT,
    ERR_NAME_TAKEN,
    ERR_NOT_EDITABLE,
    ERR_NOT_FOUND,
    ERR_READ_FAILED,
    ERR_SAVE_FAILED,
    ERR_THEME_FILES_OFF,
    ERR_THEMES_NOT_INCLUDED,
    ERR_TOO_LARGE,
    MAX_STORED_THEMES,
    MODES_KEY,
    STORAGE_KEY_THEMES,
    STORAGE_VERSION,
    THEMES_DIR,
)

_LOGGER = logging.getLogger(__name__)

# HA frontend's DATA_THEMES key (homeassistant.components.frontend); one place to change on a rename.
FRONTEND_THEMES_KEY = "frontend_themes"
DATA_THEMES = f"{DOMAIN}_themes"

THEME_FILES_OFF_MESSAGE = (
    "Saving to the themes folder is off. An administrator can turn on \"Allow themes to be saved in the "
    "themes folder\" in Settings > Devices & services > Magic Card Utils > Configure."
)


class ThemeStore:
    """The editor's themes, kept in .storage/magic_card_utils.themes."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.store: Store = Store(hass, STORAGE_VERSION, STORAGE_KEY_THEMES)
        self.themes: dict[str, dict[str, Any]] = {}
        self.lock = asyncio.Lock()

    async def async_load(self) -> None:
        """Load once; entries that no longer pass validation are dropped."""
        data = await self.store.async_load()
        stored = data.get("themes") if isinstance(data, dict) else None
        themes: dict[str, dict[str, Any]] = {}
        if isinstance(stored, dict):
            for name, item in stored.items():
                theme = item.get("theme") if isinstance(item, dict) else None
                updated = item.get("updated") if isinstance(item, dict) else None
                if (
                    tf.validate_name(name)
                    or tf.validate_theme(theme)
                    or isinstance(updated, bool)
                    or not isinstance(updated, (int, float))
                ):
                    _LOGGER.warning("Dropping invalid stored theme %r", name)
                    continue
                if len(themes) >= MAX_STORED_THEMES:
                    break
                themes[name] = {"theme": theme, "updated": float(updated)}
        self.themes = themes

    async def async_put(self, name: str, theme: dict) -> float:
        """Store ``theme`` under ``name``; returns its new ``updated`` (always later than the last one)."""
        previous = self.themes.get(name)
        updated = time.time()
        if previous and updated <= previous["updated"]:
            updated = previous["updated"] + 0.001
        themes = {**self.themes, name: {"theme": copy.deepcopy(theme), "updated": updated}}
        await self.store.async_save({"themes": themes})
        self.themes = themes
        return updated

    async def async_remove(self, name: str) -> bool:
        if name not in self.themes:
            return False
        themes = {k: v for k, v in self.themes.items() if k != name}
        await self.store.async_save({"themes": themes})
        self.themes = themes
        return True


def _theme_store(hass: HomeAssistant) -> ThemeStore:
    return hass.data[DATA_THEMES]


def loaded_theme_names(hass: HomeAssistant) -> list[str]:
    """Names of the themes Home Assistant has loaded right now."""
    themes = hass.data.get(FRONTEND_THEMES_KEY)
    return sorted(themes) if isinstance(themes, dict) else []


async def _reload_themes(hass: HomeAssistant) -> None:
    """Ask HA to re-read its themes. Failure is logged; the caller reports ``loaded`` instead."""
    try:
        await hass.services.async_call("frontend", "reload_themes", blocking=True)
    except Exception:  # noqa: BLE001 - the file is already written; do not fail the command
        _LOGGER.warning("frontend.reload_themes failed", exc_info=True)


def _send_error(connection: websocket_api.ActiveConnection, msg_id: int, err: tf.ThemeFileError) -> None:
    """Send a contract error; field errors travel as ``error["errors"]`` (animations.py does the same)."""
    payload = websocket_api.error_message(msg_id, err.code, err.message)
    if err.errors:
        payload["error"]["errors"] = err.errors
    connection.send_message(payload)


def _writes_off_error() -> tf.ThemeFileError:
    return tf.ThemeFileError(ERR_THEME_FILES_OFF, THEME_FILES_OFF_MESSAGE)


def _rel_file(name: str) -> str:
    return f"{THEMES_DIR}/{name}.yaml"


def _folder_state(record: dict[str, Any] | None, theme: dict | None) -> str:
    """How themes/<name>.yaml relates to ``theme`` (FolderState)."""
    if record is None:
        return "none"
    if not record["entry"]["editable"]:
        return "foreign"
    if theme is None or record["theme"] == theme:
        return "current"
    return "outdated"


def _is_number(value: Any) -> Any:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise vol.Invalid("expected a number")
    return value


async def async_setup_themes(hass: HomeAssistant) -> None:
    """Load the theme store (once per Home Assistant run) and register the theme commands."""
    if DATA_THEMES not in hass.data:
        store = ThemeStore(hass)
        await store.async_load()
        hass.data[DATA_THEMES] = store
    websocket_api.async_register_command(hass, ws_themes_list)
    websocket_api.async_register_command(hass, ws_themes_get)
    websocket_api.async_register_command(hass, ws_themes_save)
    websocket_api.async_register_command(hass, ws_themes_delete)


# ---------------------------------------------------------------- list


def _list_job(
    config_dir: str, loaded: list[str], writes: bool, stored: dict[str, dict[str, Any]]
) -> dict[str, Any]:
    records = tf.scan_records(config_dir)
    own_path = {
        r["entry"]["name"]: r for r in records if r["entry"]["file"] == _rel_file(r["entry"]["name"])
    }
    entries: list[dict[str, Any]] = []
    for name, item in stored.items():
        theme = item["theme"]
        entries.append(
            {
                "name": name,
                "file": _rel_file(name),
                "editable": True,
                "has_modes": MODES_KEY in theme,
                "var_count": tf.count_vars(theme),
                "mtime": item["updated"],
                "stored": True,
                "folder": _folder_state(own_path.get(name), theme),
            }
        )
    for record in records:
        entry = record["entry"]
        if entry["name"] in stored and own_path.get(entry["name"]) is record:
            continue  # the stored theme's own file: shown as its folder state
        entries.append({**entry, "stored": False, "folder": "current" if entry["editable"] else "foreign"})
    entries.sort(key=lambda e: (e["name"], not e["stored"], e["file"]))
    file_theme_loaded = any(r["entry"]["name"] in loaded for r in records)
    return {
        "include": include_status(config_dir, file_theme_loaded),
        "files": entries,
        "loaded": loaded,
        "writes_enabled": writes,
        "storage": True,
    }


@websocket_api.websocket_command({vol.Required("type"): CMD_LIST})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_themes_list(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Stored themes, theme files, include state and the names HA has loaded."""
    try:
        result = await hass.async_add_executor_job(
            _list_job,
            hass.config.config_dir,
            loaded_theme_names(hass),
            theme_files_enabled(hass),
            dict(_theme_store(hass).themes),
        )
    except Exception:  # noqa: BLE001 - log details, answer generically
        _LOGGER.exception("Listing themes failed")
        connection.send_error(msg["id"], ERR_READ_FAILED, "The themes could not be read")
        return
    connection.send_result(msg["id"], result)


# ---------------------------------------------------------------- get


def _get_job(config_dir: str, name: Any, item: dict[str, Any] | None) -> dict[str, Any]:
    if item is not None:
        theme = item["theme"]
        return {
            "name": name,
            "file": _rel_file(name),
            "editable": True,
            "stored": True,
            "folder": _folder_state(tf.folder_record(config_dir, name), theme),
            "mtime": item["updated"],
            "theme": copy.deepcopy(theme),
        }
    result = tf.read_theme(config_dir, name)
    result["stored"] = False
    result["folder"] = "current" if result["editable"] else "foreign"
    return result


@websocket_api.websocket_command({vol.Required("type"): CMD_GET, vol.Required("name"): str})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_themes_get(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """One theme: the stored copy, else the theme file (editable or read-only)."""
    name = msg["name"]
    try:
        result = await hass.async_add_executor_job(
            _get_job, hass.config.config_dir, name, _theme_store(hass).themes.get(name)
        )
    except tf.ThemeFileError as err:
        _send_error(connection, msg["id"], err)
        return
    except Exception:  # noqa: BLE001
        _LOGGER.exception("Reading theme %r failed", name)
        connection.send_error(msg["id"], ERR_READ_FAILED, "The theme could not be read")
        return
    connection.send_result(msg["id"], result)


# ---------------------------------------------------------------- save


def _save_job(
    config_dir: str,
    name: Any,
    theme: Any,
    overwrite: bool,
    base_mtime: float | None,
    publish: bool,
    writes: bool,
    loaded: list[str],
    stored_updated: float | None,
) -> dict[str, Any]:
    """Contract save order up to and including the file write; the store is saved by the caller."""
    tf.validate_save_request(name, theme)
    tf.dump_theme(name, theme)  # the size limit holds for stored themes too
    record = tf.folder_record(config_dir, name)
    own_file = record is not None and record["entry"]["editable"]
    is_stored = stored_updated is not None

    if not is_stored:
        if record is not None and not own_file:
            raise tf.ThemeFileError(
                ERR_NAME_TAKEN,
                f"themes/{name}.yaml was not written by Magic Card. Copy it under a new name instead.",
            )
        if record is None and name in loaded:
            raise tf.ThemeFileError(ERR_NAME_TAKEN, f"A theme named {name} is already loaded from another file.")
        if own_file and not overwrite:
            raise tf.ThemeFileError(ERR_NAME_TAKEN, f"A theme file named {name} already exists.")
        current = record["entry"]["mtime"] if own_file else None
    else:
        if not overwrite:
            raise tf.ThemeFileError(ERR_NAME_TAKEN, f"A theme named {name} already exists.")
        current = stored_updated
    if base_mtime is not None and current is not None and abs(current - base_mtime) > tf.MTIME_TOLERANCE:
        raise tf.ThemeFileError(ERR_CONFLICT, "The theme changed since you opened it.")

    if not publish:
        return {"published": False, "file": _rel_file(name), "folder": _folder_state(record, theme)}

    if not writes:
        raise _writes_off_error()
    files = tf.scan_themes(config_dir)["files"]
    if include_status(config_dir, any(e["name"] in loaded for e in files))["state"] != "ok":
        raise tf.ThemeFileError(
            ERR_THEMES_NOT_INCLUDED,
            "Home Assistant does not load the themes folder. Add the include line to configuration.yaml first.",
        )
    if record is not None and not own_file:
        raise tf.ThemeFileError(
            ERR_NOT_EDITABLE, f"themes/{name}.yaml was not written by Magic Card, so it is never replaced."
        )
    if record is None and name in loaded:
        raise tf.ThemeFileError(ERR_NAME_TAKEN, f"A theme named {name} is already loaded from another file.")
    written = tf.write_theme(config_dir, name, theme, overwrite=True)
    return {"published": True, "file": written["file"], "folder": "current"}


@websocket_api.websocket_command(
    {
        vol.Required("type"): CMD_SAVE,
        vol.Required("name"): object,  # checked by the name rule, which reports a field error
        vol.Required("theme"): object,  # checked by validate_theme
        vol.Optional("overwrite", default=False): bool,
        vol.Optional("base_mtime"): vol.All(_is_number),
        vol.Optional("publish", default=False): bool,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_themes_save(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Validate and store the theme; with ``publish`` also write themes/<name>.yaml and reload HA themes."""
    name = msg["name"]
    store = _theme_store(hass)
    async with store.lock:
        item = store.themes.get(name) if isinstance(name, str) else None
        try:
            if item is None and len(store.themes) >= MAX_STORED_THEMES:
                raise tf.ThemeFileError(ERR_TOO_LARGE, f"Magic Card Utils keeps at most {MAX_STORED_THEMES} themes.")
            saved = await hass.async_add_executor_job(
                _save_job,
                hass.config.config_dir,
                name,
                msg["theme"],
                msg["overwrite"],
                msg.get("base_mtime"),
                msg["publish"],
                theme_files_enabled(hass),
                loaded_theme_names(hass),
                item["updated"] if item else None,
            )
        except tf.ThemeFileError as err:
            _send_error(connection, msg["id"], err)
            return
        except Exception:  # noqa: BLE001 - log details, answer generically
            _LOGGER.exception("Saving theme %r failed", name)
            connection.send_error(msg["id"], ERR_SAVE_FAILED, "The theme could not be saved")
            return
        try:
            updated = await store.async_put(name, msg["theme"])
        except Exception:  # noqa: BLE001
            _LOGGER.exception("Storing theme %r failed", name)
            connection.send_error(msg["id"], ERR_SAVE_FAILED, "The theme could not be saved")
            return

    if saved["published"]:
        await _reload_themes(hass)
    connection.send_result(
        msg["id"],
        {
            "name": name,
            "file": saved["file"],
            "mtime": updated,
            "loaded": name in loaded_theme_names(hass),
            "stored": True,
            "published": saved["published"],
            "folder": saved["folder"],
        },
    )


# ---------------------------------------------------------------- delete


@websocket_api.websocket_command(
    {
        vol.Required("type"): CMD_DELETE,
        vol.Required("name"): object,
        vol.Optional("file", default=False): bool,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_themes_delete(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Remove the stored theme; with ``file`` also remove the editor's own themes/<name>.yaml."""
    name = msg["name"]
    store = _theme_store(hass)
    async with store.lock:
        try:
            message = tf.validate_name(name)
            if message:
                raise tf.ThemeFileError(
                    tf.ERR_INVALID_FORMAT, "Invalid theme name.", [{"path": "name", "message": message}]
                )
            is_stored = name in store.themes
            if msg["file"]:
                if not theme_files_enabled(hass):
                    raise _writes_off_error()
                await hass.async_add_executor_job(tf.delete_theme, hass.config.config_dir, name)
            elif not is_stored:
                raise tf.ThemeFileError(ERR_NOT_FOUND, "Theme not found.")
        except tf.ThemeFileError as err:
            _send_error(connection, msg["id"], err)
            return
        except Exception:  # noqa: BLE001
            _LOGGER.exception("Deleting theme %r failed", name)
            connection.send_error(msg["id"], ERR_SAVE_FAILED, "The theme could not be deleted")
            return
        try:
            removed = await store.async_remove(name)
        except Exception:  # noqa: BLE001
            _LOGGER.exception("Removing stored theme %r failed", name)
            connection.send_error(msg["id"], ERR_SAVE_FAILED, "The theme could not be deleted")
            return

    if msg["file"]:
        await _reload_themes(hass)
    connection.send_result(msg["id"], {"stored": removed, "file": msg["file"]})
