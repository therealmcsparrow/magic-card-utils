# Magic Card Utils

<p align="center">
  <img src="https://raw.githubusercontent.com/therealmcsparrow/magic-card-utils/main/custom_components/magic_card_utils/brand/logo@2x.png" alt="Magic Card logo" width="240">
</p>

[![HACS][hacs-badge]][hacs-url]
[![GitHub Release][version-badge]][version-url]
[![GitHub License][license-badge]][license-url]
[![GitHub Last Commit][last-commit-badge]][last-commit-url]
[![GitHub Issues][issues-badge]][issues-url]

## Introduction

Magic Card Utils is the Home Assistant integration behind [Magic Card](https://github.com/therealmcsparrow/magic-card). It stores templates and custom animations centrally, so every dashboard shares them. Save a card once as a template, link it from any number of dashboards, and manage everything from a sidebar panel.

## Features

- **Shared templates:** save a card as a template and link it from any dashboard. Changes reach every linked card straight away.
- **Linked card tracking:** the integration counts which cards use each template and won't delete a template that's still in use.
- **Templates panel:** browse, preview, edit, duplicate and delete templates, or open one straight into the full-screen Magic Card studio.
- **Animation library:** keep the custom animations from the Magic Card animation studio in one place, for every card and every user.
- **Theme editor:** create and edit Home Assistant themes in a Themes tab, with a live preview and a Try on dashboard button. Saves write the theme file to `/config/themes`.
- **WebSocket API:** other custom cards can store and link their own templates and use the animation library.

## Requirements

- Home Assistant **2024.7** or newer.
- [Magic Card](https://github.com/therealmcsparrow/magic-card), installed with HACS (or added as a dashboard resource of type JavaScript module). The panel uses the installed Magic Card; Magic Card Utils doesn't ship its own copy.
- Magic Card **2026.10.01** or newer for the Animations tab.
- Magic Card **2026.10.06** or newer for the Themes tab.

## Installation

### HACS (recommended)

1. Open HACS in Home Assistant.
2. Open the menu (⋮) in the top right and select **Custom repositories**.
3. Add `https://github.com/therealmcsparrow/magic-card-utils` with type **Integration**.
4. Search for **Magic Card Utils** in HACS and click **Download**.
5. Restart Home Assistant.

### Manual installation

1. Copy the `custom_components/magic_card_utils` folder from the latest release into the `custom_components` folder of your Home Assistant configuration directory.
2. Restart Home Assistant.

## Configuration

1. Go to **Settings → Devices & Services**.
2. Click **+ Add Integration** and search for **Magic Card Utils**.
3. Choose whether to show the side panel, then click **Submit**.

The **Magic Card Templates** panel then appears in the sidebar of admin users. It has three tabs:

- **Templates:** every template with its card type, linked cards and dates, and buttons to open it in the studio, edit it (YAML with a live preview, then the Magic Card editor), duplicate it or delete it.
- **Animations:** the Magic Card animation studio, with the shared animation library.
- **Themes:** the Magic Card theme editor. It lists the theme files in `/config/themes`, and creates, edits, saves and deletes them. Saving needs the include lines in `configuration.yaml`, which the tab shows when they are missing. The [Magic Card theme documentation](https://github.com/therealmcsparrow/magic-card/blob/main/documentation/themes/README.md) covers the editor itself.

After an update, restart Home Assistant so your browser loads the new panel.

## Documentation

The [documentation](https://github.com/therealmcsparrow/magic-card-utils/tree/main/documentation) covers everything in detail:

| Topic | Covers |
| --- | --- |
| [Getting started](https://github.com/therealmcsparrow/magic-card-utils/blob/main/documentation/getting-started/README.md) | Requirements, installing, setting up, updating and removing |
| [Panel](https://github.com/therealmcsparrow/magic-card-utils/blob/main/documentation/panel/README.md) | The Templates, Animations and Themes tabs |
| [Concepts](https://github.com/therealmcsparrow/magic-card-utils/blob/main/documentation/concepts/README.md) | Templates and linking, linked-card counting, the animation library and where the data is stored |
| [WebSocket API](https://github.com/therealmcsparrow/magic-card-utils/blob/main/documentation/api/README.md) | Every command, payload, event and error code, for other custom cards |
| [Magic Card compatibility](https://github.com/therealmcsparrow/magic-card-utils/blob/main/documentation/compatibility/README.md) | How the panel loads Magic Card and the `window.MagicCard` version check |
| [Troubleshooting](https://github.com/therealmcsparrow/magic-card-utils/blob/main/documentation/troubleshooting/README.md) | Every panel message, its cause and the fix |

The [changelog](https://github.com/therealmcsparrow/magic-card-utils/blob/main/CHANGELOG.md) lists what changed in each release.

## Support

If you have any issues with this integration, please [open an issue on GitHub](https://github.com/therealmcsparrow/magic-card-utils/issues). The [troubleshooting page](https://github.com/therealmcsparrow/magic-card-utils/blob/main/documentation/troubleshooting/README.md#reporting-a-problem) lists what to include.

If you'd like to support the project, you can buy me a coffee on [Ko-fi](https://ko-fi.com/mcsparrow) or send a donation via PayPal to `info@mcsparrow.eu`.

## Contributing

Contributions are welcome! Please open an issue or a pull request on [GitHub](https://github.com/therealmcsparrow/magic-card-utils).

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/therealmcsparrow/magic-card-utils/blob/main/LICENSE) file for details.


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
