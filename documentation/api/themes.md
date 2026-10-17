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

`themes_list` returns three keys:

-   `include`: whether `configuration.yaml` loads themes from `/config/themes`. `state` is `ok`, `missing`, `inline`, `other_layout` or `unknown`. `hint` holds the lines to add. `dir_exists` says whether the folder exists.
-   `files`: one entry per `.yaml` file in `/config/themes`, with `name`, `file` (relative to `/config`), `editable`, `reason` when it is read only, `has_modes`, `var_count` and `mtime`.
-   `loaded`: the theme names Home Assistant has loaded right now.

`state` is `ok` when the include is in place, or when a theme from a file in `/config/themes` is already loaded. Nested includes and packages count.

## Read-only files

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

`themes_get` still returns the theme when the file parsed, so a read-only theme can be shown and copied.

## Save order

`themes_save` checks, in this order:

1.  The name follows the rules: lowercase letters, digits, hyphens and underscores, starting with a letter or digit, at most 64 characters, and not `default` or `backend-selected`.
2.  The theme is valid.
3.  The include state is `ok`. Otherwise the command returns `themes_not_included`.
4.  An existing file needs `overwrite: true`, must be editable, and must match `base_mtime` when you send one.
5.  The name is not loaded by Home Assistant from another file.
6.  The file is written atomically. Comments are not kept. Key order and unknown keys are kept.
7.  Home Assistant reloads its themes.

`loaded` in the result says whether the name is loaded after the reload. A failed reload does not fail the save, because the file is already written. The result then has `loaded: false`.

`themes_delete` removes only an editable file, then reloads the themes.

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
| `not_editable` | `themes_save`, `themes_delete` | The file is read only. See the reasons above. |
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
