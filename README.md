# Magic Card Utils

[![HACS][hacs-badge]][hacs-url]
[![GitHub Release][version-badge]][version-url]
[![GitHub License][license-badge]][license-url]
[![GitHub Last Commit][last-commit-badge]][last-commit-url]
[![GitHub Issues][issues-badge]][issues-url]

## Introduction

Magic Card Utils is a Home Assistant integration that provides shared template storage for the [Magic Card](https://github.com/therealmcsparrow/magic-card) frontend. Save a card once as a template, link it from any number of dashboards, and manage all templates from a sidebar panel.

> **Beta:** this integration is under active development. Expect changes between versions.

## Features

- **Shared template storage:** templates are stored centrally in Home Assistant and shared by every dashboard.
- **Templates panel:** a sidebar panel to browse, preview, edit, rename, duplicate and delete templates.
- **Studio editing:** open a template straight into the full-screen Magic Card studio.
- **Linked card tracking:** the integration counts how many dashboard cards use each template and prevents deleting templates that are still in use.
- **Live updates:** every change is pushed to all open cards and panels over the WebSocket API.
- **WebSocket API:** other custom cards can store and link their own templates too.

## Requirements

- Home Assistant **2024.7** or newer.
- [Magic Card](https://github.com/therealmcsparrow/magic-card) for creating and linking templates from your dashboards. A copy of the Magic Card editor is bundled for use in the panel.

## Installation

### HACS (recommended)

1. Open HACS in Home Assistant.
2. Open the menu (⋮) in the top right and select **Custom repositories**.
3. Add `https://github.com/therealmcsparrow/magic-card-utils` with type **Integration**.
4. Search for **Magic Card Utils** in HACS and click **Download**.
5. Restart Home Assistant.

### Manual installation

1. Copy the `custom_components/magic_card_utils` folder from this repository into the `custom_components` folder of your Home Assistant configuration directory.
2. Restart Home Assistant.

## Configuration

1. Go to **Settings → Devices & Services**.
2. Click **+ Add Integration** and search for **Magic Card Utils**.
3. Choose whether to show the side panel, then click **Submit**.

Only one instance of the integration can be configured.

## Templates panel

When the side panel is enabled, **Magic Card Templates** appears in the sidebar (admin users only). It lists all saved templates:

| Column | Shows |
|---|---|
| **Name** | The template name and description. |
| **Card Type** | The card type the template is for, for example `custom:magic-card`. |
| **Linked Cards** | How many dashboard cards currently use this template. |
| **Created** | When the template was first saved. |
| **Last Updated** | When the template was last saved. |
| **Actions** | Open in studio, edit, duplicate and delete. |

### Actions

- **Open in studio:** opens the template in the Magic Card editor and goes straight into the full-screen studio. Close the studio and click **Save** to store your changes.
- **Edit:** view the template's YAML next to a live preview. Click the pencil icon there to edit the card with the Magic Card editor and change the template's name, description or card type, then click **Save**.
- **Duplicate:** save a copy of the template under a new name.
- **Delete:** remove the template. This is disabled while any card still links to it.

## Integrating from a third-party card

Magic Card Utils exposes a Home Assistant WebSocket API, so any custom Lovelace card can store its own templates here and link to them by name. All commands require an **admin** user (the same auth context the HA frontend already uses).

The integration is a name-keyed store: `name` is the unique id and `template` is a free-form object you define. The server adds a few fields on save (see below). If `template.config` is present, any `not_synced` arrays inside it are stripped before storage so card-instance-specific state doesn't leak into the shared template.

### Commands

| Command type | Payload | Result / event |
|---|---|---|
| `magic_card_utils/get_templates` | — | Result: `{ templates: { [name]: template } }` |
| `magic_card_utils/subscribe_templates` | — | Result: empty. The initial state and every later change arrive as events with `{ templates: { [name]: template } }`. |
| `magic_card_utils/save_template` | `{ name: string, template: object, card_type?: string, old_name?: string }` | Result: `{ success: true }`. Broadcasts to all subscribers. An existing `name` is overwritten. |
| `magic_card_utils/delete_template` | `{ name: string }` | Result: `{ success: true }`. Broadcasts to all subscribers. |

**Renaming:** pass the current name as `old_name` and the new name as `name`. The template keeps its `created_at`. The command fails with `not_found` if `old_name` doesn't exist and with `name_taken` if `name` is already used. Dashboards that reference the old name are **not** updated automatically.

**Deleting:** deleting a template that is still linked from a dashboard fails with the error code `linked_cards`. Deleting a name that doesn't exist succeeds.

### Template object

You can put anything you want in the template. The integration and side panel use these fields:

| Field | Type | Purpose |
|---|---|---|
| `description` | string | Shown in the Name column under the template name. |
| `config` | object | Recommended container for the actual card configuration. Any `not_synced` arrays inside are stripped on save. |
| `card_type` | string | Set by the server from the `card_type` payload field, else `config.type`, else the previous value. Shown in the panel's Card Type column. |
| `linked_cards` | number | Computed by the server on every read (see below). Any value you send is ignored. |
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

The initial state arrives as the first event immediately after subscribing, so no separate initial fetch is needed.

### Example: save, rename and delete

```js
await hass.connection.sendMessagePromise({
  type: "magic_card_utils/save_template",
  name: "kitchen-light-card",
  template: {
    description: "Reusable kitchen light card",
    config: {
      type: "custom:my-card",
      entity: "light.kitchen",
      rows: [/* ... */],
    },
  },
});

await hass.connection.sendMessagePromise({
  type: "magic_card_utils/save_template",
  old_name: "kitchen-light-card",
  name: "kitchen-lights",
  template: { /* full template content */ },
});

await hass.connection.sendMessagePromise({
  type: "magic_card_utils/delete_template",
  name: "kitchen-lights",
});
```

### Linking a card to a template

Linkage is by **name**. A card links to a template by putting `template: <name>` in its own Lovelace config:

```yaml
type: custom:my-card
template: kitchen-light-card
```

On render, the card looks up its template with `get_templates` (or keeps a `subscribe_templates` subscription) and applies it.

The integration scans all dashboards for `template: <name>` values that match a saved template and reports the count as `linked_cards`. Counts are refreshed whenever a dashboard is saved, so the panel stays accurate without the card having to track anything. Because templates are broadcast by the server, every linked card on every dashboard updates when the template changes.

## Support

If you have any issues with this integration, please [open an issue on GitHub](https://github.com/therealmcsparrow/magic-card-utils/issues).

## Contributing

Contributions are welcome! Please open an issue or a pull request on [GitHub](https://github.com/therealmcsparrow/magic-card-utils).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


[hacs-badge]: https://img.shields.io/badge/HACS-Custom-41BDF5.svg
[hacs-url]: https://hacs.xyz/
[version-badge]: https://img.shields.io/github/v/release/therealmcsparrow/magic-card-utils?include_prereleases
[version-url]: https://github.com/therealmcsparrow/magic-card-utils/releases
[license-badge]: https://img.shields.io/github/license/therealmcsparrow/magic-card-utils
[license-url]: https://github.com/therealmcsparrow/magic-card-utils/blob/main/LICENSE
[last-commit-badge]: https://img.shields.io/github/last-commit/therealmcsparrow/magic-card-utils
[last-commit-url]: https://github.com/therealmcsparrow/magic-card-utils/commits/main
[issues-badge]: https://img.shields.io/github/issues/therealmcsparrow/magic-card-utils
[issues-url]: https://github.com/therealmcsparrow/magic-card-utils/issues
