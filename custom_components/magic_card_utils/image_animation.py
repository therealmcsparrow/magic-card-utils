"""Checks for the animation record of a library image and for the one SMIL element an image may keep.

Everything is an allow-list: a field, an attribute or a value that is not named is refused, never cleaned.
The record rules mirror magic-card src/contracts/image-animation.ts and src/image-anim/check.ts, the morph
rule mirrors src/contracts/svg-safety.ts and src/svg-safety/image-values.ts (see library_images_contract.py).
"""

from __future__ import annotations

import math
import re
from typing import Any, NamedTuple

from . import library_images_contract as contract

from .library_images_contract import IMAGE_ID_RE

_CLIP_KEYS = frozenset(
    {"id", "name", "play", "duration", "delay", "easing", "iterations", "direction", "tracks", "morphs"}
)
_CLIP_REQUIRED = ("id", "name", "play", "duration", "easing", "iterations", "tracks")
_MORPH_KEYS = frozenset({"target", "smil", "frames"})
_FRAME_KEYS = frozenset({"at", "d", "easing"})
_WHEN_KEYS = ("state", "state_not", "entity_on", "above", "below")

_ENTITY_RE = re.compile(r"[a-z0-9_]{1,64}\.[a-z0-9_]{1,128}")
_ATTRIBUTE_RE = re.compile(r"[A-Za-z0-9_]{1,64}")
_EASING_WORD_RE = re.compile(r"[a-z][a-z0-9-]{0,31}")
# One unambiguous number token ([0-9], never \d, which is Unicode in Python), so no pattern backtracks.
# Whitespace in the record is exactly these five ASCII characters; str.strip(), str.split() and \s would also
# take U+001C-U+001F, U+0085 and the Unicode spaces.
_SPACES = " \t\n\r\f"
_WS = r"[ \t\n\r\f]"
_NUM = r"-?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)"
_EASING_BEZIER_RE = re.compile(
    r"cubic-bezier\(" + _WS + "*" + _NUM + _WS + "*(?:," + _WS + "*" + _NUM + _WS + "*){3}" + r"\)"
)
_EASING_MAX = 64
_ORIGIN_MAX = 64
_ORIGIN_ITEM = r"(?:left|right|top|bottom|center|" + _NUM + r"(?:px|%|em|rem)?)"
_ORIGIN_RE = re.compile(_ORIGIN_ITEM + "(?:" + _WS + "+" + _ORIGIN_ITEM + r"){0,2}" + _WS + "*")
_CSS_RE = re.compile(r"[A-Za-z0-9_ \t\n\r\f.,%#()+/-]+")
_TRACK_KEYS = frozenset({"target", "keyframes", "origin", "path"})
_TRANSFORM_RANGES = {
    "x": (-10000, 10000),
    "y": (-10000, 10000),
    "scale": (0, 100),
    "scale_x": (-100, 100),
    "scale_y": (-100, 100),
    "rotate": (-36000, 36000),
    "skew_x": (-89, 89),
    "skew_y": (-89, 89),
}
_TRANSFORM_KEYS = frozenset(_TRANSFORM_RANGES) | {"axis"}
_CSS_KEYS = ("color", "background", "shadow", "filter", "stroke")
_NUMBER_RANGES = {"blur": (0, 200), "radius": (0, 1000), "draw": (0, 1)}
_EASING_LANES = frozenset(
    "x y scale scale_x scale_y rotate skew opacity color background shadow blur radius filter draw stroke".split()
)
_KEYFRAME_KEYS = (
    frozenset({"at", "opacity", "transform", "easing", "easings"}) | frozenset(_CSS_KEYS) | frozenset(_NUMBER_RANGES)
)
_EASING_STEPS_RE = re.compile(
    r"steps\(" + _WS + "*[0-9]{1,3}" + _WS + "*(?:," + _WS + "*(?:start|end|jump-start|jump-end|jump-none|jump-both)"
    + _WS + r"*)?\)"
)
_SCRIPT_URL_RE = re.compile(r"(?:java|vb)script:")
_OTHER_SPACE_RE = re.compile(r"[\t\n\r\f]")
_NUMBER_RE = re.compile(r"(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)")


class Morph(NamedTuple):
    """What a record says about one `<animate>`: the path it sits on, its frames' path data and their `at`."""

    target: str
    frames: tuple[str, ...]
    ats: tuple[float, ...]


