# Languages

The panel and the setup screen follow the language of your Home Assistant profile. Three languages are complete: English (UK), English (US) and Dutch. Any other language shows English (UK).

| Profile language | What you see |
| --- | --- |
| English, English (US) | American spelling |
| English (UK), Australia, New Zealand, Ireland, South Africa, India | British spelling |
| Dutch, Dutch (Belgium) | Dutch |
| Anything else | British spelling |

Change it in your Home Assistant profile (your name at the bottom of the sidebar, then **Language**). The panel switches without a reload.

## What is translated

- Every label, button, message and dialog in the panel, including the template table, the Library tab and its import and export window, and the Editors tab.
- The setup screen of the integration (title, description and the **Show side panel** option). Home Assistant reads `translations/en.json`, `en-GB.json` and `nl.json` in the integration folder for this.
- The editors and the animation and theme tools inside the panel come from Magic Card and follow the same language, as long as Magic Card is recent enough to include them.

Not translated: the sidebar entry **Magic Card Templates** (set when the integration starts), names you typed yourself, and the text Home Assistant returns when a request fails.

## For contributors

The panel messages are written as `tr('British text')` in `magic_card_utils_panel.js`. The Dutch texts are in `i18n/nl.json`. `i18n/en-US.json`, `www/mc-i18n.js` and `www/mc-i18n-panel.js` are generated from the Magic Card repository and recorded with their SHA-256 in `www/VENDORED.md`, which also lists the command that regenerates them.
