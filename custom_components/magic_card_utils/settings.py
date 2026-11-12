"""Integration settings for Magic Card: the Google Fonts switch and the fonts Home Assistant themes use."""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from .const import DOMAIN

CONF_GOOGLE_FONTS = "google_fonts"
CMD_GET_SETTINGS = f"{DOMAIN}/get_settings"

_CATALOGUE_PATH = Path(__file__).parent / "google_fonts.json"
_catalogue: dict[str, Any] | None = None


def _load_catalogue() -> dict[str, Any]:
    global _catalogue
    if _catalogue is None:
        try:
            data = json.loads(_CATALOGUE_PATH.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            data = {}
        families = data.get("families") if isinstance(data, dict) else None
        aliases = data.get("aliases") if isinstance(data, dict) else None
        _catalogue = {
            "families": families if isinstance(families, dict) else {},
            "aliases": aliases if isinstance(aliases, dict) else {},
        }
        _catalogue["lower"] = {name.lower(): name for name in _catalogue["families"]}
    return _catalogue


async def async_load_catalogue(hass: HomeAssistant) -> dict[str, Any]:
    """The catalogue, read from disk once in the executor (never on the event loop)."""
    if _catalogue is not None:
        return _catalogue
    return await hass.async_add_executor_job(_load_catalogue)


def google_fonts_enabled(hass: HomeAssistant) -> bool:
    """True when the switch is on in the options of the integration's config entry."""
    for entry in hass.config_entries.async_entries(DOMAIN):
        if entry.options.get(CONF_GOOGLE_FONTS, False) is True:
            return True
    return False


def _resolve_family(raw: str) -> str | None:
    """The catalogue name of one font-family token, or None."""
    name = raw.strip().strip("'\"").strip()
    if not name:
        return None
    catalogue = _load_catalogue()
    key = name.lower()
    name = catalogue["aliases"].get(key, name)
    return catalogue["lower"].get(name.lower())


def _font_values(node: Any, out: list[str]) -> None:
    if not isinstance(node, dict):
        return
    for key, value in node.items():
        if isinstance(value, dict):
            _font_values(value, out)
        elif isinstance(value, str) and (key == "primary-font-family" or "font-family" in key):
            out.append(value)


# Home Assistant ships Roboto, so a theme naming it never needs Google.
_SKIPPED = frozenset({"roboto"})


def theme_google_fonts(hass: HomeAssistant) -> dict[str, list[dict[str, Any]]]:
    """Google families used by each loaded theme: {theme: [{"name", "weights"}]}, light and dark merged.

    Reads the catalogue loaded by async_load_catalogue.
    """
    themes = hass.data.get("frontend_themes")
    if not isinstance(themes, dict):
        return {}
    families = _load_catalogue()["families"]
    result: dict[str, list[dict[str, Any]]] = {}
    for theme_name, theme in themes.items():
        values: list[str] = []
        _font_values(theme, values)
        names: list[str] = []
        for value in values:
            for token in value.split(","):
                resolved = _resolve_family(token)
                if resolved and resolved.lower() not in _SKIPPED and resolved not in names:
                    names.append(resolved)
        if names:
            result[str(theme_name)] = [{"name": n, "weights": list(families[n])} for n in names]
    return result


@websocket_api.websocket_command({vol.Required("type"): CMD_GET_SETTINGS})
@websocket_api.async_response
async def ws_get_settings(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Readable by every signed-in user."""
    enabled = google_fonts_enabled(hass)
    if enabled:
        await async_load_catalogue(hass)
    connection.send_result(
        msg["id"],
        {"google_fonts": enabled, "theme_fonts": theme_google_fonts(hass) if enabled else {}},
    )
