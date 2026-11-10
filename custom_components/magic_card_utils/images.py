"""Saved full drawings ("library images") for Magic Card: storage, validation and WebSocket API.

Implements the images part of mcu-library 1.2.1, see library_images_contract.py. An index Store holds
the small metadata of every image; each body (svg, bindings, animation, thumb, meta) is its own JSON file
in a folder under .storage, so one 1 MiB drawing never has to be loaded with the others. Magic Card
sanitises every image again before it renders it; the checks here are defence in depth and size/shape
limits.
"""

from __future__ import annotations

import asyncio
from collections import OrderedDict
import html
import json
import logging
import math
import os
import re
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.storage import Store
from homeassistant.util.file import write_utf8_file_atomic

from . import library_images_contract as contract
from .const import DOMAIN
from .image_animation import Morph, missing_part, morph_miss, morph_table, validate_animation
from .library import (
    _ATTR_DENY_WIDE_RE,
    SERVER_KEYS,
    Errors,
    _err,
    _not_loaded,
    _now,
    _send_invalid,
    _validate_common,
    _validate_keywords,
)
from .library_contract import (
    ATTR_DENY_RE,
    ERR_CONFLICT,
    ERR_SAVE_FAILED,
    LIBRARY_ID_RE,
    SIGNAL_LIBRARY_UPDATED,
    STORAGE_VERSION,
)

_LOGGER = logging.getLogger(__name__)

DATA_IMAGES = f"{DOMAIN}_images"

ERR_TOO_MANY = "too_many"

IMAGE_INPUT_KEYS = frozenset(
    {"id", "name", "keywords", "author", "description", "view_box", "svg", "bindings", "animation", "thumb"}
)
BINDING_KEYS = frozenset({"target", "entity", "attribute", "set", "rules", "default"})
RULE_KEYS = frozenset({"state", "above", "below", "value"})
BINDING_ATTRIBUTE_MAX = 64
RULE_STATE_MAX = 255
NAME_ECHO_MAX = 40
# A body file is our own JSON; anything far beyond the largest valid one is not read.
BODY_FILE_MAX_BYTES = 4 * contract.IMAGE_MAX_BYTES

# Only HTML whitespace separates tokens inside a tag, as in the browser's tokeniser.
_TAG_NAME_RUN_RE = re.compile(r"[^ \t\n\r\f/>]*")
_ATTR_NAME_RUN_RE = re.compile(r"[^ \t\n\r\f=/>]*")
_SPACE_RUN_RE = re.compile(r"[ \t\n\r\f]*")
# What may follow a closing quote: whitespace between attributes, or the end of the tag.
_AFTER_VALUE = frozenset(" \t\n\r\f/>")
_CONTROL_RE = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]")
_URL_RE = re.compile(r"url\(", re.IGNORECASE)
_LOCAL_URL_RE = re.compile(r"url\(#", re.IGNORECASE)
_VAR_START_RE = re.compile(r"var\(", re.IGNORECASE)
_BAD_AMPERSAND_RE = re.compile(
    r"&(?!(?:amp|lt|gt|quot|apos|#[0-9]{1,7}|#[xX][0-9a-fA-F]{1,6});)"
)
# A URL parser drops these inside a word, so "j&#10;avascript:" must read as "javascript:".
_URL_WHITESPACE_RE = re.compile(r"[\t\n\r]")
# Words that must not survive an entity reference inside an attribute value either.
_DECODED_DENY = ("javascript:", "vbscript:", "@import", "expression(")


def _shown(token: str) -> str:
    """A token from untrusted markup, cut short for an error message."""
    return repr(token[:NAME_ECHO_MAX])


# ------------------------------------------------------------------ validation


def _utf8_size(text: str) -> int | None:
    try:
        return len(text.encode("utf-8"))
    except UnicodeEncodeError:  # a lone surrogate cannot be stored
        return None


def _compact_json(value: Any) -> str | None:
    try:
        return json.dumps(value, separators=(",", ":"), ensure_ascii=False, allow_nan=False)
    except (TypeError, ValueError, RecursionError):
        return None


def scan_svg(svg: str, morphs: dict[str, Morph] | None = None, seen: set[str] | None = None) -> str | None:
    """One linear pass over the markup; returns a message for the first thing refused, else None.

    Text between tags is never read as markup. Inside a tag a ">" in a quoted value does not end
    the tag. No regular expression runs over a whole tag, and no XML parser is involved.
    ``morphs`` are the morphs of the record the markup belongs to; without them no ``<animate>`` is kept.
    """
    found = _scan(svg, morphs or {}, seen if seen is not None else set())
    return found[0] if found else None


