# Getting started

- [Requirements](#requirements)
- [Install through the Marketplace](#install-through-the-marketplace)
- [Install with HACS](#install-with-hacs)
- [Install by hand](#install-by-hand)
- [Set up the integration](#set-up-the-integration)
- [Show or hide the side panel](#show-or-hide-the-side-panel)
- [Your first image](#your-first-image)
- [Update](#update)
- [Remove](#remove)

## Requirements

| What | Version | Why |
| --- | --- | --- |
| Home Assistant | 2024.7 or newer | The integration serves its panel with `async_register_static_paths`, added in 2024.7. HACS refuses to install it on older versions. |
| [Magic Card](https://github.com/therealmcsparrow/magic-card) | Any version for templates; 2026.10.01 or newer for the Animations tab; 2026.10.11-beta.1 or newer for the Library, Icons and Shapes tabs; Magic Card 2026.11.04 or newer for the Images tab; 2026.11.03 or newer to animate images | The panel uses the installed Magic Card for its editor, studio, preview and animation studio. Magic Card Utils doesn't ship its own copy. See [Magic Card compatibility](../compatibility/README.md). |
| Magic Card as a dashboard resource | Type JavaScript module | The panel finds Magic Card through your dashboard resources. The Marketplace and HACS add the resource for you. |
| An admin user | | The panel is only in the sidebar of admin users, and the template commands need an admin. |

## Install through the Marketplace

On Home Assistant 2026.11 or newer:

1. Go to **Settings → Marketplace**.
2. Choose **Add from link** and enter `https://github.com/therealmcsparrow/magic-card-utils`. The first time, Home Assistant asks you to accept its risk notice and to connect GitHub.
3. Install **Magic Card Utils**.
4. Restart Home Assistant.

Add and install `https://github.com/therealmcsparrow/magic-card` the same way.

## Install with HACS

On Home Assistant before 2026.11:

1. Open HACS in Home Assistant.
2. Open the menu (⋮) in the top right and select **Custom repositories**.
3. Add `https://github.com/therealmcsparrow/magic-card-utils` with type **Integration**.
4. Search for **Magic Card Utils** in HACS and click **Download**.
5. Restart Home Assistant.

Install Magic Card in HACS as well. The Images tab needs Magic Card 2026.11.04 or newer. If your Magic Card is older, the tab says so and asks you to update Magic Card. Magic Card 2026.11.04 meets every requirement of the panel.

## Install by hand

1. Download `magic_card_utils.zip` from the latest release on the [releases page](https://github.com/therealmcsparrow/magic-card-utils/releases).
2. In your Home Assistant configuration directory, make the folder `custom_components/magic_card_utils`.
3. Unpack the zip into that folder, so that `config/custom_components/magic_card_utils/manifest.json` exists.
4. Restart Home Assistant.

## Set up the integration

1. Go to **Settings → Devices & Services**.
2. Click **+ Add Integration** and search for **Magic Card Utils**.
3. Leave **Show side panel** on to get the Magic Card Templates panel in the sidebar, or turn it off if you only need the storage for your cards.
4. Click **Submit**.

The integration can be set up once. Adding it a second time stops with "Magic Card Utils is already configured."

## Turn on Google Fonts (optional)

Google Fonts are off by default. To give every Magic Card font picker the full Google Fonts catalogue:

1. Go to **Settings → Devices & services → Magic Card Utils**.
2. Click **Configure**.
3. Turn on **Load Google Fonts** and click **Submit**.
4. Reload the page in every open browser tab.

With the switch on, the browser of everyone who views a dashboard requests fonts from Google. See [Google Fonts](../google-fonts/README.md) for what loads and what Google receives.

## Show or hide the side panel

The side panel setting can't be changed afterwards; there are no options for the integration. To change it, delete the integration under **Settings → Devices & Services** and add it again. Your templates and animations are kept: they're stored separately from the integration entry (see [Where the data is stored](../concepts/storage.md)).

## Your first image

1. Open the **Magic Card Templates** panel in the sidebar and choose the **Images** tab.
2. Choose **New image**.
3. Choose a canvas size, then choose **Create**.
4. Draw a shape with the tools in the editor.
5. Choose **Save**. The first save asks for a name.

The image is listed in the Images tab. To show it in a card, refer to it in YAML with `mcu-image:<id>`. The Magic Card documentation has a section on library images, in its documentation/images folder.

## Update

1. In the Marketplace, open **Magic Card Utils** and choose **Refresh information** in the menu (⋮) if the new version doesn't show yet. In HACS, the menu item is **Update information**.
2. Click **Update**.
3. Restart Home Assistant.

The restart matters for the panel too. Its script URL carries a timestamp from when Home Assistant started, so without a restart your browser can keep the old panel even after a hard refresh.

## Remove

1. Delete the integration under **Settings → Devices & Services**.
2. Remove it in the Marketplace or HACS, or delete `config/custom_components/magic_card_utils` by hand.
3. Restart Home Assistant.

Removing the integration doesn't delete your templates and animations. To remove them as well, delete the two storage files listed in [Where the data is stored](../concepts/storage.md) while Home Assistant is stopped.
