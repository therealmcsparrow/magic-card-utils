"""Contract: mcu-library 1.1.0, images part. Saved full drawings ("library images") for Magic Card.

mcu-library 1.1.0 = library_contract.py (icons, shapes, theme presets, provider, panel) plus this module.
Additive: no existing command, field or store changes. MCU_LIBRARY_CONTRACT_VERSION in library_contract.py
becomes "1.1.0" in the change that implements this module. TypeScript mirror (same version, names and
rules): magic-card src/contracts/mcu-library-images.ts. Card-side use (reference format, rendering,
sanitiser lists): magic-card src/contracts/svg-image.ts.

Storage (kept apart from icons and shapes because one image can be 256 KiB and there can be 200):
- Index: Store(hass, STORAGE_VERSION, STORAGE_KEY_IMAGES) -> {"images": {id: ImageMeta}}. Loaded at
  setup (small: no bodies).
- Bodies: one JSON file per image, IMAGE_DIR/<id>.json = {"svg": str, "bindings": [...], "thumb": str?},
  under hass.config.path(IMAGE_DIR), written with json.dumps(..., ensure_ascii=False) through
  homeassistant.util.file.write_utf8_file_atomic(path, text, private=True) in the executor; read in the
  executor on demand, kept in an LRU of at most BODY_CACHE_BYTES. Write order: body first, then index;
  delete order: index first, then body.
- Start-up (names only, no body is read): files in IMAGE_DIR that do not end in ".json" (temp files left
  by a crash) are deleted; an index entry whose body file is absent is dropped with a warning; a body
  file without an index entry is left alone and logged once.
- A body that cannot be read or parsed at get time is left out of the images_get result (as an unknown
  id) with a warning; the command never raises for it.
- The folder is inside the config directory, so Home Assistant backups include it.

Commands (``type``: request -> result). Reads: any authenticated user (@callback / @async_response, never
@require_admin), because dashboards render for every user. Writes: @require_admin + @async_response.
- CMD_IMAGES_LIST   {} -> {images: [ImageSummary]}           (includes thumb)
- CMD_IMAGES_GET    {ids: [str] (1..MAX_IMAGE_GET_IDS)} -> {images: [SavedImage]}  (unknown ids left out)
- CMD_IMAGES_SAVE   {image: SavedImageInput, base_updated_at?: str} -> {image: ImageSummary}
                    (the summary, never the body echoed back)
- CMD_IMAGES_DELETE {image_id: str} -> {}                    (unknown id: success)
- The existing CMD_SUBSCRIBE gains {action: "saved", kind: "images", image: ImageEventSummary}
  and {action: "deleted", kind: "images", id}. Events never carry svg, bindings or thumb.
Ids: chosen by the editor at the first save (the slug of the name, made unique) and never changed;
rename is a save of the same id with a new name and base_updated_at.
Save order as icons: validate -> new id at MAX_IMAGES -> library_full -> base_updated_at mismatch ->
conflict (also an existing id saved without base_updated_at) -> created_at kept, updated_at now (UTC
ISO 8601) -> body write -> index save -> signal -> result.

Validation (defence in depth; the card sanitises every image again before it renders it):
- id LIBRARY_ID_RE; name 1..MAX_NAME_LENGTH after strip; keywords, author, description as icons.
- view_box: four finite numbers, width and height in 1..MAX_IMAGE_BOX.
- Size first, before any scan: UTF-8 bytes of svg + compact JSON of bindings (separators (",", ":"),
  ensure_ascii=False) <= IMAGE_MAX_BYTES. Over it: invalid_format with errors [{path: "svg", message:
  "too_large", bytes: <n>, limit: IMAGE_MAX_BYTES}] so the editor can say how big it is.
- svg: str, stripped text starts with "<svg"; at most IMAGE_MAX_NODES "<" characters; none of TEXT_DENY
  (case-insensitive) anywhere. Then one left-to-right pass of the tag scanner below (linear, no
  backtracking regex over a tag, no XML parser).
- Tag scanner. Outside a tag, text runs up to the next "<" and is not read as markup; it may hold ">".
  At "<": "</" starts a closing tag; "<!" or "<?" is refused; otherwise an opening tag. The element name
  (TAG_NAME_RE) must be in IMAGE_ELEMENTS (case-insensitive), closing tags included. Inside an opening
  tag, in a loop: whitespace is skipped; ">" or "/>" ends the tag; else an attribute name runs up to
  whitespace, "=", "/" or ">" and must match ATTR_NAME_SCAN_RE, hold no ":" and be in IMAGE_ATTRIBUTES
  (case-insensitive); then optional whitespace, "=", optional whitespace and a value quoted with " or ',
  which runs to the same quote character. A value that holds "<", an unquoted value, an attribute
  without "=", a name with any other character, or end of text inside a tag is refused. ">" inside a
  quoted value does not end the tag. A closing tag holds only the name and optional whitespace.
- Over the whole text as an extra layer: library_contract ATTR_DENY_RE and the wide attribute pattern
  library.py uses for icons; every "url(" is url(#...); every "var(" matches VAR_RE; every "&" starts
  &amp; &lt; &gt; &quot; &apos; or a numeric reference. All patterns are linear. The server refuses
  (invalid_format, path "svg", message naming the first offending element or attribute); it never
  strips. Hostile tests come first, including a quoted ">" followed by an event attribute
  (<rect x="1>" onload="x"/>), a raw "<" in a value, an unquoted value and a comment.
- bindings: optional list of at most MAX_IMAGE_BINDINGS dicts with keys only target (IMAGE_ID_RE),
  entity (ENTITY_RE), attribute (optional str 1..64), set (one of BINDING_SETS), rules (list of at most
  MAX_BINDING_RULES dicts with keys only state (str 1..255) / above (finite number) / below (finite
  number) / value), default (optional). value / default: for fill and stroke a str matching
  BINDING_COLOUR_RE; for opacity a finite number 0..100; for visible a bool. At most one binding per
  (target, set). Targets are not checked against the markup (the card ignores unknown targets).
- thumb: optional str matching THUMB_RE, at most THUMB_MAX_BYTES; not counted in IMAGE_MAX_BYTES.
- At most MAX_IMAGES images; a new id beyond that -> library_full.
Errors as library_contract.py: invalid_format, not_found, conflict, library_full, not_loaded,
save_failed; non-admin writers get Home Assistant's `unauthorized`.

Provider (www/magic_card_utils_library.js): forwards kind "images" events as window
`mcu-library-changed` {kind: "images", ids: [id]}; it reads, caches and registers nothing for images.
PROVIDER_API_VERSION stays 1.

Panel (www/magic_card_utils_panel.js): PANEL_TABS gains "images" after "shapes". The Images tab hosts
<mc-library-view context="mcu-panel" kinds=["image"]> (New image, Edit, Rename, Duplicate, Delete,
Export, Export all, Import); New image and Edit fire mc-library-open {kind: "image", id?} ->
_openEditor({kind: "image", id?, opener}), which mounts <mc-svg-editor host="mcu"> with source {kind:
"image-blank"} or {kind: "image", id}. The Library tab lists images too. Version gate as the Icons tab,
with its own minimum MIN_MAGIC_CARD_FOR_IMAGES and the element's contractRevision >=
IMAGES_MIN_CONTRACT_REVISION; the too-old message names images ("Drawing images here needs Magic Card
<version> or newer. Update Magic Card in HACS."). Non-admin users see the list read-only (no New,
Rename, Duplicate, Delete, Import).
"""