def _scan(
    svg: str, morphs: dict[str, Morph], seen: set[str], ids: set[str] | None = None
) -> tuple[str, str | None] | None:
    """scan_svg, answering ``(message, miss)``; ``miss`` is set only for a refused ``<animate>``.

    ``ids`` collects the ids the card keeps on elements other than a morph ``<animate>``: entity-decoded,
    trimmed as the card trims, matching IMAGE_ID_RE, on an element the card keeps (exact-case name, outside
    any dropped element) and the first of their name in document order. A kept ``<animate>`` takes its
    id too, so a later element holding it keeps no id. Only the first id attribute of an element is read, and
    the id of a miscased element or of any element inside one is taken without being kept, because the card
    keeps it when it falls back to its HTML parser.
    """
    taken: set[str] = set()
    length = len(svg)
    pos = 0
    root_open = True  # the first opening tag is the root <svg>
    # Open elements as [name, id, has an animate, card drops it]; "dropped" counts the open elements whose name
    # is not exactly in IMAGE_KEPT_ELEMENTS. The card drops them with their subtree when it parses the markup as
    # XML but keeps them as HTML, so ids in them are taken yet never kept; "balanced" turns false at the first
    # closing tag that does not close the innermost open element, after which no <animate> has a trustworthy parent.
    stack: list[list[Any]] = []
    dropped = 0
    balanced = True
    while True:
        pos = svg.find("<", pos)
        if pos < 0:
            return None
        pos += 1
        if pos >= length:
            return "The markup ends inside a tag", None
        if svg[pos] in "!?":
            return "Declarations, comments and processing instructions are not allowed", None
        closing = svg[pos] == "/"
        if closing:
            pos += 1
        match = _TAG_NAME_RUN_RE.match(svg, pos)
        name = match.group()
        pos = match.end()
        morph = name == contract.MORPH_ELEMENT and not closing
        if not morph and (not contract.TAG_NAME_RE.fullmatch(name) or name.lower() not in contract.IMAGE_ELEMENTS):
            return f"The element <{_shown(name)[1:-1]}> is not allowed", None
        if closing:
            pos = _SPACE_RUN_RE.match(svg, pos).end()
            if svg[pos : pos + 1] != ">":
                return f"The closing tag </{name}> may only hold its name", None
            pos += 1
            if stack and stack[-1][0] == name:
                dropped -= stack.pop()[3]
            else:
                balanced = False
            continue
        is_root, root_open = root_open, False
        kept = not morph and name in contract.IMAGE_KEPT_ELEMENTS and not dropped
        root_namespaces = 0
        attributes: list[tuple[str, str]] = []
        element_id: str | None = None
        id_read = False
        self_closing = False
        while True:
            pos = _SPACE_RUN_RE.match(svg, pos).end()
            if pos >= length:
                return "The markup ends inside a tag", None
            char = svg[pos]
            if char == ">":
                pos += 1
                break
            if char == "/":
                if svg.startswith("/>", pos):
                    pos += 2
                    self_closing = True
                    break
                return f"A stray '/' inside <{name}>", None
            match = _ATTR_NAME_RUN_RE.match(svg, pos)
            attribute = match.group()
            pos = match.end()
            namespace = is_root and attribute == "xmlns"
            if namespace:
                root_namespaces += 1
            if morph:
                if not attribute:
                    return contract.MORPH_ELEMENT, "attribute"
            elif not contract.ATTR_NAME_SCAN_RE.fullmatch(attribute) or (
                attribute.lower() not in contract.IMAGE_ATTRIBUTES and not namespace
            ):
                return f"The attribute {_shown(attribute)} is not allowed on <{name}>", None
            pos = _SPACE_RUN_RE.match(svg, pos).end()
            if svg[pos : pos + 1] != "=":
                return f"The attribute {attribute} on <{name}> needs a quoted value", None
            pos = _SPACE_RUN_RE.match(svg, pos + 1).end()
            quote = svg[pos : pos + 1]
            if quote not in ('"', "'"):
                return f"The value of {attribute} on <{name}> must be quoted", None
            end = svg.find(quote, pos + 1)
            if end < 0:
                return f"The value of {attribute} on <{name}> is not closed", None
            value = svg[pos + 1 : end]
            if namespace and (value != contract.ROOT_XMLNS or root_namespaces > 1):
                return f"The attribute 'xmlns' on <{name}> may only be written once, as {contract.ROOT_XMLNS}", None
            if "<" in value:
                if morph:
                    return contract.MORPH_ELEMENT, "value"
                return f"The value of {attribute} on <{name}> may not hold '<'", None
            if morph:
                attributes.append((attribute, value))
            else:
                if attribute == "id" and not id_read:
                    id_read = True
                    element_id = _kept_id(value, taken)
                    if not kept:
                        element_id = None
                    elif element_id is not None and ids is not None:
                        ids.add(element_id)
                if "&" in value:
                    message = _decoded_value_error(attribute, html.unescape(value))
                    if message:
                        return message, None
            pos = end + 1
            if pos < length and svg[pos] not in _AFTER_VALUE:
                return f"Attributes on <{name}> must be separated by whitespace", None
        if morph:
            miss = "parent" if dropped else _morph_miss(attributes, self_closing, stack, balanced, morphs, seen, taken)
            if miss:
                return contract.MORPH_ELEMENT, miss
        elif not self_closing:
            stack.append([name, element_id, False, not kept and not dropped])
            dropped += stack[-1][3]


