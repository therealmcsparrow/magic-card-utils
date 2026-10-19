# Library

The Library keeps the things you make in Magic Card, so every card and every dashboard can use them: icons, shapes, animations and theme presets. It lives in your Home Assistant, not in a card's configuration.

- [What the library holds](#what-the-library-holds)
- [The Library tab](#the-library-tab)
- [The Icons tab](#the-icons-tab)
- [The Shapes tab](#the-shapes-tab)
- [Using icons in Home Assistant](#using-icons-in-home-assistant)
- [Import and export](#import-and-export)
- [Who can change the library](#who-can-change-the-library)

The Library, Icons and Shapes tabs need Magic Card 2026.10.11-beta.1 or newer. See [Magic Card compatibility](../compatibility/README.md#which-magic-card-version-you-need).

## What the library holds

| Kind | Made in | Used by |
| --- | --- | --- |
| Icons | The SVG editor (New icon) | Any card's icon, and Home Assistant's icon picker |
| Shapes | The shape editor (New shape) | Cards that draw a shape |
| Animations | The animation studio (Animations tab) | Any card's animation |
| Theme presets | The theme editor (Themes tab) | Your themes |

## The Library tab

The Library tab lists all four kinds with a search box and a kind selector. Each row has:

- **Edit:** opens the item in its editor. Magic Card's editor fills the panel's content area; closing it returns you to the tab, with focus on the button you used.
- **Rename:** changes the name in place.
- **Delete:** removes the item after a confirmation.
- **Export:** saves the item as a file. See [Import and export](#import-and-export).

At the top, **New icon** and **New shape** open an empty editor, and **Import** opens the Import window.

An empty kind shows a short message and the New button above it, for example "No shapes here yet."

## The Icons tab

The Icons tab shows only your saved icons. It sits before the Shapes tab. Each row has the same buttons as in the Library tab: Edit, Rename, Delete and Export. At the top, **New icon** opens an empty icon editor. Icons also still appear in the Library tab.

When you have no icons yet, the tab says "No icons here yet." with New icon above it. New shape is not on this tab; use the Shapes tab for that.

## The Shapes tab

The Shapes tab shows only your shapes, with the same buttons: New shape, Edit, Rename, Delete and Export. Shapes also still appear in the Library tab.

Each row has a small outline thumbnail and its point count, such as "10 points", or "Corner shape" for a shape made of corners. The thumbnail is a hint of the outline, not the editor's exact output.

A note at the top of the Shapes tab explains how cards use a shape:

-   Cards that picked the shape from the library follow your changes.
-   A card that holds its own copy, such as a shape drawn in the card editor, keeps its points. To use this version there, pick the shape again under **My shapes** in the card editor.

After you save a shape, the editor stays open over the page, and a status line starts with "Saved to the library." It shows on the Shapes tab and on the Library tab when you come back, and it clears when you change tab.

When you close an editor after saving, the lists in the Library, Icons and Shapes tabs refresh to show the change.

## Using icons in Home Assistant

After you save an icon, Home Assistant's icon picker lists it after a reload of the page. Icons from the library are prefixed `mcu:` in the picker.

Magic Card draws these icons in full colour. Home Assistant's own cards draw only the outline of the icon, in one colour.

If a new icon doesn't appear, reload the page. See [Troubleshooting](../troubleshooting/README.md#a-new-icon-is-missing-from-the-icon-picker).

## Theme presets

In the Themes tab, **Save as my preset** keeps the theme you are editing in the shared library in Home Assistant. Your presets are listed in the Library tab as theme presets, where you can rename, delete, export and import them.

## Import and export

### Exporting

Export on a row saves that item as a file. Exported files hold your presets and, if you fill it in, the author name you typed. They name the Magic Card version that made them. They contain no date, no computer name and no Home Assistant address. Check the author field before you share a file.

### Importing

Click **Import** in the Library tab, then **Choose a file**. Magic Card checks the file before anything is saved:

- A file larger than 1 MB is not read.
- Files are read with a safe YAML reader. Merge keys (`<<`) are not allowed.
- Each item is checked on its own.
- Scripts, links and external references in SVG are removed, and each removal is listed.
- A file made for a newer Magic Card is refused, with the format version it needs.

If an imported item matches one you already have, choose **Keep both** to keep both, or **Replace them**. Replacing overwrites the saved items.

Theme files are the one exception to the cleaning step. They can point to another website, so they are covered below.

### Importing a theme file

Theme files are imported in the Themes tab, and the Library's Import window accepts them too. Magic Card reads the file on your computer. It downloads nothing while it reads, and it sends nothing to the author.

Some theme files point to a picture or font on another website, or contain card-mod lines. If a file does, the import window lists each setting and the website before you confirm. If you choose **Import anyway**, every browser that shows a dashboard with this theme asks that website for the file, and the website can see the visitor's IP address. Lines that start with `card-mod-` only work when card-mod is installed, and they can restyle any card.

Only import files from people you trust. To avoid all of this, choose **Cancel**, or delete those lines from the file and import it again.

## Who can change the library

Only admin users can create, edit, rename, delete or import library items. Everyone who can open the panel sees the buttons, but an action from a non-admin account shows the message "Only administrators can create or change icons and shapes."

See the [WebSocket API](../api/README.md#who-can-call-what) for which commands need an admin.
