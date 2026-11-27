"""WebSocket commands of the theme editor (theme-files 2.0.0), through the real WS layer."""

import os
from pathlib import Path

import pytest
import yaml
from pytest_homeassistant_custom_component.common import MockConfigEntry

from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.setup import async_setup_component

from custom_components.magic_card_utils.const import DOMAIN
from custom_components.magic_card_utils.settings import CONF_THEME_FILES
from custom_components.magic_card_utils.themes import async_setup_themes
from custom_components.magic_card_utils.themes_contract import (
    CMD_DELETE,
    CMD_GET,
    CMD_LIST,
    CMD_SAVE,
    INCLUDE_HINT,
    STORAGE_KEY_THEMES,
    WRITTEN_HEADER,
)

INCLUDE_YAML = "frontend:\n  themes: !include_dir_merge_named themes\n"


@pytest.fixture(autouse=True)
def _fchmod_on_windows(monkeypatch):
    if not hasattr(os, "fchmod"):
        monkeypatch.setattr(os, "fchmod", lambda *a, **k: None, raising=False)


@pytest.fixture
def cfg(hass: HomeAssistant, tmp_path) -> Path:
    (tmp_path / "themes").mkdir()
    (tmp_path / "configuration.yaml").write_text(INCLUDE_YAML, encoding="utf-8")
    hass.config.config_dir = str(tmp_path)
    return tmp_path


@pytest.fixture
def reloads(hass: HomeAssistant, cfg: Path) -> list[int]:
    """A fake frontend.reload_themes that loads every top-level themes/*.yaml, like HA would."""
    calls: list[int] = []
    hass.data["frontend_themes"] = {}

    async def reload_themes(call: ServiceCall) -> None:
        calls.append(1)
        loaded: dict = {}
        for path in sorted((cfg / "themes").glob("*.yaml")):
            data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
            loaded.update(data)
        hass.data["frontend_themes"] = loaded

    hass.services.async_register("frontend", "reload_themes", reload_themes)
    return calls


@pytest.fixture
def writes() -> bool:
    """The Theme files option. On for most tests; the writes-off tests override it."""
    return True


@pytest.fixture
async def setup(hass: HomeAssistant, cfg: Path, reloads, writes):
    MockConfigEntry(domain=DOMAIN, data={}, options={CONF_THEME_FILES: writes}).add_to_hass(hass)
    assert await async_setup_component(hass, "websocket_api", {})
    await async_setup_themes(hass)
    await hass.async_block_till_done()


async def cmd(client, payload: dict) -> dict:
    await client.send_json_auto_id(payload)
    return await client.receive_json()


def put(cfg: Path, rel: str, text: str, own: bool = True) -> Path:
    """Write a theme file; ``own`` puts the editor's header in front, as a file the editor wrote."""
    if own:
        text = WRITTEN_HEADER + text
    path = cfg / "themes" / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")
    return path


THEME = {"primary-color": "#ff0000", "modes": {"dark": {"primary-color": "#00ff00"}}}


# ------------------------------------------------------------------ AC 11


@pytest.mark.parametrize(
    "payload",
    [
        {"type": CMD_LIST},
        {"type": CMD_GET, "name": "x"},
        {"type": CMD_SAVE, "name": "x", "theme": {}},
        {"type": CMD_DELETE, "name": "x"},
    ],
)
async def test_non_admin_is_unauthorized(hass, setup, hass_ws_client, hass_read_only_access_token, payload):
    client = await hass_ws_client(hass, hass_read_only_access_token)
    res = await cmd(client, payload)
    assert not res["success"]
    assert res["error"]["code"] == "unauthorized"


async def test_non_admin_cannot_write_files(hass, cfg, setup, hass_ws_client, hass_read_only_access_token):
    client = await hass_ws_client(hass, hass_read_only_access_token)
    await cmd(client, {"type": CMD_SAVE, "name": "x", "theme": {"a": "b"}})
    assert not (cfg / "themes" / "x.yaml").exists()


# ------------------------------------------------------------------ list / get
async def test_list_empty(hass, setup, hass_ws_client):
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_LIST})
    assert res["success"], res
    assert res["result"]["files"] == []
    assert res["result"]["loaded"] == []
    assert res["result"]["storage"] is True
    assert res["result"]["include"] == {"state": "ok", "dir_exists": True, "hint": INCLUDE_HINT}


