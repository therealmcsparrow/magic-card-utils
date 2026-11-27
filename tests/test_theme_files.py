"""File I/O, validation and YAML round trip for theme files (theme-files 1.0.0)."""

import os
from pathlib import Path

import pytest
import yaml

from custom_components.magic_card_utils import theme_files as tf
from custom_components.magic_card_utils.themes_contract import (
    MAX_FILE_BYTES,
    MAX_VALUE_CHARS,
    MAX_VARS,
    WRITTEN_HEADER,
)


@pytest.fixture(autouse=True)
def _fchmod_on_windows(monkeypatch):
    """HA's atomic writer calls os.fchmod, which Windows lacks (CI and HA run on Linux)."""
    if not hasattr(os, "fchmod"):
        monkeypatch.setattr(os, "fchmod", lambda *a, **k: None, raising=False)


@pytest.fixture
def cfg(tmp_path) -> Path:
    (tmp_path / "themes").mkdir()
    return tmp_path


def put(cfg: Path, rel: str, text: str, own: bool = True) -> Path:
    """Write a theme file; ``own`` puts the editor's header in front, as a file the editor wrote."""
    if own:
        text = WRITTEN_HEADER + text
    path = cfg / "themes" / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")
    return path


def code_of(exc: pytest.ExceptionInfo) -> str:
    return exc.value.code


# ---------------------------------------------------------------- names (AC 10)


@pytest.mark.parametrize("name", ["a", "mine", "my-theme_2", "0abc", "a" * 64])
def test_valid_names(name):
    assert tf.validate_name(name) is None


@pytest.mark.parametrize(
    "name",
    [
        "",
        "../x",
        "a/b",
        "a\\b",
        "Default",
        "default",
        "backend-selected",
        "a" * 65,
        "mine.yaml",
        "a\x00b",
        "-start",
        "_start",
        "UPPER",
        "sp ace",
        "..",
        ".",
        None,
        5,
    ],
)
def test_invalid_names(name):
    assert tf.validate_name(name) is not None


@pytest.mark.parametrize("name", ["../x", "a/b", "a\\b", "", "Default", "a" * 65, "x.yaml", "a\x00b"])
def test_write_refuses_bad_names_and_touches_nothing(cfg, name):
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.write_theme(cfg, name, {"primary-color": "red"})
    assert code_of(exc) == "invalid_format"
    assert exc.value.errors and exc.value.errors[0]["path"] == "name"
    assert sorted(p.name for p in cfg.rglob("*") if p.is_file()) == []
    assert not (cfg.parent / "x.yaml").exists()


@pytest.mark.parametrize("name", ["../x", "a/b", "a\\b", "", "x.yaml"])
def test_delete_refuses_bad_names(cfg, name):
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.delete_theme(cfg, name)
    assert code_of(exc) == "invalid_format"


# ---------------------------------------------------------------- validation


def test_validate_accepts_normal_theme():
    theme = {
        "primary-color": "#ff0000",
        "card-mod-theme": "ha-card {\n  color: red;\n}\n",
        "ha-card-border-width": 0,
        "opacity": 0.5,
        "modes": {"light": {"primary-text-color": "#000"}, "dark": {"primary-text-color": "#fff"}},
    }
    assert tf.validate_theme(theme) == []


def test_validate_accepts_empty_theme():
    assert tf.validate_theme({}) == []


def test_validate_rejects_non_mapping():
    assert tf.validate_theme(["a"])[0]["path"] == ""
    assert tf.validate_theme("x")[0]["path"] == ""


@pytest.mark.parametrize("key", ["", "-leading", "has space", "a" * 101, "semi;colon", "--double", 5])
def test_validate_rejects_bad_keys(key):
    errors = tf.validate_theme({key: "red"})
    assert errors and errors[0]["path"] == str(key)


@pytest.mark.parametrize(
    "value",
    [True, False, None, [], {}, ["a"], float("nan"), float("inf"), "bell\x07", "nul\x00", "cr\r\n", "x" * (MAX_VALUE_CHARS + 1), "\ud800"],
)
def test_validate_rejects_bad_values(value):
    errors = tf.validate_theme({"primary-color": value})
    assert errors and errors[0]["path"] == "primary-color"
    assert errors[0]["message"]


