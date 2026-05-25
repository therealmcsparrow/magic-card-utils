# Magic Card Utils

[![HACS][hacs-badge]][hacs-url]
[![GitHub Version][version-badge]][version-url]
[![GitHub License][license-badge]][license-url]
[![GitHub Last Commit][last-commit-badge]][last-commit-url]
[![GitHub Issues][issues-badge]][issues-url]

## Introduction

Welcome to Magic Card Utils! This integration for Home Assistant provides a shared template storage for the [Magic Card](https://github.com/your-repo/magic-card) frontend. It allows you to create, manage, and reuse templates for your Magic Cards directly within Home Assistant. Beta version.

## Features

- **Shared Template Storage:** Store and manage your Magic Card templates in a centralized location.
- **Websocket API:** Provides a websocket API for creating, reading, updating, and deleting templates.
- **Easy Configuration:** Configure the integration through the Home Assistant UI.

## Installation

### HACS (Home Assistant Community Store)

1.  Go to HACS.
2.  Go to "Integrations".
3.  Click the 3 dots in the top right corner and select "Custom repositories".
4.  Add the URL to the repository and select the category "Integration".
5.  Click the "ADD" button.
6.  You will now find the "Magic Card Utils" integration in the list.
7.  Click on it and then click "INSTALL".
8.  Restart Home Assistant.

### Manual Installation

1.  Copy the `magic_card_utils` folder from the `custom_components` folder in this repository to the `custom_components` folder in your Home Assistant configuration directory.
2.  Restart Home Assistant.

## Configuration

1.  Go to "Settings" -> "Devices & Services".
2.  Click the "+ ADD INTEGRATION" button.
3.  Search for "Magic Card Utils" and click on it.
4.  Follow the on-screen instructions to complete the setup.

## Usage

Once the integration is installed and configured, you can use the websocket API to manage your templates. If you have enabled the side panel, you can access it from the Home Assistant sidebar to view all your saved templates.

The side panel displays a table with the following columns:
- **Name:** The name of the template.
- **Description:** A short description of the template.
- **Linked Cards:** The number of cards linked to the template.
- **Created:** The date the template was created.
- **Last Updated:** The date the template was last updated.

## Integrating from a third-party card

Magic Card Utils exposes a Home Assistant WebSocket API so any custom Lovelace card can store its own templates here and link to them by name. All commands require an **admin** user (the same auth context the HA frontend already uses).

The integration acts as a name-keyed key/value store: `name` is the unique id, `template` is a free-form object you define. Two timestamp fields (`created_at`, `last_updated`) are added by the server on save. If `template.config` is present, any `not_synced` arrays inside it are stripped before storage so card-instance-specific state doesn't leak into the shared template.

### Commands

| Command type | Payload | Result / event |
|---|---|---|
| `magic_card_utils/get_templates` | — | Result: `{ templates: { [name]: template } }` |
| `magic_card_utils/subscribe_templates` | — | Result: empty. Initial state and every subsequent change is delivered as an event with `{ templates: { [name]: template } }` |
| `magic_card_utils/save_template` | `{ name: string, template: object }` | Result: `{ success: true }`. Broadcasts to all subscribers. Existing `name` is overwritten. |
| `magic_card_utils/delete_template` | `{ name: string }` | Result: `{ success: true }`. Broadcasts to all subscribers. |

### Template object

You can put anything you want in the template, but the integration recognises a few conventional fields used by the side panel:

| Field | Type | Purpose |
|---|---|---|
| `description` | string | Shown in the Name column under the template name. |
| `linked_cards` | number | Shown in the Linked Cards column. The integration does **not** track linkage itself — it's the card's responsibility to maintain this count. |
| `config` | object | Recommended container for the actual card configuration. Any `not_synced` arrays inside are stripped on save. |
| `created_at`, `last_updated` | string (ISO 8601 UTC) | Managed by the server. Do not set these yourself. |

### Example: one-shot fetch

```js
const { templates } = await hass.connection.sendMessagePromise({
  type: "magic_card_utils/get_templates",
});

for (const [name, template] of Object.entries(templates)) {
  console.log(name, template.description, template.config);
}
```

### Example: live subscription

Use this when your card needs to react to changes from other instances or from the side panel.

```js
const unsubscribe = await hass.connection.subscribeMessage(
  (msg) => {
    this._templates = msg.templates;
    this.requestUpdate();
  },
  { type: "magic_card_utils/subscribe_templates" }
);

// Later, when your element disconnects:
unsubscribe();
```

The initial state arrives as the first event immediately after subscribing — there is no separate initial fetch needed.

### Example: save and delete

```js
await hass.connection.sendMessagePromise({
  type: "magic_card_utils/save_template",
  name: "kitchen-light-card",
  template: {
    description: "Reusable kitchen light card",
    linked_cards: 0,
    config: {
      type: "custom:my-card",
      entity: "light.kitchen",
      rows: [/* ... */],
    },
  },
});

await hass.connection.sendMessagePromise({
  type: "magic_card_utils/delete_template",
  name: "kitchen-light-card",
});
```

### Linking a card to a template

Linkage is by **name**. A consumer card typically:

1. Stores a `template_name` reference in its own Lovelace config.
2. On render, calls `get_templates` (or maintains a `subscribe_templates` subscription) and looks up its template by that name.
3. Optionally increments `template.linked_cards` and calls `save_template` when a new card binds to a template — and decrements on removal — so the side panel's Linked Cards column stays accurate.

Because templates are server-broadcast, every linked card across every dashboard updates automatically when the template changes.

## Support

If you have any issues with this integration, please [open an issue on GitHub](https://github.com/McSparrow/magic-card-utils/issues).

## Contributing

Contributions are welcome! If you would like to contribute to this project, please read the [contributing guidelines](https://github.com/McSparrow/magic-card-utils/blob/main/CONTRIBUTING.md).

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](https://github.com/McSparrow/magic-card-utils/blob/main/LICENSE) file for details.


[hacs-badge]: https://img.shields.io/badge/HACS-Custom-41BDF5.svg
[hacs-url]: https://hacs.xyz/
[version-badge]: https://img.shields.io/github/package-json/v/therealmcsparrow/magic-card-utils
[version-url]: https://github.com/therealmcsparrow/magic-card-utils/releases
[license-badge]: https://img.shields.io/github/license/therealmcsparrow/magic-card-utils
[license-url]: https://github.com/therealmcsparrow/magic-card-utils/blob/main/LICENSE
[last-commit-badge]: https://img.shields.io/github/last-commit/therealmcsparrow/magic-card-utils
[last-commit-url]: https://github.com/therealmcsparrow/magic-card-utils/commits/main
[issues-badge]: https://img.shields.io/github/issues/therealmcsparrow/magic-card-utils
[issues-url]: https://github.com/therealmcsparrow/magic-card-utils/issues
