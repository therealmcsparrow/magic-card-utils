# Forum shot

The Forum shot tab turns one of your Magic Cards into a single picture you can post in a forum, in an issue or in a chat. Use it when you ask for help with a card or want to show one.

Check the picture before you post it. A card can show names, places, camera images and the state of your devices, and everyone who sees your post can see them too.

The picture is made in your browser, and Magic Card does not keep a copy. Your cards and settings stay in Home Assistant. For a card with web fonts, your browser asks the sites named on the tab for the fonts so it can draw them. Each request shows those sites your IP address, the time, the fonts you ask for and the address of your Home Assistant (a DuckDNS name, a Nabu Casa address or a local network address), plus your browser's type and language. Your cards and settings are not sent.

## What you need

-   A Magic Card on one of your dashboards.
-   The Magic Card that matches this version of the integration. See [Magic Card compatibility](../compatibility/README.md). When the card is older, the panel says which version you need.
-   An administrator account to list the cards on every dashboard. Other users see the default dashboard only, and the area says so.

## Make a picture

1.  Open the Forum shot tab in the panel. The tab reads your dashboards and lists every Magic Card it finds in a table with the columns Dashboard, View, Card and Status. Expected: one row per card.
2.  Click a header to sort the table by that column. Click it again to reverse the order. Click a row to pick that card. Until you do, the Download button stays unavailable and the area says "Pick a card to continue."
3.  Under Colours, choose Light and dark, Light only or Dark only. Light and dark puts both versions side by side in one picture.
4.  Optional: tick the box for the Quiet, Living and Glow looks of animated icons. The picture then has one row per look, with light on the left and dark on the right.
5.  Read the warning above the button, then choose Download. Expected: "Making the picture…", then a preview and the message "The picture was saved to your downloads."

The file is a PNG called `magic-card-forum-shot` followed by the date and time. It holds one picture with every frame side by side, because a browser blocks several automatic downloads at once. No text is added to the picture, and the file name does not contain a card, dashboard or entity name.

Every card in the picture is paused. Nothing moves in the picture.

## Cards that are locked

A card that cannot be used for a picture shows Locked in the Status column, with one reason. The tab does not show the address itself, so look for it in the card's settings and CSS. The reasons are:

-   It loads something from outside Home Assistant.
-   It holds another card (a custom-card module) that nothing here can check.
-   It names too many outside websites, or it is too large to check.
-   Its settings could not be checked for outside addresses.

Change what the reason points to in the card, save it, then reopen the tab. For the steps, see [A card is locked in the Forum shot tab](https://github.com/therealmcsparrow/magic-card/blob/main/documentation/troubleshooting/README.md#a-card-is-locked-in-the-forum-shot-tab) in the Magic Card documentation.

## Fonts

Google fonts and font addresses in a card are allowed. A usable card that uses them shows the line "Fonts from" followed by the sites involved, so you can see who your browser will ask before you choose Download. Fonts that sit on a site the tab does not show are not fetched.

If a font cannot be loaded, Download stops with "A font could not be loaded, so no picture was made. Check your connection and try again." No picture is saved when a font fails, so you never get a picture with the wrong font.

An image that comes from an entity, such as a picture attribute that points to another server, is not fetched. The card draws its placeholder in its place, and a note under the preview says: "A picture from outside Home Assistant was replaced by a placeholder, so no other server was contacted. Your card may look different on your dashboard."

## What it sends and reads

The Forum shot tab makes two read calls to your own Home Assistant, to list the dashboards and to read the one with your card. The card inside the picture can still ask Home Assistant for its own data, for example for the animations in the library, as it does on a dashboard. Those calls go to your Home Assistant too.

The only requests to other servers are the font requests for a card with web fonts, described at the top of this page. Images from outside Home Assistant are never fetched.

## If something goes wrong

| Message | What to do |
| --- | --- |
| No Magic Cards were found on your dashboards. | Add a Magic Card to a dashboard, then choose Try again or reload the page. |
| Your dashboards could not be read. Check that they are not YAML dashboards, then try again. | A dashboard that you manage in YAML cannot be read. Use a dashboard you edit in the interface. |
| The Magic Card is not loaded in this browser tab. Reload the page and try again. | Reload the page. If it stays, check that the Magic Card resource is installed. |
| The picture would be too large. Choose light or dark only, or turn off the three looks. | Choose Light only or Dark only, or clear the box for the three looks. |
| A font could not be loaded, so no picture was made. Check your connection and try again. | Try once more. No picture is saved when a font fails. If it fails again, the card's font stylesheet may list fonts on a site the tab does not show. Use a stylesheet whose fonts sit on a site the tab shows, or remove it from the card's CSS. |
| The picture could not be made in this browser. Try again, or use another browser. | Choose Download again, or use a current desktop browser. |

For other panel messages see [Troubleshooting](../troubleshooting/README.md).
