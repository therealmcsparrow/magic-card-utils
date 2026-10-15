# Changelog

All notable changes to Magic Card Utils are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versions use calendar versioning (`YYYY.MM.NN`).

## [2026.10.04] - 2026-10-15

### Added

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

- Edit a template's card configuration directly in the templates panel, using the Magic Card editor.
- **Open in studio** action in the templates table: opens a template straight into the full-screen Magic Card studio.
- **Card Type** column in the templates table.
- Bundled copy of the Magic Card editor (`magic-card.js`, 0.0.17-beta). The panel loads Magic Card on demand when it isn't loaded yet, preferring your dashboard's Magic Card resource when one exists.
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

- Shared template storage for Magic Card, with a WebSocket API (`get_templates`, `subscribe_templates`, `save_template`, `delete_template`).
- Linked-card counting across all dashboards; templates that are still linked can't be deleted.
- Templates side panel with YAML view and preview, plus rename, duplicate and delete actions.
- Config flow with an option to show or hide the side panel.

[2026.10.04]: https://github.com/therealmcsparrow/magic-card-utils/releases/tag/2026.10.04
[2026.10.03]: https://github.com/therealmcsparrow/magic-card-utils/releases/tag/2026.10.03
[2026.10.02]: https://github.com/therealmcsparrow/magic-card-utils/releases/tag/2026.10.02
[2026.10.01]: https://github.com/therealmcsparrow/magic-card-utils/releases/tag/2026.10.01
