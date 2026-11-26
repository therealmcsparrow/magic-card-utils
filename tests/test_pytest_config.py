"""Regression: a root pytest.ini must set asyncio_mode = auto.

Without it, a run started from the repository root (or from a copy of the tree)
does not pick up tests/pytest.ini and the async `hass` fixture tests error.
"""

import configparser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def _root_ini() -> configparser.ConfigParser:
    path = ROOT / "pytest.ini"
    assert path.is_file(), "pytest.ini is missing from the repository root"
    parser = configparser.ConfigParser()
    parser.read(path, encoding="utf-8")
    return parser


def test_root_pytest_ini_sets_asyncio_mode_auto():
    parser = _root_ini()
    assert parser.has_section("pytest"), "root pytest.ini has no [pytest] section"
    assert parser.get("pytest", "asyncio_mode", fallback="").strip() == "auto"


def test_root_pytest_ini_collects_the_tests_folder():
    parser = _root_ini()
    assert parser.get("pytest", "testpaths", fallback="").split() == ["tests"]


def test_pytest_picks_the_root_ini_when_run_from_the_root(pytestconfig):
    assert pytestconfig.inipath is not None
    assert Path(pytestconfig.inipath).resolve() == ROOT / "pytest.ini"
    assert pytestconfig.getini("asyncio_mode") == "auto"