# What String.prototype.trim removes on the card, where an attribute value is trimmed before it is checked.
_JS_TRIM = (
    "\t\n\v\f\r \xa0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a"
    "\u2028\u2029\u202f\u205f\u3000\ufeff"
)


def _kept_id(value: str, taken: set[str]) -> str | None:
    """The id the card keeps for an element's raw ``id`` value, or None when it drops it.

    The value is entity-decoded; one over IMAGE_MAX_VALUE_CHARS is dropped, and it is trimmed only when its
    first or last character is U+0020 or below. It is kept when it matches IMAGE_ID_RE and no earlier element
    or kept ``<animate>`` holds it, and then it is taken.
    """
    decoded = html.unescape(value) if "&" in value else value
    if len(decoded) > contract.IMAGE_MAX_VALUE_CHARS:
        return None
    if decoded and (ord(decoded[0]) <= 32 or ord(decoded[-1]) <= 32):
        decoded = decoded.strip(_JS_TRIM)
    if not contract.IMAGE_ID_RE.fullmatch(decoded) or decoded in taken:
        return None
    taken.add(decoded)
    return decoded


def _morph_miss(
    attributes: list[tuple[str, str]],
    self_closing: bool,
    stack: list[list[Any]],
    balanced: bool,
    morphs: dict[str, Morph],
    seen: set[str],
    taken: set[str],
) -> str | None:
    """The morph rule for one ``<animate>`` whose start tag has just been read; None keeps it.

    ``taken`` holds the ids kept so far in this drawing; an ``<animate>`` whose id is among them is refused.
    """
    parent = stack[-1] if stack and balanced else None
    if parent is None or parent[0] != contract.MORPH_PARENT:
        return "parent"
    if not self_closing:
        return "children"
    if parent[2]:
        return "second"
    miss = morph_miss(attributes, parent[1], morphs)
    if miss:
        return miss
    smil = dict(attributes)["id"]
    if smil in seen or smil in taken:
        return "attribute"
    seen.add(smil)
    taken.add(smil)
    parent[2] = True
    return None


def _decoded_value_error(attribute: str, decoded: str) -> str | None:
    decoded = _URL_WHITESPACE_RE.sub("", decoded)
    lowered = decoded.lower()
    for text in _DECODED_DENY:
        if text in lowered:
            return f"{text!r} is not allowed in {attribute}"
    if len(_URL_RE.findall(decoded)) != len(_LOCAL_URL_RE.findall(decoded)):
        return "url() may only point to an id in the same image"
    return None


def _svg_error(svg: str) -> str | None:
    """Everything except the size, which the caller has already checked."""
    return _svg_problem(svg)[0]


def _svg_problem(
    svg: str, morphs: dict[str, Morph] | None = None, seen: set[str] | None = None, ids: set[str] | None = None
) -> tuple[str | None, str | None, str | None]:
    """(message, denied word, morph miss).

    The word is set only when a TEXT_DENY word anywhere in the text was the reason; the miss only when an
    ``<animate>`` was refused.
    """
    if _CONTROL_RE.search(svg):
        return "Control characters are not allowed", None, None
    if not svg.strip().lower().startswith("<svg"):
        return "Must start with <svg", None, None
    if svg.count("<") > contract.IMAGE_MAX_NODES:
        return f"Too many elements (at most {contract.IMAGE_MAX_NODES})", None, None
    morphs = morphs or {}
    seen = seen if seen is not None else set()
    # A refused <animate> is named as one even when its value also holds a denied word.
    scanned = "<animate" in svg
    found = _scan(svg, morphs, seen, ids) if scanned else None
    if found and found[1]:
        return found[0], None, found[1]
    lowered = _URL_WHITESPACE_RE.sub("", svg).lower()
    for text in contract.TEXT_DENY:
        if text in lowered:
            return f"{text!r} is not allowed", text, None
    found = found if scanned else _scan(svg, morphs, seen, ids)
    if found:
        return found[0], None, found[1]
    return _text_error(svg), None, None


def _text_error(svg: str) -> str | None:
    """The whole-text checks that run after the tag scan."""
    if ATTR_DENY_RE.search(svg) or _ATTR_DENY_WIDE_RE.search(svg):
        return "Event, style and link attributes are not allowed"
    if len(_URL_RE.findall(svg)) != len(_LOCAL_URL_RE.findall(svg)):
        return "url() may only point to an id in the same image"
    for start in _VAR_START_RE.finditer(svg):
        if not contract.VAR_RE.match(svg, start.start()):
            return "var() may only name a theme variable, with an optional hex fallback"
    if _BAD_AMPERSAND_RE.search(svg):
        return "'&' must start a character reference"
    return None


def _number(value: Any) -> bool:
    return isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value)


def _binding_value_error(set_name: str, value: Any) -> str | None:
    if set_name in ("fill", "stroke"):
        if not isinstance(value, str) or len(value) > 80 or not contract.BINDING_COLOUR_RE.fullmatch(value):
            return "Must be a hex colour, theme:<name>, main, accent or entity"
    elif set_name == "opacity":
        if not _number(value) or not 0 <= value <= 100:
            return "Must be a number from 0 to 100"
    elif set_name == "visible" and not isinstance(value, bool):
        return "Must be true or false"
    return None


