# Vendored: Lit 3.3.3

`lit-core.min.js` is the only third-party code the panel loads. It is served
from this folder, so the panel needs no CDN and no network access.

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
`ui-kit` 1.0.0, revision 2). It is generated, never edited by hand. It holds
the kit's CSS as one Lit `css` template (editor tokens, kit tokens, card editor
primitives, notices, chips, empty state, toast) and the few Material Design
Icons paths the panel draws. It has no templates and no custom elements, so the
panel needs no other Magic Card file to load.

| Field | Value |
| --- | --- |
| File | `mc-ui-kit.js` |
| Magic Card version | `2026.10.11-beta.1` (`MC_UI_KIT_VERSION`) |
| Magic Card commit | `5b96ea1` (branch `aico/svg-and-shape-editors`), clean tree |
| SHA-256 | `c158228ac826b0236a45477bcffef3b74447951adb18f208a3321855aef76f93` |
| Icons | `@mdi/js` 7.4.47, Apache-2.0 (https://github.com/Templarian/MaterialDesign-JS) |
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
