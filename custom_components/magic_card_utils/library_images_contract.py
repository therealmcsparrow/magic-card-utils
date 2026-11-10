"""Contract: mcu-library 1.2.1, images part. Saved full drawings ("library images") for Magic Card.

mcu-library 1.2.1 = library_contract.py (icons, shapes, theme presets, provider, panel) plus this module;
MCU_LIBRARY_CONTRACT_VERSION in library_contract.py names the same version. Additive over 1.1.0: every new
field is optional for the caller, and no command or error changes. TypeScript mirror (same version, names
and rules): magic-card src/contracts/mcu-library-images.ts. The morph rule mirrors magic-card
src/contracts/svg-safety.ts 1.4.0 and the animation record mirrors src/contracts/image-animation.ts 1.1.3.
Card-side use (reference format, rendering, sanitiser lists): magic-card src/contracts/svg-image.ts.

Storage (kept apart from icons and shapes because one image can be 1 MiB and the count has no cap):
- Index: Store(hass, STORAGE_VERSION, STORAGE_KEY_IMAGES) -> {"images": {id: ImageMeta}}. Loaded at
  setup (small: no bodies).
- Bodies: one JSON file per image, IMAGE_DIR/<id>.json = {"svg": str, "bindings": [...],
  "animation": ImageAnimation?, "thumb": str?, "meta": ImageMeta?} ("meta" is the index entry of the same
  save, so an orphan body can be put back),
  under hass.config.path(IMAGE_DIR), written with json.dumps(..., ensure_ascii=False) through
  homeassistant.util.file.write_utf8_file_atomic(path, text, private=True) in the executor; read in the
  executor on demand, kept in an LRU of at most BODY_CACHE_BYTES. Write order: body first, then index;
  delete order: index first, then body.
- Start-up: files in IMAGE_DIR that do not end in ".json" (temp files left by a crash) are deleted; an
  index entry whose body file is absent is dropped with a warning (names only, no indexed body is read).
  A body file without an index entry (a crash between body write and index save) is read once in the
  executor: when its "meta" id equals the file name and the whole record (meta, svg, bindings,
  animation) passes validation, the meta is put back into the index and saved; otherwise the file is
  left alone and logged once.
- A body that cannot be read or parsed at get time, or that fails validation again (svg, bindings and
  animation, the morph rule included), is left out of the images_get result (as an unknown id) with a
  warning; the command never raises for it.
- The folder is inside the config directory, so Home Assistant backups include it.

Commands (``type``: request -> result). Reads: any authenticated user (@callback / @async_response, never
@require_admin), because dashboards render for every user. Writes: @require_admin + @async_response.
- CMD_IMAGES_LIST   {} -> {images: [ImageSummary], caps: ImageCaps}   (includes thumb and animated)
                    caps is always {image_max_bytes: IMAGE_MAX_BYTES, animation: IMAGE_CAPS_ANIMATION};
                    a card that gets no caps treats the server as an older one (256 KiB, no animation).
- CMD_IMAGES_GET    {ids: [str] (1..MAX_IMAGE_GET_IDS)} -> {images: [SavedImage]}  (unknown ids left out)
                    More than MAX_IMAGE_GET_IDS ids: error ERR_TOO_MANY ("too_many"), no partial result.
                    More than MAX_IMAGE_GET_IDS_SCHEMA (64) ids: invalid_format from the schema, before
                    any id is checked.
                    An empty list: invalid_format. Callers split longer lists into calls of at most
                    MAX_IMAGE_GET_IDS (the card never sends more). Eight bodies at IMAGE_MAX_BYTES each
                    fit in one websocket reply.
- CMD_IMAGES_SAVE   {image: SavedImageInput, base_updated_at?: str} -> {image: ImageSummary}
                    (the summary, never the body echoed back)
- CMD_IMAGES_DELETE {image_id: str} -> {}                    (unknown id: success)
- The existing CMD_SUBSCRIBE gains {action: "saved", kind: "images", image: ImageEventSummary}
  and {action: "deleted", kind: "images", id}. Events never carry svg, bindings, animation or thumb.
Ids: chosen by the editor at the first save (the slug of the name, made unique) and never changed;
rename is a save of the same id with a new name and base_updated_at.
The number of images has no cap: an images save never answers library_full.
Save order as icons: validate -> base_updated_at mismatch ->
conflict (also an existing id saved without base_updated_at) -> created_at kept, updated_at now (UTC
ISO 8601) -> body write -> index save -> signal -> result.

Validation (defence in depth; the card sanitises every image again before it renders it):
- id LIBRARY_ID_RE; name 1..MAX_NAME_LENGTH after strip; keywords, author, description as icons.
- view_box: four finite numbers, width and height in 1..MAX_IMAGE_BOX.
- Size first, before any scan: UTF-8 bytes of svg + compact JSON of bindings + compact JSON of animation
  (each absent part counts 0; separators (",", ":"), ensure_ascii=False) <= IMAGE_MAX_BYTES. ImageSummary
  bytes is the same sum. Over it: invalid_format with errors [{path: "svg", message:
  "too_large", bytes: <n>, limit: IMAGE_MAX_BYTES}] so the editor can say how big it is.
- svg: str, stripped text starts with "<svg"; at most IMAGE_MAX_NODES "<" characters; none of TEXT_DENY
  (case-insensitive) anywhere, text content and data-name included. A hit is invalid_format with errors
  [{path: "svg", message: ERR_FORBIDDEN_TEXT ("forbidden_text"), word: <the TEXT_DENY entry>}] so the card
  can say which word to remove (the card also checks its text layers before Save). Then one left-to-right pass of the tag scanner below (linear, no
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
- Root namespace, the one exception to IMAGE_ATTRIBUTES: in the first opening tag (the root <svg>) the
  attribute name "xmlns" (exactly, lower-case) is allowed once when its value is exactly ROOT_XMLNS.
  Refused (invalid_format, naming the attribute): xmlns with any other value, xmlns on any other
  element, a second xmlns on the root, any other case of the name, and every xmlns:* name (the ":" rule
  above). The card's serialiser always writes this attribute on the root, so the server must take it.
  The value is compared as written (no entity decoding, no trimming).
  Hostile tests: xmlns on a child, another value on the root, xmlns:x on the root, XMLNS on the root.
- Morph rule (the one SMIL a library image keeps: a path morph the card's editor wrote, only in a record
  whose animation names it; the second exception to IMAGE_ELEMENTS and IMAGE_ATTRIBUTES). Element
  MORPH_ELEMENT ("animate", exact, case-sensitive; "Animate", "ANIMATE" and every prefixed name such as
  "svg:animate" are refused as unknown elements) in the SVG namespace with no prefix and no xmlns of its
  own, a direct child of an open MORPH_PARENT ("path") with no child nodes: it is written self-closing
  ("/>"), and "</animate>" is refused. At most one per path. Its attributes are judged by exact,
  case-sensitive name against MORPH_ATTRIBUTES (not IMAGE_ATTRIBUTES): each at most once, every name in
  MORPH_REQUIRED present; attributeName exactly "d" and begin exactly "indefinite" (MORPH_FIXED); values
  a MORPH_VALUES_SEPARATOR-separated list whose every frame, trimmed, passes MORPH_PATH_DATA_RE; dur
  MORPH_DUR_RE; repeatCount MORPH_REPEAT_RE; keyTimes and keySplines MORPH_NUMBER_LIST_RE; calcMode one
  of MORPH_CALC_MODES; fill one of MORPH_FILLS; id IMAGE_ID_RE. A morph value holds no "&". Never href or
  xlink:href (any case or namespace), from, to or by, and never an element of SMIL_NEVER. Cross-checks
  with the record's animation: the animate's id is the smil of exactly one animation.clips[].morphs[],
  whose target is the id of its parent path, the id the card keeps: element ids are read entity-decoded; a
  value over IMAGE_MAX_VALUE_CHARS characters is no id; it is trimmed only when its first or last character
  is U+0020 or below; an id that does not match IMAGE_ID_RE is no id; only the first id attribute of an element
  is read; an element whose name is not exactly (case-sensitive) in IMAGE_KEPT_ELEMENTS, and everything
  inside it, keeps no id and an animate in it misses (miss parent), yet its ids are taken, because the card
  drops such an element when it parses the markup as XML but keeps it, lowercased, when markup that is not
  well-formed sends it to its HTML parser; and only the first element (or kept animate) in document order
  keeps an id, so a path whose id an earlier element holds has none (miss unnamed) and an
  animate whose id an earlier element holds is refused (miss attribute); values equals that morph's
  frames d joined with ";"; all its frames share one command structure (see "Command structure" below); keyTimes, when present, has one entry per frame, each frame's at / 100,
  from 0 to 1; calcMode "spline" needs keySplines with one entry of four numbers in 0..1 per segment
  (frames - 1). Any miss refuses the save: invalid_format with errors [{path: "svg", message:
  MORPH_ELEMENT, miss: <MorphMiss>}]. A record without animation keeps no SMIL at all.
  Hostile tests: attributename and ATTRIBUTENAME, svg:animate, href and xlink:href in any case, values
  holding url( or a quote-closed attribute, from/to/by, a second animate on one path, an animate with a
  child or a closing tag, an animate under <g> or at the root, an id no morph names, set and
  animateTransform.
- Command structure (the same rule word for word as magic-card src/contracts/svg-safety.ts at
  MORPH_VALUES_SEPARATOR):
  Command structure of a morph frame: after tab, line feed, form feed and carriage return became a space, the frame
  is read left to right as tokens, each starting where the last one ended: a command letter (one of
  MmLlHhVvCcSsQqTtAaZz), a number (the pattern [+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)([eE][+-]?[0-9]+)?, greedy), or a
  run of spaces and commas. The structure is the command letters in order, each with the count of numbers after it
  up to the next letter or the end. The frame is not path data (miss value) when some text is none of these tokens,
  when a number comes before the first letter, or when it holds no letter. All frames of one morph have the same
  structure: the same letters in the same order and the same count of numbers after each (miss frames otherwise).
  An implicit repeat and its explicit form differ: "L1 1 2 2" is L with 4 numbers, "L1 1 L2 2" is L with 2 and L
  with 2. The editor writes every frame in one form: a command letter before every segment (never an implicit
  repeat), the numbers of a segment separated by one space, each arc flag as a number of its own (0 or 1), and Z
  with no numbers; every frame it writes passes this rule on both sides.
  Hostile tests: frames with equal letters and different number counts ("M0 0 L1 1" against
  "M0 0 L1 1 2 2"), a number before the first letter, "1e" and a lone "+".
- animation: optional ImageAnimation. Every key of the record, a clip, a play, a morph and a frame is
  one of the keys named in the TypedDicts below; any other key is refused. v == IMAGE_ANIMATION_RECORD_VERSION.
  clips: 1..IMAGE_ANIM_MAX_CLIPS, unique ids matching IMAGE_CLIP_ID_RE, name 1..IMAGE_CLIP_NAME_MAX, not blank.
  Whitespace in the record (trimming, the easing and origin patterns, the morph frame and keyTimes
  items) is exactly ASCII space, tab, line feed, carriage return and form feed, nothing else. An origin
  has whitespace only between its tokens, never before the first or after the last.
  play.on one of CLIP_PLAY_ON; "state" needs entity (ENTITY_RE), optional attribute (str 1..64) and a
  when dict. duration in IMAGE_CLIP_DURATION_RANGE, delay 0..IMAGE_CLIP_DELAY_MAX, iterations
  "infinite" or a number in IMAGE_CLIP_ITERATIONS_RANGE, direction one of CLIP_DIRECTIONS (only "normal"
  in a clip with morphs). tracks: at most IMAGE_CLIP_MAX_TRACKS per clip, target "element" or "part:" +
  IMAGE_ID_RE whose id is an id the card keeps on an element in svg (see the morph rule; a morph
  <animate> does not count),
  one track per target per clip, at most IMAGE_TRACK_MAX_KEYFRAMES keyframes each; the keys and values of
  a track, its keyframes, origin and motion path are checked against the same allow-lists as the card's
  src/image-anim/check.ts (image_animation.py). morphs: at most
  IMAGE_ANIM_MAX_MORPHS in the whole record, target and smil IMAGE_ID_RE, smil unique in the record,
  frames IMAGE_MORPH_MIN_FRAMES..IMAGE_MORPH_MAX_FRAMES with at strictly rising from 0 to 100, d passing
  MORPH_PATH_DATA_RE after other whitespace became a space, easing (optional) MORPH_EASING_RE. Every
  string of the record is at most IMAGE_ANIM_MAX_STRING_CHARS Unicode code points (every string cap here
  counts code points, as the card does), except a frame's d and a
  track's motion path, which are bounded by IMAGE_MAX_BYTES; and holds none of IMAGE_ANIM_DENY
  (case-insensitive). Every number is finite (no NaN, no infinity, no bool). A miss is invalid_format
  with errors [{path: "animation", message: <the failing field as a dotted path>}].
- Over the whole text as an extra layer: library_contract ATTR_DENY_RE and the wide attribute pattern
  library.py uses for icons; every "url(" is url(#...); every "var(" matches VAR_RE; every "&" starts
  &amp; &lt; &gt; &quot; &apos; or a numeric reference. Before the word check on an entity-decoded
  attribute value, tab, line feed and carriage return are removed ("j&#10;avascript:" is "javascript:"). All patterns are linear. The server refuses
  (invalid_format, path "svg", message naming the first offending element or attribute); it never
  strips. Hostile tests come first, including a quoted ">" followed by an event attribute
  (<rect x="1>" onload="x"/>), a raw "<" in a value, an unquoted value and a comment.
- Card output passes: every markup the card's image sanitiser and serialiser emit (sanitizeImage
  output, the editor's save payload, a transfer import, a Duplicate) passes this validation unchanged.
  A shared conformance test runs real card serialiser output (fixtures made by the card's build: shapes,
  text with tspan lines, gradients, theme var() with and without a hex fallback, imported part groups
  with their defs, bindings, an animated image with its morph <animate> copies and its animation)
  through validate_image and expects no error; the card repo keeps the
  fixture generator and this repo keeps the test. A card change that emits a new element, attribute or
  value form changes this contract (and the TypeScript mirror) and the server in the same release.
- bindings: optional list of at most MAX_IMAGE_BINDINGS dicts with keys only target (IMAGE_ID_RE),
  entity (ENTITY_RE), attribute (optional str 1..64), set (one of BINDING_SETS), rules (list of at most
  MAX_BINDING_RULES dicts with keys only state (str 1..255) / above (finite number) / below (finite
  number) / value), default (optional). value / default: for fill and stroke a str matching
  BINDING_COLOUR_RE; for opacity a finite number 0..100; for visible a bool. At most one binding per
  (target, set). Targets are not checked against the markup (the card ignores unknown targets).
- thumb: optional str matching THUMB_RE, at most THUMB_MAX_BYTES; not counted in IMAGE_MAX_BYTES.
Errors as library_contract.py: invalid_format, not_found, conflict, not_loaded, save_failed (images
never use library_full); plus ERR_TOO_MANY for images_get only; non-admin writers get Home Assistant's
`unauthorized`.

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
<version> or newer. Update Magic Card."). Non-admin users see the list read-only (no New,
Rename, Duplicate, Delete, Import).
"""