def _bindings_errors(bindings: Any, errors: Errors) -> None:
    if not isinstance(bindings, list):
        errors.append(_err("bindings", "Must be a list"))
        return
    if len(bindings) > contract.MAX_IMAGE_BINDINGS:
        errors.append(_err("bindings", f"At most {contract.MAX_IMAGE_BINDINGS} bindings"))
        return
    seen: set[tuple[str, str]] = set()
    for index, binding in enumerate(bindings):
        path = f"bindings[{index}]"
        if not isinstance(binding, dict):
            errors.append(_err(path, "Must be an object"))
            continue
        for key in binding:
            if key not in BINDING_KEYS:
                errors.append(_err(f"{path}.{str(key)[:NAME_ECHO_MAX]}", "Unknown field"))
        target, entity, set_name = binding.get("target"), binding.get("entity"), binding.get("set")
        if not isinstance(target, str) or not contract.IMAGE_ID_RE.fullmatch(target):
            errors.append(_err(f"{path}.target", "Must be an element id"))
        if not isinstance(entity, str) or not contract.ENTITY_RE.fullmatch(entity):
            errors.append(_err(f"{path}.entity", "Must be an entity id"))
        if "attribute" in binding:
            attribute = binding["attribute"]
            if not isinstance(attribute, str) or not 1 <= len(attribute) <= BINDING_ATTRIBUTE_MAX:
                errors.append(
                    _err(f"{path}.attribute", f"Must be 1-{BINDING_ATTRIBUTE_MAX} characters")
                )
        if not isinstance(set_name, str) or set_name not in contract.BINDING_SETS:
            errors.append(_err(f"{path}.set", "Must be fill, stroke, opacity or visible"))
            continue
        if isinstance(target, str):
            if (target, set_name) in seen:
                errors.append(_err(path, "Only one binding for each target and property"))
            seen.add((target, set_name))
        _rules_errors(binding.get("rules"), set_name, path, errors)
        if "default" in binding:
            message = _binding_value_error(set_name, binding["default"])
            if message:
                errors.append(_err(f"{path}.default", message))


def _rules_errors(rules: Any, set_name: str, path: str, errors: Errors) -> None:
    if not isinstance(rules, list):
        errors.append(_err(f"{path}.rules", "Must be a list"))
        return
    if len(rules) > contract.MAX_BINDING_RULES:
        errors.append(_err(f"{path}.rules", f"At most {contract.MAX_BINDING_RULES} rules"))
        return
    for index, rule in enumerate(rules):
        rule_path = f"{path}.rules[{index}]"
        if not isinstance(rule, dict):
            errors.append(_err(rule_path, "Must be an object"))
            continue
        for key in rule:
            if key not in RULE_KEYS:
                errors.append(_err(f"{rule_path}.{str(key)[:NAME_ECHO_MAX]}", "Unknown field"))
        numeric = [key for key in ("above", "below") if key in rule]
        if "state" in rule:
            state = rule["state"]
            if not isinstance(state, str) or not 1 <= len(state) <= RULE_STATE_MAX:
                errors.append(_err(f"{rule_path}.state", f"Must be 1-{RULE_STATE_MAX} characters"))
            if numeric:
                errors.append(_err(rule_path, "Use either state or above/below"))
        elif not numeric:
            errors.append(_err(rule_path, "Needs state, above or below"))
        for key in numeric:
            if not _number(rule[key]):
                errors.append(_err(f"{rule_path}.{key}", "Must be a number"))
        if "value" not in rule:
            errors.append(_err(f"{rule_path}.value", "A value is required"))
        else:
            message = _binding_value_error(set_name, rule["value"])
            if message:
                errors.append(_err(f"{rule_path}.value", message))


def _view_box_error(view_box: Any) -> str | None:
    if not isinstance(view_box, str) or len(view_box) > 200:
        return "Must be four numbers: x y width height"
    parts = view_box.replace(",", " ").split()
    if len(parts) != 4:
        return "Must be four numbers: x y width height"
    try:
        numbers = [float(part) for part in parts]
    except ValueError:
        return "Must be four numbers: x y width height"
    if not all(math.isfinite(number) for number in numbers):
        return "Must be four finite numbers"
    if not all(1 <= size <= contract.MAX_IMAGE_BOX for size in numbers[2:]):
        return f"Width and height must be from 1 to {contract.MAX_IMAGE_BOX}"
    return None


def _thumb_error(thumb: Any) -> str | None:
    # The length is capped before the pattern runs.
    if not isinstance(thumb, str) or len(thumb) > contract.THUMB_MAX_BYTES:
        return f"Must be a PNG or WebP data URL of at most {contract.THUMB_MAX_BYTES} bytes"
    if not contract.THUMB_RE.fullmatch(thumb):
        return "Must be a PNG or WebP data URL"
    return None


