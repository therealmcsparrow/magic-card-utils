# Security policy

## Supported versions

Only the latest release receives security fixes. Releases use CalVer (for example `2026.10.08`). Update through HACS before reporting.

## Status of this project

Magic Card Utils is non-commercial open source software under the EU Cyber Resilience Act (CRA). It is not sold. At most, it receives voluntary donations.

## Reporting a vulnerability

Please do not open a public issue. Use GitHub private vulnerability reporting:

1. Open the [Security tab](https://github.com/therealmcsparrow/magic-card-utils/security) of this repository.
2. Choose **Report a vulnerability**.
3. Describe the problem, the affected version and the steps to reproduce it.

You will get a first reply within 7 days. Confirmed issues are fixed in a new release, and the advisory is published once a fix is available.

## Scope

Reports about importing preset, theme, animation, icon or shape files are in scope, for example a file that runs script, reads local data, hangs the editor or sends a request without the confirmation described in the documentation. Out of scope: a request the user confirmed with **Import anyway**.

Dependencies are listed in the SBOM (`sbom.cdx.json`) attached to each release. We check them on every release and ship a fix release for a confirmed vulnerability.
