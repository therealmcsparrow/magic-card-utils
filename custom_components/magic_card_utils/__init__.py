import json
import time
from pathlib import Path

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.components import panel_custom

from .const import DOMAIN, PANEL_ICON, PANEL_TITLE, PANEL_URL, STATIC_URL
from .websocket import async_register_websocket


def _load_manifest_version() -> str:
    try:
        manifest_path = Path(__file__).parent / "manifest.json"
        return json.loads(manifest_path.read_text()).get("version", "0")
    except Exception:
        return "0"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up from a config entry."""
    await async_register_websocket(hass)

    if not hass.data.get(f"{DOMAIN}_static_path_registered", False):
        hass.http.app.router.add_static(
            f"/{STATIC_URL}",
            hass.config.path("custom_components/magic_card_utils/www"),
            name="magic_card_utils_static"
        )
        hass.data[f"{DOMAIN}_static_path_registered"] = True

    if entry.data.get("show_side_panel", True):
        await async_register_panel(hass)

    return True


async def async_register_panel(hass: HomeAssistant) -> None:
    """Register the sidebar panel."""
    version = await hass.async_add_executor_job(_load_manifest_version)

    # Build the panel URL: first the magic-card editor, then the utils panel wrapper
    editor_url = f"/{STATIC_URL}/magic-card.js?v={version}&t={int(time.time())}"
    panel_url   = f"/{STATIC_URL}/magic_card_utils_panel.js?v={version}&t={int(time.time())}"

    await panel_custom.async_register_panel(
        hass,
        webcomponent_name="magic-card-utils-panel",
        frontend_url_path=PANEL_URL,
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        module_url=panel_url,
        embed_iframe=False,
        require_admin=True,
    )

    # Register magic-card editor element on the same static URL so the panel can load it
    if not hasattr(hass, '_magic_card_editor_registered'):
        hass.http.app.router.add_static(
            f"/{STATIC_URL}/magic-card-editor",
            hass.config.path("custom_components/magic_card_utils/www/magic-card.js"),
            name="magic_card_utils_magic_card_editor"
        )
        hass._magic_card_editor_registered = True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    # Unregister the panel
    if entry.data.get("show_side_panel", True):
        await panel_custom.async_remove_panel(hass, PANEL_URL)

    # Pop data
    hass.data.pop(DOMAIN, None)

    return True