def test_validate_value_edges_are_ok():
    assert tf.validate_theme({"a": "x" * MAX_VALUE_CHARS, "b": "tab\there\nnewline", "c": -3, "d": 1e9}) == []


def test_validate_mode_rules():
    assert tf.validate_theme({"modes": []})[0]["path"] == "modes"
    assert tf.validate_theme({"modes": {"sepia": {}}})[0]["path"] == "modes.sepia"
    assert tf.validate_theme({"modes": {"light": ["a"]}})[0]["path"] == "modes.light"
    errors = tf.validate_theme({"modes": {"dark": {"bad key": "x", "ok": True}}})
    assert {e["path"] for e in errors} == {"modes.dark.bad key", "modes.dark.ok"}
    # modes inside a mode are not a thing
    assert tf.validate_theme({"modes": {"light": {"modes": {}}}})[0]["path"] == "modes.light.modes"


def test_validate_var_cap_counts_base_and_modes():
    base = {f"v{i}": "x" for i in range(MAX_VARS)}
    assert tf.validate_theme(base) == []
    over = dict(base)
    over["one-more"] = "x"
    assert tf.validate_theme(over)[0]["path"] == ""
    split = {f"v{i}": "x" for i in range(MAX_VARS - 1)}
    split["modes"] = {"light": {"a": "x"}, "dark": {"b": "x"}}
    assert tf.validate_theme(split)  # base + both modes together


def test_validate_caps_error_list_length():
    errors = tf.validate_theme({f"bad key {i}": "x" for i in range(500)})
    assert 0 < len(errors) <= tf.MAX_ERRORS


# ---------------------------------------------------------------- dump / round trip (AC 9)


def test_dump_has_header_and_single_top_key():
    text = tf.dump_theme("mine", {"primary-color": "red"})
    assert text.startswith(WRITTEN_HEADER)
    assert yaml.safe_load(text) == {"mine": {"primary-color": "red"}}


def test_round_trip_keeps_order_unknown_keys_numbers_multiline(cfg):
    theme = {
        "z-last-alphabetically-first": "#fff",
        "primary-color": "#123456",
        "custom-unknown-key": "keep me",
        "ha-card-border-width": 2,
        "ha-card-opacity": 0.25,
        "text-yes": "yes",
        "text-number": "123",
        "text-null": "null",
        "card-mod-theme": "ha-card {\n  --x: 1;\n  color: red;\n}\n",
        "modes": {
            "dark": {"primary-text-color": "#eee", "a": "b"},
            "light": {"primary-text-color": "#111"},
        },
        "unicode": "caf\u00e9 \u2713",
    }
    tf.write_theme(cfg, "mine", theme)
    got = tf.read_theme(cfg, "mine")
    assert got["theme"] == theme
    assert list(got["theme"]) == list(theme)
    assert list(got["theme"]["modes"]) == ["dark", "light"]
    assert list(got["theme"]["modes"]["dark"]) == ["primary-text-color", "a"]
    assert type(got["theme"]["ha-card-border-width"]) is int
    assert type(got["theme"]["ha-card-opacity"]) is float
    assert got["theme"]["text-yes"] == "yes"
    assert got["theme"]["text-number"] == "123"


def test_round_trip_through_second_save_is_stable(cfg):
    theme = {"b": "1", "a": "2", "modes": {"dark": {"y": "1", "x": "2"}}}
    written = tf.write_theme(cfg, "mine", theme)
    first = (cfg / "themes" / "mine.yaml").read_text(encoding="utf-8")
    again = tf.read_theme(cfg, "mine")["theme"]
    tf.write_theme(cfg, "mine", again, overwrite=True, stored_hash=written["hash"])
    assert (cfg / "themes" / "mine.yaml").read_text(encoding="utf-8") == first


def test_dump_too_large_raises():
    big = {f"v{i}": "x" * MAX_VALUE_CHARS for i in range(100)}
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.dump_theme("mine", big)
    assert code_of(exc) == "too_large"
    assert len(yaml.safe_dump(big)) > MAX_FILE_BYTES


# ---------------------------------------------------------------- write / delete


def test_write_creates_themes_dir_and_returns_result(tmp_path):
    result = tf.write_theme(tmp_path, "mine", {"primary-color": "red"})
    assert result["name"] == "mine"
    assert result["file"] == "themes/mine.yaml"
    assert result["mtime"] == (tmp_path / "themes" / "mine.yaml").stat().st_mtime
    assert not list((tmp_path / "themes").glob("*.tmp")) and len(list((tmp_path / "themes").iterdir())) == 1