from __future__ import annotations

import re
from typing import Literal, NotRequired, TypedDict

MCU_LIBRARY_IMAGES_CONTRACT_VERSION = "1.2.1"

STORAGE_KEY_IMAGES = "magic_card_utils.images"
IMAGE_DIR = ".storage/magic_card_utils_images"
BODY_CACHE_BYTES = 16 * 1024 * 1024

CMD_IMAGES_LIST = "magic_card_utils/images_list"
CMD_IMAGES_GET = "magic_card_utils/images_get"
CMD_IMAGES_SAVE = "magic_card_utils/images_save"
CMD_IMAGES_DELETE = "magic_card_utils/images_delete"

# images_get error code for more than MAX_IMAGE_GET_IDS ids.
ERR_TOO_MANY = "too_many"
# images_get: a list longer than this is refused by the schema (invalid_format) before any id is read.
MAX_IMAGE_GET_IDS_SCHEMA = 64
# Validation error message (like "too_large") for a TEXT_DENY word found anywhere in the markup, text
# content and data-name included: {path: "svg", message: ERR_FORBIDDEN_TEXT, word: <the TEXT_DENY entry>}.
ERR_FORBIDDEN_TEXT = "forbidden_text"

# UTF-8 svg plus the compact JSON of bindings and animation.
IMAGE_MAX_BYTES = 1024 * 1024
THUMB_MAX_BYTES = 16 * 1024
MAX_IMAGE_GET_IDS = 8
# images_list caps.animation: the image-animation record version this server stores.
IMAGE_CAPS_ANIMATION = 1
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
# The names the card keeps, case-sensitive; another case of one of them keeps no id but takes its ids.
IMAGE_KEPT_ELEMENTS = frozenset(
    {
        "svg", "g", "path", "circle", "ellipse", "rect", "line", "polyline", "polygon", "defs",
        "linearGradient", "radialGradient", "stop", "clipPath", "mask", "title", "text", "tspan",
    }
)
# Longest decoded attribute value the card keeps; a longer one is dropped.
IMAGE_MAX_VALUE_CHARS = 2000
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
# The one xmlns value allowed, on the root <svg> only (see "Root namespace").
ROOT_XMLNS = "http://www.w3.org/2000/svg"
# Checked with fullmatch on a token the scanner has already cut out; never run over the whole text.
TAG_NAME_RE = re.compile(r"[A-Za-z][A-Za-z0-9]{0,31}")
ATTR_NAME_SCAN_RE = re.compile(r"[A-Za-z][A-Za-z0-9-]{0,31}")
TEXT_DENY = ("javascript:", "vbscript:", "<!entity", "<!doctype", "<?", "<![cdata[", "<!--", "@import", "expression(")
VAR_RE = re.compile(r"var\(\s*--[a-z0-9][a-z0-9-]{0,63}\s*(,\s*#[0-9a-fA-F]{3,8}\s*)?\)")
# ASCII only, as the card's IMAGE_ID_RE: an explicit class, so the pattern stays ASCII however it is recompiled.
IMAGE_ID_RE = re.compile(r"^[A-Za-z][A-Za-z0-9_.-]{0,63}\Z", re.ASCII)
ENTITY_RE = re.compile(r"^[a-z0-9_]+\.[a-z0-9_]+\Z")
BINDING_SETS = frozenset({"fill", "stroke", "opacity", "visible"})
BINDING_COLOUR_RE = re.compile(r"^(#[0-9a-fA-F]{3,8}|theme:[a-z0-9][a-z0-9-]{0,63}|main|accent|entity)\Z")
THUMB_RE = re.compile(r"^data:image/(png|webp);base64,[A-Za-z0-9+/]+={0,2}\Z")

