# Themes

Four WebSocket commands manage the theme files in `/config/themes` for the Themes tab of the panel. Any custom card can call them too, but all four are for admin users only.

Commands and results:

| Command | Request | Result |
| --- | --- | --- |
| `magic_card_utils/themes_list` | `{}` | `{include, files, loaded}` |
| `magic_card_utils/themes_get` | `{name}` | `{name, file, editable, reason?, mtime, theme}` |
| `magic_card_utils/themes_save` | `{name, theme, overwrite?, base_mtime?}` | `{name, file, mtime, loaded}` |
| `magic_card_utils/themes_delete` | `{name}` | `{}` |

## Calling a command

```js
const list = await hass.callWS({ type: "magic_card_utils/themes_list" });

const saved = await hass.callWS({
  type: "magic_card_utils/themes_save",
  name: "warm-night",
  theme: {
    "primary-color": "#c2410c",
    modes: { dark: { "primary-background-color": "#1c1917" } },
  },
  base_mtime: 1760700000.0, // optional: the mtime you read with themes_get
});
```

`theme` is a mapping of Home Assistant theme variables. Values are strings, or numbers that are not `NaN` or infinite. The optional `modes` key holds `light` and `dark` mappings. A value is at most 4000 characters, the theme has at most 2000 variables across the shared base and both modes, and a file is at most 256 KB.

## The list result

`themes_list` returns four keys:

-   `include`: whether `configuration.yaml` loads themes from `/config/themes`. `state` is `ok`, `missing`, `inline`, `other_layout` or `unknown`. `hint` holds the lines to add. `dir_exists` says whether the folder exists.
-   `files`: one entry per `.yaml` file in `/config/themes`, with `name`, `file` (relative to `/config`), `editable`, `reason` when it is read only, `has_modes`, `var_count` and `mtime`.
-   `loaded`: the theme names Home Assistant has loaded right now.
-   `writes_enabled`: whether the **Theme files** option is on (theme-files 1.1.0). While it is `false`, every file is read only with reason `writes_off`, and `themes_save` and `themes_delete` answer `theme_files_off`.

`state` is `ok` when the include is in place, or when a theme from a file in `/config/themes` is already loaded. Nested includes and packages count.

## The Theme files option

Saving and deleting theme files is off by default. An administrator turns it on under Settings > Devices & services > Magic Card Utils > Configure > **Theme files**. Turning it on shows a disclaimer first, and nothing is stored until it is confirmed. Turning it off needs no confirmation. While it is off, `themes_list` and `themes_get` still work, so themes can be shown and their YAML copied.

## Read-only files

The editor changes and deletes only its own files: a file is editable only when its first line is `# Written by the Magic Card theme editor.`, which every save writes. Any other file stays as it is; copy it and save it under a new name.

`editable` is `false` for a file that cannot be rewritten safely. `reason` is one of:

| Reason | When |
| --- | --- |
| `subfolder` | The file is in a subfolder of `/config/themes`. |
| `multiple_themes` | The file holds more than one theme. |
| `name_mismatch` | The top-level key is not the file name. |
| `invalid_name` | The file name is not an allowed theme name. |
| `yaml_tags` | The file uses Home Assistant tags such as `!secret`. |
| `parse_error` | The file cannot be read as YAML, or it uses aliases or merge keys. |
| `too_large` | The file is larger than 256 KB. |
| `symlink` | The file is a symbolic link. |
| `not_own` | The theme editor did not write the file: its first line is not the editor's header. |
| `writes_off` | The **Theme files** option is off. Applies to every file that would otherwise be editable. |

`themes_get` still returns the theme when the file parsed, so a read-only theme can be shown and copied.

## Save order

`themes_save` checks, in this order:

1.  The **Theme files** option is on. Otherwise the command returns `theme_files_off` before anything else.
2.  The name follows the rules: lowercase letters, digits, hyphens and underscores, starting with a letter or digit, at most 64 characters, and not `default` or `backend-selected`.
3.  The theme is valid.
4.  The include state is `ok`. Otherwise the command returns `themes_not_included`.
5.  An existing file needs `overwrite: true`, must be editable (written by the editor), and must match `base_mtime` when you send one.
6.  The name is not loaded by Home Assistant from another file.
7.  The file is written atomically, with the editor's header on the first line. Comments are not kept. Key order and unknown keys are kept.
8.  Home Assistant reloads its themes.

`loaded` in the result says whether the name is loaded after the reload. A failed reload does not fail the save, because the file is already written. The result then has `loaded: false`.

`themes_delete` removes only an editable file, so only a file the editor wrote, then reloads the themes. It also answers `theme_files_off` while the option is off.

A name never adds a path. A name with `../`, a slash, a backslash, an empty value or a leading dot is refused, and nothing is written or deleted outside `/config/themes`. A symbolic link is refused on save and on delete.

## Errors

A refused command rejects with the error code. For `invalid_format` on a field, `errors` lists the fields:

```js
try {
  await hass.callWS({ type: "magic_card_utils/themes_save", name: "../x", theme: {} });
} catch (err) {
  err.code;   // "invalid_format"
  err.errors; // [{ path: "name", message: "..." }]
}
```

| Code | Command | When |
| --- | --- | --- |
| `invalid_format` | `themes_save`, `themes_delete` | The name or the theme breaks a rule. `errors` lists the fields. A wrong type for `overwrite` or `base_mtime` returns Home Assistant's own `invalid_format` without `errors`. |
| `not_found` | `themes_get`, `themes_delete` | No such file in `/config/themes`, or the name is invalid for `themes_get`. |
| `name_taken` | `themes_save` | A file with that name exists and `overwrite` is not set, or the name is loaded from another file. |
| `not_editable` | `themes_save`, `themes_delete` | The file is read only, for example because the editor did not write it. See the reasons above. |
| `theme_files_off` | `themes_save`, `themes_delete` | The **Theme files** option is off. Nothing is written or deleted. |
| `conflict` | `themes_save` | `base_mtime` does not match the file on disk. Nothing is written. |
| `themes_not_included` | `themes_save` | The include state is not `ok`. Nothing is written. |
| `too_large` | `themes_save` | The theme is larger than the file limit. |
| `save_failed` | `themes_save` | Writing the file failed. The message does not include the path. |
| `read_failed` | `themes_get` | The file could not be read. The message does not include the path. |
| `unauthorized` | All four | The caller is not an admin. Home Assistant's own code. |

## Who can call what

All four commands are admin only. Non-admin users get Home Assistant's `unauthorized` error, and nothing is written.

## Related

-   [Panel](../panel/themes.md): the Themes tab.
-   [Magic Card theme docs](https://github.com/therealmcsparrow/magic-card/blob/main/documentation/themes/README.md): the editor and the include lines.