class _Miss(Exception):
    """A field of the record is outside its allow-list; ``path`` is the chain that leads to it."""

    def __init__(self, path: Any) -> None:
        super().__init__("miss")
        self.path = path


def _dotted(path: Any) -> str:
    parts: list[str] = []
    while path:
        path, name = path
        parts.append(str(name))
    return ".".join(reversed(parts))


def _is_number(value: Any) -> bool:
    if isinstance(value, bool):
        return False
    return isinstance(value, int) or (isinstance(value, float) and math.isfinite(value))


def _number(value: Any, low: float, high: float, path: Any) -> float:
    if not _is_number(value) or value < low or value > high:
        raise _Miss(path)
    return value


def _safe_text(value: Any, path: Any, limit: int = contract.IMAGE_ANIM_MAX_STRING_CHARS) -> str:
    """A string of at most ``limit`` characters that holds none of the deny strings, in any case."""
    if not isinstance(value, str) or len(value) > limit:
        raise _Miss(path)
    lowered = value.lower()
    if _SCRIPT_URL_RE.search(lowered) or any(word in lowered for word in contract.IMAGE_ANIM_DENY):
        raise _Miss(path)
    return value


def _matching(value: Any, pattern: re.Pattern[str], path: Any) -> str:
    text = _safe_text(value, path)
    if not pattern.fullmatch(text):
        raise _Miss(path)
    return text


def _mapping(value: Any, path: Any, allowed: frozenset[str]) -> dict:
    if not isinstance(value, dict):
        raise _Miss(path)
    for key in value:
        if key not in allowed:
            raise _Miss((path, key if isinstance(key, str) else "key"))
    return value


def _items(value: Any, path: Any, low: int, high: int) -> list:
    if not isinstance(value, list) or not low <= len(value) <= high:
        raise _Miss(path)
    return value


def _easing(value: Any, path: Any) -> str:
    text = _safe_text(value, path, _EASING_MAX).strip(_SPACES)
    if not (
        _EASING_WORD_RE.fullmatch(text) or _EASING_BEZIER_RE.fullmatch(text) or _EASING_STEPS_RE.fullmatch(text)
    ):
        raise _Miss(path)
    return text


def _when(value: Any, path: Any) -> None:
    when = _mapping(value, path, frozenset(_WHEN_KEYS))
    if len(when) != 1:
        raise _Miss(path)
    ((key, item),) = when.items()
    if key in ("state", "state_not"):
        _safe_text(item, (path, key), 64)
    elif key == "entity_on":
        if not isinstance(item, bool):
            raise _Miss((path, key))
    else:
        _number(item, -1e9, 1e9, (path, key))


def _play(value: Any, path: Any) -> None:
    if not isinstance(value, dict):
        raise _Miss(path)
    kind = value.get("on")
    if kind in ("always", "hover", "tap"):
        _mapping(value, path, frozenset({"on"}))
        return
    if kind != "state":
        raise _Miss((path, "on"))
    _mapping(value, path, frozenset({"on", "entity", "attribute", "when"}))
    if "entity" not in value or "when" not in value:
        raise _Miss(path)
    _matching(value["entity"], _ENTITY_RE, (path, "entity"))
    _when(value["when"], (path, "when"))
    if "attribute" in value:
        _matching(value["attribute"], _ATTRIBUTE_RE, (path, "attribute"))


def _keyframe(value: Any, path: Any) -> None:
    frame = _mapping(value, path, _KEYFRAME_KEYS)
    _number(frame.get("at"), 0, 100, (path, "at"))
    if "opacity" in frame:
        _number(frame["opacity"], 0, 1, (path, "opacity"))
    if "transform" in frame:
        here = (path, "transform")
        transform = _mapping(frame["transform"], here, _TRANSFORM_KEYS)
        for name, (low, high) in _TRANSFORM_RANGES.items():
            if name in transform:
                _number(transform[name], low, high, (here, name))
        if "axis" in transform:
            axis = _items(transform["axis"], (here, "axis"), 3, 3)
            for item in axis:
                _number(item, -1e6, 1e6, (here, "axis"))
            if all(item == 0 for item in axis):
                raise _Miss((here, "axis"))
    for name in _CSS_KEYS:
        if name in frame:
            text = _safe_text(frame[name], (path, name))
            if not _CSS_RE.fullmatch(text) or "//" in text or "/*" in text:
                raise _Miss((path, name))
    for name, (low, high) in _NUMBER_RANGES.items():
        if name in frame:
            _number(frame[name], low, high, (path, name))
    if "easing" in frame:
        _easing(frame["easing"], (path, "easing"))
    if "easings" in frame:
        here = (path, "easings")
        lanes = _mapping(frame["easings"], here, _EASING_LANES)
        for lane, item in lanes.items():
            _easing(item, (here, lane))


