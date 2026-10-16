# Templates and linking

- [What a template is](#what-a-template-is)
- [Linking a card](#linking-a-card)
- [How linked cards are counted](#how-linked-cards-are-counted)
- [Card-specific settings: not_synced](#card-specific-settings-not_synced)
- [Renaming](#renaming)
- [Deleting](#deleting)

## What a template is

A template is a named card configuration stored in Home Assistant. Every dashboard shares the same templates, so you design a card once and reuse it everywhere.

Each template has:

| Field | Set by | Meaning |
| --- | --- | --- |
| Name | You | The unique key cards link to. Names are case-sensitive. |
| `config` | The card | The card configuration itself |
| `description` | You | Optional text, shown under the name in the panel |
| `card_type` | The integration | The card type, taken from what the card sends or from `config.type`. Kept when a later save doesn't say. |
| `linked_cards` | The integration | How many cards link to the template, worked out on every read |
| `created_at`, `last_updated` | The integration | When the template was first and last saved, in UTC |

## Linking a card

A card links to a template by naming it in its own configuration:

```yaml
type: custom:magic-card
template: kitchen-light-card
```

The card looks the template up by name and applies it. Magic Card does this for you: its editor has a template bar to save a card as a template, link a card to one, sync changes back and unlink it.

Templates are pushed to every open card. When you save a template, every linked card on every dashboard updates without a reload.

## How linked cards are counted

The integration counts links itself; cards don't have to keep a count. It reads every dashboard's configuration and counts each `template: <name>` whose name matches a saved template. That includes cards nested inside stacks, grids and other cards, and links anywhere in a card's configuration.

The count is worked out fresh whenever templates are read, and the panel refreshes it each time a dashboard is saved. A value a card sends for `linked_cards` is ignored.

Two things count that you might not expect:

- Any `template:` key with a matching name counts, also from a card type other than Magic Card.
- A dashboard that fails to load is skipped, so its cards aren't counted.

## Card-specific settings: not_synced

A linked card can keep some settings to itself, for example its own entity. Magic Card lists those under `not_synced` in the card configuration.

When a template is saved, the integration removes every `not_synced` list from the card, its rows, its columns and their modules. Card-specific choices stay on the card and don't leak into the shared template.

## Renaming

Renaming a template, in the panel or through the API, keeps its created date and moves it to the new name.

Cards are not updated. A card with `template: <old name>` no longer finds the template, and the old name stops counting as a link. Change those cards to the new name after renaming.

Renaming to a name that's already taken is refused.

## Deleting

A template can only be deleted while no card links to it. The panel disables the Delete button and the integration refuses the delete with the error `linked_cards`. Unlink the cards first: remove `template: <name>` from their configuration, or use Unlink in the Magic Card editor.
