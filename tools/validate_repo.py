#!/usr/bin/env python3
"""Lean structural validation for the AIXS research repository.

Uses only the Python standard library so CI does not impose a project-wide language stack.
"""
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
ERRORS = []
STATUSES = {"planned", "running", "completed", "failed", "inconclusive", "superseded"}


def err(msg):
    ERRORS.append(msg)


def simple_yaml_value(text, key):
    m = re.search(rf"(?m)^{re.escape(key)}:\s*[\"']?([^\n\"']*)[\"']?\s*$", text)
    return m.group(1).strip() if m else None


# JSON files must parse.
for path in ROOT.rglob("*.json"):
    if "node_modules" in path.parts or "dist" in path.parts:
        continue
    try:
        json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        err(f"Invalid JSON: {path.relative_to(ROOT)}: {exc}")

# Published experiment folders must have the canonical package.
for mission_dir in (ROOT / "experiments").glob("mission-*"):
    for folder in mission_dir.iterdir() if mission_dir.exists() else []:
        if not folder.is_dir() or not re.match(r"^M\d{2}-E\d{3}-", folder.name):
            continue
        for required in ("experiment.yaml", "results.json", "README.md"):
            if not (folder / required).exists():
                err(f"Missing {required} in {folder.relative_to(ROOT)}")
        meta = folder / "experiment.yaml"
        if meta.exists():
            text = meta.read_text(encoding="utf-8")
            exp_id = simple_yaml_value(text, "experiment_id")
            status = simple_yaml_value(text, "status")
            version = simple_yaml_value(text, "schema_version")
            if exp_id and not folder.name.startswith(exp_id + "-"):
                err(f"Experiment ID does not match folder: {folder.relative_to(ROOT)}")
            if status and status not in STATUSES:
                err(f"Unknown experiment status {status!r}: {meta.relative_to(ROOT)}")
            if version != "0.1":
                err(f"Unsupported experiment schema version {version!r}: {meta.relative_to(ROOT)}")

# Hardware profiles need stable basic identity/config keys.
profiles = ROOT / "registry" / "hardware" / "profiles"
if profiles.exists():
    for path in profiles.glob("*.yaml"):
        text = path.read_text(encoding="utf-8")
        for key in ("schema_version", "id", "cpu", "memory", "storage", "os"):
            if not re.search(rf"(?m)^{re.escape(key)}:", text):
                err(f"Hardware profile missing {key}: {path.relative_to(ROOT)}")
        if simple_yaml_value(text, "schema_version") != "0.1":
            err(f"Unsupported hardware schema version: {path.relative_to(ROOT)}")

if ERRORS:
    print("AIXS repository validation failed:\n")
    for item in ERRORS:
        print(f"- {item}")
    sys.exit(1)

print("AIXS repository structure validation passed.")