def _origin(value: Any, path: Any) -> None:
    text = _safe_text(value, path, _ORIGIN_MAX)
    if not _ORIGIN_RE.fullmatch(text):
        raise _Miss(path)


def _motion_path(value: Any, path: Any) -> None:
    motion = _mapping(value, path, frozenset({"d", "follow_rotation"}))
    data = motion.get("d")
    if not isinstance(data, str) or len(data) > contract.IMAGE_MAX_BYTES or _path_structure_counts(data) is None:
        raise _Miss((path, "d"))
    if "follow_rotation" in motion and not isinstance(motion["follow_rotation"], bool):
        raise _Miss((path, "follow_rotation"))


def _track(value: Any, path: Any, seen: set[str]) -> None:
    track = _mapping(value, path, _TRACK_KEYS)
    target = _safe_text(track.get("target"), (path, "target"))
    if target != "element" and not (target.startswith("part:") and IMAGE_ID_RE.fullmatch(target[5:])):
        raise _Miss((path, "target"))
    if target in seen:
        raise _Miss((path, "target"))
    seen.add(target)
    keyframes = _items(track.get("keyframes"), (path, "keyframes"), 1, contract.IMAGE_TRACK_MAX_KEYFRAMES)
    for index, keyframe in enumerate(keyframes):
        _keyframe(keyframe, ((path, "keyframes"), index))
    if "origin" in track:
        _origin(track["origin"], (path, "origin"))
    if "path" in track:
        _motion_path(track["path"], (path, "path"))


def _frame_data(value: Any, path: Any) -> str:
    if not isinstance(value, str) or len(value) > contract.IMAGE_MAX_BYTES:
        raise _Miss(path)
    if not contract.MORPH_PATH_DATA_RE.fullmatch(_OTHER_SPACE_RE.sub(" ", value)):
        raise _Miss(path)
    return value


def _morph(value: Any, path: Any, smils: set[str]) -> None:
    morph = _mapping(value, path, _MORPH_KEYS)
    _matching(morph.get("target"), IMAGE_ID_RE, (path, "target"))
    smil = _matching(morph.get("smil"), IMAGE_ID_RE, (path, "smil"))
    if smil in smils:
        raise _Miss((path, "smil"))
    smils.add(smil)
    frames = _items(morph.get("frames"), (path, "frames"), contract.IMAGE_MORPH_MIN_FRAMES, contract.IMAGE_MORPH_MAX_FRAMES)
    last = -1.0
    for index, frame in enumerate(frames):
        here = ((path, "frames"), index)
        item = _mapping(frame, here, _FRAME_KEYS)
        at = _number(item.get("at"), 0, 100, (here, "at"))
        if at <= last or (index == 0 and at != 0) or (index == len(frames) - 1 and at != 100):
            raise _Miss((here, "at"))
        last = at
        _frame_data(item.get("d"), (here, "d"))
        if "easing" in item:
            _matching(item["easing"], contract.MORPH_EASING_RE, (here, "easing"))


