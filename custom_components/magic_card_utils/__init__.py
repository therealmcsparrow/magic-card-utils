"""Magic Card Utils integration – shared template storage for Magic Card."""

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .websocket import async_register_websocket

DOMAIN = "magic_card_utils"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Magic Card Utils from a config entry."""
    await async_register_websocket(hass)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    hass.data.pop(DOMAIN, None)
    return True
