"""WebSocket API for shared Magic Card template storage."""

import copy
from datetime import datetime, timezone
import logging
import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.storage import Store

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

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
        "subscriptions": [],
    }

    websocket_api.async_register_command(hass, ws_get_templates)
    websocket_api.async_register_command(hass, ws_subscribe_templates)
    websocket_api.async_register_command(hass, ws_save_template)
    websocket_api.async_register_command(hass, ws_delete_template)

    # Re-broadcast linked_cards counts when any Lovelace dashboard is edited
    # so the panel updates without needing a manual refresh.
    @callback
    def _on_lovelace_updated(_event):
        hass.async_create_task(async_send_templates_update(hass))

    hass.bus.async_listen("lovelace_updated", _on_lovelace_updated)


def _walk_for_template_refs(obj, template_names: set, counts: dict) -> None:
    """Recursively scan a Lovelace config tree and tally `template: <name>` references."""
    if isinstance(obj, dict):
        tmpl = obj.get("template")
        if isinstance(tmpl, str) and tmpl in template_names:
            counts[tmpl] = counts.get(tmpl, 0) + 1
        for v in obj.values():
            _walk_for_template_refs(v, template_names, counts)
    elif isinstance(obj, list):
        for item in obj:
            _walk_for_template_refs(item, template_names, counts)


async def _count_template_references(hass: HomeAssistant) -> dict:
    """Walk every Lovelace dashboard and count cards referencing each template by name.

    Returns a dict {template_name: int}. Missing templates are 0 by convention.
    """
    counts: dict = {}
    template_names = set(hass.data[DOMAIN]["templates"].keys())
    if not template_names:
        return counts

    lovelace_data = hass.data.get("lovelace")
    if lovelace_data is None:
        return counts

    # `hass.data["lovelace"]` may be a dataclass (newer HA) or a dict (older HA).
    if isinstance(lovelace_data, dict):
        dashboards = lovelace_data.get("dashboards", {}) or {}
    else:
        dashboards = getattr(lovelace_data, "dashboards", {}) or {}

    for dashboard in dashboards.values():
        try:
            config = await dashboard.async_load(False)
        except Exception as err:  # noqa: BLE001 - any failure should not break the scan
            _LOGGER.debug("Skipping dashboard %r during scan: %s", dashboard, err)
            continue
        if not config:
            continue
        _walk_for_template_refs(config, template_names, counts)

    return counts


async def _build_templates_payload(hass: HomeAssistant) -> dict:
    """Return a shallow copy of templates with linked_cards overlaid from a fresh storage scan."""
    templates = hass.data[DOMAIN]["templates"]
    counts = await _count_template_references(hass)
    result = {}
    for name, tmpl in templates.items():
        tmpl_copy = dict(tmpl) if isinstance(tmpl, dict) else {}
        tmpl_copy["linked_cards"] = counts.get(name, 0)
        result[name] = tmpl_copy
    return result


async def async_send_templates_update(hass: HomeAssistant) -> None:
    """Broadcast the current templates (with linked_cards counts) to all subscribers."""
    payload = await _build_templates_payload(hass)
    for connection, sub_id in list(hass.data[DOMAIN]["subscriptions"]):
        connection.send_message(
            websocket_api.event_message(sub_id, {"templates": payload})
        )


@websocket_api.websocket_command(
    {vol.Required("type"): "magic_card_utils/get_templates"}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_get_templates(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """One-shot fetch of all saved templates."""
    payload = await _build_templates_payload(hass)
    connection.send_result(msg["id"], {"templates": payload})


@websocket_api.websocket_command(
    {vol.Required("type"): "magic_card_utils/subscribe_templates"}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_subscribe_templates(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Subscribe to template updates; initial state and subsequent changes arrive as events."""
    sub_id = msg["id"]
    entry = (connection, sub_id)
    hass.data[DOMAIN]["subscriptions"].append(entry)
    connection.send_result(sub_id)

    payload = await _build_templates_payload(hass)
    connection.send_message(
        websocket_api.event_message(sub_id, {"templates": payload})
    )

    @callback
    def unsub(*args):
        try:
            hass.data[DOMAIN]["subscriptions"].remove(entry)
        except ValueError:
            pass

    connection.subscriptions[sub_id] = unsub


@websocket_api.websocket_command(
    {
        vol.Required("type"): "magic_card_utils/save_template",
        vol.Required("name"): str,
        vol.Required("template"): dict,
        vol.Optional("card_type"): str,
        vol.Optional("old_name"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_save_template(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Save or overwrite a single template by name.

    When ``old_name`` is supplied and differs from ``name``, the operation
    is treated as a rename: the existing record is removed under the old
    key, its created_at is preserved, and the payload becomes the canonical
    content under the new key. Dashboards that reference the old name will
    NOT auto-rewire — callers should update any references separately.
    """
    templates = hass.data[DOMAIN]["templates"]
    name = msg["name"]
    old_name = msg.get("old_name")
    is_rename = bool(old_name) and old_name != name

    if is_rename:
        if old_name not in templates:
            connection.send_error(
                msg["id"], "not_found", f"Template '{old_name}' does not exist"
            )
            return
        if name in templates:
            connection.send_error(
                msg["id"],
                "name_taken",
                f"Template '{name}' already exists; pick a different name",
            )
            return

    template = copy.deepcopy(msg["template"])

    if "config" in template and isinstance(template["config"], dict):
        template["config"] = _strip_not_synced(template["config"])

    if is_rename:
        existing = templates.pop(old_name)
    else:
        existing = templates.get(name) if isinstance(templates.get(name), dict) else {}

    config = template.get("config") if isinstance(template.get("config"), dict) else None
    config_type = config.get("type") if config and isinstance(config.get("type"), str) else None
    card_type = msg.get("card_type") or config_type or existing.get("card_type")
    if isinstance(card_type, str) and card_type:
        template["card_type"] = card_type

    now = datetime.now(timezone.utc).isoformat()
    if is_rename or name in templates:
        template["created_at"] = existing.get("created_at", now)
    else:
        template["created_at"] = now
    template["last_updated"] = now

    templates[name] = template
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
    """Delete a template by name. Refuses while any dashboard still references it."""
    templates = hass.data[DOMAIN]["templates"]
    name = msg["name"]

    if name not in templates:
        connection.send_result(msg["id"], {"success": True})
        return

    counts = await _count_template_references(hass)
    linked = counts.get(name, 0)
    if linked > 0:
        connection.send_error(
            msg["id"],
            "linked_cards",
            f"Cannot delete '{name}': still referenced by {linked} card(s)",
        )
        return

    templates.pop(name, None)
    await hass.data[DOMAIN]["store"].async_save({"templates": templates})
    await async_send_templates_update(hass)
    connection.send_result(msg["id"], {"success": True})