async def test_list_shows_files_and_loaded(hass, cfg, setup, reloads, hass_ws_client):
    put(cfg, "warm.yaml", "warm:\n  primary-color: '#f00'\n")
    put(cfg, "multi.yaml", "a:\n  x: 1\nb:\n  y: 2\n")
    hass.data["frontend_themes"] = {"warm": {}, "other": {}}
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_LIST})
    assert res["success"]
    by_name = {f["name"]: f for f in res["result"]["files"]}
    assert by_name["warm"]["editable"] is True
    assert by_name["warm"]["stored"] is False and by_name["warm"]["folder"] == "current"
    assert by_name["warm"]["file"] == "themes/warm.yaml"
    assert by_name["multi"]["folder"] == "foreign"
    assert res["result"]["loaded"] == ["other", "warm"]
    assert any(not f["editable"] for f in res["result"]["files"])


async def test_list_include_missing(hass, cfg, setup, hass_ws_client):
    (cfg / "configuration.yaml").write_text("default_config:\n", encoding="utf-8")
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_LIST})
    assert res["result"]["include"]["state"] == "missing"
    assert res["result"]["include"]["hint"] == INCLUDE_HINT


async def test_list_include_ok_when_file_theme_loaded(hass, cfg, setup, hass_ws_client):
    """Packages: configuration.yaml has no include but a themes/ file is loaded by HA."""
    (cfg / "configuration.yaml").write_text("default_config:\n", encoding="utf-8")
    put(cfg, "warm.yaml", "warm:\n  a: b\n")
    hass.data["frontend_themes"] = {"warm": {}}
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_LIST})
    assert res["result"]["include"]["state"] == "ok"


async def test_get_folder_file(hass, cfg, setup, hass_ws_client):
    path = put(cfg, "warm.yaml", "warm:\n  primary-color: '#f00'\n")
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_GET, "name": "warm"})
    assert res["success"], res
    r = res["result"]
    assert r["name"] == "warm" and r["editable"] is True
    assert r["stored"] is False and r["folder"] == "current"
    assert r["theme"] == {"primary-color": "#f00"}
    assert r["mtime"] == pytest.approx(path.stat().st_mtime)


async def test_get_read_only_returns_reason(hass, cfg, setup, hass_ws_client):
    put(cfg, "sub/inner.yaml", "inner:\n  a: b\n")
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_GET, "name": "inner"})
    assert res["success"]
    assert res["result"]["editable"] is False
    assert res["result"]["reason"] == "subfolder"
    assert res["result"]["folder"] == "foreign"
    assert res["result"]["theme"] == {"a": "b"}


async def test_get_not_found(hass, setup, hass_ws_client):
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_GET, "name": "nope"})
    assert not res["success"]
    assert res["error"]["code"] == "not_found"


# ------------------------------------------------------------------ 2.0.0 save goes to storage


async def test_save_stores_without_writing_a_file(hass, cfg, setup, reloads, hass_ws_client, hass_storage):
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_SAVE, "name": "warm-night", "theme": THEME})
    assert res["success"], res
    r = res["result"]
    assert r == {
        "name": "warm-night",
        "file": "themes/warm-night.yaml",
        "mtime": r["mtime"],
        "loaded": False,
        "stored": True,
        "published": False,
        "folder": "none",
    }
    assert not (cfg / "themes" / "warm-night.yaml").exists()
    assert reloads == []
    await hass.async_block_till_done()
    stored = hass_storage[STORAGE_KEY_THEMES]["data"]["themes"]["warm-night"]
    assert stored["theme"] == THEME and stored["updated"] == r["mtime"]


async def test_stored_theme_is_listed_and_read_back(hass, cfg, setup, hass_ws_client):
    theme = {"b-key": "2", "a-key": "1", "modes": {"light": {"z": 1.5}}, "css": "x {\n  y: z;\n}\n"}
    client = await hass_ws_client(hass)
    saved = (await cmd(client, {"type": CMD_SAVE, "name": "rt", "theme": theme}))["result"]
    res = await cmd(client, {"type": CMD_GET, "name": "rt"})
    assert res["result"]["theme"] == theme
    assert list(res["result"]["theme"]) == list(theme)
    assert res["result"]["stored"] is True and res["result"]["folder"] == "none"
    assert res["result"]["mtime"] == saved["mtime"]
    files = (await cmd(client, {"type": CMD_LIST}))["result"]["files"]
    assert files == [
        {
            "name": "rt",
            "file": "themes/rt.yaml",
            "editable": True,
            "has_modes": True,
            "var_count": 4,
            "mtime": saved["mtime"],
            "stored": True,
            "folder": "none",
        }
    ]


