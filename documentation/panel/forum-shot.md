# Forum shot

The Forum shot tab turns one of your Magic Cards into a single picture you can post in a forum, in an issue or in a chat. Use it when you ask for help with a card or want to show one.

Check the picture before you post it. A card can show names, places, camera images and the state of your devices, and everyone who sees your post can see them too.

The picture is made in your browser. Nothing leaves Home Assistant, and Magic Card does not keep a copy.

## What you need

-   A Magic Card on one of your dashboards.
-   The Magic Card that matches this version of the integration. See [Magic Card compatibility](../compatibility/README.md). When the card is older, the panel says which version you need.
-   An administrator account to list the cards on every dashboard. Other users see the default dashboard only, and the area says so.

## Make a picture

1.  Open the Forum shot tab in the panel. The tab reads your dashboards and lists every Magic Card it finds. Expected: a list of cards with one choice per card.
2.  Pick one card. Until you do, the Download button stays unavailable and the area says "Pick a card to continue."
3.  Under Colours, choose Light and dark, Light only or Dark only. Light and dark puts both versions side by side in one picture.
4.  Optional: tick the box for the Quiet, Living and Glow looks of animated icons. The picture then has one row per look, with light on the left and dark on the right.
5.  Read the warning above the button, then choose Download. Expected: "Making the picture…", then a preview and the message "The picture was saved to your downloads."

The file is a PNG called `magic-card-forum-shot` followed by the date and time. It holds one picture with every frame side by side, because a browser blocks several automatic downloads at once. No text is added to the picture, and the file name does not contain a card, dashboard or entity name.

Every card in the picture is paused. Nothing moves in the picture.

## Cards that cannot be picked

A card whose settings name a picture, a web address or a Google font on another server cannot be picked. The list shows it with this note: "This card loads an image, a web address or a Google font from outside Home Assistant. It cannot be used for a forum shot, because making the picture would contact another server."

Remove the outside address from a copy of the card, or use a local copy of the picture, then reload the page.

An image that comes from an entity, such as a picture attribute that points to another server, is not fetched either. The card draws its placeholder in its place, and a note under the preview says: "A picture from outside Home Assistant was replaced by a placeholder, so no other server was contacted. Your card may look different on your dashboard."

## What it sends and reads

The Forum shot tab makes two read calls to your own Home Assistant, to list the dashboards and to read the one with your card. It makes no request to any other server. The card inside the picture can still ask Home Assistant for its own data, for example for the animations in the library, as it does on a dashboard. Those calls go to your Home Assistant too.

## If something goes wrong

| Message | What to do |
| --- | --- |
| No Magic Cards were found on your dashboards. | Add a Magic Card to a dashboard, then choose Try again or reload the page. |
| Your dashboards could not be read. Check that they are not YAML dashboards, then try again. | A dashboard that you manage in YAML cannot be read. Use a dashboard you edit in the interface. |
| The Magic Card is not loaded in this browser tab. Reload the page and try again. | Reload the page. If it stays, check that the Magic Card resource is installed. |
| The picture would be too large. Choose light or dark only, or turn off the three looks. | Choose Light only or Dark only, or clear the box for the three looks. |
| The picture could not be made in this browser. Try again, or use another browser. | Choose Download again, or use a current desktop browser. |

For other panel messages see [Troubleshooting](../troubleshooting/README.md).
