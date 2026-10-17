"""Global animation library for Magic Card: storage and WebSocket API.

Animation documents are authored in the Magic Card animation studio and used by
every card as ``preset: custom:<id>``. The card and the studio validate the full
document model; this module only checks the structure (id, name, kind, version)
and the size caps, so oversized or malformed documents are rejected safely.
"""

from __future__ import annotations

import json
import logging
import re
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import (
    async_dispatcher_connect,
    async_dispatcher_send,
)
from homeassistant.helpers.storage import Store

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

STORAGE_KEY = f"{DOMAIN}.animations"
STORAGE_VERSION = 1

DATA_ANIMATIONS = f"{DOMAIN}_animations"
SIGNAL_ANIMATIONS_UPDATED = f"{DOMAIN}_animations_updated"

MAX_ANIMATIONS = 200
MAX_DOC_BYTES = 64 * 1024
MAX_NAME_LENGTH = 80
ANIMATION_KINDS = ("keyframes", "particles", "path", "sequence")
ANIMATION_ID_RE = re.compile(r"^[a-z0-9][a-z0-9_-]{0,63}$")

ERR_INVALID_FORMAT = "invalid_format"
ERR_NOT_LOADED = "not_loaded"
ERR_SAVE_FAILED = "save_failed"


class AnimationLibrary:
    """In-memory animation library backed by a Home Assistant Store."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self.store: Store = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self.animations: dict[str, dict] = {}

    async def async_load(self) -> None:
        """Load the library once; entries that no longer pass validation are dropped."""
        data = await self.store.async_load()
        stored = data.get("animations") if isinstance(data, dict) else None
        animations: dict[str, dict] = {}
        if isinstance(stored, dict):
            for key, doc in stored.items():
                if validate_animation(doc) or doc.get("id") != key:
                    _LOGGER.warning("Dropping invalid stored animation %r", key)
                    continue
                if len(animations) >= MAX_ANIMATIONS:
                    break
                animations[key] = doc
        self.animations = animations

    async def async_save(self, doc: dict) -> None:
        self.animations[doc["id"]] = doc
        await self.store.async_save({"animations": self.animations})
        async_dispatcher_send(
            self.hass, SIGNAL_ANIMATIONS_UPDATED, {"action": "saved", "animation": doc}
        )

    async def async_delete(self, anim_id: str) -> bool:
        if self.animations.pop(anim_id, None) is None:
            return False
        await self.store.async_save({"animations": self.animations})
        async_dispatcher_send(
            self.hass, SIGNAL_ANIMATIONS_UPDATED, {"action": "deleted", "id": anim_id}
        )
        return True


def _doc_size(doc: Any) -> int | None:
    """UTF-8 size of the compact JSON of ``doc``, or None when it cannot be serialised."""
    try:
        text = json.dumps(doc, separators=(",", ":"), ensure_ascii=False, allow_nan=False)
    except (TypeError, ValueError, RecursionError):
        return None
    return len(text.encode("utf-8"))


def validate_animation(doc: Any) -> list[dict[str, str]]:
    """Structural checks; returns a list of ``{path, message}`` errors (empty when valid)."""
    if not isinstance(doc, dict):
        return [{"path": "", "message": "The animation must be an object"}]

    errors: list[dict[str, str]] = []
    size = _doc_size(doc)
    if size is None:
        return [{"path": "", "message": "The animation is not valid JSON"}]
    if size > MAX_DOC_BYTES:
        return [
            {
                "path": "",
                "message": f"The animation is too large ({size} bytes, at most {MAX_DOC_BYTES})",
            }
        ]

    anim_id = doc.get("id")
    if not isinstance(anim_id, str) or not ANIMATION_ID_RE.match(anim_id):
        errors.append(
            {
                "path": "id",
                "message": "Use 1-64 lowercase letters, digits, '_' or '-', starting with a letter or digit",
            }
        )

    name = doc.get("name")
    if not isinstance(name, str) or not name.strip():
        errors.append({"path": "name", "message": "A name is required"})
    elif len(name) > MAX_NAME_LENGTH:
        errors.append(
            {"path": "name", "message": f"At most {MAX_NAME_LENGTH} characters"}
        )

    if doc.get("kind") not in ANIMATION_KINDS:
        errors.append(
            {"path": "kind", "message": "Must be one of " + ", ".join(ANIMATION_KINDS)}
        )

    version = doc.get("version")
    if not isinstance(version, int) or isinstance(version, bool) or version < 1:
        errors.append({"path": "version", "message": "Must be a positive whole number"})

    return errors


def _get_library(hass: HomeAssistant) -> AnimationLibrary | None:
    return hass.data.get(DATA_ANIMATIONS)


def _send_invalid(
    connection: websocket_api.ActiveConnection,
    msg_id: int,
    message: str,
    errors: list[dict[str, str]] | None = None,
) -> None:
    """Send an ``invalid_format`` error, with field errors when there are any."""
    payload = websocket_api.error_message(msg_id, ERR_INVALID_FORMAT, message)
    if errors:
        payload["error"]["errors"] = errors
    connection.send_message(payload)


async def async_setup_animations(hass: HomeAssistant) -> None:
    """Load the library (once per Home Assistant run) and register the commands."""
    if DATA_ANIMATIONS not in hass.data:
        library = AnimationLibrary(hass)
        await library.async_load()
        hass.data[DATA_ANIMATIONS] = library

    websocket_api.async_register_command(hass, ws_get_animations)
    websocket_api.async_register_command(hass, ws_subscribe_animations)
    websocket_api.async_register_command(hass, ws_save_animation)
    websocket_api.async_register_command(hass, ws_delete_animation)


# Read commands are intentionally not admin only: cards need them for non-admin viewers.
@websocket_api.websocket_command({vol.Required("type"): "magic_card_utils/get_animations"})
@callback
def ws_get_animations(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Return the whole library, keyed by id. Any authenticated user."""
    library = _get_library(hass)
    if library is None:
        connection.send_error(msg["id"], ERR_NOT_LOADED, "The animation library is not loaded")
        return
    connection.send_result(msg["id"], {"animations": dict(library.animations)})


