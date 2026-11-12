# Magic Card Utils documentation

This folder documents the Magic Card Utils integration: installing it, the sidebar panel, how templates and the animation library work, and the WebSocket API. The [main README](../README.md) gives a short overview. These pages go into detail. Each topic is a folder; its `README.md` lists the pages inside.

## Using the integration

| Folder | Covers |
| --- | --- |
| [Getting started](getting-started/README.md) | Requirements, installing through the Marketplace, HACS or by hand, setting up the integration, updating and removing it |
| [Panel](panel/README.md) | The Magic Card Templates sidebar panel: the Templates tab with its table, template view, editor and studio, the Animations tab, and the Themes tab |
| [Google Fonts](google-fonts/README.md) | The Load Google Fonts switch, what it changes in Magic Card's font pickers, theme fonts and image text, and privacy |
| [Concepts](concepts/README.md) | What a template is, how cards link to one, how linked cards are counted, the animation library, and where the data is stored |

## Security

| Folder | Covers |
| --- | --- |
| [Security](security/check-a-genuine-release.md) | How to check that a release came from the release workflow, in the browser or with the GitHub CLI |

## Reference

| Folder | Covers |
| --- | --- |
| [WebSocket API](api/README.md) | Every command for templates and animations, payloads, results, events, error codes and examples, for other custom cards |
| [Magic Card compatibility](compatibility/README.md) | How the panel loads the installed Magic Card, the `window.MagicCard` version contract and which Magic Card version each feature needs |
| [Troubleshooting](troubleshooting/README.md) | Every message the panel can show, what causes it and how to fix it |

## Where to start

- New to the integration: read [Getting started](getting-started/README.md), then [Panel](panel/README.md).
- Linking cards to templates: read [Templates and linking](concepts/templates.md).
- Building your own card on top of the integration: start with [WebSocket API](api/README.md).
- Something doesn't work: check [Troubleshooting](troubleshooting/README.md).

The Magic Card editor, studio, animation studio and theme editor themselves are part of Magic Card. Their documentation lives in the [Magic Card repository](https://github.com/therealmcsparrow/magic-card/tree/main/documentation), including the [themes](https://github.com/therealmcsparrow/magic-card/tree/main/documentation/themes) pages.
