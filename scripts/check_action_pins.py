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

NEWLINE = re.compile(r"\r\n|\n|\r")
USES_WORD = re.compile(r"(?<![A-Za-z0-9_])uses(?![A-Za-z0-9_])")
USES_LINE = re.compile(r"^ *(?:- +)?uses:[ ]*(?P<rest>.*?)\s*$")
SHA_REF = re.compile(r"[A-Za-z0-9_.\-]+(?:/[A-Za-z0-9_.\-]+)+@[0-9a-f]{40}")
DOCKER_REF = re.compile(r"docker://\S+@sha256:[0-9a-f]{64}")
COMMENT = re.compile(r"[A-Za-z0-9][A-Za-z0-9._/\-]*")
# The only shapes a line holding the word `uses` may have.
CANON_SHA = re.compile(r" *(?:- )?uses: [A-Za-z0-9_.\-]+(?:/[A-Za-z0-9_.\-]+)+@[0-9a-f]{40} # [A-Za-z0-9][A-Za-z0-9._/\-]* *")
CANON_LOCAL = re.compile(r" *(?:- )?uses: \./[A-Za-z0-9_./\-]* *")
CANON_DOCKER = re.compile(
    r" *(?:- )?uses: docker://[A-Za-z0-9_.:/\-]+@sha256:[0-9a-f]{64}(?: # [A-Za-z0-9][A-Za-z0-9._/\-]*)? *"
)
COMMENT_LINE = re.compile(r"[ \t]*#")
RUN_BLOCK = re.compile(r"( *)(- +)?run: *[|>][-+0-9]* *(?:#.*)?")
RUN_LINE = re.compile(r" *(?:- +)?run:(?: |$)")
BLANK = re.compile(r"[ \t]*")


def _split(rest: str) -> tuple[str, str | None]:
    """Split a uses value into the reference and its trailing comment."""
    ref, hash_mark, comment = rest.partition("#")
    ref = ref.strip().strip("'\"")
    return ref, (comment.strip() if hash_mark else None)


def check_line(rest: str) -> str:
    """Return why a uses value is not in the canonical form."""
    ref, comment = _split(rest)
    if ref.startswith("docker://"):
        return "docker image is not pinned to a sha256 digest"
    if not SHA_REF.fullmatch(ref):
        return "action is not pinned to a full 40-character commit id"
    if not comment or not COMMENT.fullmatch(comment):
        return "pinned commit has no version comment"
    return "uses cannot read this form, write it as - uses: owner/repo@<sha> # <version>"


def check_text(text: str, name: str) -> list[str]:
    """Check one workflow file's text and return one message per problem.

    Outside a `run:` block and a whole-line comment, a line holding the word
    `uses` must have exactly the canonical shape; anything else fails, so a form
    this check cannot read never passes.
    """
    problems = []
    block_col = -1
    for number, line in enumerate(NEWLINE.split(text), start=1):
        if block_col >= 0:
            if BLANK.fullmatch(line) or len(line) - len(line.lstrip(" ")) > block_col:
                continue
            block_col = -1
        run = RUN_BLOCK.fullmatch(line)
        if run:
            block_col = len(run.group(1)) + len(run.group(2) or "")
            continue
        if COMMENT_LINE.match(line) or RUN_LINE.match(line) or not USES_WORD.search(line):
            continue
        if CANON_SHA.fullmatch(line) or CANON_LOCAL.fullmatch(line) or CANON_DOCKER.fullmatch(line):
            continue
        match = USES_LINE.match(line)
        if not match:
            problems.append(f"{name}:{number}: uses key is written in a form this check cannot read: {line.strip()}")
            continue
        problems.append(f"{name}:{number}: {check_line(match.group('rest'))}: {match.group('rest')}")
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
        text = path.read_bytes().decode("utf-8")
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
        (f'- uses: "actions/checkout@{sha}" # v1', False),
        (f"- uses: actions/checkout@{sha} # v1 and more", False),
        ("- uses : a/b@v4", False),
        ('- "uses": a/b@v4', False),
        ("- 'uses': a/b@v4", False),
        ("- { uses: a/b@v4 }", False),
        ("- { name: x, uses: a/b@v4 }", False),
        ('"uses": a/b@v4', False),
        ("run: echo uses: a/b@v4", True),
        ('- { name: "a #b", uses: a/b@v4 }', False),
        (f'- {{ name: "a #b", uses: a/b@{sha} # v1 }}', False),
        ("- ? uses\n  : a/b@v4", False),
        ("- &k uses: a/b@v4", False),
        ("- !!str uses: a/b@v4", False),
        ("- name: x\ruses: a/b@v4", False),
        ("- uses:\n    a/b@v4", False),
        ("- uses: >\n    a/b@v4", False),
        ("- uses: *x", False),
        ("- {\n    uses: a/b@v4\n  }", False),
        ("- [{ uses: a/b@v4 }]", False),
        ("- name: this uses a cache", False),
        ("- run: |\n    echo uses: a/b@v4\n    uses: x\n- name: x", True),
        ("- run: |\n    echo hi\n  uses: a/b@v4", False),
        ("  # uses: a/b@v4", True),
        (f"- uses: a/b@{sha} # v1 uses x", False),
        ("-\tuses: a/b@v4", False),
    ]
    with tempfile.TemporaryDirectory() as tmp:
        failed = 0
        for index, (line, expect_ok) in enumerate(cases):
            workflow = Path(tmp) / ".github" / "workflows" / f"case{index}.yml"
            workflow.parent.mkdir(parents=True, exist_ok=True)
            workflow.write_bytes(f"{line}\n".encode("utf-8"))
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
    if not workflow_files(Path(args.root)):
        print(f"no workflow files found under {args.root}")
        return 1
    problems = check_pins(Path(args.root))
    for problem in problems:
        print(problem)
    if problems:
        return 1
    print("all actions are pinned")
    return 0


if __name__ == "__main__":
    sys.exit(main())
