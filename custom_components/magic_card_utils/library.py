"""Saved icons, shapes and theme presets for Magic Card: storage, validation and WebSocket API.

Implements mcu-library 1.0.0 (revision 3), see library_contract.py. The frontend
provider (T6) is not part of this module. Magic Card sanitises every SVG again before
use; the checks here are defence in depth and size/shape limits.
"""

from __future__ import annotations

from datetime import datetime, timezone
import json
import logging
import math
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
from .library_contract import (
    ATTR_DENY_RE,
    CMD_ICONS_DELETE,
    CMD_ICONS_GET,
    CMD_ICONS_LIST,
    CMD_ICONS_SAVE,
    CMD_SHAPES_DELETE,
    CMD_SHAPES_LIST,
    CMD_SHAPES_SAVE,
    CMD_SUBSCRIBE,
    CMD_THEME_PRESETS_DELETE,
    CMD_THEME_PRESETS_LIST,
    CMD_THEME_PRESETS_SAVE,
    AUTHOR_MAX_CHARS,
    DESCRIPTION_MAX_CHARS,
    ERR_CONFLICT,
    ERR_INVALID_FORMAT,
    ERR_LIBRARY_FULL,
    ERR_NOT_LOADED,
    ERR_SAVE_FAILED,
    ICON_MAX_BYTES,
    LIBRARY_ID_RE,
    MAX_GET_IDS,
    MAX_ICONS,
    MAX_KEYWORDS,
    MAX_NAME_LENGTH,
    MAX_SHAPE_POINTS,
    MAX_SHAPES,
    MAX_THEME_PRESETS,
    PATH_RE,
    SHAPE_KEYS,
    SHAPE_MAX_BYTES,
    SIGNAL_LIBRARY_UPDATED,
    STORAGE_KEY_ICONS,
    STORAGE_KEY_SHAPES,
    STORAGE_KEY_THEME_PRESETS,
    STORAGE_VERSION,
    SVG_ELEMENTS,
    TEXT_DENY,
    THEME_MODES,
    THEME_PRESET_MAX_BYTES,
    THEME_VALUE_MAX_CHARS,
    THEME_VAR_RE,
    IconSummary,
    Kind,
)

_LOGGER = logging.getLogger(__name__)

DATA_LIBRARY = f"{DOMAIN}_library"

KEYWORD_MAX_LENGTH = 32
ICON_INPUT_KEYS = frozenset(
    {
        "id", "name", "author", "description", "keywords", "svg", "path", "secondary_path",
        "view_box",
    }
)
SHAPE_INPUT_KEYS = frozenset({"id", "name", "author", "description", "shape"})
PRESET_INPUT_KEYS = frozenset({"id", "name", "author", "description", "doc"})
# A client may echo a SavedIcon back; the server owns these two, so they are ignored.
SERVER_KEYS = frozenset({"created_at", "updated_at"})

_ELEMENT_RE = re.compile(r"<\s*([A-Za-z][\w:.-]*)")
# ATTR_DENY_RE needs whitespace before the name; browsers also split attributes on "/"
# and quotes, so this wider form closes the `<svg/onload=...>` gap.
_ATTR_DENY_WIDE_RE = re.compile(
    r"[\s/\"'](on[a-z]+|style|href|xlink:href)\s*=", re.IGNORECASE
)
_URL_RE = re.compile(r"url\(", re.IGNORECASE)
_LOCAL_URL_RE = re.compile(r"url\(#", re.IGNORECASE)

Errors = list[dict[str, str]]


def _err(path: str, message: str) -> dict[str, str]:
    return {"path": path, "message": message}


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _json_size(value: Any) -> int | None:
    """UTF-8 size of the compact JSON of ``value``, or None when it cannot be serialised."""
    try:
        text = json.dumps(value, separators=(",", ":"), ensure_ascii=False, allow_nan=False)
    except (TypeError, ValueError, RecursionError):
        return None
    return len(text.encode("utf-8"))


# ------------------------------------------------------------------ validation


