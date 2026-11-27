"""Hand edits are never overwritten or deleted: theme_files keeps a SHA-256 of what it wrote.

Interface under test (theme_files, plain functions on a temp config folder):
- ``text_hash(text) -> str``: lowercase SHA-256 hex of ``text`` encoded as UTF-8.
- ``write_theme(...)`` returns ``hash`` too: the hash of the exact text it wrote.
- ``check_existing(..., stored_hash=...)``, ``write_theme(..., stored_hash=...)`` and
  ``delete_theme(config_dir, name, stored_hash=...)``: a marked file is replaced or deleted only when
  its bytes hash to ``stored_hash``; a different hash, or None (nothing stored), raises
  ThemeFileError("edited_by_hand") and the file stays as it is.
"""

import hashlib
import os
from pathlib import Path

import pytest

from custom_components.magic_card_utils import theme_files as tf
from custom_components.magic_card_utils.themes_contract import WRITTEN_HEADER

EDITED = "edited_by_hand"


@pytest.fixture(autouse=True)
def _fchmod_on_windows(monkeypatch):
    if not hasattr(os, "fchmod"):
        monkeypatch.setattr(os, "fchmod", lambda *a, **k: None, raising=False)


@pytest.fixture
def cfg(tmp_path) -> Path:
    (tmp_path / "themes").mkdir()
    return tmp_path


def sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def file_of(cfg: Path, name: str = "mine") -> Path:
    return cfg / "themes" / f"{name}.yaml"


# ---------------------------------------------------------------- the hash


def test_text_hash_is_sha256_of_utf8():
    assert tf.text_hash("a: é\n") == sha("a: é\n".encode("utf-8"))


def test_write_returns_the_hash_of_the_exact_text_written(cfg):
    result = tf.write_theme(cfg, "mine", {"primary-color": "#ff0000", "label": "café"})
    on_disk = file_of(cfg).read_bytes()
    assert result["hash"] == sha(on_disk)
    assert result["hash"] == tf.text_hash(tf.dump_theme("mine", {"primary-color": "#ff0000", "label": "café"}))


# ---------------------------------------------------------------- overwrite


def test_overwrite_allowed_when_file_matches_stored_hash(cfg):
    first = tf.write_theme(cfg, "mine", {"a": "1"})
    tf.check_existing(cfg, "mine", True, None, stored_hash=first["hash"])
    second = tf.write_theme(cfg, "mine", {"a": "2"}, overwrite=True, stored_hash=first["hash"])
    assert tf.read_theme(cfg, "mine")["theme"] == {"a": "2"}
    assert second["hash"] == sha(file_of(cfg).read_bytes()) != first["hash"]


@pytest.mark.parametrize(
    "edit",
    [
        lambda text: text + "# my note\n",
        lambda text: text.replace("'1'", "'9'").replace("1", "9"),
        lambda text: text.replace("\n", "\r\n"),  # an editor that changes line endings
        lambda text: text + "\n",
    ],
    ids=["comment", "value", "crlf", "blank-line"],
)
def test_hand_edit_refuses_overwrite_and_keeps_the_file(cfg, edit):
    first = tf.write_theme(cfg, "mine", {"a": "1"})
    path = file_of(cfg)
    path.write_bytes(edit(path.read_text(encoding="utf-8")).encode("utf-8"))
    before = path.read_bytes()
    assert tf.is_own_text(before.decode("utf-8"))  # still carries the marker: only the hash can tell
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.write_theme(cfg, "mine", {"a": "2"}, overwrite=True, stored_hash=first["hash"])
    assert exc.value.code == EDITED
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.check_existing(cfg, "mine", True, None, stored_hash=first["hash"])
    assert exc.value.code == EDITED
    assert path.read_bytes() == before
    assert list((cfg / "themes").iterdir()) == [path]  # no temp file left behind


def test_no_stored_hash_refuses_overwrite_of_a_marked_file(cfg):
    path = file_of(cfg)
    path.write_text(WRITTEN_HEADER + "mine:\n  a: '1'\n", encoding="utf-8")  # an older release wrote this
    before = path.read_bytes()
    for stored in (None, ""):
        with pytest.raises(tf.ThemeFileError) as exc:
            tf.write_theme(cfg, "mine", {"a": "2"}, overwrite=True, stored_hash=stored)
        assert exc.value.code == EDITED
    assert path.read_bytes() == before


def test_the_message_says_what_happened_in_plain_words(cfg):
    path = file_of(cfg)
    path.write_text(WRITTEN_HEADER + "mine:\n  a: '1'\n", encoding="utf-8")
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.write_theme(cfg, "mine", {"a": "2"}, overwrite=True, stored_hash=None)
    message = exc.value.message.lower()
    assert "hand" in message or "edited" in message
    assert "themes/mine.yaml" in message or "mine.yaml" in message


def test_hand_edit_beats_a_matching_base_mtime(cfg):
    first = tf.write_theme(cfg, "mine", {"a": "1"})
    path = file_of(cfg)
    path.write_text(path.read_text(encoding="utf-8") + "# note\n", encoding="utf-8")
    os.utime(path, (first["mtime"], first["mtime"]))  # same mtime: the mtime check alone would pass
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.write_theme(cfg, "mine", {"a": "2"}, overwrite=True, base_mtime=first["mtime"], stored_hash=first["hash"])
    assert exc.value.code == EDITED


