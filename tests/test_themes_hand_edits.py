"""Save to the themes folder through the real WS layer: hand edits are never overwritten or deleted.

The hash of the text the editor wrote is kept in Utils storage (.storage/magic_card_utils.themes),
keyed by theme name. Error code for a refused write or delete: ``edited_by_hand``.
"""

import hashlib
import json
import os
import threading
from pathlib import Path

import pytest
import yaml
from pytest_homeassistant_custom_component.common import MockConfigEntry

from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.setup import async_setup_component

from custom_components.magic_card_utils import theme_files as tf
from custom_components.magic_card_utils.const import DOMAIN
from custom_components.magic_card_utils.settings import CONF_THEME_FILES
from custom_components.magic_card_utils.themes import DATA_THEMES, async_setup_themes
from custom_components.magic_card_utils.themes_contract import (
    CMD_DELETE,
    CMD_GET,
    CMD_LIST,
    CMD_SAVE,
    STORAGE_KEY_THEMES,
    WRITTEN_HEADER,
)

EDITED = "edited_by_hand"
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
    calls: list[int] = []
    hass.data["frontend_themes"] = {}

    async def reload_themes(call: ServiceCall) -> None:
        calls.append(1)
        loaded: dict = {}
        for path in sorted((cfg / "themes").glob("*.yaml")):
            loaded.update(yaml.safe_load(path.read_text(encoding="utf-8")) or {})
        hass.data["frontend_themes"] = loaded

    hass.services.async_register("frontend", "reload_themes", reload_themes)
    return calls


@pytest.fixture
async def setup(hass: HomeAssistant, cfg: Path, reloads):
    MockConfigEntry(domain=DOMAIN, data={}, options={CONF_THEME_FILES: True}).add_to_hass(hass)
    assert await async_setup_component(hass, "websocket_api", {})
    await async_setup_themes(hass)
    await hass.async_block_till_done()


async def cmd(client, payload: dict) -> dict:
    await client.send_json_auto_id(payload)
    return await client.receive_json()


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


async def stored_json(hass, hass_storage) -> str:
    await hass.async_block_till_done()
    return json.dumps(hass_storage.get(STORAGE_KEY_THEMES, {}), sort_keys=True)


async def publish(client, name="t", theme=None, **extra):
    msg = {"type": CMD_SAVE, "name": name, "theme": theme or {"a": "1"}, "publish": True, **extra}
    return await cmd(client, msg)


def hand_edit(path: Path, extra="# my own note\n"):
    path.write_text(path.read_text(encoding="utf-8") + extra, encoding="utf-8")


# ------------------------------------------------------------------ the hash is stored


async def test_publish_stores_the_sha256_of_the_written_text_keyed_by_name(hass, cfg, setup, hass_ws_client, hass_storage):
    client = await hass_ws_client(hass)
    assert (await publish(client, "t"))["success"]
    blob = await stored_json(hass, hass_storage)
    assert sha(cfg / "themes" / "t.yaml") in blob
    assert json.dumps(hass_storage[STORAGE_KEY_THEMES]["data"]["themes"]["t"]["theme"]) == '{"a": "1"}'


async def test_storage_only_save_stores_no_hash_and_writes_no_file(hass, cfg, setup, hass_ws_client, hass_storage):
    client = await hass_ws_client(hass)
    assert (await cmd(client, {"type": CMD_SAVE, "name": "t", "theme": {"a": "1"}}))["success"]
    assert "sha" not in (await stored_json(hass, hass_storage)).lower()
    assert not (cfg / "themes" / "t.yaml").exists()


async def test_each_publish_replaces_the_stored_hash(hass, cfg, setup, hass_ws_client, hass_storage):
    client = await hass_ws_client(hass)
    first = (await publish(client, "t", {"a": "1"}))["result"]
    old = sha(cfg / "themes" / "t.yaml")
    res = await publish(client, "t", {"a": "2"}, overwrite=True, base_mtime=first["mtime"])
    assert res["success"], res
    new = sha(cfg / "themes" / "t.yaml")
    blob = await stored_json(hass, hass_storage)
    assert new in blob and old not in blob


