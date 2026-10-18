"""Contract: mcu-library 1.0.0 (Architect-owned). Saved icons, shapes and theme presets for Magic Card.

TypeScript mirror (same version, field names and rules): magic-card
src/contracts/mcu-library.ts. Decision records: magic-card docs/adr/0018, 0020, 0022 and 0027.
Revision 2 (2026-10-18, before any implementation): spike S1 passed, provider rules added below;
the command and storage part is unchanged.
Revision 3 (2026-10-18, epic C, nothing released yet, ADR 0020): theme presets store and
commands; optional author / description on icons, shapes and theme presets; the panel's theme
backend adapter gains `presets`. Animations stay in animations.py (no migration, no new command).
Revision 4 (2026-10-18, epic E1, CEO 2026-10-18: entry points in the Library view AND an "Editors"
tab; nothing released yet, ADR 0020 / 0027): the panel gets "Library" and "Editors" tabs that host
Magic Card's SVG editor and shape editor without a card (section "Editors in the panel"). No new
command, no storage change, no Python change. The theme presets adapter shape is settled: the panel
side changes (section "Theme editor backend adapter").

Implementation: library.py (Store, validation, commands) and
www/magic_card_utils_library.js (frontend provider), registered in __init__.py with
homeassistant.components.frontend.add_extra_js_url(hass, PROVIDER_URL) so it loads on every page.
The panel gets a "Library" tab later (list, rename, delete); not part of 1.0.0 (the card editor's
library view covers icons, shapes and animations; the theme editor covers theme presets).
(r4) Superseded: the "Library" tab is in scope now, see "Editors in the panel".

Storage: Store(hass, STORAGE_VERSION, STORAGE_KEY_ICONS) -> {"icons": {id: SavedIcon}},
Store(hass, STORAGE_VERSION, STORAGE_KEY_SHAPES) -> {"shapes": {id: SavedShape}} and (r3)
Store(hass, STORAGE_VERSION, STORAGE_KEY_THEME_PRESETS) -> {"theme_presets": {id: SavedThemePreset}}.
Entries that fail validation on load are dropped with a warning (as animations.py does). The new
store needs no migration (it starts empty); the icons and shapes stores keep STORAGE_VERSION 1
(author / description are optional, old entries stay valid).

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
- (r3) CMD_THEME_PRESETS_LIST   {} -> {theme_presets: [SavedThemePreset]}  (full items)
- (r3) CMD_THEME_PRESETS_SAVE   {theme_preset: SavedThemePresetInput, base_updated_at?: str}
                                 -> {theme_preset: SavedThemePreset}
- (r3) CMD_THEME_PRESETS_DELETE {theme_preset_id: str} -> {}  (unknown id: success)
- CMD_SUBSCRIBE     {} -> events {action: "saved", kind: "icons", icon: IconSummary}
                              | {action: "saved", kind: "shapes", shape: SavedShape}
                              | {action: "saved", kind: "theme_presets", theme_preset: SavedThemePreset}
                              | {action: "deleted", kind, id}
  (dispatcher signal SIGNAL_LIBRARY_UPDATED; no initial state.)

Save: validate -> id new and count at cap -> library_full -> base_updated_at given and != stored
updated_at -> conflict -> created_at kept (new: now), updated_at = now (UTC ISO 8601) -> Store save
-> signal -> result. Exceptions: log, answer save_failed.

Validation (defence in depth; Magic Card sanitises every SVG again before use):
- id: LIBRARY_ID_RE. name: str, 1..MAX_NAME_LENGTH after strip. keywords: optional list of at
  most MAX_KEYWORDS str of 1..32 chars.
- (r3) author: optional str, 1..AUTHOR_MAX_CHARS after strip; description: optional str,
  1..DESCRIPTION_MAX_CHARS after strip. On icons, shapes and theme presets. Stored stripped.
- icon.svg: str, <= ICON_MAX_BYTES UTF-8, stripped text starts with "<svg"; every element name
  (regex <\\s*([A-Za-z][\\w:.-]*)) in SVG_ELEMENTS (case-insensitive); no attribute matching
  ATTR_DENY_RE; none of TEXT_DENY (case-insensitive); every url( is url(#...). (r4) Nested <g>
  (up to 4 levels from the SVG editor) passes unchanged; depth is not checked.
- icon.path / icon.secondary_path: str matching PATH_RE, <= ICON_MAX_BYTES. view_box: four finite
  numbers, width and height > 0. An empty path is valid (a lines-only icon, or an imported icon
  not yet opened in the SVG editor; the editor warns).
- shape.shape: dict, compact JSON <= SHAPE_MAX_BYTES, keys subset of SHAPE_KEYS, points (if any) a
  list of at most MAX_SHAPE_POINTS dicts. Free paths carry the editor's computed padding; the
  server does not check it.
- (r3) theme_preset.doc: dict, compact JSON (json.dumps separators (",", ":"), ensure_ascii=False,
  allow_nan=False) <= THEME_PRESET_MAX_BYTES UTF-8; every key matches THEME_VAR_RE or is "modes";
  "modes" (optional) is a dict with keys only "light" / "dark", each a dict with THEME_VAR_RE keys;
  every value is a str of at most THEME_VALUE_MAX_CHARS or an int / float that is finite and not a
  bool. Values with external URLs and card-mod-* keys are ACCEPTED as they are (CEO 2026-10-18:
  the importing editor keeps them and shows a warning that lists them; the server never strips,
  rewrites or fetches). No contrast or required-variable checks (a preset is a starting point).
Error codes below; field errors as error["errors"] = [{path, message}] (as animations.py).

Theme editor backend adapter (r3, www/magic_card_utils_panel.js, magic-card theme-editor 1.1.0):
the Themes tab sets backend.presets = {list, save, remove} on top of the three theme_presets
commands (list -> theme_presets; save(input, base_updated_at?) -> theme_preset; remove(id)), and
rejects with an Error carrying `code` (and `errors`) as the other adapter methods do. The panel
sets `presets` only when this integration registers the commands (always, from this version on).
(r4) Shape of record = magic-card ThemePresetStore: list() resolves the LIST itself
(res.theme_presets, [] when absent), save() resolves the ITEM itself (res.theme_preset), remove()
resolves nothing. _createPresetBackend changes from {theme_presets: [...]} / {theme_preset: {...}}
to that. Magic Card keeps reading both shapes, so the change is safe in any update order. The same
adapter object is passed to the Library tab's <mc-library-view> as `presets`.

Editors in the panel (r4, www/magic_card_utils_panel.js; magic-card svg-editor 1.0.0 r5 "Hosts",
preset-transfer 1.0.0 r2 context 'mcu-panel'):
- Tabs PANEL_TABS: Templates, Animations, Themes, Library, Shapes, Editors.
- Loading: _ensureMagicCard() as the other tabs do, then window.MagicCard.loadEditor(), then
  window.MagicCard.loadSvgEditor() / loadShapeEditor() on first use, and loadTransfer() for the
  Library tab. No new file in Magic Card; nothing from another host; no card element.
- Version gate, one rule and one message: window.MagicCard.version (a card that exposes none is too old)
  is compared with MIN_MAGIC_CARD_FOR_EDITORS (a panel JS constant, YYYY.M.N with an optional -pre.release).
  The three numbers decide first; with equal numbers a release is newer than its pre-releases and two
  pre-releases compare field by field (numbers numerically), so 2026.10.11-beta.1 and 2026.10.11 both
  satisfy a minimum of 2026.10.11-beta.1. Too old -> "Drawing icons and shapes here needs Magic Card
  <MIN_MAGIC_CARD_FOR_EDITORS> or newer. Update Magic Card in HACS." Internal sanity checks fail into that
  same message without naming a cause: loadEditor or a loader missing (read from window.MagicCard again
  after loadEditor(), which adds them to it), and customElements.get(tag).contractRevision (also
  <mc-library-view>) missing or < EDITORS_MIN_CONTRACT_REVISION. Two plain messages remain: no Magic Card
  -> "Install Magic Card to draw icons and shapes here."; a genuine load failure (resource URL import
  failed, loader false or thrown, element not defined) -> "The editor files could not be loaded from
  Magic Card. Reload the page and try again." Neither talks about versions.
- Shell _openEditor({kind, id?, opener}): hides the tab bar and content, mounts <mc-svg-editor
  host="mcu"> (source blank or {kind: "library", id}, savedId) or <mc-shape-studio host="mcu"> (value
  from shapes_list for Edit, unset for New) in a host filling the content area; keeps hass current;
  focuses the element; refreshes lists on mc-svg-save / mc-shape-save; on mc-svg-close /
  mc-shape-close removes it, shows the tab and returns focus to the opener (or its data-focus-key
  replacement).
- Library tab: <mc-library-view> with context "mcu-panel", hass, presets; its "New icon", "New shape"
  and row "Edit" fire mc-library-open {kind, id?} -> _openEditor.
- Editors tab (panel markup only): "New icon", "New shape", "Recent icons" / "Recent shapes" (the
  RECENT_ITEMS newest by updated_at, each with "Edit"), "See all in Library"; "Nothing saved yet."
  when empty.
- Accessibility: tablist pattern as today, real buttons >= 24 x 24 CSS px, focus return, 200 % zoom.

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
  "mcu-library-changed" {kind, ids} for icons and shapes. (r3) theme_presets events are ignored
  by the provider (cards never use theme presets).
- Safe mode skips the script; companion apps and ingress are not verified.
"""