def _validate_common(item: dict, errors: Errors) -> None:
    item_id = item.get("id")
    if not isinstance(item_id, str) or not LIBRARY_ID_RE.match(item_id):
        errors.append(
            _err("id", "Use 1-64 lowercase letters, digits, '_' or '-', starting with a letter or digit")
        )
    name = item.get("name")
    if not isinstance(name, str) or not name.strip():
        errors.append(_err("name", "A name is required"))
    elif len(name.strip()) > MAX_NAME_LENGTH:
        errors.append(_err("name", f"At most {MAX_NAME_LENGTH} characters"))
    _validate_text(item, "author", AUTHOR_MAX_CHARS, errors)
    _validate_text(item, "description", DESCRIPTION_MAX_CHARS, errors)


def _validate_text(item: dict, key: str, limit: int, errors: Errors) -> None:
    """Optional free text: a str of 1..limit characters after strip."""
    if key not in item:
        return
    value = item[key]
    if not isinstance(value, str) or not value.strip():
        errors.append(_err(key, "Must be some text, or left out"))
    elif len(value.strip()) > limit:
        errors.append(_err(key, f"At most {limit} characters"))


def _validate_keywords(keywords: Any, errors: Errors) -> None:
    if not isinstance(keywords, list):
        errors.append(_err("keywords", "Must be a list of words"))
    elif len(keywords) > MAX_KEYWORDS:
        errors.append(_err("keywords", f"At most {MAX_KEYWORDS} keywords"))
    elif not all(
        isinstance(k, str) and 1 <= len(k) <= KEYWORD_MAX_LENGTH for k in keywords
    ):
        errors.append(_err("keywords", f"Each keyword is 1-{KEYWORD_MAX_LENGTH} characters"))


def _svg_error(svg: Any) -> str | None:
    if not isinstance(svg, str):
        return "Must be SVG markup"
    if len(svg.encode("utf-8")) > ICON_MAX_BYTES:
        return f"Too large (at most {ICON_MAX_BYTES} bytes)"
    if not svg.strip().lower().startswith("<svg"):
        return "Must start with <svg"
    for element in _ELEMENT_RE.findall(svg):
        if element.lower() not in SVG_ELEMENTS:
            return f"The element <{element}> is not allowed"
    if ATTR_DENY_RE.search(svg) or _ATTR_DENY_WIDE_RE.search(svg):
        return "Event, style and link attributes are not allowed"
    lowered = svg.lower()
    for text in TEXT_DENY:
        if text in lowered:
            return f"{text!r} is not allowed"
    if len(_URL_RE.findall(svg)) != len(_LOCAL_URL_RE.findall(svg)):
        return "url() may only point to an id in the same icon"
    return None


def _path_error(path: Any) -> str | None:
    if not isinstance(path, str) or not PATH_RE.match(path):
        return "Must be SVG path data"
    if len(path.encode("utf-8")) > ICON_MAX_BYTES:
        return f"Too large (at most {ICON_MAX_BYTES} bytes)"
    return None


def _view_box_error(view_box: Any) -> str | None:
    if not isinstance(view_box, str):
        return "Must be four numbers: x y width height"
    parts = view_box.replace(",", " ").split()
    if len(parts) != 4:
        return "Must be four numbers: x y width height"
    try:
        numbers = [float(p) for p in parts]
    except ValueError:
        return "Must be four numbers: x y width height"
    if not all(math.isfinite(n) for n in numbers):
        return "Must be four finite numbers"
    if numbers[2] <= 0 or numbers[3] <= 0:
        return "Width and height must be above 0"
    return None


def validate_icon(icon: Any) -> Errors:
    """Check a SavedIconInput; returns ``{path, message}`` errors (empty when valid)."""
    if not isinstance(icon, dict):
        return [_err("", "The icon must be an object")]
    errors: Errors = []
    _validate_common(icon, errors)
    if "keywords" in icon:
        _validate_keywords(icon["keywords"], errors)
    for key in icon:
        if key not in ICON_INPUT_KEYS and key not in SERVER_KEYS:
            errors.append(_err(str(key), "Unknown field"))
    message = _svg_error(icon.get("svg"))
    if message:
        errors.append(_err("svg", message))
    message = _path_error(icon.get("path"))
    if message:
        errors.append(_err("path", message))
    if "secondary_path" in icon:
        message = _path_error(icon["secondary_path"])
        if message:
            errors.append(_err("secondary_path", message))
    message = _view_box_error(icon.get("view_box"))
    if message:
        errors.append(_err("view_box", message))
    return errors


