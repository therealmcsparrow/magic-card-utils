# Troubleshooting

Find the message you see, or the symptom, below.

- [Messages in the panel](#messages-in-the-panel)
- [The panel isn't in the sidebar](#the-panel-isnt-in-the-sidebar)
- [Changes don't show after an update](#changes-dont-show-after-an-update)
- [Delete is disabled](#delete-is-disabled)
- [A linked card stopped finding its template](#a-linked-card-stopped-finding-its-template)
- [Setting up the integration fails](#setting-up-the-integration-fails)
- [Reporting a problem](#reporting-a-problem)

## Messages in the panel

| Message | Cause | Fix |
| --- | --- | --- |
| Magic Card isn't installed. Install it from HACS and add it as a dashboard resource. | No dashboard resource ends in `/magic-card.js` | Install Magic Card with HACS, or add its resource under **Settings → Dashboards → ⋮ → Resources** as a JavaScript module. Then reload the panel. |
| Magic Card could not be loaded from *url*. | The resource exists but the file failed to load | Open the URL in your browser to check it exists. For a manual install, check the file is at that path. The browser console (F12) has the exact error. |
| Magic Card *version* is too old for Magic Card Utils (…). Update Magic Card. | The installed Magic Card has an older contract version | Update Magic Card in HACS and reload. See [Version check](../compatibility/README.md#version-check). |
| The Magic Card editor could not be loaded. | Magic Card loaded, but creating its editor failed | Reload the panel. If it stays, check the browser console and update Magic Card. |
| Lovelace card helpers are unavailable until a dashboard has been opened. | Previewing a template for a card type other than Magic Card, before any dashboard was opened in this browser tab | Open any dashboard, then come back to the panel |
| The animation library could not be loaded. | The integration isn't running or is still starting | Check the integration under **Settings → Devices & Services**, wait for Home Assistant to finish starting and click **Try again** |
| The animation studio could not be loaded. It ships with Magic Card as magic-card-animation-studio.js: … | Magic Card is older than 2026.10.01, or `magic-card-animation-studio.js` isn't next to `magic-card.js` | Update Magic Card. For a manual install, copy `magic-card-animation-studio.js` next to `magic-card.js`. Click **Try again**. |
| The animation is not valid (…) | The studio tried to save an animation that breaks a rule | The text in brackets names the field. See [Limits](../concepts/animation-library.md#limits). |
| The animation library is full (at most 200 animations) | You tried to save a new animation with 200 in the library | Delete animations you don't use |

## The panel isn't in the sidebar

- Only admin users see it. Sign in as an admin.
- The integration was set up with **Show side panel** off. See [Show or hide the side panel](../getting-started/README.md#show-or-hide-the-side-panel).
- The integration didn't start. Check **Settings → Devices & Services** and the Home Assistant log for `magic_card_utils`.

## Changes don't show after an update

1. Make sure HACS installed the new version: the version in HACS should match the release.
2. Restart Home Assistant. The panel's script URL gets a new timestamp only when Home Assistant starts, so without a restart your browser keeps the old panel.
3. Reload the browser tab, with Ctrl+F5 on a desktop.

## Delete is disabled

The template is still linked from at least one card; hover the button to see how many. Find the cards with `template: <name>` in their configuration and unlink them, then delete the template. [How linked cards are counted](../concepts/templates.md#how-linked-cards-are-counted) explains what counts.

## A linked card stopped finding its template

The template was renamed or deleted. Renaming doesn't change the cards that link to it. Set `template:` in the card to the new name, or link it again with the template bar in the Magic Card editor.

## Setting up the integration fails

- **"Magic Card Utils is already configured."** The integration can be set up once; it's already there under **Settings → Devices & Services**.
- **An error in the log during setup:** check you run Home Assistant 2024.7 or newer, and that the integration is up to date.

## Reporting a problem

[Open an issue on GitHub](https://github.com/therealmcsparrow/magic-card-utils/issues) with:

- The Magic Card Utils and Magic Card versions.
- Your Home Assistant version.
- What you did, what you expected and what happened.
- Any errors from the browser console (F12) and from the Home Assistant log.