from __future__ import annotations

import re
from typing import Literal, NotRequired, TypedDict

MCU_LIBRARY_CONTRACT_VERSION = "1.0.0"
MCU_LIBRARY_CONTRACT_REVISION = 4
PROVIDER_API_VERSION = 1

STORAGE_VERSION = 1
STORAGE_KEY_ICONS = "magic_card_utils.icons"
STORAGE_KEY_SHAPES = "magic_card_utils.shapes"
STORAGE_KEY_THEME_PRESETS = "magic_card_utils.theme_presets"
SIGNAL_LIBRARY_UPDATED = "magic_card_utils_library_updated"

PROVIDER_URL = "/magic_card_utils_static/magic_card_utils_library.js"
PROVIDER_MAX_BYTES = 6 * 1024
CONNECTION_POLL_MS = 50
CONNECTION_WAIT_MS = 30_000
ICON_PREFIX = "mcu"

# (r4) Panel side, mirrored as constants in www/magic_card_utils_panel.js (the panel is plain JS).
PANEL_TABS = ("templates", "animations", "themes", "library", "shapes", "editors")
RECENT_ITEMS = 8
# magic-card svg-editor SVG_EDITOR_MCU_MIN_REVISION: the element revision that has host "mcu".
EDITORS_MIN_CONTRACT_REVISION = 5

