# Animation library

The animation library holds the custom animations you make in the Magic Card animation studio. It's shared by every card in your Home Assistant.

- [Using an animation in a card](#using-an-animation-in-a-card)
- [Who can read and change it](#who-can-read-and-change-it)
- [What the integration checks](#what-the-integration-checks)
- [Limits](#limits)

## Using an animation in a card

A card refers to an animation by its id with `preset: custom:<id>`, next to the built-in presets. When an animation is saved, every open card that uses it plays the new version straight away.

How animations are built and what their fields mean is up to Magic Card; see the [Magic Card animation studio documentation](https://github.com/therealmcsparrow/magic-card/tree/main/documentation/animation-studio).

## Who can read and change it

| Action | Who |
| --- | --- |
| Read the library and follow changes | Any signed-in user, so custom animations play on every user's dashboards |
| Save, duplicate and delete animations | Admin users |

The [Animations tab](../panel/animations.md) is the place to make changes; other cards can use the [WebSocket API](../api/animations.md).

## What the integration checks

Magic Card defines and validates the full animation. The integration only checks the parts it needs to store it safely:

| Field | Rule |
| --- | --- |
| `id` | 1 to 64 characters from `a-z`, `0-9`, `_` and `-`, starting with a letter or digit |
| `name` | Not empty, at most 80 characters |
| `kind` | `keyframes`, `particles`, `path` or `sequence` |
| `version` | A whole number, 1 or higher |

An animation that breaks a rule isn't saved. The error lists every field that's wrong.

## Limits

| Limit | Value |
| --- | --- |
| Animations in the library | 200 |
| Size of one animation | 64 KB of JSON |
| Name | 80 characters |
| Id | 64 characters |

Replacing an existing animation always works, also when the library is full.
