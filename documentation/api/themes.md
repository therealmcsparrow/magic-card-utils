# Themes

Four WebSocket commands manage the themes of the Themes tab in the panel. Any custom card can call them too, but all four are for admin users only.

Magic Card Utils keeps every theme the editor saves in its own storage, `.storage/magic_card_utils.themes`. Home Assistant applies a theme only once it is a file in `/config/themes`, so a save can also write the theme there. That second step is called publishing. It needs the **Allow themes to be saved in the themes folder** option, and it only ever writes, replaces or deletes files Magic Card wrote itself. This is contract theme-files 2.0.0.

Commands and results:

| Command | Request | Result |
| --- | --- | --- |
| `magic_card_utils/themes_list` | `{}` | `{include, files, loaded, writes_enabled, storage}` |
| `magic_card_utils/themes_get` | `{name}` | `{name, file, editable, reason?, stored, folder, mtime, theme}` |
| `magic_card_utils/themes_save` | `{name, theme, overwrite?, base_mtime?, publish?}` | `{name, file, mtime, loaded, stored, published, folder}` |
| `magic_card_utils/themes_delete` | `{name, file?}` | `{stored, file}` |

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
  overwrite: true,         // needed when the theme is already saved
  base_mtime: 1760700000.0, // optional: the mtime you read with themes_get
  publish: true,            // optional: also write /config/themes/warm-night.yaml
});
```

`theme` is a mapping of Home Assistant theme variables. Values are strings, or numbers that are not `NaN` or infinite. The optional `modes` key holds `light` and `dark` mappings. A value is at most 4000 characters, the theme has at most 2000 variables across the shared base and both modes, and a theme is at most 256 KB as a file. Magic Card Utils keeps at most 500 themes.

## The list result

`themes_list` returns five keys:

-   `include`: whether `configuration.yaml` loads themes from `/config/themes`. `state` is `ok`, `missing`, `inline`, `other_layout` or `unknown`. `hint` holds the lines to add. `dir_exists` says whether the folder exists.
-   `files`: one entry per saved theme, then one per `.yaml` file in `/config/themes` that is not the file of a saved theme. Each entry has `name`, `file` (relative to `/config`), `editable`, `reason` when it is read only, `stored`, `folder`, `has_modes`, `var_count` and `mtime`. For a saved theme, `file` is where it is or would be published, and `mtime` is the time of its last save.
-   `loaded`: the theme names Home Assistant has loaded right now.
-   `writes_enabled`: whether the **Allow themes to be saved in the themes folder** option is on.
-   `storage`: always `true` from theme-files 2.0.0 on. A client can use it to tell this contract from 1.x.

`state` is `ok` when the include is in place, or when a theme from a file in `/config/themes` is already loaded. Nested includes and packages count.

### Where a theme is

`stored` says whether Magic Card Utils keeps the theme. `folder` says where it stands in `/config/themes`:

| `folder` | Saved theme (`stored: true`) | File only (`stored: false`) |
| --- | --- | --- |
| `none` | No file `themes/<name>.yaml` yet. Home Assistant does not apply it. | Not used. |
| `current` | The file Magic Card wrote matches the saved theme. | A file Magic Card wrote. Saving it in the editor imports it under the same name. |
| `outdated` | The theme changed since it was last published. | Not used. |
| `foreign` | `themes/<name>.yaml` exists but Magic Card did not write it. The theme can still be saved, but not published. | A file Magic Card did not write, or one it cannot safely rewrite. Read only. |

## The folder option

Writing to `/config/themes` is off by default. An administrator turns it on under Settings > Devices & services > Magic Card Utils > Configure > **Allow themes to be saved in the themes folder**. Turning it on shows a disclaimer first, and nothing is stored until it is confirmed. Turning it off needs no confirmation.

While it is off, themes are still saved, listed, read and deleted in Magic Card Utils. Only `publish: true` and `file: true` answer `theme_files_off`.

## Read-only files

A file in `/config/themes` is Magic Card's own when its first line is `# Written by the Magic Card theme editor.`, which every publish writes. Any other file is never changed, replaced or deleted. To edit one, copy it in the editor and save it under a new name.

`editable` is `false` for a file Magic Card may not rewrite. `reason` is one of:

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
| `not_own` | Magic Card did not write the file: its first line is not the editor's header. |

Saved themes are always editable. `themes_get` returns the saved copy when there is one, and otherwise reads the file. It still returns the theme of a read-only file when the file parsed, so it can be shown and copied.

