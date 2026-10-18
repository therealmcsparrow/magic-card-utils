# Contributing to Magic Card Utils

Thank you for helping with Magic Card Utils. This page covers how to report a problem, suggest an idea, set up the project and send a change. The community rules are in the [Code of Conduct](CODE_OF_CONDUCT.md).

## Report a bug

Open a [new issue](https://github.com/therealmcsparrow/magic-card-utils/issues/new/choose) and choose **Bug report (Magic Card Utils integration)**. The form asks for the integration, Magic Card and Home Assistant versions, the steps to reproduce the problem and the relevant log lines. The [troubleshooting page](documentation/troubleshooting/README.md#reporting-a-problem) lists what to include.

## Suggest an idea

For a question or a rough idea, start a [discussion](https://github.com/therealmcsparrow/magic-card-utils/discussions). If you know exactly what should change, open a **Feature request (Magic Card Utils integration)** issue and describe the problem you want solved as well as the change you have in mind.

## Report a security problem

Do not open a public issue for a security problem. Report it privately: open the **Security** tab and choose **Report a vulnerability**. [SECURITY.md](SECURITY.md) lists what to include and when to expect a reply.

## Project layout

-   `custom_components/magic_card_utils/` holds the Home Assistant integration: the WebSocket commands, the animation and theme storage, the icon library and the panels.
-   `documentation/` holds the user documentation.

The integration needs Home Assistant 2024.7 or newer. The Animations and Themes panels use the [Magic Card](https://github.com/therealmcsparrow/magic-card) card, so changes to the card itself belong in that repository.

## Set up and test

1.  The maintainer runs the test suite before merging; it is kept outside the repository, so describe in your pull request how you tested your change.
2.  Check your change in a real Home Assistant. A disposable Home Assistant container is enough. Copy `custom_components/magic_card_utils` into its configuration folder, restart Home Assistant, then open Settings, System, Logs and look for errors from `magic_card_utils`.

CI runs hassfest and HACS validation on every push and pull request, and once a week. Check the result on your pull request before you ask for a review.

## Commit messages

Write a plain description of what the commit does, with no prefix such as `feat:` or `fix:`. For example: `Return the theme list in the order it was saved`.

## Pull requests

Open pull requests against `main`. The pull request template asks for a summary, the linked issue, the checks you ran and the Home Assistant version you tested on. Keep each pull request to one change where you can.

## Documentation

When behaviour changes, update the README, the [CHANGELOG](CHANGELOG.md) and the pages in the `documentation/` folder in the same pull request.

## Licence

Magic Card Utils is released under the MIT Licence (see [LICENSE](LICENSE)). By sending a contribution, you agree that it is released under the same licence.

The MIT Licence does not cover the brand assets in `images/` and `custom_components/magic_card_utils/brand/`, or the McSparrow and Magic Card names and logos. Do not reuse them without permission.
