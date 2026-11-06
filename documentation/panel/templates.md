# Templates tab

The Templates tab lists every template saved in Home Assistant. A template is a card configuration that cards on any dashboard can link to by name; see [Templates and linking](../concepts/templates.md).

- [The list](#the-list)
- [Export and import](#export-and-import)
- [Actions](#actions)
- [Template view](#template-view)
- [Edit a template](#edit-a-template)
- [Open in studio](#open-in-studio)
- [Duplicate](#duplicate)
- [Delete](#delete)

## The list

Each row shows the template name. The line under it holds the description, the card type (for example `custom:magic-card`), how many cards link to the template and when it was last saved. See [How linked cards are counted](../concepts/templates.md#how-linked-cards-are-counted). The buttons at the end of the row are described under [Actions](#actions).

The **Search templates** field above the list keeps only the templates whose name, description or card type holds the text you type. Upper and lower case don't matter. When nothing matches, the table says "No templates match your search."

Without templates the tab shows "No templates saved yet." Templates are usually created from the Magic Card editor on a dashboard, with its template bar. **New template** above the list creates one here: it opens the [edit view](#edit-a-template) with an empty Magic Card.

## Export and import

Tick the rows you want and click **Export** to download them as `magic-card-templates.json`. With no row ticked the button says **Export all** and downloads every template.

**Import** reads such a file, up to 5 MB, and saves its templates. A template whose name is already in use comes in as a copy, for example "Name (copy)", so an import never overwrites a template. Entries without a name or a card configuration are skipped. When some templates can't be saved, a message says how many came in. Linked cards are not part of the file.

## Actions

| Button | Does |
| --- | --- |
| Open in studio | Opens the template in the Magic Card editor and goes straight into the full-screen studio. See [Open in studio](#open-in-studio). |
| Edit | Opens the [template view](#template-view): the YAML next to a live preview |
| Duplicate | Saves a copy under a new name. See [Duplicate](#duplicate). |
| Delete | Deletes the template. Disabled while any card links to it; hover it to see how many. |

## Template view

The template view shows the template's name and card type at the top, its configuration as YAML on the left and a live preview on the right.

- **Magic Card templates** are previewed with the installed Magic Card. When Magic Card isn't installed or is too old, the preview shows why; see [Troubleshooting](../troubleshooting/README.md).
- **Other card types** are previewed with Home Assistant's card helpers. Those only exist once a dashboard has been opened in the browser, so open any dashboard first if the preview says "Lovelace card helpers are unavailable until a dashboard has been opened."

Click the pencil icon to [edit the template](#edit-a-template). Close the view with the × button, the Escape key or a click outside it.

## Edit a template

Editing shows two panes:

- **Template** on the left, with the **Name**, **Description** and **Card Type** fields.
- **Editor** on the right: the Magic Card editor, the same one you get on a dashboard. Its changes are captured live.

Click **Save** to store everything, or **Cancel** to close without saving.

When the template can't be saved, the edit view stays open and a red message next to the buttons says why: "Name is required.", "A template named '*name*' already exists." or the error from Home Assistant.

Changing the name renames the template. It keeps its created date. Cards that link to the old name are **not** updated: they keep `template: <old name>` in their config and stop finding the template until you change them. See [Renaming](../concepts/templates.md#renaming).

The editor comes from the installed Magic Card. When it can't be loaded, the Editor pane shows a message instead; see [Troubleshooting](../troubleshooting/README.md).

## Open in studio

**Open in studio** opens the template in the editor and straight away in the Magic Card studio, the full-screen editor with layers, a live canvas and the inspector. The studio is part of Magic Card; its own documentation is in the [Magic Card repository](https://github.com/therealmcsparrow/magic-card/tree/main/documentation/studio).

When you close the studio you're back in the edit view. Click **Save** there to store your changes.

With a Magic Card version without the studio, the template opens in the normal editor only.

## Duplicate

Duplicate asks for a name for the copy. It suggests "Name (copy)", then "Name (copy 2)" and so on when that name is taken.

The copy gets the configuration, description and card type of the original. Its created and updated dates are now, and it starts with no linked cards.

The name can't be empty or the name of an existing template.

## Delete

Delete asks for confirmation: "Delete *name*? This action cannot be undone."

A template that is still linked from a card can't be deleted: the button is disabled and the integration refuses the delete as well. Remove `template: <name>` from those cards first; [How linked cards are counted](../concepts/templates.md#how-linked-cards-are-counted) explains what counts as a link.
