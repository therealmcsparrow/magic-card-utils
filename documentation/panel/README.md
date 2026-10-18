# Panel

The integration adds a **Magic Card Templates** panel to the sidebar when **Show side panel** is on (see [Set up the integration](../getting-started/README.md#set-up-the-integration)). Only admin users see it.

The panel has three tabs:

| Tab | What you do there |
| --- | --- |
| [Templates](templates.md) | List, view, edit, open in the studio, duplicate and delete templates |
| [Animations](animations.md) | Build and manage the shared animation library in the Magic Card animation studio |
| [Themes](themes.md) | Create, edit, save and delete Home Assistant themes in the Magic Card theme editor |

Click a tab, or move between them with the arrow keys when a tab has focus. The panel opens on the Templates tab, unless the URL has `?animation=<id>` (see [Open one animation directly](animations.md#open-one-animation-directly)) or `?theme=<name>` (see [Themes](themes.md#deep-link)).

Everything in the panel updates live. When a template or animation changes anywhere (on another device, in another browser tab or from a card), the panel shows the change without a reload.

## Pages

- [Templates](templates.md): the table, the template view with YAML and live preview, editing a template, the studio, duplicate and delete.
- [Animations](animations.md): what the tab needs, loading, saving and deleting animations, and the `?animation=` link.
- [Themes](themes.md): what the tab needs, how the editor loads, the `?theme=` link, and which files it reads and writes.
- [Languages](languages.md): English (UK), English (US) and Dutch, and what follows your profile language.
