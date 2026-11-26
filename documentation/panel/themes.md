# Themes

The Themes tab is the theme editor, which comes with Magic Card Utils and is shown in the Magic Card Templates panel. You create, edit, save and delete Home Assistant themes here. The editor itself, with its fields, presets, modes and Try on dashboard, is documented in the [Magic Card theme pages](https://github.com/therealmcsparrow/magic-card/blob/main/documentation/themes/README.md). This page covers the panel side.

The list of themes stays inside the tab. Opening a theme fills the whole screen, like the icon, shape and image editors. During Try on dashboard the editor returns to the tab, so the sidebar stays reachable.

## Requirements

-   The editor file `magic-card-theme-editor.js` in `custom_components/magic_card_utils/www/`. It is part of Magic Card Utils, so the Marketplace, HACS and the manual install put it there, and no Magic Card version is needed. If the file fails to load, the tab shows "The theme editor (*file*) could not be loaded from Magic Card Utils. Reload the page and try again." and a **Try again** button.
-   An admin user. The panel and its commands are for admins only.
-   The include lines in `configuration.yaml` before you can save a theme to the themes folder. The tab shows them when they are missing, and the editor's own page explains them.

## Loading

The tab loads the editor the first time you open it. The panel opens on Templates, so opening the panel does not load the editor. The editor's files come from the folder that holds the panel, so they always match the panel you have installed.

If Home Assistant rebuilds the panel, for example when you navigate away and come back, the editor keeps its draft and any running Try on dashboard trial.

## Deep link

Open one theme directly with `?theme=<name>` on the panel URL, for example `/magic-card-utils?theme=warm-night`. The tab opens that theme. A name that does not follow the theme name rules is ignored. Leaving the Themes tab removes `theme=` from the URL.

## Where themes are kept

The editor always saves a theme in Magic Card Utils. Home Assistant only applies a theme once it is a file in `/config/themes`, so the editor can also save it there. That needs **Allow themes to be saved in the themes folder** under Settings > Devices & services > Magic Card Utils > Configure, which is off by default and shows a disclaimer when you turn it on. While it is off, the tab says so, and you can still create, edit and delete themes in Magic Card Utils.

Each row says where the theme stands: **Not in the themes folder**, **In the themes folder**, **Themes folder copy is older** (changed since it was last saved there), **Another file in the themes folder uses this name**, or **Only in the themes folder** for a file Magic Card wrote that is not saved in Magic Card Utils yet. Opening and saving such a file imports it under the same name.

The tab never changes, replaces or deletes a theme file Magic Card did not write, and it never writes `configuration.yaml`. Magic Card's own files start with `# Written by the Magic Card theme editor.`. Other files are listed as **Read only**: copy one and save it under a new name to edit it. See [Files and limits](https://github.com/therealmcsparrow/magic-card/blob/main/documentation/themes/files.md) in the Magic Card docs.

## Deleting a theme

**Delete** in the details panel removes the theme from Magic Card Utils. When the theme is also in the themes folder and the option is on, a checkbox asks whether to remove that file too; it is off each time you delete. A theme that is only a file Magic Card wrote is deleted as a file, and only while the option is on. Home Assistant stops applying a theme once its file is gone.

## Importing a theme file

Theme files are imported in the Themes tab, and the Library's Import window accepts them too. Magic Card reads the file on your computer. It downloads nothing while it reads, and it sends nothing to the author.

Some theme files point to a picture or font on another website, or contain card-mod lines. If a file does, the import window lists each setting and the website before you confirm. If you choose **Import anyway**, every browser that shows a dashboard with this theme asks that website for the file, and the website can see the visitor's IP address. Lines that start with `card-mod-` only work when card-mod is installed, and they can restyle any card.

Only import files from people you trust. To avoid all of this, choose **Cancel**, or delete those lines from the file and import it again.

See [Library](library.md#import-and-export) for the size limit and what an import checks.

## Commands

The tab talks to Magic Card Utils through four admin-only WebSocket commands: `themes_list`, `themes_get`, `themes_save` and `themes_delete`. See [Themes](../api/themes.md) for the payloads, results and error codes.
