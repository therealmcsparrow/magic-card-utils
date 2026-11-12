# Google Fonts

Magic Card Utils can let every font picker in Magic Card use the whole Google Fonts catalogue. It is off by default.

## Turn it on

1. Go to Settings → Devices & services → Magic Card Utils.
2. Choose Configure.
3. Turn on **Load Google Fonts** and submit.
4. Reload the page.

The switch covers the whole Home Assistant install, so it applies to every user and every dashboard. A change applies after a page reload. Turn it off the same way.

## What changes

With the switch on:

-   Every font picker in Magic Card shows a Google tab with the full catalogue, a search field and category filters. This covers the card editor and Studio, the theme editor font fields and image editor text.
-   Typing a catalogue name such as `lato` stores `"Lato", sans-serif`.
-   Fonts that your active Home Assistant theme names, if they are Google fonts, load on every Home Assistant page.
-   Image text can use a Google font. It is stored as `"Name", <generic>`, where the generic family is `sans-serif`, `serif`, `monospace` or `system-ui`. A handwriting font falls back to `sans-serif` in images.

With the switch off, the Google tab is hidden. A card that names a Google font shows the fallback font at the end of its stack, and the card editor shows a short note under that font field.

This needs Magic Card 2026.11.04 or newer.

## Existing cards

A card that already names a Google font needs Magic Card Utils with the switch on. Until then it shows the fallback font.

## Privacy

Google Fonts are off by default. You turn them on with the **Load Google Fonts** switch under Settings → Devices & services → Magic Card Utils → Configure. It covers the whole Home Assistant install, and a change applies when the page is reloaded. When it is on, the browser of everyone who views a dashboard requests font files from Google (`fonts.googleapis.com` and `fonts.gstatic.com`). Google receives the viewer's IP address, browser details and the page address, and logs the request; see [Google's privacy policy](https://policies.google.com/privacy). This includes fonts named by your active Home Assistant theme, which Magic Card Utils then loads on every Home Assistant page. When the switch is off, Magic Card Utils makes no request to Google. The switch does not cover an `@import url(https://fonts.googleapis.com/...)` that a card author typed into a card's custom css. That is an address the author chose, and the browser requests it either way.

For the picker and the card side, see [Fonts and Google Fonts](https://github.com/therealmcsparrow/magic-card/blob/main/documentation/design/fonts.md) in the Magic Card documentation.
