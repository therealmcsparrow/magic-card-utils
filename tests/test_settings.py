"""Google Fonts switch, the settings command and the raised contract minimums."""

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component

from custom_components.magic_card_utils import library_contract, library_images_contract
from custom_components.magic_card_utils.const import DOMAIN
from custom_components.magic_card_utils.settings import (
    CMD_GET_SETTINGS,
    ws_get_settings,
)

from homeassistant.components import websocket_api

THEMES = {
    "T": {
        "ha-font-family-body": '"Lato", sans-serif',
        "modes": {"dark": {"ha-card-header-font-family": "Segoe UI, Pacifico"}},
    },
    "Old": {"primary-font-family": "Source Sans Pro"},
    "Plain": {"primary-color": "#fff"},
}


@pytest.fixture
async def entry(hass: HomeAssistant):
    assert await async_setup_component(hass, "websocket_api", {})
    websocket_api.async_register_command(hass, ws_get_settings)
    entry = MockConfigEntry(domain=DOMAIN, data={})
    entry.add_to_hass(hass)
    return entry


async def get_settings(hass, hass_ws_client, token=None):
    client = await hass_ws_client(hass, token) if token else await hass_ws_client(hass)
    await client.send_json_auto_id({"type": CMD_GET_SETTINGS})
    msg = await client.receive_json()
    assert msg["success"], msg
    return msg["result"]


async def test_options_flow_default_false_and_saves_true(hass: HomeAssistant, entry) -> None:
    hass.config.components.update({"frontend", "panel_custom"})
    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] == "form" and result["step_id"] == "init"
    key = next(k for k in result["data_schema"].schema if k == "google_fonts")
    assert key.default() is False
    result = await hass.config_entries.options.async_configure(result["flow_id"], {"google_fonts": True})
    assert result["type"] == "create_entry"
    assert entry.options["google_fonts"] is True


async def test_non_admin_default_is_off(hass, entry, hass_ws_client, hass_read_only_access_token) -> None:
    hass.data["frontend_themes"] = THEMES
    result = await get_settings(hass, hass_ws_client, hass_read_only_access_token)
    assert result == {"google_fonts": False, "theme_fonts": {}}


async def test_theme_fonts_when_on(hass, entry, hass_ws_client, hass_read_only_access_token) -> None:
    hass.config_entries.async_update_entry(entry, options={"google_fonts": True})
    hass.data["frontend_themes"] = THEMES
    result = await get_settings(hass, hass_ws_client, hass_read_only_access_token)
    assert result["google_fonts"] is True
    fonts = result["theme_fonts"]
    assert [f["name"] for f in fonts["T"]] == ["Lato", "Pacifico"]
    assert fonts["T"][0]["weights"] == [100, 300, 400, 700, 900]
    assert fonts["Old"] == [{"name": "Source Sans 3", "weights": fonts["Old"][0]["weights"]}]
    assert fonts["Old"][0]["weights"]
    assert "Plain" not in fonts


def test_contract_minimums() -> None:
    assert library_images_contract.IMAGES_MIN_CONTRACT_REVISION == 8
    assert library_contract.EDITORS_MIN_CONTRACT_REVISION == 5
