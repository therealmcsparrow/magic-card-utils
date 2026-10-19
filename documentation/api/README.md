# WebSocket API

Magic Card Utils is driven entirely through Home Assistant's WebSocket API. Magic Card and the panel use it, and any other custom card can use it too: store its own templates, link to them by name and use the animation library.

- [Calling a command](#calling-a-command)
- [Who can call what](#who-can-call-what)
- [Errors](#errors)
- [Pages](#pages)

## Calling a command

Use the connection your card already has through `hass`:

```js
// one result
const result = await hass.callWS({ type: "magic_card_utils/get_templates" });

// a subscription: the callback runs for every event
const unsubscribe = await hass.connection.subscribeMessage(
  (event) => console.log(event),
  { type: "magic_card_utils/subscribe_templates" }
);
unsubscribe(); // when your element disconnects
```

`hass.callWS(msg)` and `hass.connection.sendMessagePromise(msg)` do the same thing.

## Who can call what

| Command | Who |
| --- | --- |
| `get_templates`, `subscribe_templates`, `save_template`, `delete_template` | Admin users |
| `get_animations`, `subscribe_animations` | Any signed-in user |
| `save_animation`, `delete_animation` | Admin users |
| `themes_list`, `themes_get`, `themes_save`, `themes_delete` | Admin users |
| `icons_list`, `icons_get`, `shapes_list`, `theme_presets_list`, `subscribe_library` | Any signed-in user |
| `icons_save`, `icons_delete`, `shapes_save`, `shapes_delete`, `theme_presets_save`, `theme_presets_delete` | Admin users |

A non-admin user calling an admin command gets Home Assistant's `unauthorized` error.

### Icon and shape library

The Library, Icons and Shapes tabs and the icon picker use the icon and shape library, which is stored in Home Assistant. Saving, renaming, deleting and importing icons and shapes are admin-only. A saved icon is named `mcu:` followed by its id in Home Assistant's icon picker; see [Using icons in Home Assistant](../panel/library.md#using-icons-in-home-assistant).

All these commands have the prefix `magic_card_utils/`, for example `magic_card_utils/icons_list`.

| Command | Fields | What it does |
| --- | --- | --- |
| `icons_list` | none | Lists the saved icons |
| `icons_get` | `ids`, up to 100 | Gets the icons with those ids |
| `icons_save` | `icon`, optional `base_updated_at` | Saves an icon |
| `icons_delete` | `icon_id` | Deletes an icon |
| `shapes_list` | none | Lists the saved shapes |
| `shapes_save` | `shape`, optional `base_updated_at` | Saves a shape |
| `shapes_delete` | `shape_id` | Deletes a shape |
| `theme_presets_list` | none | Lists the theme presets |
| `theme_presets_save` | `theme_preset`, optional `base_updated_at` | Saves a theme preset |
| `theme_presets_delete` | `theme_preset_id` | Deletes a theme preset |
| `subscribe_library` | none | Sends `saved` and `deleted` events for icons, shapes and theme presets |

Limits:

-   500 icons, each up to 32 KiB.
-   200 shapes, each up to 8 KiB, with 3 to 64 points.
-   100 theme presets, each up to 32 KiB.

A dashboard loads the shape list only when a card on it uses a library shape. A dashboard with no such card sends only the `subscribe_library` subscription.

The names come from the command constants in `custom_components/magic_card_utils/library_contract.py`.

## Errors

A refused command rejects the promise with an error object:

```js
try {
  await hass.callWS({ type: "magic_card_utils/delete_template", name: "kitchen" });
} catch (err) {
  err.code;    // for example "linked_cards"
  err.message; // a sentence for people, for example "Cannot delete 'kitchen': still referenced by 2 card(s)"
}
```

Branch on `code`; the `message` wording can change. Codes used by the integration:

| Code | Command | When |
| --- | --- | --- |
| `not_found` | `save_template` | `old_name` names a template that doesn't exist |
| `name_taken` | `save_template` | Renaming to a name that's already used |
| `linked_cards` | `delete_template` | Cards still link to the template |
| `invalid_format` | `save_animation` | The animation breaks a rule (with an `errors` list), or the library is full (without one) |
| `not_loaded` | Animation commands | The animation library hasn't finished loading |
| `save_failed` | `save_animation`, `delete_animation` | Writing to storage failed |
| `name_taken`, `not_editable`, `conflict`, `themes_not_included`, `read_failed` | Theme commands | A theme file can't be written or read. See [Themes](themes.md#errors) for each code. `invalid_format` on the theme commands also carries an `errors` list. |

Home Assistant's own codes, like `invalid_format` for a missing or wrong payload field and `unauthorized`, can appear too.

## Pages

- [Templates](templates.md): `get_templates`, `subscribe_templates`, `save_template` with renaming, `delete_template`, the template object and linking.
- [Animations](animations.md): `get_animations`, `subscribe_animations`, `save_animation`, `delete_animation`, the change events and the validation errors.
- [Themes](themes.md): `themes_list`, `themes_get`, `themes_save` and `themes_delete` for the theme files in `/config/themes`, their results, read-only reasons and errors.