def _clip(value: Any, path: Any, smils: set[str], morphs_seen: list[int]) -> str:
    clip = _mapping(value, path, _CLIP_KEYS)
    for key in _CLIP_REQUIRED:
        if key not in clip:
            raise _Miss((path, key))
    clip_id = _matching(clip["id"], contract.IMAGE_CLIP_ID_RE, (path, "id"))
    if not _safe_text(clip["name"], (path, "name"), contract.IMAGE_CLIP_NAME_MAX).strip(_SPACES):
        raise _Miss((path, "name"))
    _play(clip["play"], (path, "play"))
    _number(clip["duration"], *contract.IMAGE_CLIP_DURATION_RANGE, (path, "duration"))
    if "delay" in clip:
        _number(clip["delay"], 0, contract.IMAGE_CLIP_DELAY_MAX, (path, "delay"))
    _easing(clip["easing"], (path, "easing"))
    if clip["iterations"] != "infinite":
        _number(clip["iterations"], *contract.IMAGE_CLIP_ITERATIONS_RANGE, (path, "iterations"))
    direction = clip.get("direction")
    if "direction" in clip and direction not in contract.CLIP_DIRECTIONS:
        raise _Miss((path, "direction"))
    seen: set[str] = set()
    for index, track in enumerate(_items(clip["tracks"], (path, "tracks"), 0, contract.IMAGE_CLIP_MAX_TRACKS)):
        _track(track, ((path, "tracks"), index), seen)
    if "morphs" in clip:
        morphs = _items(clip["morphs"], (path, "morphs"), 0, contract.IMAGE_ANIM_MAX_MORPHS)
        morphs_seen[0] += len(morphs)
        if morphs_seen[0] > contract.IMAGE_ANIM_MAX_MORPHS:
            raise _Miss((path, "morphs"))
        for index, morph in enumerate(morphs):
            _morph(morph, ((path, "morphs"), index), smils)
        if morphs and "direction" in clip and direction != "normal":
            raise _Miss((path, "direction"))
    return clip_id


def validate_animation(animation: Any) -> str | None:
    """The dotted path of the first field outside the contract, or None when the record is acceptable.

    The caller has already bounded the record's size. Every level is a fixed field, so no input
    reaches Python's recursion limit.
    """
    root: Any = ("", "animation")
    try:
        record = _mapping(animation, root, frozenset({"v", "clips"}))
        if record.get("v") != contract.IMAGE_ANIMATION_RECORD_VERSION or isinstance(record.get("v"), bool):
            raise _Miss(("", "v"))
        smils: set[str] = set()
        morphs_seen = [0]
        ids: set[str] = set()
        for index, clip in enumerate(_items(record.get("clips"), ("", "clips"), 1, contract.IMAGE_ANIM_MAX_CLIPS)):
            clip_id = _clip(clip, (("", "clips"), index), smils, morphs_seen)
            if clip_id in ids:
                raise _Miss(((("", "clips"), index), "id"))
            ids.add(clip_id)
    except _Miss as miss:
        return _dotted(miss.path) or "animation"
    return None


def missing_part(animation: Any, svg_ids: set[str]) -> str | None:
    """The dotted path of the first track whose ``part:<id>`` target is not an element id of the drawing.

    ``animation`` is a record validate_animation accepted; ``svg_ids`` are the entity-decoded ids of the
    drawing's elements, the morph ``<animate>`` elements left out.
    """
    if not isinstance(animation, dict):
        return None
    for clip_index, clip in enumerate(animation.get("clips", ())):
        for track_index, track in enumerate(clip.get("tracks", ())):
            target = track["target"]
            if target.startswith("part:") and target[5:] not in svg_ids:
                return f"clips.{clip_index}.tracks.{track_index}.target"
    return None


def morph_table(animation: Any) -> dict[str, Morph]:
    """The morphs of a record that validate_animation accepted, by the id of their `<animate>`."""
    table: dict[str, Morph] = {}
    if not isinstance(animation, dict):
        return table
    for clip in animation.get("clips", ()):
        for morph in clip.get("morphs", ()):
            frames = morph["frames"]
            table[morph["smil"]] = Morph(
                morph["target"],
                tuple(_OTHER_SPACE_RE.sub(" ", frame["d"]).strip(_SPACES) for frame in frames),
                tuple(float(frame["at"]) for frame in frames),
            )
    return table


# ------------------------------------------------------------------ the morph rule


def _number_list(text: str, separator: str) -> list[float] | None:
    if not contract.MORPH_NUMBER_LIST_RE.fullmatch(text):
        return None
    items = [item.strip(_SPACES) for item in text.split(separator)]
    if not all(_NUMBER_RE.fullmatch(item) for item in items):
        return None
    return [float(item) for item in items]


def _frame_texts(values: str) -> list[str] | None:
    frames = [_OTHER_SPACE_RE.sub(" ", frame).strip(_SPACES) for frame in values.split(contract.MORPH_VALUES_SEPARATOR)]
    return frames if all(contract.MORPH_PATH_DATA_RE.fullmatch(frame) for frame in frames) else None


