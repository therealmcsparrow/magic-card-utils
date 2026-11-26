"""Regression: a root pytest.ini must set asyncio_mode = auto.

Without it, a run started from the repository root (or from a copy of the tree)
does not pick up tests/pytest.ini and the async `hass` fixture tests error.
"""

import configparser
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def _root_ini() -> configparser.ConfigParser:
    path = ROOT / "pytest.ini"
    assert path.is_file(), "pytest.ini is missing from the repository root"
    parser = configparser.ConfigParser(interpolation=None)
    parser.read(path, encoding="utf-8")
    return parser


def test_root_pytest_ini_sets_asyncio_mode_auto():
    parser = _root_ini()
    assert parser.has_section("pytest"), "root pytest.ini has no [pytest] section"
    assert parser.get("pytest", "asyncio_mode", fallback="").strip() == "auto"


def test_root_pytest_ini_collects_the_tests_folder():
    parser = _root_ini()
    assert parser.get("pytest", "testpaths", fallback="").split() == ["tests"]


def test_pytest_picks_the_root_ini_when_run_from_the_root():
    # A fresh pytest started from the root with no path arguments, so the
    # result does not depend on how this session was invoked.
    result = subprocess.run(
        [
            sys.executable, "-m", "pytest", "--collect-only",
            "-p", "no:cacheprovider", "--ignore=tests",
        ],
        cwd=ROOT,
        capture_output=True,
        text=True,
        timeout=120,
        check=False,
    )
    header = result.stdout
    assert "configfile: pytest.ini" in header, header
    assert "rootdir: " in header, header
    assert "mode=auto" in header.lower() or "mode.auto" in header.lower(), header