async def test_the_hash_survives_a_restart(hass, cfg, setup, hass_ws_client, hass_storage):
    client = await hass_ws_client(hass)
    first = (await publish(client, "t", {"a": "1"}))["result"]
    await hass.async_block_till_done()
    del hass.data[DATA_THEMES]
    await async_setup_themes(hass)  # loads the stored data again, like a restart
    res = await publish(client, "t", {"a": "2"}, overwrite=True, base_mtime=first["mtime"])
    assert res["success"], res
    assert yaml.safe_load((cfg / "themes" / "t.yaml").read_text())["t"] == {"a": "2"}


# ------------------------------------------------------------------ hand edits on save


async def test_save_publish_refuses_a_hand_edited_file_and_keeps_everything(
    hass, cfg, setup, reloads, hass_ws_client, hass_storage
):
    client = await hass_ws_client(hass)
    first = (await publish(client, "t", {"a": "1"}))["result"]
    path = cfg / "themes" / "t.yaml"
    hand_edit(path)
    before = path.read_bytes()
    stored_before = await stored_json(hass, hass_storage)
    res = await publish(client, "t", {"a": "2"}, overwrite=True, base_mtime=first["mtime"])
    assert not res["success"]
    assert res["error"]["code"] == EDITED
    assert "hand" in res["error"]["message"].lower()
    assert path.read_bytes() == before  # the user's comment is still there
    assert await stored_json(hass, hass_storage) == stored_before  # the stored theme did not change either
    assert len(reloads) == 1  # no reload for a refused write
    got = (await cmd(client, {"type": CMD_GET, "name": "t"}))["result"]
    assert got["theme"] == {"a": "1"}


async def test_hand_edit_is_refused_even_when_the_mtime_matches(hass, cfg, setup, reloads, hass_ws_client):
    client = await hass_ws_client(hass)
    first = (await publish(client, "t"))["result"]
    path = cfg / "themes" / "t.yaml"
    hand_edit(path)
    os.utime(path, (first["mtime"], first["mtime"]))
    res = await publish(client, "t", {"a": "2"}, overwrite=True)
    assert res["error"]["code"] == EDITED


async def test_a_storage_only_save_is_still_allowed_after_a_hand_edit(hass, cfg, setup, reloads, hass_ws_client):
    client = await hass_ws_client(hass)
    first = (await publish(client, "t", {"a": "1"}))["result"]
    path = cfg / "themes" / "t.yaml"
    hand_edit(path)
    before = path.read_bytes()
    res = await cmd(
        client, {"type": CMD_SAVE, "name": "t", "theme": {"a": "2"}, "overwrite": True, "base_mtime": first["mtime"]}
    )
    assert res["success"], res
    assert res["result"]["published"] is False
    assert path.read_bytes() == before


async def test_base_mtime_conflict_still_reported_for_an_unedited_file(hass, cfg, setup, reloads, hass_ws_client):
    client = await hass_ws_client(hass)
    first = (await publish(client, "t"))["result"]
    res = await publish(client, "t", {"a": "2"}, overwrite=True, base_mtime=first["mtime"] - 50)
    assert res["error"]["code"] == "conflict"


# ------------------------------------------------------------------ files written before this release


async def test_a_file_from_an_older_release_has_no_hash_and_is_refused(hass, cfg, setup, reloads, hass_ws_client):
    path = cfg / "themes" / "old.yaml"
    path.write_text(WRITTEN_HEADER + "old:\n  a: '1'\n", encoding="utf-8")
    before = path.read_bytes()
    client = await hass_ws_client(hass)
    res = await publish(client, "old", {"a": "2"}, overwrite=True)
    assert res["error"]["code"] == EDITED
    assert "hand" in res["error"]["message"].lower() or "hash" in res["error"]["message"].lower()
    assert path.read_bytes() == before and reloads == []


async def test_the_way_forward_for_such_a_file_is_a_new_name(hass, cfg, setup, reloads, hass_ws_client):
    path = cfg / "themes" / "old.yaml"
    path.write_text(WRITTEN_HEADER + "old:\n  a: '1'\n", encoding="utf-8")
    before = path.read_bytes()
    client = await hass_ws_client(hass)
    got = (await cmd(client, {"type": CMD_GET, "name": "old"}))["result"]
    assert got["theme"] == {"a": "1"}  # the editor can still open and read it
    res = await publish(client, "old-2", got["theme"])
    assert res["success"], res
    assert res["result"]["published"] is True and res["result"]["loaded"] is True
    assert path.read_bytes() == before  # the old file is never touched
    # and the new file is fully managed: it can be replaced and deleted
    res = await publish(client, "old-2", {"a": "3"}, overwrite=True, base_mtime=res["result"]["mtime"])
    assert res["success"], res
    res = await cmd(client, {"type": CMD_DELETE, "name": "old-2", "file": True})
    assert res["success"], res


