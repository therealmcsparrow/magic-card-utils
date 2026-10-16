# Animations tab

The Animations tab hosts the Magic Card animation studio. There you build keyframe, particle, path and sequence animations and keep them in the shared [animation library](../concepts/animation-library.md). Any card can then use an animation as `preset: custom:<id>`.

The studio itself is part of Magic Card. How to use it is documented in the [Magic Card animation studio documentation](https://github.com/therealmcsparrow/magic-card/tree/main/documentation/animation-studio). This page covers what the integration adds around it.

- [Requirements](#requirements)
- [Loading](#loading)
- [Saving and deleting](#saving-and-deleting)
- [Open one animation directly](#open-one-animation-directly)

## Requirements

- Magic Card 2026.10.01 or newer, added as a dashboard resource of type JavaScript module.
- The file `magic-card-animation-studio.js` in the same folder as your `magic-card.js` resource. Magic Card releases attach it and HACS installs it with the card, in `/hacsfiles/magic-card/`. With a manual install of Magic Card, copy it next to `magic-card.js`.

## Loading

The tab loads its parts the first time you open it, in this order:

1. The animation library, from the integration.
2. Magic Card, from your dashboard resource. The studio's preview plays on a real Magic Card.
3. The animation studio, from `magic-card-animation-studio.js` next to `magic-card.js`.

A spinner shows while it loads. When a step fails, the tab shows a message and a **Try again** button:

| Message | Cause |
| --- | --- |
| The animation library could not be loaded. | The integration isn't running or hasn't finished starting |
| Magic Card isn't installed. Install it from HACS and add it as a dashboard resource. | No dashboard resource ends in `/magic-card.js` |
| Magic Card could not be loaded from *url*. | The resource exists but the file failed to load |
| Magic Card *version* is too old for Magic Card Utils (…). Update Magic Card. | See [Version check](../compatibility/README.md#version-check) |
| The animation studio could not be loaded. It ships with Magic Card as magic-card-animation-studio.js: update Magic Card to a version that includes it. | Magic Card is older than 2026.10.01, or the studio file is missing next to `magic-card.js` |

[Troubleshooting](../troubleshooting/README.md) has the fixes.

## Saving and deleting

The studio saves, duplicates and deletes animations through the integration. Saving and deleting need an admin, which every user of the panel is.

When the integration refuses a save or delete, a red bar at the top of the tab says why, for example "The animation is not valid (name: At most 80 characters)". Dismiss it with ×. The limits are listed under [Animation library](../concepts/animation-library.md#limits).

Changes reach every open card and panel straight away.

## Open one animation directly

Add `?animation=<id>` to the panel URL to open the Animations tab with that animation, for example:

```
/magic-card-utils?animation=doorbell-wiggle
```

While you work, the panel keeps `?animation=` in the URL in step with the open animation, so you can copy the address to come back to it. An id that isn't a valid animation id (see [Limits](../concepts/animation-library.md#limits)) is ignored and the panel opens on the Templates tab.
