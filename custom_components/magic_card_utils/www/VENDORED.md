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
