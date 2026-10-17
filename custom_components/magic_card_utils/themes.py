"""WebSocket commands of the theme editor (contract theme-files 1.0.0, themes_contract.py).

All four commands are admin only. File work (theme_files.py, include_scan.py) is blocking and runs in
the executor. After a write or delete, HA's ``frontend.reload_themes`` service is called so the
change is live; ``loaded`` in the save result says whether HA now knows the theme.
"""

from __future__ import annotations

import logging
import os
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from . import theme_files as tf
from .include_scan import include_status
from .themes_contract import (
    CMD_DELETE,
    CMD_GET,
    CMD_LIST,
    CMD_SAVE,
    ERR_INVALID_FORMAT,
    ERR_NAME_TAKEN,
    ERR_READ_FAILED,
    ERR_SAVE_FAILED,
    ERR_THEMES_NOT_INCLUDED,
)

_LOGGER = logging.getLogger(__name__)

# HA frontend's DATA_THEMES key (homeassistant.components.frontend); one place to change on a rename.
FRONTEND_THEMES_KEY = "frontend_themes"


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


def _is_number(value: Any) -> Any:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise vol.Invalid("expected a number")
    return value


async def async_setup_themes(hass: HomeAssistant) -> None:
    """Register the theme commands."""
    websocket_api.async_register_command(hass, ws_themes_list)
    websocket_api.async_register_command(hass, ws_themes_get)
    websocket_api.async_register_command(hass, ws_themes_save)
    websocket_api.async_register_command(hass, ws_themes_delete)


# ---------------------------------------------------------------- list


def _list_job(config_dir: str, loaded: list[str]) -> dict[str, Any]:
    files = tf.scan_themes(config_dir)["files"]
    file_theme_loaded = any(entry["name"] in loaded for entry in files)
    return {
        "include": include_status(config_dir, file_theme_loaded),
        "files": files,
        "loaded": loaded,
    }


@websocket_api.websocket_command({vol.Required("type"): CMD_LIST})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_themes_list(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Theme files, include state and the names HA has loaded."""
    try:
        result = await hass.async_add_executor_job(
            _list_job, hass.config.config_dir, loaded_theme_names(hass)
        )
    except Exception:  # noqa: BLE001 - log details, answer generically
        _LOGGER.exception("Listing theme files failed")
        connection.send_error(msg["id"], ERR_READ_FAILED, "The theme files could not be read")
        return
    connection.send_result(msg["id"], result)


# ---------------------------------------------------------------- get


@websocket_api.websocket_command({vol.Required("type"): CMD_GET, vol.Required("name"): str})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_themes_get(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """One theme file (editable or read-only)."""
    try:
        result = await hass.async_add_executor_job(
            tf.read_theme, hass.config.config_dir, msg["name"]
        )
    except tf.ThemeFileError as err:
        _send_error(connection, msg["id"], err)
        return
    except Exception:  # noqa: BLE001
        _LOGGER.exception("Reading theme %r failed", msg["name"])
        connection.send_error(msg["id"], ERR_READ_FAILED, "The theme file could not be read")
        return
    connection.send_result(msg["id"], result)


# ---------------------------------------------------------------- save


def _save_job(
    config_dir: str,
    name: Any,
    theme: Any,
    overwrite: bool,
    base_mtime: float | None,
    loaded: list[str],
) -> dict[str, Any]:
    """Contract save order up to and including the write."""
    tf.validate_save_request(name, theme)
    files = tf.scan_themes(config_dir)["files"]
    file_theme_loaded = any(entry["name"] in loaded for entry in files)
    if include_status(config_dir, file_theme_loaded)["state"] != "ok":
        raise tf.ThemeFileError(
            ERR_THEMES_NOT_INCLUDED,
            "Home Assistant does not load the themes folder. Add the include line to configuration.yaml first.",
        )
    tf.check_existing(config_dir, name, overwrite, base_mtime)
    if name in loaded and not os.path.lexists(tf.theme_path(config_dir, name)):
        raise tf.ThemeFileError(
            ERR_NAME_TAKEN, f"A theme named {name} is already loaded from another file."
        )
    return tf.write_theme(config_dir, name, theme, overwrite, base_mtime)


@websocket_api.websocket_command(
    {
        vol.Required("type"): CMD_SAVE,
        vol.Required("name"): object,  # checked by the name rule, which reports a field error
        vol.Required("theme"): object,  # checked by validate_theme
        vol.Optional("overwrite", default=False): bool,
        vol.Optional("base_mtime"): vol.All(_is_number),
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_themes_save(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Validate, write themes/<name>.yaml, reload HA themes."""
    name = msg["name"]
    try:
        saved = await hass.async_add_executor_job(
            _save_job,
            hass.config.config_dir,
            name,
            msg["theme"],
            msg["overwrite"],
            msg.get("base_mtime"),
            loaded_theme_names(hass),
        )
    except tf.ThemeFileError as err:
        _send_error(connection, msg["id"], err)
        return
    except Exception:  # noqa: BLE001 - log details, answer generically
        _LOGGER.exception("Saving theme %r failed", name)
        connection.send_error(msg["id"], ERR_SAVE_FAILED, "The theme could not be saved")
        return

    await _reload_themes(hass)
    connection.send_result(
        msg["id"], {**saved, "loaded": saved["name"] in loaded_theme_names(hass)}
    )


# ---------------------------------------------------------------- delete


@websocket_api.websocket_command({vol.Required("type"): CMD_DELETE, vol.Required("name"): object})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_themes_delete(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Delete an editable theme file and reload HA themes."""
    name = msg["name"]
    try:
        await hass.async_add_executor_job(tf.delete_theme, hass.config.config_dir, name)
    except tf.ThemeFileError as err:
        _send_error(connection, msg["id"], err)
        return
    except Exception:  # noqa: BLE001
        _LOGGER.exception("Deleting theme %r failed", name)
        connection.send_error(msg["id"], ERR_SAVE_FAILED, "The theme file could not be deleted")
        return

    await _reload_themes(hass)
    connection.send_result(msg["id"], {})