def validate_shape(item: Any) -> Errors:
    """Check a SavedShapeInput; returns ``{path, message}`` errors (empty when valid)."""
    if not isinstance(item, dict):
        return [_err("", "The shape must be an object")]
    errors: Errors = []
    _validate_common(item, errors)
    for key in item:
        if key not in SHAPE_INPUT_KEYS and key not in SERVER_KEYS:
            errors.append(_err(str(key), "Unknown field"))

    shape = item.get("shape")
    if not isinstance(shape, dict):
        errors.append(_err("shape", "Must be an object"))
        return errors
    size = _json_size(shape)
    if size is None:
        errors.append(_err("shape", "Is not valid JSON"))
        return errors
    if size > SHAPE_MAX_BYTES:
        errors.append(_err("shape", f"Too large ({size} bytes, at most {SHAPE_MAX_BYTES})"))
    unknown = sorted(str(k) for k in shape if k not in SHAPE_KEYS)
    if unknown:
        errors.append(_err("shape", "Unknown option: " + ", ".join(unknown)))
    if "points" in shape:
        points = shape["points"]
        if not isinstance(points, list) or not all(isinstance(p, dict) for p in points):
            errors.append(_err("shape.points", "Must be a list of points"))
        elif len(points) > MAX_SHAPE_POINTS:
            errors.append(_err("shape.points", f"At most {MAX_SHAPE_POINTS} points"))
    return errors


def _theme_value_ok(value: Any) -> bool:
    if isinstance(value, bool):
        return False
    if isinstance(value, str):
        return len(value) <= THEME_VALUE_MAX_CHARS
    if isinstance(value, (int, float)):
        return math.isfinite(value)
    return False


def _theme_vars_error(variables: Any, allow_modes: bool) -> str | None:
    if not isinstance(variables, dict):
        return "Must be an object"
    for key, value in variables.items():
        if allow_modes and key == "modes":
            continue
        if not isinstance(key, str) or not THEME_VAR_RE.match(key):
            return f"{str(key)[:40]!r} is not a valid variable name"
        if not _theme_value_ok(value):
            return (
                f"The value of {key} must be text (at most {THEME_VALUE_MAX_CHARS} "
                "characters) or a number"
            )
    return None


def _theme_doc_error(doc: Any) -> str | None:
    """Rules of revision 3. External urls and card-mod-* keys are accepted on purpose."""
    message = _theme_vars_error(doc, True)
    if message:
        return message
    if "modes" in doc:
        modes = doc["modes"]
        if not isinstance(modes, dict):
            return "modes must be an object"
        for mode, variables in modes.items():
            if mode not in THEME_MODES:
                return "modes may only contain light and dark"
            message = _theme_vars_error(variables, False)
            if message:
                return f"modes.{mode}: {message}"
    size = _json_size(doc)
    if size is None:
        return "Is not valid JSON"
    if size > THEME_PRESET_MAX_BYTES:
        return f"Too large ({size} bytes, at most {THEME_PRESET_MAX_BYTES})"
    return None


def validate_theme_preset(item: Any) -> Errors:
    """Check a SavedThemePresetInput; returns ``{path, message}`` errors (empty when valid)."""
    if not isinstance(item, dict):
        return [_err("", "The theme preset must be an object")]
    errors: Errors = []
    _validate_common(item, errors)
    for key in item:
        if key not in PRESET_INPUT_KEYS and key not in SERVER_KEYS:
            errors.append(_err(str(key), "Unknown field"))
    message = _theme_doc_error(item.get("doc"))
    if message:
        errors.append(_err("doc", message))
    return errors


# --------------------------------------------------------------------- storage


def _icon_summary(icon: dict) -> IconSummary:
    summary: IconSummary = {"id": icon["id"], "name": icon["name"], "updated_at": icon["updated_at"]}
    if "keywords" in icon:
        summary["keywords"] = list(icon["keywords"])
    return summary


def _stored_ok(doc: Any, key: str, errors: Errors) -> bool:
    return (
        not errors
        and doc.get("id") == key
        and isinstance(doc.get("created_at"), str)
        and isinstance(doc.get("updated_at"), str)
    )