def _measurable(value: Any) -> bool:
    text = _compact_json(value)
    return text is not None and _utf8_size(text) is not None


def counted_bytes(image: dict) -> int | None:
    """UTF-8 bytes of the svg plus the compact JSON of bindings and animation; None when not measurable."""
    svg = image.get("svg")
    if not isinstance(svg, str):
        return None
    size = _utf8_size(svg)
    if size is None:
        return None
    for key in ("bindings", "animation"):
        if key in image:
            text = _compact_json(image[key])
            if text is None or (text_size := _utf8_size(text)) is None:
                return None
            size += text_size
    return size


def validate_image(image: Any) -> Errors:
    """Check a SavedImageInput; returns ``{path, message}`` errors (empty when valid)."""
    if not isinstance(image, dict):
        return [_err("", "The image must be an object")]
    errors: Errors = []
    _validate_common(image, errors)
    if "keywords" in image:
        _validate_keywords(image["keywords"], errors)
    for key in image:
        if key not in IMAGE_INPUT_KEYS and key not in SERVER_KEYS:
            errors.append(_err(str(key)[:NAME_ECHO_MAX], "Unknown field"))
    message = _view_box_error(image.get("view_box"))
    if message:
        errors.append(_err("view_box", message))
    if "thumb" in image:
        message = _thumb_error(image["thumb"])
        if message:
            errors.append(_err("thumb", message))

    svg = image.get("svg")
    if not isinstance(svg, str):
        errors.append(_err("svg", "Must be SVG markup"))
    if "bindings" in image:
        _bindings_errors(image["bindings"], errors)
    if "animation" in image and not isinstance(image["animation"], dict):
        errors.append(_err("animation", "Must be an object"))
    if not isinstance(svg, str):
        return errors

    # Size first, before any scan of the markup.
    size = counted_bytes(image)
    if size is None:
        # Not measurable: refuse without walking the record.
        if (
            _utf8_size(svg) is not None
            and "animation" in image
            and not any(error["path"] == "animation" for error in errors)
            and not _measurable(image["animation"])
        ):
            errors.append(_err("animation", "Must be valid text"))
        if not any(error["path"].startswith(("bindings", "animation")) for error in errors):
            errors.append(_err("svg", "Must be valid text"))
        return errors
    if size > contract.IMAGE_MAX_BYTES:
        errors.append(
            {
                "path": "svg",
                "message": "too_large",
                "bytes": size,
                "limit": contract.IMAGE_MAX_BYTES,
            }
        )
        return errors
    morphs: dict[str, Morph] = {}
    animation = image.get("animation")
    if isinstance(animation, dict):
        field = validate_animation(animation)
        if field:
            errors.append(_err("animation", field))
            return errors
        morphs = morph_table(animation)
    seen: set[str] = set()
    svg_ids: set[str] = set()
    message, word, miss = _svg_problem(svg, morphs, seen, svg_ids)
    if word:
        errors.append({"path": "svg", "message": contract.ERR_FORBIDDEN_TEXT, "word": word})
    elif miss:
        errors.append({"path": "svg", "message": contract.MORPH_ELEMENT, "miss": miss})
    elif message:
        errors.append(_err("svg", message))
    elif seen != set(morphs):
        errors.append(_err("animation", "morph without an animate"))
    elif field := missing_part(animation, svg_ids):
        errors.append(_err("animation", field))
    return errors


# --------------------------------------------------------------------- storage


def _summary(meta: dict) -> dict:
    summary: dict[str, Any] = {"id": meta["id"], "name": meta["name"]}
    for key in ("keywords", "author", "description"):
        if key in meta:
            summary[key] = meta[key]
    summary["view_box"] = meta["view_box"]
    summary["bytes"] = meta["bytes"]
    summary["bindings"] = meta["bindings"]
    summary["animated"] = meta.get("animated") is True
    if "thumb" in meta:
        summary["thumb"] = meta["thumb"]
    summary["updated_at"] = meta["updated_at"]
    return summary


def _event_summary(meta: dict) -> dict:
    return {key: meta[key] for key in ("id", "name", "view_box", "bytes", "updated_at")}


def _meta_ok(key: str, meta: Any) -> bool:
    """A stored index entry: the shape this module writes."""
    if not isinstance(meta, dict) or meta.get("id") != key or not LIBRARY_ID_RE.fullmatch(key):
        return False
    errors: Errors = []
    _validate_common(meta, errors)
    if "keywords" in meta:
        _validate_keywords(meta["keywords"], errors)
    if errors or _view_box_error(meta.get("view_box")):
        return False
    if "thumb" in meta and _thumb_error(meta["thumb"]):
        return False
    if "animated" in meta and not isinstance(meta["animated"], bool):
        return False
    return (
        isinstance(meta.get("bytes"), int)
        and not isinstance(meta["bytes"], bool)
        and 0 <= meta["bytes"] <= contract.IMAGE_MAX_BYTES
        and isinstance(meta.get("bindings"), int)
        and not isinstance(meta["bindings"], bool)
        and 0 <= meta["bindings"] <= contract.MAX_IMAGE_BINDINGS
        and isinstance(meta.get("created_at"), str)
        and isinstance(meta.get("updated_at"), str)
    )


