# Images tab

The Images tab lists the image library. A library image is a drawing made in the Magic Card image editor. Dashboards show it in an image module or as a background layer. The Magic Card documentation has a section on library images (documentation/images).

Images are stored in Home Assistant, not in your dashboard YAML. Export all keeps a backup.

## Requirements

- Magic Card 2026.10.12-beta.8 or newer. The Images tab says "Install Magic Card to draw images here." when Magic Card is missing, and "Drawing images here needs Magic Card 2026.10.12-beta.8 or newer. Update Magic Card in HACS." when it is too old.
- Magic Card Utils is installed through HACS, like Magic Card.

## Who can do what

- Everyone who can log in to Home Assistant can see the images on a dashboard and can open an image in the editor.
- Only administrators can create, change, rename, delete or import images. A non-administrator who opens an image gets the editor in view-only mode, with the message "You can look at this image but not change it. Ask an administrator." If a non-administrator tries to create an image, the message is "Only administrators can create or change images."

## Create an image

1. Open the Images tab and choose New image.
2. Choose a canvas size and Create. The Magic Card documentation describes each option under "The image editor".
3. Draw, then choose Save. The first save asks for a name.

## Export all images

The Export all images button saves every library image to a file on your device. The button shows "Export all" until the image support has loaded.

Export files contain your drawings and may contain entity names from bindings. Check a file before you share it. The Magic Card documentation has the privacy note for library images.

## Limits

- An image can be up to 256 KiB.
- The library holds up to 200 images.
