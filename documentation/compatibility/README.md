# Magic Card compatibility

Magic Card Utils doesn't ship its own copy of Magic Card. The panel uses the Magic Card you installed, so the editor, studio, preview and animation studio always match the cards on your dashboards.

- [How the panel finds Magic Card](#how-the-panel-finds-magic-card)
- [Version check](#version-check)
- [Which Magic Card version you need](#which-magic-card-version-you-need)

## How the panel finds Magic Card

Home Assistant doesn't load dashboard resources on custom panels, so the panel loads Magic Card itself:

| Part | Loaded from |
| --- | --- |
| Card and editor | Your dashboard resource whose URL ends in `/magic-card.js`. With HACS that's `/hacsfiles/magic-card/magic-card.js`. |
| Editor | Created with the card's own `getConfigElement()`, the same way a dashboard does. This keeps working when Magic Card loads its editor on demand. |
| Animation studio | `magic-card-animation-studio.js` in the same folder as `magic-card.js`, with the same query string |

When you've opened a dashboard first, Magic Card is already loaded and the panel uses that copy. It always imports the same URL as your dashboards, so Magic Card is never loaded twice.

## Version check

Magic Card can describe itself with a global object:

```js
window.MagicCard = {
  version: "1.2.3",       // the Magic Card release
  apiVersion: 1,          // raised when the contract with Magic Card Utils changes in a breaking way
};
```

The panel needs `apiVersion` 1 or newer:

| Magic Card | Panel |
| --- | --- |
| Sets `window.MagicCard` with `apiVersion` 1 or newer | Works |
| Sets `window.MagicCard` with a lower `apiVersion` | Shows "Magic Card *version* is too old for Magic Card Utils (needs API version 1 or newer). Update Magic Card." in the editor, preview and Animations tab |
| Doesn't set `window.MagicCard` (versions from before the contract) | Works; features it doesn't have are skipped, for example Open in studio opens the normal editor when there's no studio |

A breaking change to the contract raises `apiVersion`; Magic Card Utils then raises the version it needs.

## Which Magic Card version you need

| Feature | Magic Card |
| --- | --- |
| Templates tab: table, template view, preview, editor | Any version |
| Open in studio | A version with the studio |
| Animations tab | 2026.10.01 or newer, with `magic-card-animation-studio.js` next to `magic-card.js` |

Use the newest Magic Card release where you can. Magic Card's own documentation lists which version added what.
