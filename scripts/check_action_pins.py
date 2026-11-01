"""Fail when a workflow step uses an action that is not pinned to a full commit.

Every `uses:` line in .github/workflows and .github/actions must name a
40-character lower-case commit id followed by a version or branch comment.
Local actions (./) are skipped and docker:// images need a sha256 digest.
The script only reads files; it needs no third-party packages.
"""

from __future__ import annotations

import argparse
import re
import sys
import tempfile
from pathlib import Path

USES_LINE = re.compile(r"^\s*(?:-\s+)?uses:\s*(?P<rest>.*?)\s*$")
SHA_REF = re.compile(r"[A-Za-z0-9_.\-]+(?:/[A-Za-z0-9_.\-]+)+@[0-9a-f]{40}")
DOCKER_REF = re.compile(r"docker://\S+@sha256:[0-9a-f]{64}")
COMMENT = re.compile(r"[A-Za-z0-9][A-Za-z0-9._/\-]*")


def _split(rest: str) -> tuple[str, str | None]:
    """Split a uses value into the reference and its trailing comment."""
    ref, hash_mark, comment = rest.partition("#")
    ref = ref.strip().strip("'\"")
    return ref, (comment.strip() if hash_mark else None)


def check_line(rest: str) -> str | None:
    """Return the reason a uses value is not pinned, or None when it is."""
    ref, comment = _split(rest)
    if ref.startswith("./"):
        return None
    if ref.startswith("docker://"):
        if DOCKER_REF.fullmatch(ref):
            return None
        return "docker image is not pinned to a sha256 digest"
    if not SHA_REF.fullmatch(ref):
        return "action is not pinned to a full 40-character commit id"
    if not comment or not COMMENT.fullmatch(comment):
        return "pinned commit has no version comment"
    return None


def check_text(text: str, name: str) -> list[str]:
    """Check one workflow file's text and return one message per problem."""
    problems = []
    for number, line in enumerate(text.splitlines(), start=1):
        match = USES_LINE.match(line)
        if not match:
            continue
        reason = check_line(match.group("rest"))
        if reason:
            problems.append(f"{name}:{number}: {reason}: {match.group('rest')}")
    return problems


def workflow_files(root: Path) -> list[Path]:
    github = root / ".github"
    files = list((github / "workflows").glob("*.y*ml"))
    files += (github / "actions").glob("**/action.y*ml")
    return sorted(path for path in files if path.is_file())


def check_pins(root: Path) -> list[str]:
    """Check every workflow and composite action under root."""
    problems = []
    for path in workflow_files(Path(root)):
        text = path.read_text(encoding="utf-8")
        problems += check_text(text, path.relative_to(root).as_posix())
    return problems


def selftest() -> int:
    """Prove the check fails on a version tag and passes on a pinned commit."""
    sha = "0123456789abcdef0123456789abcdef01234567"
    cases = [
        (f"- uses: actions/checkout@{sha} # v1.2.3", True),
        (f"- uses: actions/checkout@{sha}", False),
        ("- uses: actions/checkout@v4", False),
        ("- uses: actions/checkout@v4 # v4", False),
        ("- uses: docker://alpine:3.20", False),
        ("- uses: ./local", True),
    ]
    with tempfile.TemporaryDirectory() as tmp:
        failed = 0
        for index, (line, expect_ok) in enumerate(cases):
            workflow = Path(tmp) / ".github" / "workflows" / f"case{index}.yml"
            workflow.parent.mkdir(parents=True, exist_ok=True)
            workflow.write_text(f"jobs:\n  a:\n    steps:\n      {line}\n", encoding="utf-8")
            ok = not check_pins(Path(tmp))
            workflow.unlink()
            if ok != expect_ok:
                failed += 1
                print(f"selftest failed: {line!r} expected ok={expect_ok}")
    return 1 if failed else 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", default=".", help="repository root to scan")
    parser.add_argument("--selftest", action="store_true", help="run the built-in cases")
    args = parser.parse_args(argv)
    if args.selftest:
        status = selftest()
        if not status:
            print("selftest passed")
        return status
    problems = check_pins(Path(args.root))
    for problem in problems:
        print(problem)
    if problems:
        return 1
    print("all actions are pinned")
    return 0


if __name__ == "__main__":
    sys.exit(main())
