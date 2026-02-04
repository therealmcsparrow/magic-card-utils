"""Magic Card Utils integration – shared template storage for Magic Card."""

from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType

from .websocket import async_register_websocket

DOMAIN = "magic_card_utils"


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the Magic Card Utils integration."""
    await async_register_websocket(hass)
    return True
