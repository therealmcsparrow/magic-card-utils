"""Contract: mcu-library 1.0.0 (Architect-owned). Saved icons and shapes for Magic Card.

TypeScript mirror (same version, field names and rules): magic-card
src/contracts/mcu-library.ts. Decision records: magic-card docs/adr/0018 and 0020.
Revision 2 (2026-10-18, before any implementation): spike S1 passed, provider rules added below;
the command and storage part is unchanged.

Implementation (to build): library.py (Store, validation, commands) and
www/magic_card_utils_library.js (frontend provider), registered in __init__.py with
homeassistant.components.frontend.add_extra_js_url(hass, PROVIDER_URL) so it loads on every page.
The panel gets a "Library" tab later (list, rename, delete); not part of 1.0.0.

Storage: Store(hass, STORAGE_VERSION, STORAGE_KEY_ICONS) -> {"icons": {id: SavedIcon}} and
Store(hass, STORAGE_VERSION, STORAGE_KEY_SHAPES) -> {"shapes": {id: SavedShape}}. Entries that fail
validation on load are dropped with a warning (as animations.py does).

Commands (``type``: request -> result). Reads: any authenticated user (cards render for non-admin
users), registered with @callback or @async_response, never @require_admin. Writes:
@require_admin + @async_response.
- CMD_ICONS_LIST    {} -> {icons: [IconSummary]}
- CMD_ICONS_GET     {ids: [str] (1..100)} -> {icons: [SavedIcon]}  (unknown ids left out)
- CMD_ICONS_SAVE    {icon: SavedIconInput, base_updated_at?: str} -> {icon: SavedIcon}
- CMD_ICONS_DELETE  {icon_id: str} -> {}  (unknown id: success)
- CMD_SHAPES_LIST   {} -> {shapes: [SavedShape]}
- CMD_SHAPES_SAVE   {shape: SavedShapeInput, base_updated_at?: str} -> {shape: SavedShape}
- CMD_SHAPES_DELETE {shape_id: str} -> {}
- CMD_SUBSCRIBE     {} -> events {action: "saved", kind: "icons", icon: IconSummary}
                              | {action: "saved", kind: "shapes", shape: SavedShape}
                              | {action: "deleted", kind, id}
  (dispatcher signal SIGNAL_LIBRARY_UPDATED; no initial state.)

Save: validate -> id new and count at cap -> library_full -> base_updated_at given and != stored
updated_at -> conflict -> created_at kept (new: now), updated_at = now (UTC ISO 8601) -> Store save
-> signal -> result. Exceptions: log, answer save_failed.

Validation (defence in depth; Magic Card sanitises every SVG again before use):
- id: LIBRARY_ID_RE. name: str, 1..MAX_NAME_LENGTH after strip. keywords: optional list of at
  most MAX_KEYWORDS str of 1..32 chars.
- icon.svg: str, <= ICON_MAX_BYTES UTF-8, stripped text starts with "<svg"; every element name
  (regex <\\s*([A-Za-z][\\w:.-]*)) in SVG_ELEMENTS (case-insensitive); no attribute matching
  ATTR_DENY_RE; none of TEXT_DENY (case-insensitive); every url( is url(#...).
- icon.path / icon.secondary_path: str matching PATH_RE, <= ICON_MAX_BYTES. view_box: four finite
  numbers, width and height > 0. An empty path is valid (a lines-only icon; the editor warns).
- shape.shape: dict, compact JSON <= SHAPE_MAX_BYTES, keys subset of SHAPE_KEYS, points (if any) a
  list of at most MAX_SHAPE_POINTS dicts. Free paths carry the editor's computed padding; the
  server does not check it.
Error codes below; field errors as error["errors"] = [{path, message}] (as animations.py).

Frontend provider (www/magic_card_utils_library.js, rules from spike S1 on HA core 2026.10.2):
- ESM, whole body in try/catch, no DOM writes, no innerHTML, <= PROVIDER_MAX_BYTES unminified.
- At load, synchronously: window.customIcons = window.customIcons || {}; then add
  customIcons[ICON_PREFIX] = {getIcon, getIconList}. Never replace window.customIcons. Set
  window.magicCardUtils at once too ({apiVersion, ready, shapes: {get, ids}}).
- window.hassConnection (Promise of {auth, conn}) may not exist when the script runs: check at once,
  poll every CONNECTION_POLL_MS with one timer, give up after CONNECTION_WAIT_MS. Never touch
  window.hassConnectionReady.
- getIcon(name): saved icon -> {path, secondaryPath?, viewBox, mc_svg}; unknown name or any error
  -> BLANK_ICON ({path: "", viewBox: "0 0 24 24"}), never rejects. getIconList(): live list each
  call (HA caches it per page load: a new icon shows in HA's picker after a reload).
- HA draws only path / secondaryPath (single-colour silhouette); Magic Card draws mc_svg.
- Events on window after first load and every change: "iconset-registered" and
  "mcu-library-changed" {kind, ids}.
- Safe mode skips the script; companion apps and ingress are not verified.
"""

