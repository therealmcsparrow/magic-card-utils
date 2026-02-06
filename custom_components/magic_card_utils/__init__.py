"""Magic Card Utils integration – shared template storage for Magic Card."""

import os
from typing import Optional
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN, PANEL_ICON, PANEL_TITLE, PANEL_URL
from .websocket import async_register_websocket


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Magic Card Utils from a config entry."""

    # Register the static path for the panel
    hass.http.app.router.add_static(
        f"/{PANEL_URL}",
        hass.config.path("custom_components/magic_card_utils/www"),
        name="magic_card_utils_static"
    )

    # Register the panel
    if entry.options.get("show_side_panel", entry.data.get("show_side_panel", True)):
        hass.components.frontend.async_register_panel(
            webcomponent_name="magic-card-utils-panel",
            frontend_url_path=f"/{PANEL_URL}/magic_card_utils_panel.js",
            sidebar_title=PANEL_TITLE,
            sidebar_icon=PANEL_ICON,
            url_path=PANEL_URL,
            require_admin=True,
        )

    # Add an options update listener
    entry.add_update_listener(options_update_listener)

    # Register the websocket
    await async_register_websocket(hass)

    return True


async def options_update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Handle options update."""
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""

    # Unregister the panel
    if entry.options.get("show_side_panel", entry.data.get("show_side_panel", True)):
        hass.components.frontend.async_remove_panel(PANEL_URL)

    # Pop data
    hass.data.pop(DOMAIN, None)

    return True


async def async_reload_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Reload the config entry."""
    await async_unload_entry(hass, entry)
    await async_setup_entry(hass, entry)
