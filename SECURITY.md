# Security policy

## Supported versions

Only the latest release receives security fixes. Releases use CalVer (for example `2026.10.08`). Update through HACS before you report a problem.

## Status of this project

Magic Card Utils is free software under the MIT licence. It is non-commercial open source software under the EU Cyber Resilience Act (CRA). It is not sold. At most, it receives voluntary donations. If that ever changes, this page changes with it.

## Scope

In scope:

-   **SVG import.** An SVG file or pasted SVG saved to the library that runs script, loads an outside file, or gets past the cleaning that removes scripts, links and external references.
-   **Preset-file import.** A preset, theme, animation, icon or shape file that hangs the panel, reads local data, writes outside the place it is meant for, or sends a request without the confirmation described in [Themes](documentation/panel/themes.md#importing-a-theme-file) and [Library](documentation/panel/library.md#importing-a-theme-file).
-   **The library and the WebSocket commands.** Storage of icons, shapes, animations, theme presets and templates, the commands that read and change them, and the admin check on every command that changes data. See [WebSocket API](documentation/api/README.md).
-   **The provider script.** `magic_card_utils_library.js` is added to every Home Assistant page so that Magic Card can read the library. A way to make it run other code, break a page or leak library data to a user who should not see it is in scope.
-   **Theme files.** Reading and writing in `/config/themes`.

Out of scope:

-   A request that you confirmed with **Import anyway**. A theme kept with an outside address or with `card-mod-` lines does what the warning says.
-   Faults in Home Assistant, card-mod, other custom cards, or a website a theme points to.
-   Content that an administrator saved on purpose, such as a template with the configuration they chose.

Dependencies are listed in the SBOM (`sbom.cdx.json`) attached to each release. We check them on every release and ship a fix release for a confirmed vulnerability.

## Reporting a vulnerability

Please do not open a public issue. Use GitHub private vulnerability reporting:

1. Open the [Security tab](https://github.com/therealmcsparrow/magic-card-utils/security) of this repository.
2. Choose **Report a vulnerability**.
3. Describe the problem, the affected version and the steps to reproduce it.

We handle reports on a best-effort basis. You will get a first reply within 7 days. Confirmed issues are fixed in a new release, and the advisory is published once a fix is available. The report is credited unless you prefer otherwise.
