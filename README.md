# Magic Card Utils

<p align="center">
  <img src="https://raw.githubusercontent.com/therealmcsparrow/magic-card-utils/main/custom_components/magic_card_utils/brand/logo@2x.png" alt="Magic Card logo" width="160">
</p>

[![HACS][hacs-badge]][hacs-url]
[![GitHub Release][version-badge]][version-url]
[![GitHub License][license-badge]][license-url]
[![GitHub Last Commit][last-commit-badge]][last-commit-url]
[![GitHub Issues][issues-badge]][issues-url]

## Introduction

Magic Card Utils is the Home Assistant integration behind [Magic Card](https://github.com/therealmcsparrow/magic-card). It stores templates, icons, shapes, animations and theme presets in one place, so every dashboard shares them. Save a card once as a template, link it from any number of dashboards, and manage everything from a sidebar panel.

## Features

- **Shared templates:** save a card as a template and link it from any dashboard. Changes reach every linked card straight away.
- **Linked card tracking:** the integration counts which cards use each template and won't delete a template that's still in use.
- **Templates panel:** browse, preview, edit, duplicate and delete templates, or open one straight into the full-screen Magic Card studio.
- **Animation library:** keep the custom animations from the Magic Card animation studio in one place, for every card and every user.
- **Icon and shape library:** draw icons and shapes without a card, in the Library, Icons and Shapes tabs. Saved icons appear in Home Assistant's icon picker after a reload, and Magic Card draws them in full colour. Home Assistant's own cards show them as one-colour silhouettes.
- **Theme presets:** keep your own theme presets in the shared library, and import or export them as files.
- **Import and export:** move icons, shapes, animations and theme presets between Home Assistant installations. Imports are size-limited and checked before anything is saved. See [Library](documentation/panel/library.md).
- **Theme editor:** create and edit Home Assistant themes in a Themes tab, with a live preview and a Try on dashboard button. Saves write the theme file to `/config/themes`.
- **Languages:** English (UK), English (US) and Dutch, following your Home Assistant profile language.
- **Templates for every user:** non-admin users see shared templates on cards too. Only admins can change them.
- **WebSocket API:** other custom cards can store and link their own templates and use the animation library.

## Requirements

- Home Assistant **2024.7** or newer.
- The integration icon and logo show in Home Assistant from **2026.3**. In the HACS list they show from **HACS 2026.11**; until then HACS shows a placeholder, because a HACS fix is still pending. Older versions show a placeholder.
- [Magic Card](https://github.com/therealmcsparrow/magic-card), installed with HACS (or added as a dashboard resource of type JavaScript module). The panel uses the installed Magic Card; Magic Card Utils doesn't ship its own copy.
- Magic Card **2026.10.01** or newer for the Animations tab.
- Magic Card **2026.10.06** or newer for the Themes tab.
- Magic Card **2026.10.11-beta.1** or newer for the Library, Icons and Shapes tabs and for icons in Home Assistant's icon picker.
- Magic Card **2026.10.11-beta.2** or newer for template cards that non-admin users can see.

## Installation

### HACS (recommended)

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=therealmcsparrow&repository=magic-card-utils&category=integration)

Click the button above to open the repository in HACS, then click **Download** and restart Home Assistant. Or add it by hand:

1. Open HACS in Home Assistant.
2. Open the menu (⋮) in the top right and select **Custom repositories**.
3. Add `https://github.com/therealmcsparrow/magic-card-utils` with type **Integration**.
4. Search for **Magic Card Utils** in HACS and click **Download**.
5. Restart Home Assistant.

### Magic Card pre-release

The Library, Icons and Shapes tabs and template cards for non-admin users need Magic Card 2026.10.11-beta.2 or newer, which is still a pre-release. HACS hides pre-releases unless you turn on **Show beta versions**.

1. In HACS, open **Settings** and turn on **Show beta versions**.
2. Open **Magic Card**, choose **Redownload** from the menu (⋮), and select the newest `2026.10.11-beta` version.
3. Reload the browser tab.

Report problems on [GitHub](https://github.com/therealmcsparrow/magic-card-utils/issues).

### Manual installation

1. Copy the `custom_components/magic_card_utils` folder from the latest release into the `custom_components` folder of your Home Assistant configuration directory.
2. Restart Home Assistant.

## Configuration

1. Go to **Settings → Devices & Services**.
2. Click **+ Add Integration** and search for **Magic Card Utils**.
3. Choose whether to show the side panel, then click **Submit**.

The **Magic Card Templates** panel then appears in the sidebar of admin users. It has six tabs:

- **Templates:** every template with its card type, linked cards and dates, and buttons to open it in the studio, edit it (YAML with a live preview, then the Magic Card editor), duplicate it or delete it.
- **Library:** your saved icons, shapes, animations and theme presets, with New icon, New shape, Edit, Rename, Delete, Export and Import.
- **Animations:** the Magic Card animation studio, with the shared animation library.
- **Themes:** the Magic Card theme editor. It lists the theme files in `/config/themes`, and creates, edits, saves and deletes them. Saving needs the include lines in `configuration.yaml`, which the tab shows when they are missing. The [Magic Card theme documentation](https://github.com/therealmcsparrow/magic-card/blob/main/documentation/themes/README.md) covers the editor itself.
- **Icons:** your saved icons, with New icon, Edit, Rename, Delete and Export.
- **Shapes:** your saved shapes, each with a thumbnail and its point count, and with New shape, Edit, Rename, Delete and Export.

Only admin users can create, change, rename, delete or import library items.

After an update, restart Home Assistant so your browser loads the new panel.

## Documentation

The [documentation](https://github.com/therealmcsparrow/magic-card-utils/tree/main/documentation) covers everything in detail:

| Topic | Covers |
| --- | --- |
| [Getting started](https://github.com/therealmcsparrow/magic-card-utils/blob/main/documentation/getting-started/README.md) | Requirements, installing (including the pre-release), setting up, updating and removing |
| [Panel](https://github.com/therealmcsparrow/magic-card-utils/blob/main/documentation/panel/README.md) | All six tabs |
| [Library](https://github.com/therealmcsparrow/magic-card-utils/blob/main/documentation/panel/library.md) | Icons, shapes, animations and theme presets, the Icons and Shapes tabs, import and export, and the icon picker |
| [Languages](https://github.com/therealmcsparrow/magic-card-utils/blob/main/documentation/panel/languages.md) | English (UK), English (US) and Dutch, and what follows your profile language |
| [Concepts](https://github.com/therealmcsparrow/magic-card-utils/blob/main/documentation/concepts/README.md) | Templates and linking, linked-card counting, the animation library and where the data is stored |
| [WebSocket API](https://github.com/therealmcsparrow/magic-card-utils/blob/main/documentation/api/README.md) | Every command, payload, event and error code, for other custom cards |
| [Magic Card compatibility](https://github.com/therealmcsparrow/magic-card-utils/blob/main/documentation/compatibility/README.md) | Which Magic Card version each tab needs, and the version check |
| [Troubleshooting](https://github.com/therealmcsparrow/magic-card-utils/blob/main/documentation/troubleshooting/README.md) | Every panel message, its cause and the fix |

The [changelog](https://github.com/therealmcsparrow/magic-card-utils/blob/main/CHANGELOG.md) lists what changed in each release.

## Privacy

Magic Card Utils has no telemetry and makes no requests to other websites. What you save stays in your own Home Assistant, in `config/.storage/` and, for themes, in `config/themes`. Nothing is sent to the author. A file you import can point to another website; the import window tells you before you confirm. See [Importing a theme file](https://github.com/therealmcsparrow/magic-card-utils/blob/main/documentation/panel/library.md#importing-a-theme-file).

## Support

If you have any issues with this integration, please [open an issue on GitHub](https://github.com/therealmcsparrow/magic-card-utils/issues). The [troubleshooting page](https://github.com/therealmcsparrow/magic-card-utils/blob/main/documentation/troubleshooting/README.md#reporting-a-problem) lists what to include.

Security problems: see [SECURITY.md](https://github.com/therealmcsparrow/magic-card-utils/blob/main/SECURITY.md).

If you'd like to support the project, you can buy me a coffee on [Ko-fi](https://ko-fi.com/mcsparrow) or send a donation via [PayPal](https://www.paypal.biz/therealmcsparrow).

## Contributing

Contributions are welcome! Please open an issue or a pull request on [GitHub](https://github.com/therealmcsparrow/magic-card-utils).

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/therealmcsparrow/magic-card-utils/blob/main/LICENSE) file for details.

The MIT License covers the source code. It does not cover the brand assets (the files in `images/` and `custom_components/magic_card_utils/brand/`) or the McSparrow and Magic Card names and logos. These are not released under the MIT License.

### Third-party

- **Lit 3.3.3** (BSD-3-Clause): the panel uses a local copy in `custom_components/magic_card_utils/www/` instead of loading it from unpkg.com. The licence text is in `custom_components/magic_card_utils/www/LICENSE-lit.txt`.
- **Material Design Icons, @mdi/js 7.4.47** (Apache-2.0): a few icon paths are built into `custom_components/magic_card_utils/www/mc-ui-kit.js`. The licence text is in `custom_components/magic_card_utils/www/LICENSE-mdi.txt`.


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
