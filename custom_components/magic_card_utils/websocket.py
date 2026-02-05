"""WebSocket API for shared Magic Card template storage."""

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.storage import Store

DOMAIN = "magic_card_utils"
STORAGE_KEY = "magic_card_templates"
STORAGE_VERSION = 1


async def async_register_websocket(hass: HomeAssistant) -> None:
    """Load stored templates and register WebSocket commands."""
    store = Store(hass, STORAGE_VERSION, STORAGE_KEY)
    data = await store.async_load() or {}

    hass.data[DOMAIN] = {
        "store": store,
        "templates": data.get("templates", {}),
    }

    websocket_api.async_register_command(hass, ws_get_templates)
    websocket_api.async_register_command(hass, ws_save_template)
    websocket_api.async_register_command(hass, ws_delete_template)


@websocket_api.websocket_command(
    {vol.Required("type"): "magic_card_utils/get_templates"}
)
@callback
def ws_get_templates(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Return all saved templates."""
    connection.send_result(msg["id"], {"templates": hass.data[DOMAIN]["templates"]})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "magic_card_utils/save_template",
        vol.Required("name"): str,
        vol.Required("template"): dict,
    }
)
@websocket_api.async_response
async def ws_save_template(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Save or overwrite a single template by name."""
    templates = hass.data[DOMAIN]["templates"]
    templates[msg["name"]] = msg["template"]
    await hass.data[DOMAIN]["store"].async_save({"templates": templates})
    hass.bus.async_fire("magic_card_utils_template_updated", {
        "name": msg["name"],
        "template": msg["template"],
    })
    connection.send_result(msg["id"], {"success": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "magic_card_utils/delete_template",
        vol.Required("name"): str,
    }
)
@websocket_api.async_response
async def ws_delete_template(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Delete a template by name."""
    templates = hass.data[DOMAIN]["templates"]
    templates.pop(msg["name"], None)
    await hass.data[DOMAIN]["store"].async_save({"templates": templates})
    connection.send_result(msg["id"], {"success": True})