## Save order

`themes_save` checks, in this order:

1.  The name follows the rules: lowercase letters, digits, hyphens and underscores, starting with a letter or digit, at most 64 characters, and not `default` or `backend-selected`.
2.  The theme is valid and fits the size limit.
3.  For a name that is not saved yet:
    -   A file `themes/<name>.yaml` that Magic Card did not write returns `name_taken`. Pick another name.
    -   A name Home Assistant loads from another file returns `name_taken`.
    -   A file Magic Card wrote needs `overwrite: true`. The save imports it, and `base_mtime` is checked against the file's mtime.
4.  For a saved name, `overwrite: true` is needed, and `base_mtime` is checked against the time of the last save.
5.  A `base_mtime` that does not match returns `conflict`.
6.  With `publish: true`:
    -   The option is on. Otherwise `theme_files_off`.
    -   The include state is `ok`. Otherwise `themes_not_included`.
    -   A file `themes/<name>.yaml` that Magic Card did not write returns `not_editable`.
    -   A name Home Assistant loads from another file returns `name_taken`.
    -   The file is written atomically, with the editor's header on the first line. Comments are not kept. Key order and unknown keys are kept.
7.  The theme is saved in Magic Card Utils. A full store (500 themes) returns `too_large` before anything is written.
8.  After a publish, Home Assistant reloads its themes.

A save without `publish` needs neither the option nor the include lines. `published` and `folder` in the result say where the theme now stands. `loaded` says whether the name is loaded after the reload. A failed reload does not fail the save, because the file is already written; the result then has `loaded: false`.

## Delete

`themes_delete` removes the saved theme. With `file: true` it first deletes `themes/<name>.yaml`, which needs the option to be on and the file to be Magic Card's own. A file-only theme can be deleted only with `file: true`. Deleting a file reloads the themes. The result says what was removed: `stored` is `true` when a saved theme was removed, and `file` is `true` when a file was deleted.

A name never adds a path. A name with `../`, a slash, a backslash, an empty value or a leading dot is refused, and nothing is written or deleted outside `/config/themes`. A symbolic link is refused on publish and on delete.

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
| `invalid_format` | `themes_save`, `themes_delete` | The name or the theme breaks a rule. `errors` lists the fields. A wrong type for `overwrite`, `base_mtime`, `publish` or `file` returns Home Assistant's own `invalid_format` without `errors`. |
| `not_found` | `themes_get`, `themes_delete` | No saved theme and no such file, or the name is invalid for `themes_get`. With `file: true`, no file `themes/<name>.yaml`. |
| `name_taken` | `themes_save` | The theme is saved or Magic Card's file exists and `overwrite` is not set, a file Magic Card did not write has that name, or the name is loaded from another file. |
| `not_editable` | `themes_save`, `themes_delete` | Publishing over, or deleting, a file Magic Card did not write. See the reasons above. |
| `theme_files_off` | `themes_save`, `themes_delete` | `publish: true` or `file: true` while the option is off. Nothing is written or deleted. |
| `conflict` | `themes_save` | `base_mtime` does not match. Nothing is written. |
| `themes_not_included` | `themes_save` | `publish: true` while the include state is not `ok`. Nothing is written. |
| `too_large` | `themes_save` | The theme is larger than the file limit, or Magic Card Utils already keeps 500 themes. |
| `save_failed` | `themes_save`, `themes_delete` | Writing the file or the storage failed. The message does not include the path. |
| `read_failed` | `themes_list`, `themes_get` | The themes could not be read. The message does not include the path. |
| `unauthorized` | All four | The caller is not an admin. Home Assistant's own code. |

## Changes from theme-files 1.x

-   Saves go to Magic Card Utils storage first. Writing `/config/themes` is the separate `publish` step.
-   `stored`, `folder`, `storage` and `published` are new. `themes_delete` returns `{stored, file}` instead of `{}`.
-   The `writes_off` reason is gone: with the option off, saved themes stay editable, and only publishing and deleting files are refused.

## Who can call what

All four commands are admin only. Non-admin users get Home Assistant's `unauthorized` error, and nothing is written.

## Related

-   [Panel](../panel/themes.md): the Themes tab.
-   [Magic Card theme docs](https://github.com/therealmcsparrow/magic-card/blob/main/documentation/themes/README.md): the editor and the include lines.
