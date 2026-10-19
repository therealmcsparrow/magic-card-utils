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
| Theme editor | `magic-card-theme-editor.js` in the same folder as `magic-card.js`, with the same query string. Loaded when you open the Themes tab. |
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
| Themes tab | 2026.10.06 or newer, with `magic-card-theme-editor.js` next to `magic-card.js` |
| Library, Icons and Shapes tabs, and icons in Home Assistant's icon picker | 2026.10.11-beta.1 or newer |

| Shared templates on cards for non-admin users | The Magic Card release that reads templates with `template_get` and `subscribe_template`, together with this version of Magic Card Utils or newer |

Non-admin users need both sides updated. With an older Magic Card Utils, a new Magic Card still shows templates to admin users but tells non-admin users the template couldn't be loaded. With an older Magic Card, admin users see templates as before and non-admin users still don't.

Use the newest Magic Card release where you can. Magic Card's own documentation lists which version added what.

### Which version the editors need

The Library, Icons and Shapes tabs check the installed Magic Card's `window.MagicCard.version` against 2026.10.11-beta.1. Version numbers are compared like this:

- The three numbers (2026.10.11) decide first.
- A release is newer than its own pre-releases, so 2026.10.11 satisfies a minimum of 2026.10.11-beta.1.
- Pre-releases compare field by field. `2026.10.11-beta.2` is newer than `2026.10.11-beta.1`. `2026.10.11-beta` is older than `2026.10.11-beta.1`, because it has fewer parts.
- Build metadata after a `+` is ignored.

Magic Card versions below the minimum, or a Magic Card that doesn't report its version, show this message in place of the editors: "Drawing icons and shapes here needs Magic Card 2026.10.11-beta.1 or newer. Update Magic Card in HACS." See [Troubleshooting](../troubleshooting/README.md#messages-in-the-panel).
