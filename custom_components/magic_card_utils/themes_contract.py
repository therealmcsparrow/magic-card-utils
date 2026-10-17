"""Contract: theme-files 1.0.0 (Architect-owned).

WebSocket commands for the theme editor (Magic Card Utils panel "Themes" tab, element from
magic-card's dist/magic-card-theme-editor.js; TypeScript mirror: magic-card
src/contracts/theme-editor.ts). Implementation: themes.py (commands), theme_files.py (file I/O,
validation, YAML), include_scan.py (configuration.yaml include detection).

Every command is admin only (@websocket_api.require_admin) and async (@async_response); file I/O
runs in the executor. Nothing outside ``hass.config.path(THEMES_DIR)`` is ever written or deleted,
and configuration.yaml is only read.

Commands (``type``: request -> result):
- magic_card_utils/themes_list  {} -> {include, files, loaded}
- magic_card_utils/themes_get   {name} -> {name, file, editable, reason?, mtime, theme}
- magic_card_utils/themes_save  {name, theme, overwrite?=False, base_mtime?} -> {name, file, mtime, loaded}
- magic_card_utils/themes_delete {name} -> {}

Save order: name rule -> theme validation -> include state must be "ok" (else themes_not_included)
-> existing file: overwrite required (else name_taken), must be editable (else not_editable),
base_mtime must match when given (else conflict) -> name loaded by HA from another file
(else name_taken) -> atomic write -> frontend.reload_themes (blocking) -> loaded = name in HA themes.

Delete: editable file only (else not_editable / not_found) -> unlink -> frontend.reload_themes.

Editable file: THEMES_DIR/<name>.yaml at the top level (not a subfolder, not a symlink), size <=
MAX_FILE_BYTES, parses with yaml.safe_load (HA tags like !secret make it read-only), and holds
exactly one top-level key equal to the file stem whose value is a mapping. Every other *.yaml file
under THEMES_DIR is listed read-only with a ReadOnlyReason; themes_get still returns its theme when
it parsed.

File format written: ``{name: theme}`` through yaml.safe_dump(sort_keys=False, allow_unicode=True,
default_flow_style=False), preceded by WRITTEN_HEADER. Key order and unknown keys are kept; comments
are not (the editor says so on the first save of an existing file).
"""

from __future__ import annotations

import re
from typing import Literal, NotRequired, TypedDict

THEME_FILES_CONTRACT_VERSION = "1.0.0"

THEMES_DIR = "themes"

CMD_LIST = "magic_card_utils/themes_list"
CMD_GET = "magic_card_utils/themes_get"
CMD_SAVE = "magic_card_utils/themes_save"
CMD_DELETE = "magic_card_utils/themes_delete"

# Theme name == file stem. Lowercase so names never collide on case-insensitive filesystems.
THEME_NAME_RE = re.compile(r"^[a-z0-9][a-z0-9_-]{0,63}$")
# HA built-in names a file may not take.
RESERVED_NAMES = frozenset({"default", "backend-selected"})
# Theme variable keys (no leading "--").
THEME_VAR_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9_-]{0,99}$")
MODES_KEY = "modes"
MODE_NAMES = ("light", "dark")

MAX_FILE_BYTES = 256 * 1024
MAX_VARS = 2000  # base + both modes together
MAX_VALUE_CHARS = 4000  # card-mod values are multi-line CSS
MAX_FILES_LISTED = 500
# Values: str (no control characters except \n and \t), int or float (not bool, finite).

WRITTEN_HEADER = "# Written by the Magic Card theme editor. Comments in this file are not kept.\n"

INCLUDE_HINT = "frontend:\n  themes: !include_dir_merge_named themes\n"

IncludeState = Literal["ok", "missing", "inline", "other_layout", "unknown"]
# ok: frontend.themes is !include_dir_merge_named pointing at THEMES_DIR, or a theme from a file
#     in THEMES_DIR is loaded by HA right now (covers packages and nested includes).
# missing: no frontend.themes. inline: themes written in configuration.yaml itself.
# other_layout: another include tag or directory. unknown: configuration.yaml could not be read.

ReadOnlyReason = Literal[
    "subfolder",
    "multiple_themes",
    "name_mismatch",
    "invalid_name",
    "yaml_tags",
    "parse_error",
    "too_large",
    "symlink",
]

ERR_INVALID_FORMAT = "invalid_format"  # with error["errors"] = [{path, message}]
ERR_NOT_FOUND = "not_found"
ERR_NAME_TAKEN = "name_taken"
ERR_NOT_EDITABLE = "not_editable"
ERR_CONFLICT = "conflict"
ERR_THEMES_NOT_INCLUDED = "themes_not_included"
ERR_TOO_LARGE = "too_large"
ERR_SAVE_FAILED = "save_failed"
ERR_READ_FAILED = "read_failed"
# Non-admin callers get HA's own "unauthorized" from require_admin.


class IncludeStatus(TypedDict):
    state: IncludeState
    dir_exists: bool
    hint: str


class ThemeFileEntry(TypedDict):
    name: str
    file: str  # relative to /config, forward slashes
    editable: bool
    reason: NotRequired[ReadOnlyReason]
    has_modes: bool
    var_count: int
    mtime: float


class ThemeListResult(TypedDict):
    include: IncludeStatus
    files: list[ThemeFileEntry]
    loaded: list[str]


class ThemeGetResult(TypedDict):
    name: str
    file: str
    editable: bool
    reason: NotRequired[ReadOnlyReason]
    mtime: float
    theme: dict


class ThemeSaveResult(TypedDict):
    name: str
    file: str
    mtime: float
    loaded: bool