def test_write_existing_requires_overwrite(cfg):
    first = tf.write_theme(cfg, "mine", {"a": "1"})
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.write_theme(cfg, "mine", {"a": "2"})
    assert code_of(exc) == "name_taken"
    assert tf.read_theme(cfg, "mine")["theme"] == {"a": "1"}
    tf.write_theme(cfg, "mine", {"a": "2"}, overwrite=True, stored_hash=first["hash"])
    assert tf.read_theme(cfg, "mine")["theme"] == {"a": "2"}


def test_write_conflict_on_base_mtime(cfg):
    first = tf.write_theme(cfg, "mine", {"a": "1"})
    os.utime(cfg / "themes" / "mine.yaml", (first["mtime"] + 50, first["mtime"] + 50))
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.write_theme(cfg, "mine", {"a": "2"}, overwrite=True, base_mtime=first["mtime"], stored_hash=first["hash"])
    assert code_of(exc) == "conflict"
    current = tf.read_theme(cfg, "mine")["mtime"]
    tf.write_theme(cfg, "mine", {"a": "3"}, overwrite=True, base_mtime=current, stored_hash=first["hash"])
    assert tf.read_theme(cfg, "mine")["theme"] == {"a": "3"}


def test_write_validation_failure_writes_nothing(cfg):
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.write_theme(cfg, "mine", {"primary-color": True})
    assert code_of(exc) == "invalid_format"
    assert exc.value.errors[0]["path"] == "primary-color"
    assert list((cfg / "themes").iterdir()) == []


def test_write_refuses_read_only_existing_file(cfg):
    put(cfg, "multi.yaml", "one:\n  a: '1'\ntwo:\n  b: '2'\n")
    before = (cfg / "themes" / "multi.yaml").read_text()
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.write_theme(cfg, "multi", {"a": "1"}, overwrite=True)
    assert code_of(exc) == "not_editable"
    assert (cfg / "themes" / "multi.yaml").read_text() == before


def test_write_refuses_file_with_tags(cfg):
    put(cfg, "tagged.yaml", "tagged:\n  primary-color: !secret c\n")
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.write_theme(cfg, "tagged", {"a": "1"}, overwrite=True)
    assert code_of(exc) == "not_editable"


def test_check_existing_matches_write_rules(cfg):
    tf.check_existing(cfg, "fresh", overwrite=False, base_mtime=None)  # nothing there: fine
    first = tf.write_theme(cfg, "mine", {"a": "1"})
    with pytest.raises(tf.ThemeFileError):
        tf.check_existing(cfg, "mine", overwrite=False, base_mtime=None)
    tf.check_existing(cfg, "mine", overwrite=True, base_mtime=None, stored_hash=first["hash"])


def test_symlink_target_is_refused(cfg, tmp_path_factory):
    outside = tmp_path_factory.mktemp("outside") / "secret.yaml"
    outside.write_text("mine:\n  a: '1'\n", encoding="utf-8")
    link = cfg / "themes" / "mine.yaml"
    try:
        link.symlink_to(outside)
    except (OSError, NotImplementedError):
        pytest.skip("symlinks not available")
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.write_theme(cfg, "mine", {"a": "2"}, overwrite=True)
    assert code_of(exc) == "not_editable"
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.delete_theme(cfg, "mine")
    assert code_of(exc) == "not_editable"
    assert outside.read_text(encoding="utf-8") == "mine:\n  a: '1'\n"
    entry = next(e for e in tf.scan_themes(cfg)["files"] if e["file"] == "themes/mine.yaml")
    assert entry["editable"] is False and entry["reason"] == "symlink"
    assert tf.read_theme(cfg, "mine")["theme"] == {}


def test_dangling_symlink_is_refused(cfg):
    link = cfg / "themes" / "mine.yaml"
    try:
        link.symlink_to(cfg / "nowhere.yaml")
    except (OSError, NotImplementedError):
        pytest.skip("symlinks not available")
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.write_theme(cfg, "mine", {"a": "2"}, overwrite=True)
    assert code_of(exc) == "not_editable"