async def test_save_works_with_the_option_off_and_without_include(hass, cfg, reloads, hass_ws_client):
    """Storage saves need neither the themes-folder option nor the include line."""
    (cfg / "configuration.yaml").write_text("default_config:\n", encoding="utf-8")
    assert await async_setup_component(hass, "websocket_api", {})
    await async_setup_themes(hass)
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_SAVE, "name": "fresh", "theme": THEME})
    assert res["success"], res
    assert res["result"]["published"] is False
    assert list((cfg / "themes").iterdir()) == []


async def test_loads_stored_and_drops_invalid(hass, cfg, hass_storage, reloads, hass_ws_client):
    hass_storage[STORAGE_KEY_THEMES] = {
        "version": 1,
        "minor_version": 1,
        "key": STORAGE_KEY_THEMES,
        "data": {
            "themes": {
                "good": {"theme": {"a": "b"}, "updated": 5.0},
                "Bad Name": {"theme": {"a": "b"}, "updated": 5.0},
                "bad-theme": {"theme": {"a": ["x"]}, "updated": 5.0},
                "no-time": {"theme": {"a": "b"}},
            }
        },
    }
    assert await async_setup_component(hass, "websocket_api", {})
    await async_setup_themes(hass)
    client = await hass_ws_client(hass)
    files = (await cmd(client, {"type": CMD_LIST}))["result"]["files"]
    assert [f["name"] for f in files] == ["good"]


async def test_save_existing_stored_theme_needs_overwrite(hass, setup, hass_ws_client):
    client = await hass_ws_client(hass)
    first = (await cmd(client, {"type": CMD_SAVE, "name": "t", "theme": {"a": "1"}}))["result"]
    res = await cmd(client, {"type": CMD_SAVE, "name": "t", "theme": {"a": "2"}})
    assert res["error"]["code"] == "name_taken"
    res = await cmd(
        client, {"type": CMD_SAVE, "name": "t", "theme": {"a": "2"}, "overwrite": True, "base_mtime": first["mtime"]}
    )
    assert res["success"], res
    assert res["result"]["mtime"] > first["mtime"]
    got = (await cmd(client, {"type": CMD_GET, "name": "t"}))["result"]
    assert got["theme"] == {"a": "2"}


async def test_save_conflict_on_stored_base_mtime(hass, setup, hass_ws_client):
    client = await hass_ws_client(hass)
    first = (await cmd(client, {"type": CMD_SAVE, "name": "t", "theme": {"a": "1"}}))["result"]
    res = await cmd(
        client, {"type": CMD_SAVE, "name": "t", "theme": {"a": "2"}, "overwrite": True, "base_mtime": first["mtime"] - 50}
    )
    assert res["error"]["code"] == "conflict"
    assert (await cmd(client, {"type": CMD_GET, "name": "t"}))["result"]["theme"] == {"a": "1"}


async def test_save_name_loaded_from_another_file(hass, cfg, setup, reloads, hass_ws_client):
    hass.data["frontend_themes"] = {"taken": {"a": "b"}}
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_SAVE, "name": "taken", "theme": {"a": "c"}})
    assert not res["success"]
    assert res["error"]["code"] == "name_taken"
    assert not (cfg / "themes" / "taken.yaml").exists()
    assert reloads == []


async def test_save_invalid_theme_has_field_errors(hass, cfg, setup, hass_ws_client):
    client = await hass_ws_client(hass)
    res = await cmd(
        client, {"type": CMD_SAVE, "name": "t", "theme": {"primary-color": ["x"], "bad key": "y"}}
    )
    assert not res["success"]
    assert res["error"]["code"] == "invalid_format"
    errors = res["error"]["errors"]  # the panel adapter reads err.errors on the rejection
    assert {"primary-color", "bad key"} <= {e["path"] for e in errors}
    assert all(set(e) == {"path", "message"} for e in errors)
    files = (await cmd(client, {"type": CMD_LIST}))["result"]["files"]
    assert files == []


async def test_save_invalid_beats_include_check(hass, cfg, setup, hass_ws_client):
    (cfg / "configuration.yaml").write_text("default_config:\n", encoding="utf-8")
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_SAVE, "name": "t", "theme": {"a": []}, "publish": True})
    assert res["error"]["code"] == "invalid_format"


