"""Magic Card Utils integration – shared template storage for Magic Card."""
from __future__ import annotations
import os

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.components import panel_custom
from homeassistant.components.http.view import StaticPathConfig

from .const import DOMAIN, PANEL_ICON, PANEL_TITLE, PANEL_URL
from .websocket import async_register_websocket


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up from a config entry."""
    # Register the websocket
    await async_register_websocket(hass)

    if not hass.data.get(f"{DOMAIN}_static_path_registered", False):
        # Register static path for the panel files
        panel_path = os.path.join(os.path.dirname(__file__), "www")
        await hass.http.async_register_static_paths([
            StaticPathConfig(f"/{PANEL_URL}", panel_path, cache_headers=False)
        ])
        hass.data[f"{DOMAIN}_static_path_registered"] = True

    # Register sidebar panel
    if entry.data.get("show_side_panel", True):
        await async_register_panel(hass)

    return True


async def async_register_panel(hass: HomeAssistant) -> None:
    """Register the sidebar panel."""
    if DOMAIN in hass.data.get("frontend_panels", {}):
        return

    # Register the custom panel
    await panel_custom.async_register_panel(
        hass,
        webcomponent_name="magic-card-utils-panel",
        frontend_url_path=PANEL_URL,
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        module_url=f"/{PANEL_URL}/magic_card_utils_panel.js",
        embed_iframe=False,
        require_admin=True,
    )


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    # Unregister the panel
    if DOMAIN in hass.data.get("frontend_panels", {}):
        panel_custom.async_remove_panel(hass, DOMAIN)

    # Pop data
    hass.data.pop(DOMAIN, None)

    return True
