# Templates tab

The Templates tab lists every template saved in Home Assistant. A template is a card configuration that cards on any dashboard can link to by name; see [Templates and linking](../concepts/templates.md).

- [The table](#the-table)
- [Actions](#actions)
- [Template view](#template-view)
- [Edit a template](#edit-a-template)
- [Open in studio](#open-in-studio)
- [Duplicate](#duplicate)
- [Delete](#delete)

## The table

| Column | Shows |
| --- | --- |
| Name | The template name, with its description underneath when it has one |
| Card Type | The card type the template is for, for example `custom:magic-card`. Empty when the template has none. |
| Linked Cards | How many cards on your dashboards link to the template. See [How linked cards are counted](../concepts/templates.md#how-linked-cards-are-counted). |
| Created | When the template was first saved, in your Home Assistant language |
| Last Updated | When the template was last saved |
| Actions | The buttons described below |

Without templates the tab shows "No templates saved yet." Templates are usually created from the Magic Card editor on a dashboard, with its template bar.

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