@websocket_api.websocket_command(
    {vol.Required("type"): "magic_card_utils/subscribe_animations"}
)
@callback
def ws_subscribe_animations(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Subscribe to library changes ('saved', 'deleted', 'reset'). Any authenticated user.

    No initial state is sent: clients fetch it with ``get_animations``.
    """
    if _get_library(hass) is None:
        connection.send_error(msg["id"], ERR_NOT_LOADED, "The animation library is not loaded")
        return
    sub_id = msg["id"]

    @callback
    def forward(change: dict) -> None:
        connection.send_message(websocket_api.event_message(sub_id, change))

    connection.subscriptions[sub_id] = async_dispatcher_connect(
        hass, SIGNAL_ANIMATIONS_UPDATED, forward
    )
    connection.send_result(sub_id)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "magic_card_utils/save_animation",
        vol.Required("animation"): dict,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_save_animation(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Create or replace an animation by id. Admin only."""
    library = _get_library(hass)
    if library is None:
        connection.send_error(msg["id"], ERR_NOT_LOADED, "The animation library is not loaded")
        return

    doc = msg["animation"]
    errors = validate_animation(doc)
    if errors:
        _send_invalid(connection, msg["id"], "The animation is not valid", errors)
        return

    if doc["id"] not in library.animations and len(library.animations) >= MAX_ANIMATIONS:
        _send_invalid(
            connection,
            msg["id"],
            f"The animation library is full (at most {MAX_ANIMATIONS} animations)",
        )
        return

    try:
        await library.async_save(doc)
    except Exception:  # noqa: BLE001 - log details, answer generically
        _LOGGER.exception("Saving animation %r failed", doc["id"])
        connection.send_error(msg["id"], ERR_SAVE_FAILED, "The animation could not be saved")
        return
    connection.send_result(msg["id"], {"animation": doc})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "magic_card_utils/delete_animation",
        # "id" is the WebSocket message id, so the animation id has its own key.
        vol.Required("animation_id"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_delete_animation(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Delete an animation by id; deleting an unknown id succeeds. Admin only."""
    library = _get_library(hass)
    if library is None:
        connection.send_error(msg["id"], ERR_NOT_LOADED, "The animation library is not loaded")
        return

    anim_id = msg["animation_id"]
    if not ANIMATION_ID_RE.match(anim_id):
        _send_invalid(
            connection, msg["id"], "Invalid animation id",
            [{"path": "animation_id", "message": "Invalid id"}],
        )
        return

    try:
        await library.async_delete(anim_id)
    except Exception:  # noqa: BLE001 - log details, answer generically
        _LOGGER.exception("Deleting animation %r failed", anim_id)
        connection.send_error(msg["id"], ERR_SAVE_FAILED, "The animation could not be deleted")
        return
    connection.send_result(msg["id"], {})