# Morph rule (see "Morph rule"). Patterns below are checked with fullmatch on one attribute value or frame.
MORPH_ELEMENT = "animate"
MORPH_PARENT = "path"
# Exact case; matched without lower-casing.
MORPH_ATTRIBUTES = (
    "id", "attributeName", "values", "dur", "repeatCount", "keyTimes", "keySplines", "calcMode", "fill", "begin",
)
MORPH_FIXED = {"attributeName": "d", "begin": "indefinite"}
MORPH_REQUIRED = ("id", "attributeName", "values", "dur", "begin")
MORPH_CALC_MODES = ("linear", "spline")
MORPH_FILLS = ("freeze", "remove")
# A clock value in seconds or milliseconds.
MORPH_DUR_RE = re.compile(r"(?:[0-9]{1,6}(?:\.[0-9]{1,6})?|\.[0-9]{1,6})(?:s|ms)")
# A positive number or indefinite.
MORPH_REPEAT_RE = re.compile(r"(?:indefinite|[0-9]{1,6}(?:\.[0-9]{1,6})?|\.[0-9]{1,6})")
# keyTimes and keySplines; counts and ranges are checked after splitting.
MORPH_NUMBER_LIST_RE = re.compile(r"[0-9. ;]+")
MORPH_VALUES_SEPARATOR = ";"
# SMIL elements refused whatever the record holds.
SMIL_NEVER = ("set", "animateMotion", "animateTransform", "discard")
# The `miss` of a refused morph: namespace (an xmlns on it whose value is not ROOT_XMLNS), parent (not a
# direct child of a path), children (child nodes or a closing tag), second (another animate on the same
# path), attribute (a name outside MORPH_ATTRIBUTES, an xmlns declaration among them, a duplicate, or a
# required one missing), value (a value outside its rule, a keySplines set left empty included),
# unnamed (no morph in the record names its id), counts (keyTimes not one per frame from 0 to 1, or with
# spline not one keySpline of four 0..1 numbers per segment), frames (values differs from its morph's
# frames d, or the frames differ in command structure).
MorphMiss = Literal["namespace", "parent", "children", "second", "attribute", "value", "unnamed", "counts", "frames"]
MORPH_MISSES = ("namespace", "parent", "children", "second", "attribute", "value", "unnamed", "counts", "frames")