def test_theme_path_stays_inside_themes_dir(cfg):
    path = tf.theme_path(cfg, "mine")
    assert path == (cfg / "themes" / "mine.yaml")
    with pytest.raises(tf.ThemeFileError):
        tf.theme_path(cfg, "../mine")


def test_delete_removes_editable_file(cfg):
    first = tf.write_theme(cfg, "mine", {"a": "1"})
    tf.delete_theme(cfg, "mine", stored_hash=first["hash"])
    assert not (cfg / "themes" / "mine.yaml").exists()


def test_delete_not_found(cfg):
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.delete_theme(cfg, "ghost")
    assert code_of(exc) == "not_found"


def test_delete_refuses_read_only_and_keeps_file(cfg):
    path = put(cfg, "multi.yaml", "one:\n  a: '1'\ntwo:\n  b: '2'\n")
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.delete_theme(cfg, "multi")
    assert code_of(exc) == "not_editable"
    assert path.exists()


def test_delete_ignores_subfolder_file_of_same_name(cfg):
    sub = put(cfg, "sub/mine.yaml", "mine:\n  a: '1'\n")
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.delete_theme(cfg, "mine")
    assert code_of(exc) == "not_found"
    assert sub.exists()


# ---------------------------------------------------------------- scan / read


def entries_by_file(cfg: Path) -> dict:
    return {e["file"]: e for e in tf.scan_themes(cfg)["files"]}


def test_scan_empty_or_missing_dir(tmp_path):
    assert tf.scan_themes(tmp_path)["files"] == []
    (tmp_path / "themes").mkdir()
    assert tf.scan_themes(tmp_path)["files"] == []


def test_scan_editable_entry(cfg):
    put(cfg, "mine.yaml", "mine:\n  primary-color: red\n  modes:\n    dark:\n      a: b\n      c: d\n")
    entry = entries_by_file(cfg)["themes/mine.yaml"]
    assert entry["name"] == "mine"
    assert entry["editable"] is True
    assert "reason" not in entry
    assert entry["has_modes"] is True
    assert entry["var_count"] == 3
    assert entry["mtime"] == (cfg / "themes" / "mine.yaml").stat().st_mtime


def test_scan_no_modes(cfg):
    put(cfg, "plain.yaml", "plain:\n  a: b\n")
    entry = entries_by_file(cfg)["themes/plain.yaml"]
    assert entry["has_modes"] is False and entry["var_count"] == 1


def test_scan_subfolder_is_read_only(cfg):
    put(cfg, "sub/inner.yaml", "inner:\n  a: b\n")
    entry = entries_by_file(cfg)["themes/sub/inner.yaml"]
    assert entry["editable"] is False and entry["reason"] == "subfolder"
    got = tf.read_theme(cfg, "inner")
    assert got["editable"] is False and got["reason"] == "subfolder"
    assert got["theme"] == {"a": "b"}
    assert got["file"] == "themes/sub/inner.yaml"


def test_scan_multiple_themes_read_only(cfg):
    put(cfg, "multi.yaml", "multi:\n  a: '1'\nother:\n  b: '2'\n")
    entry = entries_by_file(cfg)["themes/multi.yaml"]
    assert entry["editable"] is False and entry["reason"] == "multiple_themes"
    got = tf.read_theme(cfg, "multi")
    assert got["theme"] == {"a": "1"}


def test_scan_name_mismatch(cfg):
    put(cfg, "file-name.yaml", "other-name:\n  a: '1'\n")
    entry = entries_by_file(cfg)["themes/file-name.yaml"]
    assert entry["editable"] is False and entry["reason"] == "name_mismatch"
    assert tf.read_theme(cfg, "file-name")["theme"] == {"a": "1"}


def test_scan_invalid_name(cfg):
    put(cfg, "My Theme.yaml", "My Theme:\n  a: '1'\n")
    put(cfg, "default.yaml", "default:\n  a: '1'\n")
    files = entries_by_file(cfg)
    assert files["themes/My Theme.yaml"]["reason"] == "invalid_name"
    assert files["themes/default.yaml"]["reason"] == "invalid_name"
    assert not files["themes/My Theme.yaml"]["editable"]


def test_scan_yaml_tags_read_only(cfg):
    put(cfg, "tagged.yaml", "tagged:\n  primary-color: !secret c\n")
    entry = entries_by_file(cfg)["themes/tagged.yaml"]
    assert entry["editable"] is False and entry["reason"] == "yaml_tags"


