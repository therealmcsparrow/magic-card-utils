# Check a genuine release

Magic Card Utils releases are built by a GitHub Actions workflow in the Magic Card Utils repository, not on a personal computer. This page shows two ways to check that a download came from that workflow: a quick look in the browser, and a command-line check for people who use GitHub's tools.

HACS installs the file `magic_card_utils.zip` from the release. That is the file this page checks.

## Which releases can be checked

Signed attestations (the proof the full check reads) exist from version 2026.10.12-beta.4 on. For that version and every later one, a failed full check means the file is not genuine: do not install it. A release before that version has no attestation, so the full check fails on it and only the quick check applies. Its author may be a person's name, because those releases were not all made by the workflow.

## Quick check, no tools

1. Open the [Magic Card Utils releases](https://github.com/therealmcsparrow/magic-card-utils/releases) page and pick the release you installed.
2. Look at the author shown next to the release. From version 2026.10.12-beta.4 on it should be `github-actions[bot]`, because the workflow creates the release. A person's name on that version or a later one is a warning sign. Earlier releases may show a person's name.
3. Look at the list of files under Assets. It should hold `magic_card_utils.zip` and `magic_card_utils.sbom.cdx.json`. The SBOM is the list of the parts the integration is built from.

Expected result for version 2026.10.12-beta.4 or later: the author is `github-actions[bot]` and both files are attached.

This check only reads what the releases page shows. It does not read the file itself, so it cannot catch a file that was replaced or uploaded outside the workflow, and a release and its notes can be edited afterwards. The full check catches a file that was replaced or uploaded outside the workflow. Neither check catches a release that someone ran through the workflow, such as a person who has taken over the maintainer's GitHub sign-in.

## Full check with the GitHub CLI

This check is for people who already know GitHub and the command line. It needs the [GitHub CLI](https://cli.github.com/) (`gh`), version 2.49 or newer, signed in with `gh auth login`.

1. Download `magic_card_utils.zip` and `magic_card_utils.sbom.cdx.json` from the release into an empty folder.
2. Open a terminal in that folder.
3. Check where the zip came from:

   ```
   gh attestation verify magic_card_utils.zip --repo therealmcsparrow/magic-card-utils --signer-workflow therealmcsparrow/magic-card-utils/.github/workflows/release.yml
   ```

   Expected result: `gh` prints `Verification succeeded!` and lists the repository, the workflow file and the tag it ran for.

4. Check the SBOM file the same way:

   ```
   gh attestation verify magic_card_utils.sbom.cdx.json --repo therealmcsparrow/magic-card-utils --signer-workflow therealmcsparrow/magic-card-utils/.github/workflows/release.yml
   ```

   Expected result: the same success message.

5. Check that the SBOM belongs to the zip:

   ```
   gh attestation verify magic_card_utils.zip --repo therealmcsparrow/magic-card-utils --signer-workflow therealmcsparrow/magic-card-utils/.github/workflows/release.yml --predicate-type https://cyclonedx.org/bom
   ```

   Expected result: the same success message, now for the SBOM statement about `magic_card_utils.zip`.

If a command prints an error, do not install that file. Download it again, and if it still fails, report it as described in [SECURITY.md](../../SECURITY.md).

## What the check does not tell you

-   It shows that the file was built by the Magic Card Utils release workflow from a tag in the Magic Card Utils repository. It does not show that the code in the repository is free of mistakes.
-   It cannot tell whether the person who started the workflow was the maintainer. Someone with the maintainer's sign-in could start it, and the result would pass.
-   The SBOM lists the parts the integration is built from. It does not say whether any of them has a known problem.
-   Magic Card is a separate project with its own releases and its own check. This page covers the Magic Card Utils files only.
-   HACS and the Home Assistant Marketplace download the release files for you. The check above is something you run yourself on a download. It is not part of either installer.
