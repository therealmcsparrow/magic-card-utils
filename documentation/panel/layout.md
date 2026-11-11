# Panel layout

The panel has a new look. Nothing was removed: all eight tabs keep every field and action.

-   [What you see](#what-you-see)
-   [Search and density](#search-and-density)
-   [The inspector](#the-inspector)
-   [Preview](#preview)
-   [Modified only](#modified-only)
-   [Empty Animations and Themes](#empty-animations-and-themes)
-   [Narrow screens](#narrow-screens)
-   [Light, dark and fonts](#light-dark-and-fonts)

## What you see

At 1024 px wide or more:

1.  A header at the top.
2.  A tab bar on one row: Templates, Library, Animations, Themes, Icons, Shapes, Images and Forum shot. Move between tabs with Left, Right, Home and End.
3.  A ruled list or grid of the items on the tab.
4.  An inspector on the right for the selected item.

## Search and density

Type in the search field to filter the list. The density pill switches between a compact and a roomier list.

## The inspector

The inspector shows the selected item in collapsible groups. A closed group shows its current value in its header, so you can read the settings without opening them. At this width the inspector sits beside the list and never covers it.

## Preview

The inspector has a Preview section:

-   Templates: the live Magic Card for the selected template. If it cannot be drawn, you see the same error text as before.
-   Forum shot: the picture preview, with the privacy help text. See [Forum shot](forum-shot.md).
-   Icons and Shapes: the item.

## Modified only

Switch on Modified only to show just the inspector fields that differ from their default. Switch it off to see all of them.

## Empty Animations and Themes

When the Animations or Themes tab has nothing yet, it offers one button, Open animation studio or Open theme editor, which opens the studio at its list. Import and New are there. See [Animations](animations.md) and [Themes](themes.md).

## Narrow screens

Below 1024 px wide, the inspector opens as a full-height sheet with a back button and the name of the selection. The tab bar scrolls sideways and stays on one row, down to a phone width of 375 px. Escape closes the sheet.

The page itself never scrolls. The panel is as tall as the window; the header, the tab bar, the search and buttons above a list, and the inspector stay in place. The list or grid of each tab scrolls in its own area, with the column heads staying put, and the inspector scrolls on its own when it is taller than the room. This holds in the side-by-side layout and in the sheet layout.

## Light, dark and fonts

The panel follows Home Assistant's light or dark mode. Its fonts ship with the integration and load from your Home Assistant, so no outside site is asked. Their licences are in the third-party notices: see [Third-party](../../README.md#third-party).