async def test_a_stored_theme_linked_to_an_old_file_can_still_be_edited_in_storage(hass, cfg, setup, reloads, hass_ws_client):
    path = cfg / "themes" / "old.yaml"
    path.write_text(WRITTEN_HEADER + "old:\n  a: '1'\n", encoding="utf-8")
    client = await hass_ws_client(hass)
    res = await cmd(
        client,
        {"type": CMD_SAVE, "name": "old", "theme": {"a": "2"}, "overwrite": True, "base_mtime": path.stat().st_mtime},
    )
    assert res["success"], res  # importing into storage never writes the file
    assert res["result"]["folder"] == "outdated"


# ------------------------------------------------------------------ delete


async def test_delete_file_refuses_a_hand_edited_file_and_keeps_everything(
    hass, cfg, setup, reloads, hass_ws_client, hass_storage
):
    client = await hass_ws_client(hass)
    await publish(client, "t")
    path = cfg / "themes" / "t.yaml"
    hand_edit(path)
    before = path.read_bytes()
    stored_before = await stored_json(hass, hass_storage)
    res = await cmd(client, {"type": CMD_DELETE, "name": "t", "file": True})
    assert res["error"]["code"] == EDITED
    assert path.read_bytes() == before
    assert await stored_json(hass, hass_storage) == stored_before
    assert (await cmd(client, {"type": CMD_GET, "name": "t"}))["result"]["stored"] is True
    assert len(reloads) == 1


async def test_delete_file_refuses_an_old_file_without_a_hash(hass, cfg, setup, reloads, hass_ws_client):
    path = cfg / "themes" / "old.yaml"
    path.write_text(WRITTEN_HEADER + "old:\n  a: '1'\n", encoding="utf-8")
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_DELETE, "name": "old", "file": True})
    assert res["error"]["code"] == EDITED
    assert path.exists() and reloads == []


async def test_delete_without_file_still_removes_a_stored_theme_next_to_an_edited_file(hass, cfg, setup, reloads, hass_ws_client):
    client = await hass_ws_client(hass)
    await publish(client, "t")
    path = cfg / "themes" / "t.yaml"
    hand_edit(path)
    before = path.read_bytes()
    res = await cmd(client, {"type": CMD_DELETE, "name": "t"})
    assert res["success"], res
    assert res["result"] == {"stored": True, "file": False}
    assert path.read_bytes() == before


async def test_delete_file_works_when_the_file_is_untouched_and_drops_the_hash(
    hass, cfg, setup, reloads, hass_ws_client, hass_storage
):
    client = await hass_ws_client(hass)
    await publish(client, "t")
    digest = sha(cfg / "themes" / "t.yaml")
    assert digest in await stored_json(hass, hass_storage)
    res = await cmd(client, {"type": CMD_DELETE, "name": "t", "file": True})
    assert res["result"] == {"stored": True, "file": True}
    assert not (cfg / "themes" / "t.yaml").exists()
    assert digest not in await stored_json(hass, hass_storage)


async def test_deleting_the_stored_theme_removes_its_hash(hass, cfg, setup, reloads, hass_ws_client, hass_storage):
    client = await hass_ws_client(hass)
    await publish(client, "t")
    digest = sha(cfg / "themes" / "t.yaml")
    res = await cmd(client, {"type": CMD_DELETE, "name": "t"})
    assert res["success"], res
    assert digest not in await stored_json(hass, hass_storage)
    # the file is now one without a stored hash: it is not overwritten or deleted behind the user's back
    res = await publish(client, "t", {"a": "9"}, overwrite=True)
    assert res["error"]["code"] == EDITED
    res = await cmd(client, {"type": CMD_DELETE, "name": "t", "file": True})
    assert res["error"]["code"] == EDITED