def _read_body(path: str) -> dict | None:
    """Executor job: read and parse one body file; None when it cannot be used."""
    try:
        if os.path.getsize(path) > BODY_FILE_MAX_BYTES:
            raise ValueError("body file is too large")
        with open(path, encoding="utf-8") as handle:
            body = json.load(handle)
        if (
            not isinstance(body, dict)
            or not isinstance(body.get("svg"), str)
            or not isinstance(body.get("bindings", []), list)
        ):
            raise ValueError("body has the wrong shape")
    except (OSError, ValueError, RecursionError) as err:
        _LOGGER.warning("Image body %s could not be read: %s", os.path.basename(path), err)
        return None
    return body


def _write_body(folder: str, path: str, text: str) -> None:
    """Executor job: write one body file atomically (temp file, then rename)."""
    os.makedirs(folder, exist_ok=True)
    write_utf8_file_atomic(path, text, private=True)


def _remove_body(path: str) -> None:
    """Executor job: delete one body file; a file that is already gone is fine."""
    try:
        os.remove(path)
    except FileNotFoundError:
        pass


def _scan_folder(folder: str) -> set[str]:
    """Executor job: delete stray non-.json files (names only) and return the body file names."""
    bodies: set[str] = set()
    try:
        entries = list(os.scandir(folder))
    except FileNotFoundError:
        return bodies
    for entry in entries:
        if not entry.is_file(follow_symlinks=False):
            continue
        if entry.name.endswith(".json"):
            bodies.add(entry.name)
            continue
        try:
            os.remove(entry.path)
            _LOGGER.info("Removed a leftover temporary file from the images folder")
        except OSError as err:
            _LOGGER.warning("Could not remove %s from the images folder: %s", entry.name, err)
    return bodies


def _body_problem(meta: dict, body: dict) -> str | None:
    """Why a stored body cannot be served for its index entry; None when it is fine."""
    image = Images._compose(meta, body)
    errors = validate_image(image)
    if errors:
        first = errors[0]
        return f"{first['path']}: {first['message']}"[: NAME_ECHO_MAX * 2]
    if meta.get("bytes") != counted_bytes(image) or meta.get("bindings") != len(image.get("bindings", [])):
        return "the index entry does not match the body"
    return None


def _adopt_orphans(folder: str, names: list[str]) -> dict[str, dict]:
    """Executor job: the index entries of body files that carry a valid ``meta`` and a valid record."""
    adopted: dict[str, dict] = {}
    for name in sorted(names):
        key = name[: -len(".json")]
        if not LIBRARY_ID_RE.fullmatch(key):
            _LOGGER.warning("Image file %s has no usable name and was left alone", name[:NAME_ECHO_MAX])
            continue
        body = _read_body(os.path.join(folder, name))
        if body is None:
            continue
        meta = body.get("meta")
        if not _meta_ok(key, meta):
            _LOGGER.warning("Image file %s was left alone: it has no usable meta", name)
            continue
        problem = _body_problem(meta, body)
        if problem:
            _LOGGER.warning("Image file %s was left alone: it fails validation (%s)", name, problem)
            continue
        adopted[key] = meta
    return adopted