def test_scan_parse_error(cfg):
    put(cfg, "broken.yaml", "broken: [unclosed\n")
    put(cfg, "empty.yaml", "")
    put(cfg, "scalar.yaml", "scalar: just text\n")
    put(cfg, "list.yaml", "- a\n- b\n")
    files = entries_by_file(cfg)
    for f in ("broken", "empty", "scalar", "list"):
        assert files[f"themes/{f}.yaml"]["reason"] == "parse_error"
        assert files[f"themes/{f}.yaml"]["editable"] is False
    assert tf.read_theme(cfg, "broken")["theme"] == {}


def test_scan_non_utf8_is_parse_error(cfg):
    (cfg / "themes" / "bin.yaml").write_bytes(b"\xff\xfe\x00bin: x")
    assert entries_by_file(cfg)["themes/bin.yaml"]["reason"] == "parse_error"


def test_scan_too_large_file_not_read(cfg):
    path = cfg / "themes" / "big.yaml"
    path.write_text("big:\n  a: " + "x" * (MAX_FILE_BYTES + 10) + "\n", encoding="utf-8")
    entry = entries_by_file(cfg)["themes/big.yaml"]
    assert entry["editable"] is False and entry["reason"] == "too_large"
    assert entry["var_count"] == 0
    assert tf.read_theme(cfg, "big")["theme"] == {}


def test_file_at_exact_cap_is_still_read(cfg):
    body = WRITTEN_HEADER + "ok:\n  a: '"
    tail = "'\n"
    pad = MAX_FILE_BYTES - len(body) - len(tail)
    (cfg / "themes" / "ok.yaml").write_bytes((body + "x" * pad + tail).encode("utf-8"))
    assert (cfg / "themes" / "ok.yaml").stat().st_size == MAX_FILE_BYTES
    assert entries_by_file(cfg)["themes/ok.yaml"]["editable"] is True


def test_scan_ignores_non_yaml_and_lists_sorted(cfg):
    put(cfg, "b.yaml", "b:\n  a: '1'\n")
    put(cfg, "a.yaml", "a:\n  a: '1'\n")
    put(cfg, "notes.txt", "hello")
    put(cfg, "sub/deep/c.yaml", "c:\n  a: '1'\n")
    assert [e["file"] for e in tf.scan_themes(cfg)["files"]] == [
        "themes/a.yaml",
        "themes/b.yaml",
        "themes/sub/deep/c.yaml",
    ]


def test_scan_caps_number_of_files(cfg):
    for i in range(tf.MAX_FILES_LISTED + 5):
        put(cfg, f"t{i:04}.yaml", f"t{i:04}:\n  a: '1'\n")
    result = tf.scan_themes(cfg)
    assert len(result["files"]) == tf.MAX_FILES_LISTED
    assert result["truncated"] is True


def test_scan_does_not_follow_symlinked_dirs(cfg, tmp_path_factory):
    outside = tmp_path_factory.mktemp("elsewhere")
    (outside / "x.yaml").write_text("x:\n  a: '1'\n", encoding="utf-8")
    try:
        (cfg / "themes" / "linked").symlink_to(outside, target_is_directory=True)
    except (OSError, NotImplementedError):
        pytest.skip("symlinks not available")
    assert tf.scan_themes(cfg)["files"] == []


def test_read_theme_not_found(cfg):
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.read_theme(cfg, "ghost")
    assert code_of(exc) == "not_found"


def test_read_prefers_editable_top_level_file(cfg):
    put(cfg, "sub/mine.yaml", "mine:\n  a: 'sub'\n")
    put(cfg, "mine.yaml", "mine:\n  a: 'top'\n")
    got = tf.read_theme(cfg, "mine")
    assert got["editable"] is True and got["theme"] == {"a": "top"}


def test_read_result_is_json_safe(cfg):
    import json

    put(cfg, "odd.yaml", "odd:\n  day: 2020-01-01\n  when: 2020-01-01 10:00:00\n  nan: .nan\n  n: 1\n")
    got = tf.read_theme(cfg, "odd")
    json.dumps(got, allow_nan=False)
    assert got["theme"]["n"] == 1