@pytest.mark.parametrize(
    "name",
    ["../x", "a/b", "a\\b", "", "Default", "default", "x" * 65, "x.yaml", "a\x00b", "UPPER", ".hidden"],
)
async def test_save_rejects_bad_names_and_writes_nothing(hass, cfg, setup, reloads, hass_ws_client, name):
    client = await hass_ws_client(hass)
    for publish in (False, True):
        res = await cmd(client, {"type": CMD_SAVE, "name": name, "theme": {"a": "b"}, "publish": publish})
        assert not res["success"]
        assert res["error"]["code"] == "invalid_format"
        assert res["error"]["errors"][0]["path"] == "name"
    assert reloads == []
    assert sorted(p.name for p in cfg.iterdir()) == ["configuration.yaml", "themes"]
    assert list((cfg / "themes").iterdir()) == []
    assert not (cfg.parent / "x.yaml").exists()
    assert (await cmd(client, {"type": CMD_LIST}))["result"]["files"] == []


@pytest.mark.parametrize("payload", [
    {"name": 5, "theme": {}},
    {"name": "t", "theme": "nope"},
    {"name": "t", "theme": []},
    {"name": "t", "theme": {}, "overwrite": "yes"},
    {"name": "t", "theme": {}, "base_mtime": "now"},
    {"name": "t", "theme": {}, "base_mtime": True},
    {"name": "t", "theme": {}, "publish": "yes"},
])
async def test_save_rejects_malformed_payload(hass, cfg, setup, hass_ws_client, payload):
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_SAVE, **payload})
    assert not res["success"]
    assert res["error"]["code"] == "invalid_format"
    assert list((cfg / "themes").iterdir()) == []


async def test_save_missing_fields_is_invalid(hass, setup, hass_ws_client):
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_SAVE, "name": "t"})
    assert not res["success"]
    assert res["error"]["code"] == "invalid_format"


async def test_save_refuses_when_store_is_full(hass, setup, hass_ws_client, monkeypatch):
    from custom_components.magic_card_utils import themes as themes_mod

    monkeypatch.setattr(themes_mod, "MAX_STORED_THEMES", 1)
    client = await hass_ws_client(hass)
    assert (await cmd(client, {"type": CMD_SAVE, "name": "a", "theme": {"x": "1"}}))["success"]
    res = await cmd(client, {"type": CMD_SAVE, "name": "b", "theme": {"x": "1"}})
    assert res["error"]["code"] == "too_large"
    res = await cmd(client, {"type": CMD_SAVE, "name": "a", "theme": {"x": "2"}, "overwrite": True})
    assert res["success"], res


async def test_save_refuses_when_store_would_exceed_total_size(hass, setup, hass_ws_client, monkeypatch):
    from custom_components.magic_card_utils import themes as themes_mod

    monkeypatch.setattr(themes_mod, "MAX_STORE_BYTES", 400)
    client = await hass_ws_client(hass)
    assert (await cmd(client, {"type": CMD_SAVE, "name": "a", "theme": {"x": "1"}}))["success"]
    big = {f"key-{i}": "v" * 20 for i in range(20)}
    res = await cmd(client, {"type": CMD_SAVE, "name": "b", "theme": big})
    assert res["error"]["code"] == "too_large"
    listed = (await cmd(client, {"type": CMD_LIST}))["result"]["files"]
    assert [f["name"] for f in listed] == ["a"]
    res = await cmd(client, {"type": CMD_SAVE, "name": "a", "theme": {"x": "2"}, "overwrite": True})
    assert res["success"], res


async def test_load_drops_stored_theme_over_the_file_size_limit(hass, cfg, hass_storage, reloads, hass_ws_client):
    huge = {f"k{i}": "v" * 3000 for i in range(100)}  # about 300 KB as YAML, within every other limit
    hass_storage[STORAGE_KEY_THEMES] = {
        "version": 1,
        "minor_version": 1,
        "key": STORAGE_KEY_THEMES,
        "data": {
            "themes": {
                "good": {"theme": {"a": "b"}, "updated": 5.0},
                "huge": {"theme": huge, "updated": 5.0},
            }
        },
    }
    assert await async_setup_component(hass, "websocket_api", {})
    await async_setup_themes(hass)
    client = await hass_ws_client(hass)
    files = (await cmd(client, {"type": CMD_LIST}))["result"]["files"]
    assert [f["name"] for f in files] == ["good"]


# ------------------------------------------------------------------ 2.0.0 publish to the themes folder