from __future__ import annotations

import re
from typing import Literal, NotRequired, TypedDict

MCU_LIBRARY_CONTRACT_VERSION = "1.0.0"
MCU_LIBRARY_CONTRACT_REVISION = 2
PROVIDER_API_VERSION = 1

STORAGE_VERSION = 1
STORAGE_KEY_ICONS = "magic_card_utils.icons"
STORAGE_KEY_SHAPES = "magic_card_utils.shapes"
SIGNAL_LIBRARY_UPDATED = "magic_card_utils_library_updated"

PROVIDER_URL = "/magic_card_utils_static/magic_card_utils_library.js"
PROVIDER_MAX_BYTES = 6 * 1024
CONNECTION_POLL_MS = 50
CONNECTION_WAIT_MS = 30_000
ICON_PREFIX = "mcu"

CMD_ICONS_LIST = "magic_card_utils/icons_list"
CMD_ICONS_GET = "magic_card_utils/icons_get"
CMD_ICONS_SAVE = "magic_card_utils/icons_save"
CMD_ICONS_DELETE = "magic_card_utils/icons_delete"
CMD_SHAPES_LIST = "magic_card_utils/shapes_list"
CMD_SHAPES_SAVE = "magic_card_utils/shapes_save"
CMD_SHAPES_DELETE = "magic_card_utils/shapes_delete"
CMD_SUBSCRIBE = "magic_card_utils/subscribe_library"

LIBRARY_ID_RE = re.compile(r"^[a-z0-9][a-z0-9_-]{0,63}$")
MAX_NAME_LENGTH = 80
MAX_KEYWORDS = 10
MAX_GET_IDS = 100
ICON_MAX_BYTES = 32 * 1024
SHAPE_MAX_BYTES = 8 * 1024
MAX_ICONS = 500
MAX_SHAPES = 200
MAX_SHAPE_POINTS = 64

SVG_ELEMENTS = frozenset(
    {
        "svg", "g", "path", "circle", "ellipse", "rect", "line", "polyline", "polygon",
        "defs", "lineargradient", "radialgradient", "stop", "clippath", "mask", "title",
    }
)
ATTR_DENY_RE = re.compile(r"\s(on[a-z]+|style|href|xlink:href)\s*=", re.IGNORECASE)
TEXT_DENY = ("javascript:", "<!entity", "<!doctype", "<?", "<![cdata[")
PATH_RE = re.compile(r"^[MmZzLlHhVvCcSsQqTtAa0-9eE.,+\- \n]*$")
SHAPE_KEYS = frozenset({"corner", "corner_type", "corners", "smoothing", "points", "padding"})

ERR_INVALID_FORMAT = "invalid_format"
ERR_NOT_FOUND = "not_found"
ERR_CONFLICT = "conflict"
ERR_LIBRARY_FULL = "library_full"
ERR_NOT_LOADED = "not_loaded"
ERR_SAVE_FAILED = "save_failed"

Kind = Literal["icons", "shapes"]


class IconSummary(TypedDict):
    id: str
    name: str
    keywords: NotRequired[list[str]]
    updated_at: str


class SavedIcon(TypedDict):
    id: str
    name: str
    keywords: NotRequired[list[str]]
    svg: str
    path: str
    secondary_path: NotRequired[str]
    view_box: str
    created_at: str
    updated_at: str


class SavedShape(TypedDict):
    id: str
    name: str
    shape: dict
    created_at: str
    updated_at: str
