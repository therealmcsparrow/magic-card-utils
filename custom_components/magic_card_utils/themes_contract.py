"""Contract: theme-files 2.0.0 (Architect-owned).

WebSocket commands for the theme editor (Magic Card Utils panel "Themes" tab, element from
magic-card's dist/magic-card-theme-editor.js; TypeScript mirror: magic-card
src/contracts/theme-editor.ts). Implementation: themes.py (commands and the theme store),
theme_files.py (file I/O, validation, YAML), include_scan.py (configuration.yaml include detection).

Every command is admin only (@websocket_api.require_admin) and async (@async_response); file I/O
runs in the executor. Nothing outside ``hass.config.path(THEMES_DIR)`` is ever written or deleted,
and configuration.yaml is only read.

Where themes live (2.0.0): the editor's themes are kept in the integration's own storage,
Store(hass, STORAGE_VERSION, STORAGE_KEY_THEMES) -> {"themes": {name: {"theme": ThemeDoc, "updated": float}}}.
Every save goes there. Home Assistant applies only themes from the themes folder, so a save can also
publish the theme: write THEMES_DIR/<name>.yaml (``publish: true``). Publishing and removing a file need
the "Allow themes to be saved in the themes folder" option of the config entry (settings
CONF_THEME_FILES, settings.theme_files_enabled, off by default); storage saves do not.

Commands (``type``: request -> result):
- magic_card_utils/themes_list  {} -> {include, files, loaded, writes_enabled, storage: true}
- magic_card_utils/themes_get   {name} -> {name, file, editable, reason?, stored, folder, mtime, theme}
- magic_card_utils/themes_save  {name, theme, overwrite?=False, base_mtime?, publish?=False}
                                -> {name, file, mtime, loaded, stored: true, published, folder}
- magic_card_utils/themes_delete {name, file?=False} -> {stored: bool, file: bool}

List entries: one per stored theme (editable, stored, mtime = the stored ``updated``, ``folder`` says
how themes/<name>.yaml relates to it), then one per theme file that is not a stored theme's own file.
A folder file the editor wrote (starts with WRITTEN_HEADER) is editable with stored False: the first
save imports it into storage under the same name and keeps it linked to the file. Any other file is
read-only with a ReadOnlyReason; the editor copies it to a new name instead (an import).

Folder state (``folder``): "none" no themes/<name>.yaml; "current" the editor's file holds the same
theme; "outdated" the editor's file holds an older version; "foreign" a file the editor did not
write (or cannot read) has that name.

Save order: name rule -> theme validation -> name rules (a foreign file with that name, or a name HA
loaded from somewhere else: name_taken; a stored theme or an own folder file: overwrite required, else
name_taken) -> base_mtime must match the stored ``updated`` (or the own file's mtime when the theme is
not stored yet) when given (else conflict) -> when publishing: writes option on (else theme_files_off),
include state "ok" (else themes_not_included), themes/<name>.yaml absent or the editor's own (else
not_editable) -> atomic file write when publishing -> storage save -> frontend.reload_themes after a
file write -> loaded = name in HA themes.

Delete order: name rule -> with ``file``: writes option on (else theme_files_off), themes/<name>.yaml
must exist (else not_found) and be the editor's own (else not_editable) -> nothing stored and no file
asked for: not_found -> unlink -> remove from storage -> frontend.reload_themes after an unlink.
Every check runs before anything is changed.

Editable file (one the editor may replace or delete): THEMES_DIR/<name>.yaml at the top level (not a
subfolder, not a symlink), size <= MAX_FILE_BYTES, parses with yaml.safe_load (HA tags like !secret
make it read-only), holds exactly one top-level key equal to the file stem whose value is a mapping,
and starts with WRITTEN_HEADER, so the editor only ever changes or deletes files it wrote itself.

File format written: ``{name: theme}`` through yaml.safe_dump(sort_keys=False, allow_unicode=True,
default_flow_style=False), preceded by WRITTEN_HEADER. Key order and unknown keys are kept; comments
are not.

2.0.0 breaking changes from 1.1.0: themes_save without ``publish`` no longer writes a file; themes_delete
removes the stored theme and only removes the file with ``file: true``; the "writes_off" reason is gone
(the option no longer locks themes).
"""

from __future__ import annotations

import re
from typing import Literal, NotRequired, TypedDict

THEME_FILES_CONTRACT_VERSION = "2.0.0"

THEMES_DIR = "themes"

STORAGE_KEY_THEMES = "magic_card_utils.themes"
STORAGE_VERSION = 1
MAX_STORED_THEMES = 500

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
    "not_own",  # 1.1.0: the file does not start with WRITTEN_HEADER (not written by this editor)
]

# 2.0.0: how themes/<name>.yaml relates to a theme (see the module docstring).
FolderState = Literal["none", "current", "outdated", "foreign"]

ERR_INVALID_FORMAT = "invalid_format"  # with error["errors"] = [{path, message}]
ERR_NOT_FOUND = "not_found"
ERR_NAME_TAKEN = "name_taken"
ERR_NOT_EDITABLE = "not_editable"
ERR_CONFLICT = "conflict"
ERR_THEMES_NOT_INCLUDED = "themes_not_included"
ERR_TOO_LARGE = "too_large"
ERR_SAVE_FAILED = "save_failed"
ERR_READ_FAILED = "read_failed"
ERR_THEME_FILES_OFF = "theme_files_off"  # the themes-folder option is off (publish, file delete)
# Non-admin callers get HA's own "unauthorized" from require_admin.


class IncludeStatus(TypedDict):
    state: IncludeState
    dir_exists: bool
    hint: str


class ThemeFileEntry(TypedDict):
    name: str
    file: str  # relative to /config, forward slashes; for a stored theme, where it publishes to
    editable: bool
    reason: NotRequired[ReadOnlyReason]
    has_modes: bool
    var_count: int
    mtime: float  # stored theme: its ``updated``; folder file: the file's mtime
    stored: bool  # 2.0.0
    folder: FolderState  # 2.0.0


class ThemeListResult(TypedDict):
    include: IncludeStatus
    files: list[ThemeFileEntry]
    loaded: list[str]
    writes_enabled: bool  # 1.1.0: the themes-folder option
    storage: bool  # 2.0.0: always True; themes are kept in the integration's storage


class ThemeGetResult(TypedDict):
    name: str
    file: str
    editable: bool
    reason: NotRequired[ReadOnlyReason]
    stored: bool  # 2.0.0
    folder: FolderState  # 2.0.0
    mtime: float
    theme: dict


class ThemeSaveResult(TypedDict):
    name: str
    file: str
    mtime: float
    loaded: bool
    stored: bool  # 2.0.0: always True
    published: bool  # 2.0.0: themes/<name>.yaml was written
    folder: FolderState  # 2.0.0


class ThemeDeleteResult(TypedDict):
    stored: bool  # the stored theme was removed
    file: bool  # themes/<name>.yaml was removed
