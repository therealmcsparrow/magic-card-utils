"""Contract: mcu-templates 1.0.0 (Architect-owned). Shared Magic Card templates: who may read, who may write.

TypeScript mirror (same version, field names and rules): magic-card src/contracts/mcu-templates.ts.
Decision record: magic-card docs/adr/0034-template-reads-are-per-name-and-open-to-every-user.md.
Task: template-cards-non-admin (CEO Brief Gate 2026-10-19).

Implementation: websocket.py (Store "magic_card_templates", commands). This file documents the
commands that existed before 1.0.0 as they are (no behaviour change) and adds two read commands
that any authenticated user may use.

Permission rule (same as mcu-library 1.0.0): reads that a card needs to render are open to any
authenticated user (registered with @callback or @async_response, never @require_admin). Writes,
and anything built from the dashboard scan (linked_cards), are @require_admin. The scan reads every
Lovelace dashboard, including admin-only ones, so its results never reach a non-admin.

Commands (``type``: request -> result).
Admin only, unchanged (the editor's template picker and the MCU panel use them):
- CMD_GET_TEMPLATES       {} -> {templates: {name: StoredTemplate + linked_cards: int}}  (runs the scan)
- CMD_SUBSCRIBE_TEMPLATES {} -> events {templates: {...same...}}; first event at once with the full
                             state; again after every save / delete and every lovelace_updated.
- CMD_SAVE_TEMPLATE       {name, template: {config, ...}, card_type?, old_name?} -> {success: true}
                             errors not_found (old_name unknown), name_taken
- CMD_DELETE_TEMPLATE     {name} -> {success: true}  (unknown name: success); error linked_cards

Any authenticated user (new in 1.0.0):
- CMD_TEMPLATE_GET        {name: TemplateName} -> {template: TemplateContent | None}
                             None when no template has that name. One-shot; no scan.
- CMD_SUBSCRIBE_TEMPLATE  {name: TemplateName} -> result, then events TemplateEvent for that name only:
                             first event at once with the current state ("saved" with the content,
                             or "deleted" when the name doesn't exist), then one event per change.
                             No scan. Unsubscribe through the normal HA subscription cleanup
                             (connection.subscriptions[msg id]); the dispatcher listener is removed then.

TemplateContent is built field by field from the stored record (allow-list, never the stored dict
as a whole): config (dict, as stored, not_synced already stripped at save), card_type (str, only
when stored), last_updated (str, UTC ISO 8601, only when stored). Never linked_cards, created_at,
dashboard names or counts, or any field added to storage later unless this Contract lists it.

TemplateEvent:
- {action: "saved",   name, template: TemplateContent}
- {action: "deleted", name}
Events come from the dispatcher signal SIGNAL_TEMPLATES_UPDATED, sent by save and delete after the
Store save: save -> ("saved", name); rename (old_name != name) -> ("deleted", old_name) then
("saved", name); delete of an existing template -> ("deleted", name). lovelace_updated sends nothing
on this signal (content didn't change). The signal payload is {action, name} only; each subscription
reads the current record when it forwards, so a subscriber always gets the stored state.

Error cases:
- invalid_format: name missing, not a str, or outside 1..TEMPLATE_NAME_MAX_CHARS (voluptuous schema).
- not_loaded: hass.data[DOMAIN] missing (integration starting or unloaded). Retry later.
- unauthorized (from HA): a non-admin sends one of the four admin commands. Storage unchanged.
- unknown_command (from HA): this MCU is older than 1.0.0 (no new read commands). Magic Card then
  falls back to CMD_GET_TEMPLATES once per page; that works for admins only (compatibility rule below).

Compatibility (brief AC8):
- New card + old MCU: CMD_SUBSCRIBE_TEMPLATE -> unknown_command -> the card fetches CMD_GET_TEMPLATES
  once per page connection and reads every name from that one answer. Admins render (no live
  updates, as before); non-admins get unauthorized -> the card shows its own config and the
  "couldn't be loaded" notice.
- Old card + new MCU: the old card calls CMD_GET_TEMPLATES (unchanged) -> admins render as before.
  It also calls register_card_instance / unregister_card_instance and subscribes to the bus event
  magic_card_utils_template_updated: none of these exist in any MCU and this Contract does not add
  them; the old card swallows those errors.
- Non-admins need both: MCU with this Contract and the Magic Card release that uses it. The release
  notes of both repos name the two versions.
"""

from __future__ import annotations

from typing import Literal, NotRequired, TypedDict

MCU_TEMPLATES_CONTRACT_VERSION = "1.0.0"

STORAGE_KEY = "magic_card_templates"
STORAGE_VERSION = 1
SIGNAL_TEMPLATES_UPDATED = "magic_card_utils_templates_updated"

# Admin only (unchanged)
CMD_GET_TEMPLATES = "magic_card_utils/get_templates"
CMD_SUBSCRIBE_TEMPLATES = "magic_card_utils/subscribe_templates"
CMD_SAVE_TEMPLATE = "magic_card_utils/save_template"
CMD_DELETE_TEMPLATE = "magic_card_utils/delete_template"
# Any authenticated user (1.0.0)
CMD_TEMPLATE_GET = "magic_card_utils/template_get"
CMD_SUBSCRIBE_TEMPLATE = "magic_card_utils/subscribe_template"

TEMPLATE_NAME_MAX_CHARS = 255
# The only stored fields a non-admin read may return.
TEMPLATE_CONTENT_FIELDS = ("config", "card_type", "last_updated")

ERR_INVALID_FORMAT = "invalid_format"
ERR_NOT_LOADED = "not_loaded"
ERR_NOT_FOUND = "not_found"
ERR_NAME_TAKEN = "name_taken"
ERR_LINKED_CARDS = "linked_cards"


class TemplateContent(TypedDict):
    config: dict
    card_type: NotRequired[str]
    last_updated: NotRequired[str]


class TemplateSavedEvent(TypedDict):
    action: Literal["saved"]
    name: str
    template: TemplateContent


class TemplateDeletedEvent(TypedDict):
    action: Literal["deleted"]
    name: str


TemplateEvent = TemplateSavedEvent | TemplateDeletedEvent