def test_read_theme_value_can_be_a_scalar_name_mismatch_is_not_found_theme(cfg):
    put(cfg, "weird.yaml", "weird: 5\n")
    entry = entries_by_file(cfg)["themes/weird.yaml"]
    assert entry["reason"] == "parse_error"


# ---------------------------------------------------------------- YAML aliases (fix round 1)


def test_self_referencing_alias_is_read_only_parse_error(cfg):
    put(cfg, "loop.yaml", "loop: &t\n  x: *t\n")
    entry = tf.scan_themes(cfg)["files"][0]
    assert entry["editable"] is False and entry["reason"] == "parse_error"


def test_billion_laughs_is_refused_without_expanding(cfg):
    lines = ["bomb:", "  a0: &a0 [x, x, x, x, x, x, x, x, x, x]"]
    for i in range(1, 12):
        refs = ", ".join([f"*a{i - 1}"] * 10)
        lines.append(f"  a{i}: &a{i} [{refs}]")
    put(cfg, "bomb.yaml", "\n".join(lines) + "\n")
    import time

    start = time.monotonic()
    entry = tf.scan_themes(cfg)["files"][0]
    assert time.monotonic() - start < 2
    assert entry["editable"] is False and entry["reason"] == "parse_error"
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.write_theme(cfg, "bomb", {"primary-color": "#fff"}, overwrite=True)
    assert exc.value.code == "not_editable"


def test_plain_alias_to_scalar_is_refused(cfg):
    put(cfg, "al.yaml", "al:\n  a: &c '#fff'\n  b: *c\n")
    entry = tf.scan_themes(cfg)["files"][0]
    assert entry["editable"] is False and entry["reason"] == "parse_error"


def test_non_plain_values_are_parse_error(cfg):
    put(cfg, "lst.yaml", "lst:\n  a: [1, 2]\n")
    assert tf.scan_themes(cfg)["files"][0]["reason"] == "parse_error"


def test_deep_nesting_is_parse_error_not_a_crash(cfg):
    put(cfg, "deep.yaml", "deep: " + "[" * 5000 + "]" * 5000 + "\n")
    entry = tf.scan_themes(cfg)["files"][0]
    assert entry["editable"] is False and entry["reason"] == "parse_error"


def test_error_messages_do_not_leak_absolute_paths(cfg, monkeypatch):
    def boom(*a, **k):
        raise OSError(13, "denied", str(cfg / "themes" / "x.yaml"))

    monkeypatch.setattr("custom_components.magic_card_utils.theme_files.write_utf8_file_atomic", boom)
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.write_theme(cfg, "x", {"primary-color": "#fff"})
    assert str(cfg) not in exc.value.message and "x.yaml" not in exc.value.message


# ---------------------------------------------------------------- 1.1.0 own files only


def test_scan_hand_written_file_is_not_own(cfg):
    put(cfg, "hand.yaml", "hand:\n  primary-color: red\n", own=False)
    entry = entries_by_file(cfg)["themes/hand.yaml"]
    assert entry["editable"] is False and entry["reason"] == "not_own"
    assert entry["var_count"] == 1


def test_header_elsewhere_in_file_does_not_count(cfg):
    put(cfg, "hand.yaml", "hand:\n  a: b\n" + WRITTEN_HEADER, own=False)
    assert entries_by_file(cfg)["themes/hand.yaml"]["reason"] == "not_own"


def test_header_with_bom_and_crlf_still_counts(cfg):
    path = cfg / "themes" / "mine.yaml"
    path.write_bytes(("\ufeff" + WRITTEN_HEADER + "mine:\n  a: b\n").replace("\n", "\r\n").encode("utf-8"))
    assert entries_by_file(cfg)["themes/mine.yaml"]["editable"] is True


def test_write_and_delete_refuse_hand_written_file(cfg):
    text = "# notes\nhand:\n  a: b\n"
    path = put(cfg, "hand.yaml", text, own=False)
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.write_theme(cfg, "hand", {"a": "c"}, overwrite=True)
    assert code_of(exc) == "not_editable"
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.delete_theme(cfg, "hand")
    assert code_of(exc) == "not_editable"
    assert path.read_text(encoding="utf-8") == text


def test_written_file_is_own_and_editable(cfg):
    tf.write_theme(cfg, "fresh", {"a": "b"})
    assert entries_by_file(cfg)["themes/fresh.yaml"]["editable"] is True