async def test_publish_writes_file_reloads_and_reports_loaded(hass, cfg, setup, reloads, hass_ws_client):
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_SAVE, "name": "warm-night", "theme": THEME, "publish": True})
    assert res["success"], res
    r = res["result"]
    assert r["file"] == "themes/warm-night.yaml"
    assert r["loaded"] is True and r["published"] is True and r["folder"] == "current" and r["stored"] is True
    assert len(reloads) == 1
    text = (cfg / "themes" / "warm-night.yaml").read_text(encoding="utf-8")
    assert text.startswith(WRITTEN_HEADER)
    assert yaml.safe_load(text) == {"warm-night": THEME}
    got = (await cmd(client, {"type": CMD_GET, "name": "warm-night"}))["result"]
    assert got["stored"] is True and got["folder"] == "current"
    files = (await cmd(client, {"type": CMD_LIST}))["result"]["files"]
    assert [(f["name"], f["stored"], f["folder"]) for f in files] == [("warm-night", True, "current")]


async def test_storage_save_after_publish_makes_the_folder_copy_outdated(hass, cfg, setup, reloads, hass_ws_client):
    client = await hass_ws_client(hass)
    first = (await cmd(client, {"type": CMD_SAVE, "name": "t", "theme": {"a": "1"}, "publish": True}))["result"]
    res = await cmd(
        client, {"type": CMD_SAVE, "name": "t", "theme": {"a": "2"}, "overwrite": True, "base_mtime": first["mtime"]}
    )
    assert res["result"]["folder"] == "outdated" and res["result"]["published"] is False
    assert yaml.safe_load((cfg / "themes" / "t.yaml").read_text())["t"] == {"a": "1"}
    files = (await cmd(client, {"type": CMD_LIST}))["result"]["files"]
    assert files[0]["folder"] == "outdated"
    res = await cmd(
        client,
        {"type": CMD_SAVE, "name": "t", "theme": {"a": "2"}, "overwrite": True, "base_mtime": res["result"]["mtime"], "publish": True},
    )
    assert res["result"]["folder"] == "current"
    assert yaml.safe_load((cfg / "themes" / "t.yaml").read_text())["t"] == {"a": "2"}
    assert len(reloads) == 2


async def test_publish_blocked_when_themes_not_included(hass, cfg, setup, reloads, hass_ws_client):
    (cfg / "configuration.yaml").write_text("default_config:\n", encoding="utf-8")
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_SAVE, "name": "t", "theme": {"a": "b"}, "publish": True})
    assert res["error"]["code"] == "themes_not_included"
    assert not (cfg / "themes" / "t.yaml").exists()
    assert reloads == []
    assert (await cmd(client, {"type": CMD_LIST}))["result"]["files"] == []


async def test_publish_failed_write_stores_nothing(hass, cfg, setup, reloads, hass_ws_client, monkeypatch):
    from custom_components.magic_card_utils import theme_files as tf

    def fail(*args, **kwargs):
        raise tf.ThemeFileError("save_failed", "Could not write the theme file.")

    monkeypatch.setattr(tf, "write_theme", fail)
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_SAVE, "name": "t", "theme": {"a": "b"}, "publish": True})
    assert res["error"]["code"] == "save_failed"
    assert reloads == []
    assert (await cmd(client, {"type": CMD_LIST}))["result"]["files"] == []


async def test_publish_when_reload_fails_reports_not_loaded(hass, cfg, setup, hass_ws_client):
    async def boom(call: ServiceCall) -> None:
        raise RuntimeError("reload failed")

    hass.services.async_register("frontend", "reload_themes", boom)
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_SAVE, "name": "t", "theme": {"a": "b"}, "publish": True})
    assert res["success"], res
    assert res["result"]["loaded"] is False
    assert (cfg / "themes" / "t.yaml").exists()


async def test_publish_without_reload_service_reports_not_loaded(hass, cfg, setup, hass_ws_client):
    hass.services.async_remove("frontend", "reload_themes")
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_SAVE, "name": "t", "theme": {"a": "b"}, "publish": True})
    assert res["success"], res
    assert res["result"]["loaded"] is False


@pytest.mark.parametrize("writes", [False])
async def test_publish_refused_when_option_off(hass, cfg, setup, reloads, hass_ws_client):
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_SAVE, "name": "fresh", "theme": THEME, "publish": True})
    assert res["error"]["code"] == "theme_files_off"
    assert not (cfg / "themes" / "fresh.yaml").exists()
    assert reloads == []
    # nothing is stored either: every check runs before anything changes
    assert (await cmd(client, {"type": CMD_LIST}))["result"]["files"] == []
    res = await cmd(client, {"type": CMD_SAVE, "name": "fresh", "theme": THEME})
    assert res["success"], res


