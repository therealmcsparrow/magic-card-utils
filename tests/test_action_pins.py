"""Tests for the pinned-action check."""

import importlib.util
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parent.parent
SHA = "3d3c42e5aac5ba805825da76410c181273ba90b1"
DIGEST = "a" * 64


def _load():
    spec = importlib.util.spec_from_file_location(
        "check_action_pins", ROOT / "scripts" / "check_action_pins.py"
    )
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


pins = _load()


def _write(tmp_path, name, text):
    path = tmp_path / ".github" / "workflows" / name
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")
    return path


def _uses(value):
    return f"jobs:\n  a:\n    steps:\n      - uses: {value}\n"


@pytest.mark.parametrize(
    "value",
    [
        f"actions/checkout@{SHA} # v7.0.1",
        f"hacs/action@{SHA} # 22.5.0",
        f"home-assistant/actions/hassfest@{SHA} # master",
        f"owner/repo/.github/workflows/x.yml@{SHA} # v1",
        f"'actions/checkout@{SHA}' # v7.0.1",
        f"docker://alpine@sha256:{DIGEST}",
        "./local-action",
    ],
)
def test_accepts_pinned(tmp_path, value):
    _write(tmp_path, "ok.yml", _uses(value))
    assert pins.check_pins(tmp_path) == []


@pytest.mark.parametrize(
    "value",
    [
        "actions/checkout@v4",
        "actions/checkout@v4.1.0 # v4.1.0",
        "actions/checkout@main # main",
        f"actions/checkout@{SHA}",
        f"actions/checkout@{SHA} #",
        f"actions/checkout@{SHA[:39]} # v1",
        f"actions/checkout@{SHA.upper()} # v1",
        f"actions/checkout@{SHA}x # v1",
        f"actions/checkout@{SHA} # v1 and more",
        "actions/checkout",
        "docker://alpine:3.20",
        f"docker://alpine@sha256:{DIGEST[:63]}",
    ],
)
def test_rejects_unpinned(tmp_path, value):
    _write(tmp_path, "bad.yml", _uses(value))
    problems = pins.check_pins(tmp_path)
    assert len(problems) == 1
    assert "bad.yml:4" in problems[0]


def test_scans_yaml_extension_and_composite_actions(tmp_path):
    _write(tmp_path, "one.yaml", _uses("actions/checkout@v4"))
    action = tmp_path / ".github" / "actions" / "deep" / "x" / "action.yml"
    action.parent.mkdir(parents=True)
    action.write_text(_uses("actions/cache@v4"), encoding="utf-8")
    assert len(pins.check_pins(tmp_path)) == 2


def test_ignores_non_uses_lines(tmp_path):
    _write(tmp_path, "t.yml", "# uses: actions/checkout@v4\nname: x\nrun: echo uses: a@b\n")
    assert pins.check_pins(tmp_path) == []


def test_selftest_passes_and_main_scans(tmp_path, capsys):
    assert pins.main(["--selftest"]) == 0
    _write(tmp_path, "bad.yml", _uses("actions/checkout@v4"))
    assert pins.main(["--root", str(tmp_path)]) == 1
    assert "bad.yml" in capsys.readouterr().out


def test_repository_workflows_are_pinned():
    assert pins.check_pins(ROOT) == []
