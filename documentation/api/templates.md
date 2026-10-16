# Templates API

All template commands need an admin user. Templates are keyed by name; see [Templates and linking](../concepts/templates.md) for what the fields mean.

- [Commands](#commands)
- [get_templates](#get_templates)
- [subscribe_templates](#subscribe_templates)
- [save_template](#save_template)
- [delete_template](#delete_template)
- [The template object](#the-template-object)
- [Linking from your own card](#linking-from-your-own-card)

## Commands

| Command type | Payload | Result |
| --- | --- | --- |
| `magic_card_utils/get_templates` | none | `{ templates: { [name]: template } }` |
| `magic_card_utils/subscribe_templates` | none | Empty. Events: `{ templates: { [name]: template } }` |
| `magic_card_utils/save_template` | `{ name, template, card_type?, old_name? }` | `{ success: true }` |
| `magic_card_utils/delete_template` | `{ name }` | `{ success: true }` |

## get_templates

Returns every template with a fresh `linked_cards` count.

```js
const { templates } = await hass.callWS({ type: "magic_card_utils/get_templates" });

for (const [name, template] of Object.entries(templates)) {
  console.log(name, template.description, template.config);
}
```

## subscribe_templates

Sends the whole collection as the first event straight after subscribing, then again after every change. Each event has all templates, not only the changed one, so replace what you had.

```js
const unsubscribe = await hass.connection.subscribeMessage(
  (event) => {
    this._templates = event.templates;
  },
  { type: "magic_card_utils/subscribe_templates" }
);
```

An event is sent when a template is saved, renamed or deleted, and when any dashboard is saved (the linked-card counts may have changed).

## save_template

Creates a template or replaces the one with the same name.

| Field | Required | Meaning |
| --- | --- | --- |
| `name` | Yes | The template name |
| `template` | Yes | The template object; see [below](#the-template-object). Send the whole object: it replaces the stored one. |
| `card_type` | No | The card type. Without it, the integration uses `template.config.type`, and else keeps the type the template already had. |
| `old_name` | No | Renames: the template stored under `old_name` moves to `name` |

```js
await hass.callWS({
  type: "magic_card_utils/save_template",
  name: "kitchen-light-card",
  template: {
    description: "Reusable kitchen light card",
    config: { type: "custom:my-card", entity: "light.kitchen" },
  },
});
```

Before storing, the integration removes every `not_synced` list from `template.config` (see [not_synced](../concepts/templates.md#card-specific-settings-not_synced)) and sets `card_type`, `created_at` and `last_updated`.

### Renaming

Pass the current name as `old_name` and the new one as `name`:

```js
await hass.callWS({
  type: "magic_card_utils/save_template",
  old_name: "kitchen-light-card",
  name: "kitchen-lights",
  template: { /* the full template */ },
});
```

The template keeps its `created_at`. Cards linking to the old name aren't changed.

| Error code | When |
| --- | --- |
| `not_found` | No template is called `old_name` |
| `name_taken` | A template called `name` already exists |

## delete_template

```js
await hass.callWS({ type: "magic_card_utils/delete_template", name: "kitchen-lights" });
```

Deleting a name that doesn't exist also succeeds. A template that cards still link to isn't deleted: the command fails with `linked_cards`.

## The template object

Put anything you need in the template. These fields have a meaning:

| Field | Type | Meaning |
| --- | --- | --- |
| `config` | object | The card configuration. `not_synced` lists inside are removed on save. |
| `description` | string | Shown under the name in the panel |
| `card_type` | string | Set by the integration (see `save_template`). Shown in the panel's Card Type column. |
| `linked_cards` | number | Worked out by the integration on every read. A value you send is ignored. |
| `created_at`, `last_updated` | string, ISO 8601 UTC | Set by the integration. Don't send them. |

## Linking from your own card

1. Store the template name in your card's configuration as `template: <name>`. That's what the integration counts as a link.
2. Subscribe with `subscribe_templates` and apply the template with that name when it arrives or changes.
3. Leave `linked_cards` alone; the integration counts the links itself.