# Animation record caps (see "animation").
IMAGE_ANIMATION_RECORD_VERSION = 1
IMAGE_CLIP_ID_RE = re.compile(r"[a-z0-9](?:[a-z0-9-]{0,47})")
IMAGE_CLIP_NAME_MAX = 64
IMAGE_ANIM_MAX_CLIPS = 16
IMAGE_CLIP_MAX_TRACKS = 24
IMAGE_TRACK_MAX_KEYFRAMES = 40
IMAGE_ANIM_MAX_MORPHS = 64
IMAGE_MORPH_MIN_FRAMES = 2
IMAGE_MORPH_MAX_FRAMES = 32
IMAGE_ANIM_MAX_STRING_CHARS = 256
IMAGE_CLIP_DURATION_RANGE = (0.05, 600)
IMAGE_CLIP_ITERATIONS_RANGE = (0.01, 1000)
IMAGE_CLIP_DELAY_MAX = 600
# Refused anywhere in any string of the record, matched case-insensitively.
IMAGE_ANIM_DENY = ("<!doctype", "<!entity", "<?", "<![cdata[", "url(", "@", "{", "}", ";", "<", ">")
# Path data of a morph frame, after other whitespace became U+0020; the length is checked first.
MORPH_PATH_DATA_RE = re.compile(r"[MmLlHhVvCcSsQqTtAaZz0-9.,+\-eE ]+")
# A segment easing: linear, or a cubic-bezier whose four numbers are all in 0..1.
MORPH_EASING_RE = re.compile(
    r"(?:linear|cubic-bezier\((?: ?(?:0(?:\.[0-9]{1,6})?|1(?:\.0{1,6})?|\.[0-9]{1,6}) ?,){3}"
    r" ?(?:0(?:\.[0-9]{1,6})?|1(?:\.0{1,6})?|\.[0-9]{1,6}) ?\))"
)
CLIP_PLAY_ON = ("always", "hover", "tap", "state")
CLIP_DIRECTIONS = ("normal", "reverse", "alternate", "alternate-reverse")
# Server-side bound on nesting inside one track; the card's compileTracks has its own checks.
ANIM_MAX_DEPTH = 8