def _splines_miss(text: str, segments: int) -> str | None:
    if not contract.MORPH_NUMBER_LIST_RE.fullmatch(text):
        return "value"
    sets = [[n for n in piece.split(" ") if n] for piece in text.split(contract.MORPH_VALUES_SEPARATOR)]
    if not all(numbers and all(_NUMBER_RE.fullmatch(number) for number in numbers) for numbers in sets):
        return "value"
    if len(sets) != segments:
        return "counts"
    return None if all(len(n) == 4 and all(float(x) <= 1 for x in n) for n in sets) else "counts"


def _keytimes_miss(text: str, ats: tuple[float, ...]) -> str | None:
    times = _number_list(text, contract.MORPH_VALUES_SEPARATOR)
    if times is None:
        return "value"
    if len(times) != len(ats) or times[0] != 0 or times[-1] != 1:
        return "counts"
    for index, time in enumerate(times):
        if time > 1 or (index and time < times[index - 1]) or abs(time - ats[index] / 100) > 1e-6:
            return "counts"
    return None


def morph_miss(attributes: list[tuple[str, str]], parent_id: str | None, table: dict[str, Morph]) -> str | None:
    """Why an `<animate>` with these attributes, sitting on the path ``parent_id``, must be refused.

    Returns one of contract.MORPH_MISSES, or None when it is the editor's morph for a morph in ``table``.
    The element name, parent, children and one-per-path rules are the caller's.
    """
    if any(name == "xmlns" and value != contract.ROOT_XMLNS for name, value in attributes):
        return "namespace"
    found: dict[str, str] = {}
    for name, value in attributes:
        if name not in contract.MORPH_ATTRIBUTES or name in found:
            return "attribute"
        found[name] = value
    if any(name not in found for name in contract.MORPH_REQUIRED):
        return "attribute"
    if any("&" in value for value in found.values()):
        return "value"
    smil = found["id"]
    if not IMAGE_ID_RE.fullmatch(smil):
        return "value"
    morph = table.get(smil)
    if morph is None or morph.target != parent_id:
        return "unnamed"
    for name, fixed in contract.MORPH_FIXED.items():
        if found[name] != fixed:
            return "value"
    if not contract.MORPH_DUR_RE.fullmatch(found["dur"]):
        return "value"
    if "repeatCount" in found and not contract.MORPH_REPEAT_RE.fullmatch(found["repeatCount"]):
        return "value"
    if "fill" in found and found["fill"] not in contract.MORPH_FILLS:
        return "value"
    if "calcMode" in found and found["calcMode"] not in contract.MORPH_CALC_MODES:
        return "value"
    frames = _frame_texts(found["values"])
    if frames is None:
        return "value"
    if not contract.IMAGE_MORPH_MIN_FRAMES <= len(frames) <= contract.IMAGE_MORPH_MAX_FRAMES:
        return "counts"
    shapes = {_path_structure_counts(frame) for frame in frames}
    if None in shapes:
        return "value"
    if len(shapes) != 1 or tuple(frames) != morph.frames:
        return "frames"
    if "keyTimes" in found:
        miss = _keytimes_miss(found["keyTimes"], morph.ats)
        if miss:
            return miss
    if found.get("calcMode") == "spline" and "keySplines" not in found:
        return "counts"
    if "keySplines" in found:
        return _splines_miss(found["keySplines"], len(frames) - 1)
    return None


_PATH_TOKEN_RE = re.compile(
    r"(?P<cmd>[MmLlHhVvCcSsQqTtAaZz])|(?P<num>[+-]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?)|[ ,]+"
)


def _path_structure_counts(data: str) -> str | None:
    """The command letters of one frame in order, each with the count of numbers after it; None when not path data."""
    parts: list[str] = []
    count = 0
    pos = 0
    length = len(data)
    while pos < length:
        match = _PATH_TOKEN_RE.match(data, pos)
        if not match:
            return None
        pos = match.end()
        if match.group("cmd"):
            if parts:
                parts.append(str(count))
            parts.append(match.group("cmd"))
            count = 0
        elif match.group("num"):
            if not parts:
                return None
            count += 1
    if not parts:
        return None
    parts.append(str(count))
    return " ".join(parts)
