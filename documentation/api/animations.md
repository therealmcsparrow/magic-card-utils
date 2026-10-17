# Animations API

Reading the library is open to any signed-in user; saving and deleting need an admin. See [Animation library](../concepts/animation-library.md) for what the library is and its limits.

- [Commands](#commands)
- [get_animations](#get_animations)
- [subscribe_animations](#subscribe_animations)
- [save_animation](#save_animation)
- [delete_animation](#delete_animation)
- [Validation errors](#validation-errors)

## Commands

`get_animations` and `subscribe_animations` are deliberately not admin only: they are read-only, and cards need them to play animations for non-admin dashboard viewers.

| Command type | Payload | Result |
| --- | --- | --- |
| `magic_card_utils/get_animations` | none | `{ animations: { [id]: animation } }` |
| `magic_card_utils/subscribe_animations` | none | Empty. Events: one per change, see below |
| `magic_card_utils/save_animation` | `{ animation }` | `{ animation }`, the stored animation |
| `magic_card_utils/delete_animation` | `{ animation_id }` | `{}` |

All four fail with `not_loaded` while the library is still loading at Home Assistant start.

## get_animations

```js
const { animations } = await hass.callWS({ type: "magic_card_utils/get_animations" });
```

## subscribe_animations

Sends one event per change. Unlike `subscribe_templates`, it doesn't send the current library first: subscribe, then call `get_animations`.

```js
const unsubscribe = await hass.connection.subscribeMessage(
  (event) => {
    if (event.action === "saved") this._animations[event.animation.id] = event.animation;
    if (event.action === "deleted") delete this._animations[event.id];
    if (event.action === "reset") this._animations = event.animations;
  },
  { type: "magic_card_utils/subscribe_animations" }
);
const { animations } = await hass.callWS({ type: "magic_card_utils/get_animations" });
this._animations = { ...animations };
```

| `action` | Other fields | Sent when |
| --- | --- | --- |
| `saved` | `animation` | An animation was created or replaced |
| `deleted` | `id` | An animation was deleted |
| `reset` | `animations` | The whole library was replaced. Reserved: the integration doesn't send it yet, but handle it. |

## save_animation

Creates the animation or replaces the one with the same `id`.

```js
const { animation } = await hass.callWS({
  type: "magic_card_utils/save_animation",
  animation: { id: "doorbell-wiggle", name: "Doorbell wiggle", kind: "keyframes", version: 1 /* … */ },
});
```

A new animation is refused while the library holds 200 (`invalid_format`, without an `errors` list). Replacing an existing one always works.

## delete_animation

```js
await hass.callWS({ type: "magic_card_utils/delete_animation", animation_id: "doorbell-wiggle" });
```

The field is `animation_id`, not `id`, because `id` is the WebSocket message id. Deleting an id that doesn't exist also succeeds.

## Validation errors

An animation that breaks a [rule](../concepts/animation-library.md#what-the-integration-checks) is refused with `invalid_format`. The error has an `errors` list with one `{ path, message }` item per wrong field:

```js
try {
  await hass.callWS({ type: "magic_card_utils/save_animation", animation });
} catch (err) {
  // err.code === "invalid_format"
  // err.errors === [{ path: "name", message: "At most 80 characters" }]
}
```

| `path` | Message |
| --- | --- |
| (empty) | The animation must be an object, is not valid JSON, or is too large (with its size) |
| `id` | Use 1-64 lowercase letters, digits, '_' or '-', starting with a letter or digit |
| `name` | A name is required, or At most 80 characters |
| `kind` | Must be one of keyframes, particles, path, sequence |
| `version` | Must be a positive whole number |

A storage failure fails with `save_failed`.
