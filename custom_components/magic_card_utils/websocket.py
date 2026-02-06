"""WebSocket API for shared Magic Card template storage."""

import copy
from datetime import datetime, timezone
import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.storage import Store

from .const import DOMAIN

STORAGE_KEY = "magic_card_templates"
STORAGE_VERSION = 1


def _strip_not_synced(obj: dict) -> dict:
    """Recursively strip not_synced arrays from a config dict.

    These are card-instance-specific and should not be stored in templates.
    """
    result = {k: v for k, v in obj.items() if k != "not_synced"}

    if "rows" in result and isinstance(result["rows"], list):
        cleaned_rows = []
        for row in result["rows"]:
            if isinstance(row, dict):
                row = {k: v for k, v in row.items() if k != "not_synced"}
                if "columns" in row and isinstance(row["columns"], list):
                    cleaned_cols = []
                    for col in row["columns"]:
                        if isinstance(col, dict):
                            col = {k: v for k, v in col.items() if k != "not_synced"}
                            if "modules" in col and isinstance(col["modules"], list):
                                col["modules"] = [
                                    {k: v for k, v in mod.items() if k != "not_synced"}
                                    if isinstance(mod, dict)
                                    else mod
                                    for mod in col["modules"]
                                ]
                        cleaned_cols.append(col)
                    row["columns"] = cleaned_cols
            cleaned_rows.append(row)
        result["rows"] = cleaned_rows

    return result


async def async_register_websocket(hass: HomeAssistant) -> None:
    """Load stored templates and register WebSocket commands."""
    store = Store(hass, STORAGE_VERSION, STORAGE_KEY)
    data = await store.async_load() or {}

    hass.data[DOMAIN] = {
        "store": store,
        "templates": data.get("templates", {}),
        "subscriptions": set(),
    }

    websocket_api.async_register_command(hass, ws_subscribe_templates)
    websocket_api.async_register_command(hass, ws_save_template)
    websocket_api.async_register_command(hass, ws_delete_template)


async def async_send_templates_update(hass: HomeAssistant) -> None:
    """Send template updates to all subscribed clients."""
    templates = hass.data[DOMAIN]["templates"]
    for connection in hass.data[DOMAIN]["subscriptions"]:
        connection.send_message(
            websocket_api.event_message(
                0, {"type": "magic_card_utils/templates", "templates": templates}
            )
        )


@websocket_api.websocket_command(
    {vol.Required("type"): "magic_card_utils/get_templates"}
)
@websocket_api.require_admin
@callback
def ws_subscribe_templates(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Subscribe to template updates and get all saved templates."""
    hass.data[DOMAIN]["subscriptions"].add(connection)
    connection.send_result(msg["id"], {"templates": hass.data[DOMAIN]["templates"]})

    @callback
    def unsub(*args):
        hass.data[DOMAIN]["subscriptions"].remove(connection)

    connection.subscriptions[msg["id"]] = unsub


@websocket_api.websocket_command(
    {
        vol.Required("type"): "magic_card_utils/save_template",
        vol.Required("name"): str,
        vol.Required("template"): dict,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_save_template(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Save or overwrite a single template by name."""
    templates = hass.data[DOMAIN]["templates"]
    template = copy.deepcopy(msg["template"])

    # Strip instance-specific not_synced arrays from the config
    if "config" in template and isinstance(template["config"], dict):
        template["config"] = _strip_not_synced(template["config"])

    # Add metadata
    now = datetime.now(timezone.utc).isoformat()
    if msg["name"] not in templates:
        template["created_at"] = now
    else:
        template["created_at"] = templates[msg["name"]].get("created_at", now)
    template["last_updated"] = now

    templates[msg["name"]] = template
    await hass.data[DOMAIN]["store"].async_save({"templates": templates})
    await async_send_templates_update(hass)
    connection.send_result(msg["id"], {"success": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "magic_card_utils/delete_template",
        vol.Required("name"): str,
    }
)

@websocket_api.require_admin
@websocket_api.async_response
async def ws_delete_template(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Delete a template by name."""
    templates = hass.data[DOMAIN]["templates"]
    templates.pop(msg["name"], None)
    await hass.data[DOMAIN]["store"].async_save({"templates": templates})
    await async_send_templates_update(hass)
    connection.send_result(msg["id"], {"success": True})