class ImageSummary(TypedDict):
    id: str
    name: str
    keywords: NotRequired[list[str]]
    author: NotRequired[str]
    description: NotRequired[str]
    view_box: str
    bytes: int
    bindings: int
    # The record has an animation.
    animated: bool
    thumb: NotRequired[str]
    updated_at: str


class ImageCaps(TypedDict):
    image_max_bytes: int
    animation: int


class ImagesListResult(TypedDict):
    images: list[ImageSummary]
    caps: ImageCaps


class ClipPlay(TypedDict):
    on: Literal["always", "hover", "tap", "state"]
    # Only with on == "state".
    entity: NotRequired[str]
    attribute: NotRequired[str]
    when: NotRequired[dict]


class ImageMorphFrame(TypedDict):
    # Percent of the clip, 0 first and 100 last, strictly rising.
    at: float
    d: str
    # Easing to the next frame; linear when absent.
    easing: NotRequired[str]


class ImageMorph(TypedDict):
    # Id of the <path> that changes.
    target: str
    # Id of the <animate> child of that path.
    smil: str
    frames: list[ImageMorphFrame]


class ImageClip(TypedDict):
    id: str
    name: str
    play: ClipPlay
    duration: float
    delay: NotRequired[float]
    easing: str
    iterations: float | Literal["infinite"]
    direction: NotRequired[Literal["normal", "reverse", "alternate", "alternate-reverse"]]
    # Studio model-v2 tracks with target "element" or "part:<svg id>".
    tracks: list[dict]
    morphs: NotRequired[list[ImageMorph]]


class ImageAnimation(TypedDict):
    v: int
    clips: list[ImageClip]


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
    animation: NotRequired[ImageAnimation]
    thumb: NotRequired[str]
    created_at: str
    updated_at: str


ImagesKind = Literal["images"]