from __future__ import annotations

import re
from typing import Literal, NotRequired, TypedDict

MCU_LIBRARY_IMAGES_CONTRACT_VERSION = "1.1.0"

STORAGE_KEY_IMAGES = "magic_card_utils.images"
IMAGE_DIR = ".storage/magic_card_utils_images"
BODY_CACHE_BYTES = 8 * 1024 * 1024

CMD_IMAGES_LIST = "magic_card_utils/images_list"
CMD_IMAGES_GET = "magic_card_utils/images_get"
CMD_IMAGES_SAVE = "magic_card_utils/images_save"
CMD_IMAGES_DELETE = "magic_card_utils/images_delete"

IMAGE_MAX_BYTES = 256 * 1024
THUMB_MAX_BYTES = 16 * 1024
MAX_IMAGES = 200
MAX_IMAGE_GET_IDS = 8
MAX_IMAGE_BOX = 4096
IMAGE_MAX_NODES = 10_000
MAX_IMAGE_BINDINGS = 64
MAX_BINDING_RULES = 16

# magic-card svg-editor contract revision that opens image sources; panel constant of the same name.
IMAGES_MIN_CONTRACT_REVISION = 6

IMAGE_ELEMENTS = frozenset(
    {
        "svg", "g", "path", "circle", "ellipse", "rect", "line", "polyline", "polygon", "defs",
        "lineargradient", "radialgradient", "stop", "clippath", "mask", "title", "text", "tspan",
    }
)
IMAGE_ATTRIBUTES = frozenset(
    a.lower()
    for a in (
        "d", "cx", "cy", "r", "rx", "ry", "x", "y", "x1", "y1", "x2", "y2", "dx", "dy", "fx", "fy", "fr",
        "width", "height", "points", "fill", "stroke", "stroke-width", "stroke-linecap",
        "stroke-linejoin", "stroke-miterlimit", "stroke-dasharray", "stroke-dashoffset", "opacity",
        "fill-opacity", "stroke-opacity", "transform", "viewBox", "id", "class", "offset", "stop-color",
        "stop-opacity", "gradientUnits", "gradientTransform", "spreadMethod", "clip-path",
        "clipPathUnits", "mask", "maskUnits", "maskContentUnits", "fill-rule", "clip-rule",
        "paint-order", "vector-effect", "visibility", "font-size", "font-family", "font-weight",
        "font-style", "text-anchor", "dominant-baseline", "letter-spacing", "preserveAspectRatio",
        "data-name",
    )
)
# Checked with fullmatch on a token the scanner has already cut out; never run over the whole text.
TAG_NAME_RE = re.compile(r"[A-Za-z][A-Za-z0-9]{0,31}")
ATTR_NAME_SCAN_RE = re.compile(r"[A-Za-z][A-Za-z0-9-]{0,31}")
TEXT_DENY = ("javascript:", "vbscript:", "<!entity", "<!doctype", "<?", "<![cdata[", "<!--", "@import", "expression(")
VAR_RE = re.compile(r"var\(\s*--[a-z0-9][a-z0-9-]{0,63}\s*(,\s*#[0-9a-fA-F]{3,8}\s*)?\)")
IMAGE_ID_RE = re.compile(r"^[A-Za-z][\w.-]{0,63}\Z")
ENTITY_RE = re.compile(r"^[a-z0-9_]+\.[a-z0-9_]+\Z")
BINDING_SETS = frozenset({"fill", "stroke", "opacity", "visible"})
BINDING_COLOUR_RE = re.compile(r"^(#[0-9a-fA-F]{3,8}|theme:[a-z0-9][a-z0-9-]{0,63}|main|accent|entity)\Z")
THUMB_RE = re.compile(r"^data:image/(png|webp);base64,[A-Za-z0-9+/]+={0,2}\Z")


class ImageSummary(TypedDict):
    id: str
    name: str
    keywords: NotRequired[list[str]]
    author: NotRequired[str]
    description: NotRequired[str]
    view_box: str
    bytes: int
    bindings: int
    thumb: NotRequired[str]
    updated_at: str


class ImageEventSummary(TypedDict):
    id: str
    name: str
    view_box: str
    bytes: int
    updated_at: str


class SavedImage(TypedDict):
    id: str
    name: str
    keywords: NotRequired[list[str]]
    author: NotRequired[str]
    description: NotRequired[str]
    view_box: str
    svg: str
    bindings: NotRequired[list[dict]]
    thumb: NotRequired[str]
    created_at: str
    updated_at: str


ImagesKind = Literal["images"]
