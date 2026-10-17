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

A non-admin user calling an admin command gets Home Assistant's `unauthorized` error.

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