def test_base_mtime_conflict_still_applies_on_top(cfg):
    first = tf.write_theme(cfg, "mine", {"a": "1"})
    os.utime(file_of(cfg), (first["mtime"] + 50, first["mtime"] + 50))  # touched, content identical
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.write_theme(cfg, "mine", {"a": "2"}, overwrite=True, base_mtime=first["mtime"], stored_hash=first["hash"])
    assert exc.value.code == "conflict"


def test_existing_refusals_keep_their_codes_before_the_hash_check(cfg):
    tf.write_theme(cfg, "mine", {"a": "1"})
    with pytest.raises(tf.ThemeFileError) as exc:  # no overwrite: name_taken
        tf.check_existing(cfg, "mine", False, None, stored_hash=None)
    assert exc.value.code == "name_taken"
    (cfg / "themes" / "hand.yaml").write_text("hand:\n  a: b\n", encoding="utf-8")  # no marker
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.check_existing(cfg, "hand", True, None, stored_hash="0" * 64)
    assert exc.value.code == "not_editable"


def test_a_new_file_needs_no_hash(cfg):
    result = tf.write_theme(cfg, "fresh", {"a": "1"}, stored_hash=None)
    assert result["hash"] == sha(file_of(cfg, "fresh").read_bytes())
    tf.check_existing(cfg, "other", False, None, stored_hash=None)  # absent: no-op


# ---------------------------------------------------------------- delete


def test_delete_allowed_when_file_matches_stored_hash(cfg):
    first = tf.write_theme(cfg, "mine", {"a": "1"})
    tf.delete_theme(cfg, "mine", stored_hash=first["hash"])
    assert not file_of(cfg).exists()


def test_hand_edit_refuses_delete_and_keeps_the_file(cfg):
    first = tf.write_theme(cfg, "mine", {"a": "1"})
    path = file_of(cfg)
    path.write_text(path.read_text(encoding="utf-8") + "# keep me\n", encoding="utf-8")
    before = path.read_bytes()
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.delete_theme(cfg, "mine", stored_hash=first["hash"])
    assert exc.value.code == EDITED
    assert path.read_bytes() == before


def test_no_stored_hash_refuses_delete_of_a_marked_file(cfg):
    path = file_of(cfg)
    path.write_text(WRITTEN_HEADER + "mine:\n  a: '1'\n", encoding="utf-8")
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.delete_theme(cfg, "mine", stored_hash=None)
    assert exc.value.code == EDITED
    assert path.exists()


def test_delete_keeps_its_other_refusals(cfg):
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.delete_theme(cfg, "ghost", stored_hash="0" * 64)
    assert exc.value.code == "not_found"
    hand = cfg / "themes" / "hand.yaml"
    hand.write_text("hand:\n  a: b\n", encoding="utf-8")
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.delete_theme(cfg, "hand", stored_hash=tf.text_hash(hand.read_text(encoding="utf-8")))
    assert exc.value.code == "not_editable"  # a matching hash never makes a file without the marker ours
    assert hand.exists()


def test_a_matching_hash_never_opens_a_file_without_the_marker(cfg):
    path = cfg / "themes" / "hand.yaml"
    path.write_text("hand:\n  a: b\n", encoding="utf-8")
    h = sha(path.read_bytes())
    with pytest.raises(tf.ThemeFileError) as exc:
        tf.write_theme(cfg, "hand", {"a": "1"}, overwrite=True, stored_hash=h)
    assert exc.value.code == "not_editable"
    assert path.read_text(encoding="utf-8") == "hand:\n  a: b\n"


# ---------------------------------------------------------------- points 1 and 3 stay proven (marker rule)


@pytest.mark.parametrize(
    "text,own",
    [
        (WRITTEN_HEADER + "a:\n  x: 1\n", True),
        ("\ufeff" + WRITTEN_HEADER.rstrip("\n") + "\r\na:\n  x: 1\n", True),
        ("a:\n  x: 1\n", False),
        ("\n" + WRITTEN_HEADER + "a:\n  x: 1\n", False),  # the marker must be the first line
        ("# Written by something else\na:\n  x: 1\n", False),
        ("", False),
    ],
)
def test_is_own_text_only_for_the_marker_on_the_first_line(text, own):
    assert tf.is_own_text(text) is own


def test_scan_marks_unmarked_files_not_own_and_never_editable(cfg):
    (cfg / "themes" / "hand.yaml").write_text("hand:\n  a: b\n", encoding="utf-8")
    entry = tf.scan_themes(cfg)["files"][0]
    assert entry["editable"] is False and entry["reason"] == "not_own"


def test_nothing_outside_the_themes_folder_is_touched(cfg):
    outside = cfg / "other.yaml"
    outside.write_text(WRITTEN_HEADER + "other:\n  a: b\n", encoding="utf-8")
    for bad in ("../other", "..", "a/b"):
        with pytest.raises(tf.ThemeFileError):
            tf.delete_theme(cfg, bad, stored_hash="0" * 64)
        with pytest.raises(tf.ThemeFileError):
            tf.write_theme(cfg, bad, {"a": "1"}, overwrite=True, stored_hash="0" * 64)
    assert outside.exists()
