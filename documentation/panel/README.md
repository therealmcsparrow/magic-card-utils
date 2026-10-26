# Panel

The integration adds a **Magic Card Templates** panel to the sidebar when **Show side panel** is on (see [Set up the integration](../getting-started/README.md#set-up-the-integration)). Only admin users see it.

The panel has seven tabs:

| Tab | What you do there |
| --- | --- |
| [Templates](templates.md) | List, view, edit, open in the studio, duplicate and delete templates |
| [Library](library.md) | Browse your saved icons, shapes, animations and theme presets. New icon, New shape, Edit, Rename, Delete, Export and Import |
| [Animations](animations.md) | Build and manage the shared animation library in the Magic Card animation studio |
| [Themes](themes.md) | Create, edit, save and delete Home Assistant themes in the Magic Card theme editor, and save a theme as your preset |
| [Icons](library.md#the-icons-tab) | Your saved icons: New icon, Edit, Rename, Delete and Export |
| [Shapes](library.md#the-shapes-tab) | Your saved shapes, with a thumbnail and point count: New shape, Edit, Rename, Delete and Export |
| [Images](images.md) | Your library images: New image, Edit, Rename, Duplicate, Delete, Export, Export all and Import |

Click a tab, or move between them with the arrow keys when a tab has focus. The panel opens on the Templates tab, unless the URL has `?animation=<id>` (see [Open one animation directly](animations.md#open-one-animation-directly)) or `?theme=<name>` (see [Themes](themes.md#deep-link)).

Everything in the panel updates live. When a template or animation changes anywhere (on another device, in another browser tab or from a card), the panel shows the change without a reload.

## Pages

- [Templates](templates.md): the table, the template view with YAML and live preview, editing a template, the studio, duplicate and delete.
- [Animations](animations.md): what the tab needs, loading, saving and deleting animations, and the `?animation=` link.
- [Themes](themes.md): what the tab needs, how the editor loads, the `?theme=` link, which files it reads and writes, and importing a theme file.
- [Library](library.md): icons, shapes, animations and theme presets, the Icons and Shapes tabs, import and export, and the icon picker.
- [Images](images.md): the Images tab, its requirements, who can change images, creating an image, Export all and the limits.
- [Languages](languages.md): English (UK), English (US) and Dutch, and what follows your profile language.