async def test_publish_without_config_entry_is_off(hass, cfg, reloads, hass_ws_client):
    assert await async_setup_component(hass, "websocket_api", {})
    await async_setup_themes(hass)
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_SAVE, "name": "fresh", "theme": THEME, "publish": True})
    assert res["error"]["code"] == "theme_files_off"


async def test_publish_refuses_symlink(hass, cfg, setup, reloads, hass_ws_client, tmp_path_factory):
    target = tmp_path_factory.mktemp("outside") / "real.yaml"
    target.write_text("link:\n  a: b\n", encoding="utf-8")
    try:
        (cfg / "themes" / "link.yaml").symlink_to(target)
    except (OSError, NotImplementedError):
        pytest.skip("symlinks not available")
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_SAVE, "name": "link", "theme": {"a": "z"}, "overwrite": True, "publish": True})
    assert res["error"]["code"] == "name_taken"
    assert target.read_text() == "link:\n  a: b\n"


# ------------------------------------------------------------------ own folder files: imported, linked


async def test_own_folder_file_is_imported_on_first_save(hass, cfg, setup, reloads, hass_ws_client):
    path = put(cfg, "t.yaml", "t:\n  a: '1'\n")
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_SAVE, "name": "t", "theme": {"a": "2"}})
    assert res["error"]["code"] == "name_taken"
    res = await cmd(
        client,
        {"type": CMD_SAVE, "name": "t", "theme": {"a": "2"}, "overwrite": True, "base_mtime": path.stat().st_mtime},
    )
    assert res["success"], res
    assert res["result"]["folder"] == "outdated" and res["result"]["published"] is False
    assert yaml.safe_load(path.read_text())["t"] == {"a": "1"}
    files = (await cmd(client, {"type": CMD_LIST}))["result"]["files"]
    assert [(f["name"], f["stored"], f["folder"]) for f in files] == [("t", True, "outdated")]
    res = await cmd(
        client,
        {"type": CMD_SAVE, "name": "t", "theme": {"a": "2"}, "overwrite": True, "publish": True},
    )
    assert res["error"]["code"] == "edited_by_hand"  # a file from before the hash was kept is never replaced
    assert yaml.safe_load(path.read_text())["t"] == {"a": "1"}


async def test_own_folder_file_conflict_on_base_mtime(hass, cfg, setup, reloads, hass_ws_client):
    path = put(cfg, "t.yaml", "t:\n  a: '1'\n")
    client = await hass_ws_client(hass)
    res = await cmd(
        client,
        {"type": CMD_SAVE, "name": "t", "theme": {"a": "2"}, "overwrite": True, "base_mtime": path.stat().st_mtime - 50},
    )
    assert res["error"]["code"] == "conflict"
    assert (await cmd(client, {"type": CMD_LIST}))["result"]["files"][0]["stored"] is False


# ------------------------------------------------------------------ files Magic Card did not write


async def test_list_hand_written_file_is_read_only_not_own(hass, cfg, setup, hass_ws_client):
    put(cfg, "hand.yaml", "hand:\n  primary-color: red\n", own=False)
    put(cfg, "mine.yaml", "mine:\n  primary-color: red\n")
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_LIST})
    by_name = {f["name"]: f for f in res["result"]["files"]}
    assert by_name["hand"]["editable"] is False and by_name["hand"]["reason"] == "not_own"
    assert by_name["hand"]["folder"] == "foreign"
    assert by_name["mine"]["editable"] is True
    assert res["result"]["writes_enabled"] is True


@pytest.mark.parametrize("publish", [False, True])
async def test_save_refuses_the_name_of_a_hand_written_file(hass, cfg, setup, reloads, hass_ws_client, publish):
    text = "# my notes\nhand:\n  primary-color: red\n"
    path = put(cfg, "hand.yaml", text, own=False)
    client = await hass_ws_client(hass)
    for overwrite in (False, True):
        res = await cmd(
            client, {"type": CMD_SAVE, "name": "hand", "theme": THEME, "overwrite": overwrite, "publish": publish}
        )
        assert res["error"]["code"] == "name_taken"
    assert path.read_text(encoding="utf-8") == text
    assert reloads == []
    assert [f["stored"] for f in (await cmd(client, {"type": CMD_LIST}))["result"]["files"]] == [False]