class Images:
    """Index in a Store, bodies in files, a small least-recently-used cache of parsed bodies."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self.store: Store = Store(hass, STORAGE_VERSION, contract.STORAGE_KEY_IMAGES)
        self.folder = hass.config.path(contract.IMAGE_DIR)
        self.index: dict[str, dict] = {}
        self._cache: OrderedDict[str, tuple[dict, int]] = OrderedDict()
        self._cache_size = 0
        self._lock = asyncio.Lock()

    def _path(self, image_id: str) -> str:
        if not LIBRARY_ID_RE.fullmatch(image_id):
            raise ValueError("invalid image id")
        return os.path.join(self.folder, f"{image_id}.json")

    async def async_load(self) -> None:
        """Load the index, clean the folder (names only) and reconcile the two."""
        data = await self.store.async_load()
        stored = data.get("images") if isinstance(data, dict) else None
        if isinstance(stored, dict):
            for key, meta in stored.items():
                if not _meta_ok(key, meta):
                    _LOGGER.warning("Dropping invalid stored image %r", str(key)[:NAME_ECHO_MAX])
                else:
                    self.index[key] = meta
        files = await self.hass.async_add_executor_job(_scan_folder, self.folder)
        for key in list(self.index):
            if f"{key}.json" not in files:
                _LOGGER.warning("Dropping image %r: its body file is missing", key)
                del self.index[key]
        orphans = files - {f"{key}.json" for key in self.index}
        if orphans:
            adopted = await self.hass.async_add_executor_job(_adopt_orphans, self.folder, list(orphans))
            if adopted:
                self.index.update(adopted)
                await self.store.async_save({"images": self.index})
                _LOGGER.info("Put %d image(s) back into the index from their body files", len(adopted))
            left = len(orphans) - len(adopted)
            if left:
                _LOGGER.warning("%d file(s) in the images folder have no index entry and were left alone", left)

    # ---- cache

    def _cache_put(self, image_id: str, body: dict, size: int) -> None:
        self._cache_drop(image_id)
        if size > contract.BODY_CACHE_BYTES:
            return
        self._cache[image_id] = (body, size)
        self._cache_size += size
        while self._cache_size > contract.BODY_CACHE_BYTES:
            _, (_, evicted) = self._cache.popitem(last=False)
            self._cache_size -= evicted

    def _cache_drop(self, image_id: str) -> None:
        entry = self._cache.pop(image_id, None)
        if entry is not None:
            self._cache_size -= entry[1]

    # ---- reads

    def summaries(self) -> list[dict]:
        return [_summary(meta) for meta in self.index.values()]

    async def async_get(self, ids: list[str]) -> list[dict]:
        """Full images for the known ids, in request order; unreadable bodies are left out."""
        wanted = [i for i in dict.fromkeys(ids) if i in self.index]
        bodies = {i: self._cache[i][0] for i in wanted if i in self._cache}
        missing = [i for i in wanted if i not in bodies]
        if missing:
            loaded = await self.hass.async_add_executor_job(self._read_many, missing)
            for image_id, (body, size) in loaded.items():
                bodies[image_id] = body
                if image_id in self.index:
                    self._cache_put(image_id, body, size)
        result = []
        for image_id in wanted:
            if image_id not in bodies or image_id not in self.index:
                continue
            if image_id in self._cache:
                self._cache.move_to_end(image_id)
            result.append(self._compose(self.index[image_id], bodies[image_id]))
        return result

    def _read_many(self, ids: list[str]) -> dict[str, tuple[dict, int]]:
        found: dict[str, tuple[dict, int]] = {}
        for image_id in ids:
            path = self._path(image_id)
            body = _read_body(path)
            if body is not None:
                meta = self.index.get(image_id)
                problem = _body_problem(meta, body) if meta else "it was deleted"
                if problem:
                    _LOGGER.warning("Image %r is not served: %s", image_id, problem)
                    continue
                try:
                    size = os.path.getsize(path)
                except OSError:
                    size = contract.IMAGE_MAX_BYTES
                found[image_id] = (body, size)
        return found

    @staticmethod
    def _compose(meta: dict, body: dict) -> dict:
        image: dict[str, Any] = {"id": meta["id"], "name": meta["name"]}
        for key in ("keywords", "author", "description"):
            if key in meta:
                image[key] = meta[key]
        image["view_box"] = meta["view_box"]
        image["svg"] = body["svg"]
        if body.get("bindings"):
            image["bindings"] = body["bindings"]
        if isinstance(body.get("animation"), dict):
            image["animation"] = body["animation"]
        thumb = body.get("thumb", meta.get("thumb"))
        if isinstance(thumb, str):
            image["thumb"] = thumb
        image["created_at"] = meta["created_at"]
        image["updated_at"] = meta["updated_at"]
        return image

    # ---- writes

    def check_save(self, image_id: str, base_updated_at: str | None) -> str | None:
        """Return an error code when the save must be refused, else None."""
        existing = self.index.get(image_id)
        if existing is None and base_updated_at is not None:
            return ERR_CONFLICT
        if existing is not None and existing["updated_at"] != base_updated_at:
            return ERR_CONFLICT
        return None

    async def async_save(self, image: dict, base_updated_at: str | None) -> tuple[dict | None, str | None]:
        """Store a validated image. Returns (summary, None) or (None, error code)."""
        async with self._lock:
            code = self.check_save(image["id"], base_updated_at)
            if code:
                return None, code
            image_id = image["id"]
            previous = self.index.get(image_id)
            now = _now()
            bindings = list(image.get("bindings", []))
            body: dict[str, Any] = {"svg": image["svg"], "bindings": bindings}
            if "animation" in image:
                body["animation"] = image["animation"]
            meta: dict[str, Any] = {"id": image_id, "name": image["name"].strip()}
            for key in ("keywords", "author", "description"):
                if key in image:
                    meta[key] = image[key].strip() if isinstance(image[key], str) else list(image[key])
            meta["view_box"] = image["view_box"]
            meta["bytes"] = counted_bytes(image)
            meta["bindings"] = len(bindings)
            meta["animated"] = "animation" in image
            if "thumb" in image:
                meta["thumb"] = body["thumb"] = image["thumb"]
            meta["created_at"] = previous["created_at"] if previous else now
            meta["updated_at"] = now
            body["meta"] = meta
            text = json.dumps(body, ensure_ascii=False, allow_nan=False)

            await self.hass.async_add_executor_job(_write_body, self.folder, self._path(image_id), text)
            self.index[image_id] = meta
            try:
                await self.store.async_save({"images": self.index})
            except Exception:
                if previous is None:
                    self.index.pop(image_id, None)
                    await self.hass.async_add_executor_job(_remove_body, self._path(image_id))
                else:
                    self.index[image_id] = previous
                self._cache_drop(image_id)
                raise
            self._cache_put(image_id, body, len(text.encode("utf-8")))
        async_dispatcher_send(
            self.hass,
            SIGNAL_LIBRARY_UPDATED,
            {"action": "saved", "kind": "images", "image": _event_summary(meta)},
        )
        return _summary(meta), None

    async def async_delete(self, image_id: str) -> bool:
        """Index first, then the body file. Returns False for an unknown id."""
        async with self._lock:
            previous = self.index.pop(image_id, None)
            if previous is None:
                return False
            try:
                await self.store.async_save({"images": self.index})
            except Exception:
                self.index[image_id] = previous
                raise
            self._cache_drop(image_id)
            try:
                await self.hass.async_add_executor_job(_remove_body, self._path(image_id))
            except OSError as err:
                _LOGGER.warning("Image %r was deleted but its body file could not be removed: %s", image_id, err)
        async_dispatcher_send(
            self.hass,
            SIGNAL_LIBRARY_UPDATED,
            {"action": "deleted", "kind": "images", "id": image_id},
        )
        return True


# ------------------------------------------------------------------- commands


def _get_images(hass: HomeAssistant) -> Images | None:
    return hass.data.get(DATA_IMAGES)


async def async_setup_images(hass: HomeAssistant) -> None:
    """Load the images (once per Home Assistant run) and register the commands."""
    if DATA_IMAGES not in hass.data:
        images = Images(hass)
        await images.async_load()
        hass.data[DATA_IMAGES] = images
    for command in (ws_images_list, ws_images_get, ws_images_save, ws_images_delete):
        websocket_api.async_register_command(hass, command)


# Reads are intentionally not admin only: cards render for non-admin users.
@websocket_api.websocket_command({vol.Required("type"): contract.CMD_IMAGES_LIST})
@callback
def ws_images_list(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Return the summary (with thumbnail) of every image. Any authenticated user."""
    images = _get_images(hass)
    if images is None:
        _not_loaded(connection, msg["id"])
        return
    connection.send_result(
        msg["id"],
        {
            "images": images.summaries(),
            "caps": {"image_max_bytes": contract.IMAGE_MAX_BYTES, "animation": contract.IMAGE_CAPS_ANIMATION},
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): contract.CMD_IMAGES_GET,
        # The length is checked before any item, so a huge list costs nothing.
        vol.Required("ids"): vol.All(
            vol.Length(max=contract.MAX_IMAGE_GET_IDS_SCHEMA), [vol.All(str, vol.Length(max=64))]
        ),
    }
)
@websocket_api.async_response
async def ws_images_get(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Return the full images for up to MAX_IMAGE_GET_IDS ids; unknown ids are left out."""
    images = _get_images(hass)
    if images is None:
        _not_loaded(connection, msg["id"])
        return
    ids = msg["ids"]
    if len(ids) > contract.MAX_IMAGE_GET_IDS:
        connection.send_error(
            msg["id"], ERR_TOO_MANY, f"At most {contract.MAX_IMAGE_GET_IDS} images at a time"
        )
        return
    if not ids:
        _send_invalid(connection, msg["id"], "Ask for at least one image")
        return
    connection.send_result(msg["id"], {"images": await images.async_get(ids)})


@websocket_api.websocket_command(
    {
        vol.Required("type"): contract.CMD_IMAGES_SAVE,
        vol.Required("image"): dict,
        vol.Optional("base_updated_at"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_images_save(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Create or replace an image by id. Admin only."""
    images = _get_images(hass)
    if images is None:
        _not_loaded(connection, msg["id"])
        return
    image = msg["image"]
    errors = validate_image(image)
    if errors:
        _send_invalid(connection, msg["id"], "The image is not valid", errors)
        return
    try:
        summary, code = await images.async_save(image, msg.get("base_updated_at"))
    except Exception:  # noqa: BLE001 - log details, answer generically
        _LOGGER.exception("Saving image %r failed", image["id"])
        connection.send_error(msg["id"], ERR_SAVE_FAILED, "The image could not be saved")
        return
    if code == ERR_CONFLICT:
        connection.send_error(msg["id"], code, "The image was changed elsewhere; reload and try again")
    else:
        connection.send_result(msg["id"], {"image": summary})


@websocket_api.websocket_command(
    {vol.Required("type"): contract.CMD_IMAGES_DELETE, vol.Required("image_id"): str}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_images_delete(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Delete an image by id; deleting an unknown id succeeds. Admin only."""
    images = _get_images(hass)
    if images is None:
        _not_loaded(connection, msg["id"])
        return
    image_id = msg["image_id"]
    if not LIBRARY_ID_RE.fullmatch(image_id):
        _send_invalid(connection, msg["id"], "Invalid image_id", [_err("image_id", "Invalid id")])
        return
    try:
        await images.async_delete(image_id)
    except Exception:  # noqa: BLE001 - log details, answer generically
        _LOGGER.exception("Deleting image %r failed", image_id)
        connection.send_error(msg["id"], ERR_SAVE_FAILED, "The image could not be deleted")
        return
    connection.send_result(msg["id"], {})
