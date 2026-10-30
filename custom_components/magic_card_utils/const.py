"""Constants for the Magic Card Utils integration."""

DOMAIN = "magic_card_utils"

PANEL_TITLE = "Magic Card Templates"
# Home Assistant cannot translate the sidebar title of a custom panel per user, so the panel takes
# the title in the server's language (Settings > System > General) when it registers.
PANEL_TITLES = {"nl": "Magic Card-sjablonen"}
PANEL_ICON = "mdi:cards-outline"
PANEL_URL = "magic-card-utils"
STATIC_URL = "magic_card_utils_static"


def panel_title(language: str | None) -> str:
    """The sidebar title for a language tag such as "nl" or "nl-BE"; English otherwise."""
    return PANEL_TITLES.get((language or "").split("-")[0].lower(), PANEL_TITLE)