async def test_save_refuses_name_of_multi_theme_file(hass, cfg, setup, reloads, hass_ws_client):
    path = put(cfg, "multi.yaml", "multi:\n  a: b\nother:\n  c: d\n")
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_SAVE, "name": "multi", "theme": {"a": "z"}, "overwrite": True})
    assert res["error"]["code"] == "name_taken"
    assert "other" in path.read_text()


async def test_copy_of_hand_written_file_is_stored_under_new_name(hass, cfg, setup, reloads, hass_ws_client):
    text = "hand:\n  primary-color: red\n"
    path = put(cfg, "hand.yaml", text, own=False)
    client = await hass_ws_client(hass)
    got = (await cmd(client, {"type": CMD_GET, "name": "hand"}))["result"]
    res = await cmd(client, {"type": CMD_SAVE, "name": "hand_copy", "theme": got["theme"]})
    assert res["success"], res
    assert not (cfg / "themes" / "hand_copy.yaml").exists()
    res = await cmd(
        client,
        {"type": CMD_SAVE, "name": "hand_copy", "theme": got["theme"], "overwrite": True, "publish": True},
    )
    assert res["success"], res
    assert path.read_text(encoding="utf-8") == text
    assert (cfg / "themes" / "hand_copy.yaml").read_text(encoding="utf-8").startswith(WRITTEN_HEADER)
    files = {f["name"]: f for f in (await cmd(client, {"type": CMD_LIST}))["result"]["files"]}
    assert files["hand_copy"]["editable"] is True and files["hand_copy"]["stored"] is True
    assert files["hand"]["editable"] is False


async def test_stored_theme_cannot_publish_over_a_later_hand_written_file(hass, cfg, setup, reloads, hass_ws_client):
    client = await hass_ws_client(hass)
    first = (await cmd(client, {"type": CMD_SAVE, "name": "t", "theme": {"a": "1"}}))["result"]
    path = put(cfg, "t.yaml", "t:\n  a: hand\n", own=False)
    files = (await cmd(client, {"type": CMD_LIST}))["result"]["files"]
    assert [(f["stored"], f["folder"]) for f in files] == [(True, "foreign")]
    res = await cmd(
        client,
        {"type": CMD_SAVE, "name": "t", "theme": {"a": "2"}, "overwrite": True, "base_mtime": first["mtime"], "publish": True},
    )
    assert res["error"]["code"] == "not_editable"
    assert path.read_text() == "t:\n  a: hand\n"
    res = await cmd(
        client, {"type": CMD_SAVE, "name": "t", "theme": {"a": "2"}, "overwrite": True, "base_mtime": first["mtime"]}
    )
    assert res["success"] and res["result"]["folder"] == "foreign"


# ------------------------------------------------------------------ delete


async def test_delete_removes_stored_theme_only(hass, cfg, setup, reloads, hass_ws_client):
    client = await hass_ws_client(hass)
    await cmd(client, {"type": CMD_SAVE, "name": "t", "theme": {"a": "b"}, "publish": True})
    res = await cmd(client, {"type": CMD_DELETE, "name": "t"})
    assert res["success"], res
    assert res["result"] == {"stored": True, "file": False}
    assert (cfg / "themes" / "t.yaml").exists()
    assert len(reloads) == 1  # the publish only
    files = (await cmd(client, {"type": CMD_LIST}))["result"]["files"]
    assert [(f["name"], f["stored"], f["folder"]) for f in files] == [("t", False, "current")]


async def test_delete_with_file_removes_both_and_reloads(hass, cfg, setup, reloads, hass_ws_client):
    client = await hass_ws_client(hass)
    await cmd(client, {"type": CMD_SAVE, "name": "t", "theme": {"a": "b"}, "publish": True})
    res = await cmd(client, {"type": CMD_DELETE, "name": "t", "file": True})
    assert res["result"] == {"stored": True, "file": True}
    assert not (cfg / "themes" / "t.yaml").exists()
    assert len(reloads) == 2
    assert hass.data["frontend_themes"] == {}
    assert (await cmd(client, {"type": CMD_LIST}))["result"]["files"] == []


async def test_delete_own_folder_only_file(hass, cfg, setup, reloads, hass_ws_client):
    put(cfg, "t.yaml", "t:\n  a: b\n")
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_DELETE, "name": "t"})
    assert res["error"]["code"] == "not_found"
    assert (cfg / "themes" / "t.yaml").exists()
    res = await cmd(client, {"type": CMD_DELETE, "name": "t", "file": True})
    assert res["error"]["code"] == "edited_by_hand"  # no stored hash: the file is left alone
    assert (cfg / "themes" / "t.yaml").exists()


