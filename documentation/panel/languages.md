# Languages

The panel and the setup screen follow the language of your Home Assistant profile. Three languages are complete: English (UK), English (US) and Dutch. Any other language shows English (UK). The Dutch texts were drafted with machine help and have not been checked by a professional translator; if a text reads wrongly, report it on [GitHub](https://github.com/therealmcsparrow/magic-card-utils/issues).

| Profile language | What you see |
| --- | --- |
| English, English (US) | American spelling |
| English (UK), Australia, New Zealand, Ireland, South Africa, India | British spelling |
| Dutch, Dutch (Belgium) | Dutch |
| Anything else | British spelling |

Change it in your Home Assistant profile (your name at the bottom of the sidebar, then **Language**). The panel switches without a reload.

## What is translated

- Every label, button, message and dialog in the panel, including the template table, the Library tab and its import and export window, and the Icons and Shapes tabs.
- The setup screen of the integration (title, description and the **Show side panel** option). Home Assistant reads `translations/en.json`, `en-GB.json` and `nl.json` in the integration folder for this.
- The editors and the animation and theme tools inside the panel come from Magic Card and follow the same language, as long as Magic Card is recent enough to include them.

The sidebar entry follows the language of the Home Assistant server (Settings > System > General), not your profile, because Home Assistant sets it once when the integration starts: in Dutch it reads **Magic Card-sjablonen**, in every other language **Magic Card Templates**. After you change the server language, restart Home Assistant to update it.

Not translated: names you typed yourself, and the text Home Assistant returns when a request fails.

## For contributors

The panel messages are written as `tr('mcu-panel.panel.save')` in `magic_card_utils_panel.js`: the key names the message, and its British English, a note for translators and a length limit are in `i18n/en-GB.json`. The Dutch texts are in `i18n/nl.json`. The generated table looks a message up by its position, so a text that is the same in a language as in English (UK) is stored once and the other languages fall back to it. `i18n/en-US.json`, `www/mc-i18n.js` and `www/mc-i18n-panel.js` are generated from the Magic Card repository and recorded with their SHA-256 in `www/VENDORED.md`, which also lists the command that regenerates them.
