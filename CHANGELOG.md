# Changelog

All notable changes to Magic Card Utils are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versions use calendar versioning (`YYYY.MM.NN`).

## [Unreleased]

### Changed

- The Editors tab is now the Icons tab and sits before Shapes. The tab order is Templates, Animations, Themes, Library, Icons, Shapes. The Icons tab lists only your saved icons, with New icon, Edit, Rename, Delete and Export on each row. It replaces the recent lists, the New shape button and the See all in Library button. New shape stays on the Shapes tab. The Library tab still shows all four kinds. Dutch name: Pictogrammen.

### Fixed

- The 2026.10.09 entry said the Third-party section lists Montserrat. The README lists Lit and @mdi/js only, and the integration ships no font file.

## [2026.10.11-beta.1] - 2026-10-18 (pre-release)

Pre-release for testing. HACS hides pre-releases unless you turn on **Show beta versions**. Install the matching Magic Card pre-release (2026.10.11-beta.1 or newer) as well.

### Added

- A Library tab in the panel: your saved icons, shapes, animations and theme presets, with New icon, New shape, Edit, Rename, Delete, Export and Import. Only admin users can change the library.
- A Shapes tab next to Library lists your saved shapes with New shape, Edit, Rename, Delete and Export on each row. Shapes still show in Library too.
- An Editors tab to draw a new icon or shape without a card, with your most recent icons and shapes to reopen.
- Shapes tab rows show a thumbnail of the outline and the point count, such as "10 points", or "Corner shape" for a shape made of corners.
- A note at the top of the Shapes tab says which cards follow a change to a shape, and which keep their own copy.
- Saved icons appear in Home Assistant's icon picker after a reload. Magic Card draws them in full colour; Home Assistant's own cards show a one-colour silhouette.
- Import and export of icons, shapes, animations and theme presets as files. Imports are limited to 1 MB and checked before anything is saved.
- Save as my preset in the Themes tab keeps a theme in your shared library.
- The panel is available in English (UK), English (US) and Dutch, following your Home Assistant profile language. Any other language shows English (UK). The sidebar entry stays in English.
- The setup screen is translated into the same three languages.

### Changed

- Needs Magic Card 2026.10.11-beta.1 or newer for the Library, Shapes and Editors tabs. An older Magic Card shows a message in place of the editors.
- The panel uses the same buttons, fields, notices, icon buttons and chips as the Magic Card editor. The Home Assistant header and page tabs are unchanged.
- Dialogs follow the Magic Card look: larger corners, the same shadow and background dimming, a close button with an icon, and labelled fields with help text under them.
- The shape list loads only when a card on the page uses a library shape. A dashboard with no such card does not load it.
- After you save a shape, a status line on the Shapes and Library tabs says the shape was saved. It clears when you change tab.
- Errors and warnings in the panel show as inline notices with an icon, not coloured bars. Table action buttons share one neutral colour and each has an accessible name.

## [2026.10.09] - 2026-10-17

### Added

- Brand images in `custom_components/magic_card_utils/brand/` (`icon`, `logo` and `dark_logo` PNGs, 1x and `@2x`). Home Assistant and HACS show the integration icon and logo from Home Assistant 2026.3. Older versions show a placeholder. The README header shows the logo.
- `SECURITY.md`: how to report a vulnerability privately.
- CI workflow `validate.yml`: hassfest and HACS validation on push, on pull request and weekly.
- Dependabot configuration for GitHub Actions versions.
- CycloneDX SBOM attached to each GitHub release.

### Changed

- Lit 3.3.3 is served from the integration's `www/` folder instead of being loaded from `unpkg.com`. The panel no longer depends on a third-party CDN.
- `manifest.json` declares `issue_tracker`, which links to the GitHub issues page.
- README: the PayPal donation link points to https://www.paypal.biz/therealmcsparrow.
- LICENSE copyright holder is now "McSparrow", year 2026. The MIT text is unchanged.
- README: the License section states that brand assets and the McSparrow and Magic Card names are not covered by MIT. A Third-party section lists Lit and Montserrat. The requirements note the Home Assistant 2026.3 icon and logo behaviour.