async def test_delete_not_found(hass, setup, reloads, hass_ws_client):
    client = await hass_ws_client(hass)
    for file in (False, True):
        res = await cmd(client, {"type": CMD_DELETE, "name": "nope", "file": file})
        assert res["error"]["code"] == "not_found"
    assert reloads == []


async def test_delete_file_not_editable_keeps_the_stored_theme(hass, cfg, setup, reloads, hass_ws_client):
    client = await hass_ws_client(hass)
    await cmd(client, {"type": CMD_SAVE, "name": "multi", "theme": {"a": "b"}})
    path = put(cfg, "multi.yaml", "multi:\n  a: b\nother:\n  c: d\n")
    res = await cmd(client, {"type": CMD_DELETE, "name": "multi", "file": True})
    assert res["error"]["code"] == "not_editable"
    assert path.exists() and reloads == []
    assert (await cmd(client, {"type": CMD_GET, "name": "multi"}))["result"]["stored"] is True


async def test_delete_refuses_hand_written_file(hass, cfg, setup, reloads, hass_ws_client):
    path = put(cfg, "hand.yaml", "hand:\n  a: b\n", own=False)
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_DELETE, "name": "hand", "file": True})
    assert res["error"]["code"] == "not_editable"
    res = await cmd(client, {"type": CMD_DELETE, "name": "hand"})
    assert res["error"]["code"] == "not_found"
    assert path.exists() and reloads == []


@pytest.mark.parametrize("name", ["../configuration", "a/b", "", "Default", "x.yaml"])
async def test_delete_rejects_bad_names(hass, cfg, setup, hass_ws_client, name):
    client = await hass_ws_client(hass)
    for file in (False, True):
        res = await cmd(client, {"type": CMD_DELETE, "name": name, "file": file})
        assert not res["success"]
        assert res["error"]["code"] == "invalid_format"
    assert (cfg / "configuration.yaml").exists()


async def test_get_rejects_bad_names(hass, cfg, setup, hass_ws_client):
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_GET, "name": "../configuration"})
    assert not res["success"]
    assert res["error"]["code"] in {"invalid_format", "not_found"}


async def test_delete_refuses_symlink(hass, cfg, setup, reloads, hass_ws_client, tmp_path_factory):
    target = tmp_path_factory.mktemp("outside") / "real.yaml"
    target.write_text("link:\n  a: b\n", encoding="utf-8")
    try:
        (cfg / "themes" / "link.yaml").symlink_to(target)
    except (OSError, NotImplementedError):
        pytest.skip("symlinks not available")
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_DELETE, "name": "link", "file": True})
    assert res["error"]["code"] == "not_editable"
    assert target.exists()


@pytest.mark.parametrize("writes", [False])
async def test_option_off_delete_file_refused_but_stored_delete_works(hass, cfg, setup, reloads, hass_ws_client):
    client = await hass_ws_client(hass)
    path = put(cfg, "mine.yaml", "mine:\n  primary-color: red\n")
    await cmd(client, {"type": CMD_SAVE, "name": "mine", "theme": {"a": "b"}, "overwrite": True})
    res = await cmd(client, {"type": CMD_DELETE, "name": "mine", "file": True})
    assert res["error"]["code"] == "theme_files_off"
    assert path.exists()
    assert (await cmd(client, {"type": CMD_GET, "name": "mine"}))["result"]["stored"] is True
    res = await cmd(client, {"type": CMD_DELETE, "name": "mine"})
    assert res["result"] == {"stored": True, "file": False}
    assert path.exists() and reloads == []


@pytest.mark.parametrize("writes", [False])
async def test_option_off_keeps_themes_editable(hass, cfg, setup, hass_ws_client):
    put(cfg, "mine.yaml", "mine:\n  primary-color: red\n")
    put(cfg, "multi.yaml", "a:\n  x: 1\nb:\n  y: 2\n")
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_LIST})
    assert res["result"]["writes_enabled"] is False
    by_name = {f["name"]: f for f in res["result"]["files"]}
    assert by_name["mine"]["editable"] is True and "reason" not in by_name["mine"]
    assert by_name["multi"]["reason"] == "multiple_themes"
    got = await cmd(client, {"type": CMD_GET, "name": "mine"})
    assert got["result"]["editable"] is True
