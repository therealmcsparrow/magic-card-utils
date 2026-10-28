# Vendored: Lit 3.3.3

`lit-core.min.js` is the only third-party code the panel loads. It is served
from this folder, so the panel needs no CDN and no network access. The panel
also draws a few icon paths from Material Design Icons; those are built into
`mc-ui-kit.js` (see "Generated: Magic Card UI kit" below) and are not code.

| Field | Value |
| --- | --- |
| Package | `lit` 3.3.3 (npm), license BSD-3-Clause (see `LICENSE-lit.txt`) |
| Exports used | `LitElement`, `html`, `css` |
| File | `lit-core.min.js` |
| SHA-256 | `9c889c36b7cc452f3590d556538cf1d07940aad13b706a3c93fcd72f69d2d5c7` |
| npm tarball | `lit-3.3.3.tgz`, SHA-256 `92f8d5bcd63e2d5efc41afd0a3d58a0a0f554ef826af9c8e368887c71949fd4d`, npm integrity `sha512-fycuvZg/hkpozL00lm1pEJH5nN/lr9ZXd6mJI2HSN4+Bzc+LDNdEApJ6HFbPkdFNHLvOplIIuJvxkS4XUxqirw==` |

The `lit` 3.3.3 tarball lists `lit-core.min.js` in its package.json `files`
field but does not ship it, so this file is a one-off bundle of the published
package with esbuild 0.25.10. The repo has no build step. This runs only to
update the vendored file.

```sh
mkdir lit-build && cd lit-build && npm init -y
npm i --save-exact lit@3.3.3 esbuild@0.25.10
echo 'export { LitElement, html, css } from "lit";' > entry.mjs
npx esbuild entry.mjs --bundle --minify --format=esm --target=es2021 \
  --legal-comments=inline --outfile=lit-core.min.js
sha256sum lit-core.min.js
```

esbuild output can differ between platforms or minor versions. The SHA-256
above is the checksum of the committed file.

# Generated: Magic Card UI kit (CSS only)

`mc-ui-kit.js` is the panel's copy of the Magic Card UI kit (contract
`ui-kit` 1.0.0, revision 3). It is generated, never edited by hand. It holds
the kit's CSS as one Lit `css` template (editor tokens, kit tokens, card editor
primitives, notices, chips, empty state, toast) and the few Material Design
Icons paths the panel draws. It has no templates and no custom elements, so the
panel needs no other Magic Card file to load.

| Field | Value |
| --- | --- |
| File | `mc-ui-kit.js` |
| Magic Card version | `2026.10.11-beta.1` (`MC_UI_KIT_VERSION`) |
| Magic Card commit | `1ab607c` (branch `aico/svg-and-shape-editors`), exported from a clean `git archive` of that commit |
| SHA-256 | `fef4d7e87023a05ee2ec914a3630f6f29fe5fd5e2cfe4ca628c9d793617ddc31` |
| Icons | `@mdi/js` 7.4.47, Apache-2.0 (https://github.com/Templarian/MaterialDesign-JS), licence text in `LICENSE-mdi.txt` |
| Imports | `lit-core.min.js` (`css`, `html`) |

The panel uses the kit for everything inside its content area: buttons, fields,
notices, icon buttons, chips and the empty state. The page header and the page
tab bar are Home Assistant's own chrome and keep HA's variables. The dialogs
keep a layout of their own (they cannot rely on the `mc-ui-window` element, which
exists only after a Magic Card chunk has loaded) but take size, radius, shadow
and scrim from the kit tokens.

Regenerate from a clean checkout of the Magic Card repo, so work in progress
does not reach this file. From the Magic Card repo:

```sh
git archive HEAD | tar -x -C <empty dir inside the repo>
node <empty dir>/tools/export-ui-kit.mjs <this repo>/custom_components/magic_card_utils/www/mc-ui-kit.js
sha256sum <this repo>/custom_components/magic_card_utils/www/mc-ui-kit.js
```

`node tools/export-ui-kit.mjs --check <file>` exits 1 when the file differs from
a fresh export. The output has no date and no path, so the same sources give the
same SHA-256. After regenerating, update the three rows above.

# Generated: Magic Card i18n runtime and panel messages

`mc-i18n.js` is the Magic Card i18n runtime (contract `i18n` 2.0.0): the locale pick from `hass`, the
message formatter with plurals, and the number formatting. `mc-i18n-panel.js` holds the panel's own messages in
English (UK), English (US) and Dutch. Both are generated from the Magic Card repository and never edited by hand.
The panel imports `t`, `tx` and `locale` from `mc-i18n-panel.js`, already bound to its tables, and writes
`tr('mcu-panel.panel.save')`; the id is a key from `i18n/en-GB.json`. The runtime takes message positions only, so
`mc-i18n-panel.js` carries the key to position map and binds `t` and `tx` to it. An empty en-US or nl cell shows the en-GB text.

| Field | Value |
| --- | --- |
| Files | `mc-i18n.js`, `mc-i18n-panel.js` |
| Magic Card commit | `dfc768e5` (branch `aico/roadmap-leftovers`) for both files; full id in `.magic-card-ref` |
| SHA-256 `mc-i18n.js` | `517566a61a0b897542a9ba77c22112741e7d9bb22f3e9c3272e0d4ec7118a1c3` |
| SHA-256 `mc-i18n-panel.js` | `f8faf5661c8a286a297f7135c8dc8482bd936c0b469850f8ce7a407cf9532188` |
| Sources in this repo | `magic_card_utils_panel.js` (the `tr()` calls), `i18n/en-GB.json` (English, notes and length limits), `i18n/nl.json` (written by hand, with the hash of the English it was made from), `i18n/en-US.json` (generated) |

The exporter reads the panel source and runs the drift checks: every message is a literal, has an en-US and a nl
entry with the same arguments, parses, uses British spelling, has a note and a length limit, and no user text sits outside `tr()`. Then it writes
both files and `i18n/en-US.json`. From the Magic Card repo, after a commit:

```sh
git archive HEAD | tar -x -C <empty dir inside the repo>
node <empty dir>/tools/i18n-export.mjs <this repo>/custom_components/magic_card_utils/www --mcu <this repo>
sha256sum <this repo>/custom_components/magic_card_utils/www/mc-i18n.js <this repo>/custom_components/magic_card_utils/www/mc-i18n-panel.js
```

Add `--check` to write nothing and exit 1 when a file is stale or a check fails. After regenerating, update the
two SHA-256 rows. A new or changed panel message needs its entry in `i18n/en-GB.json` and its Dutch text in
`i18n/nl.json` first.

The config flow does not use these files. Home Assistant reads `translations/en.json`, `en-GB.json` and
`nl.json` in the integration folder (`strings.json` is only for core integrations).