CMD_ICONS_LIST = "magic_card_utils/icons_list"
CMD_ICONS_GET = "magic_card_utils/icons_get"
CMD_ICONS_SAVE = "magic_card_utils/icons_save"
CMD_ICONS_DELETE = "magic_card_utils/icons_delete"
CMD_SHAPES_LIST = "magic_card_utils/shapes_list"
CMD_SHAPES_SAVE = "magic_card_utils/shapes_save"
CMD_SHAPES_DELETE = "magic_card_utils/shapes_delete"
CMD_THEME_PRESETS_LIST = "magic_card_utils/theme_presets_list"
CMD_THEME_PRESETS_SAVE = "magic_card_utils/theme_presets_save"
CMD_THEME_PRESETS_DELETE = "magic_card_utils/theme_presets_delete"
CMD_SUBSCRIBE = "magic_card_utils/subscribe_library"

LIBRARY_ID_RE = re.compile(r"^[a-z0-9][a-z0-9_-]{0,63}\Z")
MAX_NAME_LENGTH = 80
MAX_KEYWORDS = 10
MAX_GET_IDS = 100
AUTHOR_MAX_CHARS = 80
DESCRIPTION_MAX_CHARS = 280
ICON_MAX_BYTES = 32 * 1024
SHAPE_MAX_BYTES = 8 * 1024
MAX_ICONS = 500
MAX_SHAPES = 200
MAX_SHAPE_POINTS = 64
MAX_THEME_PRESETS = 100
THEME_PRESET_MAX_BYTES = 32 * 1024
THEME_VALUE_MAX_CHARS = 1024
# Same pattern as magic-card src/contracts/theme-catalogue.ts THEME_VAR_RE. \Z, not $: "$" also matches before a trailing newline.
THEME_VAR_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9_-]{0,99}\Z")
THEME_MODES = frozenset({"light", "dark"})

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

Kind = Literal["icons", "shapes", "theme_presets"]


class IconSummary(TypedDict):
    id: str
    name: str
    keywords: NotRequired[list[str]]
    updated_at: str


class SavedIcon(TypedDict):
    id: str
    name: str
    author: NotRequired[str]
    description: NotRequired[str]
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
    author: NotRequired[str]
    description: NotRequired[str]
    shape: dict
    created_at: str
    updated_at: str


class SavedThemePreset(TypedDict):
    id: str
    name: str
    author: NotRequired[str]
    description: NotRequired[str]
    doc: dict
    created_at: str
    updated_at: str