class Library:
    """In-memory icon, shape and theme preset library backed by three Home Assistant Stores."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self.icon_store: Store = Store(hass, STORAGE_VERSION, STORAGE_KEY_ICONS)
        self.shape_store: Store = Store(hass, STORAGE_VERSION, STORAGE_KEY_SHAPES)
        self.theme_preset_store: Store = Store(hass, STORAGE_VERSION, STORAGE_KEY_THEME_PRESETS)
        self.icons: dict[str, dict] = {}
        self.shapes: dict[str, dict] = {}
        self.theme_presets: dict[str, dict] = {}

    async def async_load(self) -> None:
        """Load both stores; entries that no longer pass validation are dropped."""
        self.icons = self._clean(
            await self.icon_store.async_load(), "icons", "icon", validate_icon, MAX_ICONS
        )
        self.shapes = self._clean(
            await self.shape_store.async_load(), "shapes", "shape", validate_shape, MAX_SHAPES
        )
        self.theme_presets = self._clean(
            await self.theme_preset_store.async_load(),
            "theme_presets",
            "theme preset",
            validate_theme_preset,
            MAX_THEME_PRESETS,
        )

    @staticmethod
    def _clean(data: Any, root: str, label: str, validate, cap: int) -> dict[str, dict]:
        stored = data.get(root) if isinstance(data, dict) else None
        result: dict[str, dict] = {}
        if not isinstance(stored, dict):
            return result
        for key, doc in stored.items():
            if not isinstance(doc, dict) or not _stored_ok(doc, key, validate(doc)):
                _LOGGER.warning("Dropping invalid stored %s %r", label, key)
                continue
            if len(result) >= cap:
                _LOGGER.warning("Dropping stored %s %r: library is full", label, key)
                continue
            result[key] = doc
        return result

    def _table(self, kind: Kind) -> tuple[dict[str, dict], Store, int]:
        if kind == "icons":
            return self.icons, self.icon_store, MAX_ICONS
        if kind == "shapes":
            return self.shapes, self.shape_store, MAX_SHAPES
        return self.theme_presets, self.theme_preset_store, MAX_THEME_PRESETS

    def check_save(self, kind: Kind, item_id: str, base_updated_at: str | None) -> str | None:
        """Return an error code when the save must be refused, else None."""
        table, _, cap = self._table(kind)
        existing = table.get(item_id)
        if existing is None and len(table) >= cap:
            return ERR_LIBRARY_FULL
        if base_updated_at is not None and (
            existing is None or existing["updated_at"] != base_updated_at
        ):
            return ERR_CONFLICT
        return None

    async def async_save(self, kind: Kind, item: dict) -> dict:
        """Store a validated input item and return the saved document.

        Memory is updated before the first await, so the conflict check done just
        before stays valid. A failed write restores the previous state.
        """
        table, store, _ = self._table(kind)
        item_id = item["id"]
        now = _now()
        previous = table.get(item_id)
        doc = self._build(kind, item, previous["created_at"] if previous else now, now)
        table[item_id] = doc
        try:
            await store.async_save({kind: table})
        except Exception:
            if previous is None:
                table.pop(item_id, None)
            else:
                table[item_id] = previous
            raise
        if kind == "icons":
            change: dict = {"action": "saved", "kind": kind, "icon": _icon_summary(doc)}
        elif kind == "shapes":
            change = {"action": "saved", "kind": kind, "shape": doc}
        else:
            change = {"action": "saved", "kind": kind, "theme_preset": doc}
        async_dispatcher_send(self.hass, SIGNAL_LIBRARY_UPDATED, change)
        return doc

    @staticmethod
    def _build(kind: Kind, item: dict, created_at: str, updated_at: str) -> dict:
        doc: dict[str, Any] = {"id": item["id"], "name": item["name"].strip()}
        for key in ("author", "description"):
            if key in item:
                doc[key] = item[key].strip()
        if kind == "icons":
            if "keywords" in item:
                doc["keywords"] = list(item["keywords"])
            doc["svg"] = item["svg"]
            doc["path"] = item["path"]
            if "secondary_path" in item:
                doc["secondary_path"] = item["secondary_path"]
            doc["view_box"] = item["view_box"]
        elif kind == "shapes":
            doc["shape"] = json.loads(json.dumps(item["shape"]))
        else:
            doc["doc"] = json.loads(json.dumps(item["doc"]))
        doc["created_at"] = created_at
        doc["updated_at"] = updated_at
        return doc

    async def async_delete(self, kind: Kind, item_id: str) -> bool:
        table, store, _ = self._table(kind)
        previous = table.pop(item_id, None)
        if previous is None:
            return False
        try:
            await store.async_save({kind: table})
        except Exception:
            table[item_id] = previous
            raise
        async_dispatcher_send(
            self.hass,
            SIGNAL_LIBRARY_UPDATED,
            {"action": "deleted", "kind": kind, "id": item_id},
        )
        return True


def _get_library(hass: HomeAssistant) -> Library | None:
    return hass.data.get(DATA_LIBRARY)


def _send_invalid(
    connection: websocket_api.ActiveConnection,
    msg_id: int,
    message: str,
    errors: Errors | None = None,
) -> None:
    """Send an ``invalid_format`` error, with field errors when there are any."""
    payload = websocket_api.error_message(msg_id, ERR_INVALID_FORMAT, message)
    if errors:
        payload["error"]["errors"] = errors
    connection.send_message(payload)


def _not_loaded(connection: websocket_api.ActiveConnection, msg_id: int) -> None:
    connection.send_error(msg_id, ERR_NOT_LOADED, "The library is not loaded")


async def async_setup_library(hass: HomeAssistant) -> None:
    """Load the library (once per Home Assistant run) and register the commands."""
    if DATA_LIBRARY not in hass.data:
        library = Library(hass)
        await library.async_load()
        hass.data[DATA_LIBRARY] = library

    for command in (
        ws_icons_list,
        ws_icons_get,
        ws_icons_save,
        ws_icons_delete,
        ws_shapes_list,
        ws_shapes_save,
        ws_shapes_delete,
        ws_theme_presets_list,
        ws_theme_presets_save,
        ws_theme_presets_delete,
        ws_subscribe_library,
    ):
        websocket_api.async_register_command(hass, command)


# Reads are intentionally not admin only: cards render for non-admin users.
@websocket_api.websocket_command({vol.Required("type"): CMD_ICONS_LIST})
@callback
def ws_icons_list(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Return a summary of every saved icon. Any authenticated user."""
    library = _get_library(hass)
    if library is None:
        _not_loaded(connection, msg["id"])
        return
    connection.send_result(
        msg["id"], {"icons": [_icon_summary(i) for i in library.icons.values()]}
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): CMD_ICONS_GET,
        vol.Required("ids"): vol.All(
            [str], vol.Length(min=1, max=MAX_GET_IDS)
        ),
    }
)
@callback
def ws_icons_get(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Return the full icons for the given ids; unknown ids are left out."""
    library = _get_library(hass)
    if library is None:
        _not_loaded(connection, msg["id"])
        return
    icons = [library.icons[i] for i in dict.fromkeys(msg["ids"]) if i in library.icons]
    connection.send_result(msg["id"], {"icons": icons})


@websocket_api.websocket_command({vol.Required("type"): CMD_SHAPES_LIST})
@callback
def ws_shapes_list(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Return every saved shape (shapes are small). Any authenticated user."""
    library = _get_library(hass)
    if library is None:
        _not_loaded(connection, msg["id"])
        return
    connection.send_result(msg["id"], {"shapes": list(library.shapes.values())})


@websocket_api.websocket_command({vol.Required("type"): CMD_THEME_PRESETS_LIST})
@callback
def ws_theme_presets_list(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Return every theme preset in full (at most 100). Any authenticated user."""
    library = _get_library(hass)
    if library is None:
        _not_loaded(connection, msg["id"])
        return
    connection.send_result(
        msg["id"], {"theme_presets": list(library.theme_presets.values())}
    )


@websocket_api.websocket_command({vol.Required("type"): CMD_SUBSCRIBE})
@callback
def ws_subscribe_library(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Subscribe to library changes. No initial state; clients list first."""
    if _get_library(hass) is None:
        _not_loaded(connection, msg["id"])
        return
    sub_id = msg["id"]

    @callback
    def forward(change: dict) -> None:
        connection.send_message(websocket_api.event_message(sub_id, change))

    connection.subscriptions[sub_id] = async_dispatcher_connect(
        hass, SIGNAL_LIBRARY_UPDATED, forward
    )
    connection.send_result(sub_id)


async def _save(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
    kind: Kind,
    key: str,
    validate,
) -> None:
    library = _get_library(hass)
    if library is None:
        _not_loaded(connection, msg["id"])
        return
    item = msg[key]
    errors = validate(item)
    if errors:
        _send_invalid(connection, msg["id"], f"The {key} is not valid", errors)
        return
    code = library.check_save(kind, item["id"], msg.get("base_updated_at"))
    if code == ERR_LIBRARY_FULL:
        limit = {"icons": MAX_ICONS, "shapes": MAX_SHAPES}.get(kind, MAX_THEME_PRESETS)
        connection.send_error(
            msg["id"], code, f"The library is full (at most {limit} {kind})"
        )
        return
    if code == ERR_CONFLICT:
        connection.send_error(
            msg["id"], code, f"The {key} was changed elsewhere; reload and try again"
        )
        return
    try:
        doc = await library.async_save(kind, item)
    except Exception:  # noqa: BLE001 - log details, answer generically
        _LOGGER.exception("Saving %s %r failed", key, item["id"])
        connection.send_error(msg["id"], ERR_SAVE_FAILED, f"The {key} could not be saved")
        return
    connection.send_result(msg["id"], {key: doc})


async def _delete(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
    kind: Kind,
    key: str,
) -> None:
    library = _get_library(hass)
    if library is None:
        _not_loaded(connection, msg["id"])
        return
    item_id = msg[key]
    if not LIBRARY_ID_RE.match(item_id):
        _send_invalid(
            connection, msg["id"], f"Invalid {key}", [_err(key, "Invalid id")]
        )
        return
    try:
        await library.async_delete(kind, item_id)
    except Exception:  # noqa: BLE001 - log details, answer generically
        _LOGGER.exception("Deleting %s %r failed", kind, item_id)
        connection.send_error(msg["id"], ERR_SAVE_FAILED, "The item could not be deleted")
        return
    connection.send_result(msg["id"], {})


@websocket_api.websocket_command(
    {
        vol.Required("type"): CMD_ICONS_SAVE,
        vol.Required("icon"): dict,
        vol.Optional("base_updated_at"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_icons_save(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Create or replace an icon by id. Admin only."""
    await _save(hass, connection, msg, "icons", "icon", validate_icon)


@websocket_api.websocket_command(
    {
        vol.Required("type"): CMD_ICONS_DELETE,
        # "id" is the WebSocket message id, so the item id has its own key.
        vol.Required("icon_id"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_icons_delete(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Delete an icon by id; deleting an unknown id succeeds. Admin only."""
    await _delete(hass, connection, msg, "icons", "icon_id")


@websocket_api.websocket_command(
    {
        vol.Required("type"): CMD_SHAPES_SAVE,
        vol.Required("shape"): dict,
        vol.Optional("base_updated_at"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_shapes_save(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Create or replace a shape by id. Admin only."""
    await _save(hass, connection, msg, "shapes", "shape", validate_shape)


@websocket_api.websocket_command(
    {
        vol.Required("type"): CMD_SHAPES_DELETE,
        vol.Required("shape_id"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_shapes_delete(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Delete a shape by id; deleting an unknown id succeeds. Admin only."""
    await _delete(hass, connection, msg, "shapes", "shape_id")


@websocket_api.websocket_command(
    {
        vol.Required("type"): CMD_THEME_PRESETS_SAVE,
        vol.Required("theme_preset"): dict,
        vol.Optional("base_updated_at"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_theme_presets_save(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Create or replace a theme preset by id. Admin only."""
    await _save(
        hass, connection, msg, "theme_presets", "theme_preset", validate_theme_preset
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): CMD_THEME_PRESETS_DELETE,
        vol.Required("theme_preset_id"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_theme_presets_delete(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Delete a theme preset by id; deleting an unknown id succeeds. Admin only."""
    await _delete(hass, connection, msg, "theme_presets", "theme_preset_id")