### Removed

- Unused `icon.png` and `logo.png` in `custom_components/magic_card_utils/`. The images in `brand/` replace them.
- Non-standard `load_after` key from `manifest.json`. Home Assistant ignores it, and hassfest rejects it. Load order is already set by `dependencies`.

## [2026.10.08] - 2026-10-17

### Added

- **Themes** tab in the Magic Card Templates panel. It loads the Magic Card theme editor (`magic-card-theme-editor.js`, next to `magic-card.js`) when you open it, and lists the theme files in `/config/themes`. It needs Magic Card 2026.10.06 or newer; the tab says so when the editor is missing.
- Four admin-only WebSocket commands for the theme editor: `magic_card_utils/themes_list`, `themes_get`, `themes_save` and `themes_delete`. A save writes only `/config/themes/<name>.yaml`, then reloads Home Assistant's themes. Names that could point outside that folder are refused. Files the editor cannot safely rewrite are listed read only, with a reason.
- A save is refused with `themes_not_included` until `configuration.yaml` loads themes from `/config/themes`, or a theme from that folder is already loaded (for example from a package).
- Deep link `?theme=<name>` opens that theme in the Themes tab. Leaving the tab removes it from the URL.
- Documentation: [Themes](documentation/api/themes.md) for the commands and [Panel](documentation/panel/themes.md) for the tab.

## [2026.10.07] - 2026-10-16

### Fixed

- Saving a template in the edit view showed no error when it failed, for example with an empty name or a name that's already taken. The error now shows next to the Save button.
- After saving a template, the next Save, Duplicate and Delete in the panel did nothing until the panel was reloaded.

## [2026.10.06] - 2026-10-16

### Added

- Documentation in the `documentation` folder: getting started, the panel, concepts (templates and linking, the animation library, storage), the WebSocket API, Magic Card compatibility and troubleshooting.

### Changed

- README shortened to an overview, with links to the documentation.

### Removed

- Unused code in the panel: the old module editor (palette, row, column and module controls, drag and drop) and its styles.

## [2026.10.05] - 2026-10-16

### Changed

- Needs Magic Card 2026.10.01 or newer for the animation studio (`magic-card-animation-studio.js` is attached to that Magic Card release and installed by HACS).
- The panel uses only the installed Magic Card (your dashboard resource) for the editor, studio, preview and animation studio. The editor is created with the card's `getConfigElement()`, ready for Magic Card loading its editor on demand.
- The panel checks the Magic Card version through `window.MagicCard.apiVersion` and asks you to update Magic Card when it's too old. Magic Card versions without `window.MagicCard` still work.

### Removed

- The bundled copy of Magic Card (`www/magic-card.js`) and the bundled fallback for the animation studio. If Magic Card isn't installed, the panel says so.

## [2026.10.04] - 2026-10-15

### Added

- A Shapes tab next to Library lists your saved shapes with New shape, Edit, Rename, Delete and Export on each row. Shapes still show in Library too. It needs a Magic Card that includes the Shapes view; an older one shows all kinds in that tab.

- Animation library: a shared store for the custom animations made in the Magic Card animation studio. Every card can use them as `preset: custom:<id>`.
- WebSocket commands `get_animations`, `subscribe_animations`, `save_animation` and `delete_animation`. Any signed-in user can read the library; saving and deleting need an admin.
- The library holds at most 200 animations of at most 64 KB each. Animations with an invalid id, name, kind or version are refused with `invalid_format` and a list of field errors.
- **Animations** tab in the side panel, next to the Templates tab. It loads the Magic Card animation studio (`magic-card-animation-studio.js`) from the same folder as your dashboard's Magic Card resource. This integration doesn't ship a copy of the studio yet; if it can't be loaded, the tab says so. Open `?animation=<id>` to go straight to one animation.
- Error codes `not_loaded` (library still loading) and `save_failed` (storage write failed) for the animation commands.

