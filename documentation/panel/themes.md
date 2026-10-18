# Themes

The Themes tab is the Magic Card theme editor, shown in the Magic Card Templates panel. You create, edit, save and delete Home Assistant themes here. The editor itself, with its fields, presets, modes and Try on dashboard, is documented in the [Magic Card theme pages](https://github.com/therealmcsparrow/magic-card/blob/main/documentation/themes/README.md). This page covers the panel side.

## Requirements

-   Magic Card 2026.10.06 or newer, with `magic-card-theme-editor.js` in the same folder as `magic-card.js`. HACS installs it there. If the file or the element is missing, the tab shows a message and a **Try again** button.
-   An admin user. The panel and its commands are for admins only.
-   The include lines in `configuration.yaml` before you can save. The tab shows them when they are missing, and the editor's own page explains them.

## Loading

The tab loads the editor the first time you open it. The panel opens on Templates, so opening the panel does not load the editor. The editor's files come from the same folder as your Magic Card resource, with the same query string.

If Home Assistant rebuilds the panel, for example when you navigate away and come back, the editor keeps its draft and any running Try on dashboard trial.

## Deep link

Open one theme directly with `?theme=<name>` on the panel URL, for example `/magic-card-utils?theme=warm-night`. The tab opens that theme. A name that does not follow the theme name rules is ignored. Leaving the Themes tab removes `theme=` from the URL.

## Files

The Themes tab reads and writes only files in `/config/themes`. It never writes `configuration.yaml`. Files it cannot safely rewrite, for example files in a subfolder or files that use YAML aliases, are listed as read only with a reason. See [Files and limits](https://github.com/therealmcsparrow/magic-card/blob/main/documentation/themes/files.md) in the Magic Card docs.

## Importing a theme file

Theme files are imported in the Themes tab, and the Library's Import window accepts them too. Magic Card reads the file on your computer. It does not download anything while you read it, and it sends nothing to us.

Some theme files point to a picture or font on another website, or contain card-mod lines. If a file does, Magic Card lists each setting and the website before you confirm. If you choose **Import anyway**, every browser that shows a dashboard with this theme asks that website for the file, and the website can see the visitor's IP address. Lines that start with `card-mod-` only work when card-mod is installed, and they can restyle any card.

Only import files from people you trust. To avoid this, choose **Cancel**, or delete those lines from the file and import it again.

See [Library](library.md#import-and-export) for the size limit and what an import checks.

## Commands

The tab talks to Magic Card Utils through four admin-only WebSocket commands: `themes_list`, `themes_get`, `themes_save` and `themes_delete`. See [Themes](../api/themes.md) for the payloads, results and error codes.