async def test_a_deleted_then_recreated_theme_gets_a_fresh_hash(hass, cfg, setup, reloads, hass_ws_client):
    client = await hass_ws_client(hass)
    await publish(client, "t", {"a": "1"})
    assert (await cmd(client, {"type": CMD_DELETE, "name": "t", "file": True}))["success"]
    first = await publish(client, "t", {"a": "2"})
    assert first["success"], first
    res = await publish(client, "t", {"a": "3"}, overwrite=True, base_mtime=first["result"]["mtime"])
    assert res["success"], res


async def test_hashes_are_per_theme_name(hass, cfg, setup, reloads, hass_ws_client):
    client = await hass_ws_client(hass)
    await publish(client, "one", {"a": "1"})
    two = (await publish(client, "two", {"a": "1"}))["result"]
    hand_edit(cfg / "themes" / "one.yaml")
    res = await publish(client, "two", {"a": "2"}, overwrite=True, base_mtime=two["mtime"])
    assert res["success"], res  # two is untouched, only one was edited
    assert (await publish(client, "one", {"a": "2"}, overwrite=True))["error"]["code"] == EDITED


# ------------------------------------------------------------------ points 1 and 3: marker and executor and admin


async def test_publish_and_delete_never_touch_a_file_without_the_marker(hass, cfg, setup, reloads, hass_ws_client):
    path = cfg / "themes" / "hand.yaml"
    path.write_text("hand:\n  a: b\n", encoding="utf-8")
    before = path.read_bytes()
    client = await hass_ws_client(hass)
    res = await publish(client, "hand", {"a": "1"}, overwrite=True)
    assert not res["success"] and res["error"]["code"] in ("name_taken", "not_editable")
    res = await cmd(client, {"type": CMD_DELETE, "name": "hand", "file": True})
    assert res["error"]["code"] == "not_editable"
    assert path.read_bytes() == before and reloads == []


async def test_a_marker_in_the_middle_of_the_file_does_not_count(hass, cfg, setup, reloads, hass_ws_client):
    path = cfg / "themes" / "sneaky.yaml"
    path.write_text("# mine\nsneaky:\n  a: b\n" + "# " + WRITTEN_HEADER, encoding="utf-8")
    client = await hass_ws_client(hass)
    res = await cmd(client, {"type": CMD_DELETE, "name": "sneaky", "file": True})
    assert res["error"]["code"] == "not_editable" and path.exists()


async def test_file_writes_and_deletes_run_in_the_executor_not_the_event_loop(
    hass, cfg, setup, reloads, hass_ws_client, monkeypatch
):
    loop_thread = threading.get_ident()
    seen: dict[str, int] = {}
    real_write, real_delete = tf.write_theme, tf.delete_theme

    def write(*a, **k):
        seen["write"] = threading.get_ident()
        return real_write(*a, **k)

    def delete(*a, **k):
        seen["delete"] = threading.get_ident()
        return real_delete(*a, **k)

    monkeypatch.setattr(tf, "write_theme", write)
    monkeypatch.setattr(tf, "delete_theme", delete)
    client = await hass_ws_client(hass)
    assert (await publish(client, "t"))["success"]
    assert (await cmd(client, {"type": CMD_DELETE, "name": "t", "file": True}))["success"]
    assert set(seen) == {"write", "delete"}
    assert seen["write"] != loop_thread and seen["delete"] != loop_thread


@pytest.mark.parametrize("file", [False, True])
async def test_non_admin_cannot_publish_or_delete_files(
    hass, cfg, setup, reloads, hass_ws_client, hass_read_only_access_token, file
):
    admin = await hass_ws_client(hass)
    await publish(admin, "t")
    before = (cfg / "themes" / "t.yaml").read_bytes()
    client = await hass_ws_client(hass, hass_read_only_access_token)
    res = await cmd(client, {"type": CMD_DELETE, "name": "t", "file": file})
    assert res["error"]["code"] == "unauthorized"
    res = await cmd(client, {"type": CMD_SAVE, "name": "t", "theme": {"a": "2"}, "overwrite": True, "publish": True})
    assert res["error"]["code"] == "unauthorized"
    assert (cfg / "themes" / "t.yaml").read_bytes() == before