### Changed

- README: animation library, Animations tab and animation API documented.

## [2026.10.03] - 2026-10-15

### Fixed

- Text and action buttons in the templates table are now vertically centred in each row.

## [2026.10.02] - 2026-10-15

### Changed

- The **Edit** action now opens the template's YAML and live preview, from where you can edit it with the Magic Card editor.
- Template names in the table are plain text instead of a link.

### Removed

- The separate edit dialog for name, description and card type. These are now edited together with the card in the template editor.

## [2026.10.01] - 2026-10-15

First stable release.

### Added

- A Shapes tab next to Library lists your saved shapes with New shape, Edit, Rename, Delete and Export on each row. Shapes still show in Library too. It needs a Magic Card that includes the Shapes view; an older one shows all kinds in that tab.

- Edit a template's card configuration directly in the templates panel, using the Magic Card editor.
- **Open in studio** action in the templates table: opens a template straight into the full-screen Magic Card studio.
- **Card Type** column in the templates table.
- Bundled copy of the Magic Card editor (`magic-card.js`). The panel loads Magic Card on demand when it isn't loaded yet, preferring your dashboard's Magic Card resource when one exists.
- HACS now requires Home Assistant 2024.7 or newer.
- `.gitignore`.

### Changed

- Lit updated from `lit-element` 2.4.0 to `lit` 3.3.3.
- Static files are served with Home Assistant's `async_register_static_paths` API.
- Magic Card templates are previewed directly, without needing a dashboard to be opened first.
- README rewritten: templates panel, studio, linked-card tracking, rename and delete behaviour, requirements, corrected links and license.

### Fixed

- Integration setup failed with `'.../www/magic-card.js' is not a directory`.
- Templates table was rendered inside the panel header.
- Studio closed immediately or couldn't be opened, because the editor was rebuilt after every change.
- Editor area stayed empty when the panel was opened before any dashboard.
- Template preview showed the card twice.

## initial build - 2026-05-25

### Added

- A Shapes tab next to Library lists your saved shapes with New shape, Edit, Rename, Delete and Export on each row. Shapes still show in Library too. It needs a Magic Card that includes the Shapes view; an older one shows all kinds in that tab.

- Shared template storage for Magic Card, with a WebSocket API (`get_templates`, `subscribe_templates`, `save_template`, `delete_template`).
- Linked-card counting across all dashboards; templates that are still linked can't be deleted.
- Templates side panel with YAML view and preview, plus rename, duplicate and delete actions.
- Config flow with an option to show or hide the side panel.

[Unreleased]: https://github.com/therealmcsparrow/magic-card-utils/compare/2026.10.09...HEAD
[2026.10.09]: https://github.com/therealmcsparrow/magic-card-utils/releases/tag/2026.10.09
[2026.10.08]: https://github.com/therealmcsparrow/magic-card-utils/releases/tag/2026.10.08
[2026.10.07]: https://github.com/therealmcsparrow/magic-card-utils/releases/tag/2026.10.07
[2026.10.06]: https://github.com/therealmcsparrow/magic-card-utils/releases/tag/2026.10.06
[2026.10.05]: https://github.com/therealmcsparrow/magic-card-utils/releases/tag/2026.10.05
[2026.10.04]: https://github.com/therealmcsparrow/magic-card-utils/releases/tag/2026.10.04
[2026.10.03]: https://github.com/therealmcsparrow/magic-card-utils/releases/tag/2026.10.03
[2026.10.02]: https://github.com/therealmcsparrow/magic-card-utils/releases/tag/2026.10.02
[2026.10.01]: https://github.com/therealmcsparrow/magic-card-utils/releases/tag/2026.10.01
