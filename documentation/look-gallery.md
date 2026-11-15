# Look gallery

The look gallery is a collection of looks that other people shared. You browse it from the Magic Card editor and apply a look to your own card. A look changes only how a card looks, never what it does. It is off by default, and you turn it on here, in Magic Card Utils.

This needs Magic Card with the look gallery. For how to browse, preview and keep a look, see the [look gallery guide](https://github.com/therealmcsparrow/magic-card/blob/main/documentation/look-gallery/README.md) in the Magic Card documentation.

## Turn it on

Turning it on is an administrator task. The switch covers everyone who uses this Home Assistant.

1. Go to Settings → Devices & services → Magic Card Utils.
2. Choose Configure.
3. Turn on **Look gallery** and select **Submit**.
   Result: a screen titled "Turn on the look gallery?" lists the websites your browser will contact. Nothing is saved yet.
4. Read it, then select **Continue**. Select **Cancel** to leave the gallery off.
   Result: a second screen titled "Turn on the look gallery for everyone?" explains that the switch applies to every user.
5. Select **Turn on**.
   Result: **Look gallery** and **Load Google Fonts** are both stored as on. Cancelling or closing either screen stores nothing.
6. Reload each open dashboard. In a browser, refresh the page. In the Home Assistant app on an iPad or iPhone, pull down to refresh, or close and reopen the app.

## How it works with Load Google Fonts

Many looks use Google fonts, so the gallery needs **Load Google Fonts**. Turning the gallery on turns that switch on too.

If **Load Google Fonts** is off while **Look gallery** is on, the form shows: "The look gallery needs Load Google Fonts. Turn on Load Google Fonts too, or turn the look gallery off." Fix it with either switch.

## Turn it off

Switch **Look gallery** off and submit, then reload the dashboards. That stops the requests to `therealmcsparrow.github.io`. It leaves **Load Google Fonts** as it is, so cards that use Google fonts keep loading them. Turn **Load Google Fonts** off as well to stop those requests; cards then show a standard font instead. Cards that already use a look keep their style settings either way.

## Privacy

The look gallery is off by default. While it is off, Magic Card sends no request to the gallery host. Requests to Google Fonts depend on the separate **Load Google Fonts** switch.

When you turn the gallery on, **Load Google Fonts** is turned on with it, and your browser contacts these websites. They see your internet address (IP address) and the usual details a browser sends, such as its type and language:

- **The gallery host**, `therealmcsparrow.github.io`, run by GitHub. Only the card editor contacts it, and only while the gallery is open. It loads the list of looks and the preview images.
- **Google Fonts**, `fonts.googleapis.com` and `fonts.gstatic.com`, run by Google. Any browser that shows a card with a look that uses a Google font contacts it, whether or not the editor is open, while **Load Google Fonts** is on. Turning the gallery off does not turn **Load Google Fonts** off; turn that off too to stop these requests.

Magic Card Utils sends nothing to its author, runs no server and has no analytics. Your consent is the confirmation on the second screen. You can withdraw it by turning the switch off, and **Load Google Fonts** for the font requests. The switch is shared by everyone who uses the same Home Assistant, so the person who turns it on gives the consent for the household or organisation. If other people use your Home Assistant, tell them.

The list of looks is signed. Magic Card checks the signature and every look before it shows anything, and keeps a copy of the list in the browser's storage so the gallery works offline. When you apply a look, its style settings are copied into your card. The saved card has no link to the gallery, so it works the same if the gallery goes offline or removes the look.

For Google's side, see [Google Fonts](google-fonts/README.md).
