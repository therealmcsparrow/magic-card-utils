"""Google Fonts switch, the settings command and the raised contract minimums."""

from unittest.mock import AsyncMock, MagicMock, patch

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from homeassistant import config_entries
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component

from custom_components.magic_card_utils import library_contract, library_images_contract
from custom_components.magic_card_utils import settings
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
    "Stock": {"primary-font-family": "Roboto, sans-serif"},
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
    # a renamed family is not requested under its new name, which the theme text would never match
    assert "Old" not in fonts
    # Home Assistant ships Roboto
    assert "Stock" not in fonts
    assert "Plain" not in fonts


async def test_options_flow_shows_the_saved_value(hass: HomeAssistant, entry) -> None:
    hass.config.components.update({"frontend", "panel_custom"})
    hass.config_entries.async_update_entry(entry, options={"google_fonts": True})
    result = await hass.config_entries.options.async_init(entry.entry_id)
    key = next(k for k in result["data_schema"].schema if k == "google_fonts")
    assert key.default() is True


async def test_catalogue_is_read_in_the_executor(hass, entry, hass_ws_client) -> None:
    hass.config_entries.async_update_entry(entry, options={"google_fonts": True})
    hass.data["frontend_themes"] = THEMES
    settings._catalogue = None
    real = hass.async_add_executor_job
    jobs = []

    def spy(target, *args):
        jobs.append(target)
        return real(target, *args)

    with patch.object(hass, "async_add_executor_job", side_effect=spy):
        result = await get_settings(hass, hass_ws_client)
    assert settings._load_catalogue in jobs
    assert [f["name"] for f in result["theme_fonts"]["T"]] == ["Lato", "Pacifico"]


async def test_saving_options_keeps_the_entry_loaded_and_unload_removes_the_panel(hass: HomeAssistant) -> None:
    assert await async_setup_component(hass, "websocket_api", {})
    hass.config.components.update({"frontend", "panel_custom", "http"})
    hass.http = MagicMock(async_register_static_paths=AsyncMock())
    entry = MockConfigEntry(domain=DOMAIN, data={"show_side_panel": True})
    entry.add_to_hass(hass)
    pkg = "custom_components.magic_card_utils"
    with (
        patch(f"{pkg}.add_extra_js_url"),
        patch(f"{pkg}.panel_custom.async_register_panel", AsyncMock()),
        patch(f"{pkg}.frontend.async_remove_panel") as remove_panel,
    ):
        assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        assert entry.state is ConfigEntryState.LOADED
        flow = await hass.config_entries.options.async_init(entry.entry_id)
        flow = await hass.config_entries.options.async_configure(flow["flow_id"], {"google_fonts": True})
        await hass.async_block_till_done()
        assert flow["type"] == "create_entry"
        assert entry.options["google_fonts"] is True
        assert entry.state is ConfigEntryState.LOADED
        remove_panel.assert_not_called()
        assert await hass.config_entries.async_unload(entry.entry_id)
        assert entry.state is ConfigEntryState.NOT_LOADED
        remove_panel.assert_called_once()


def test_contract_minimums() -> None:
    assert library_images_contract.IMAGES_MIN_CONTRACT_REVISION == 8
    assert library_contract.EDITORS_MIN_CONTRACT_REVISION == 5
