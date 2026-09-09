#!/usr/bin/env python3
"""Repository-level checks for the public AIXS workflow setup.

These tests intentionally use only the standard library. They validate the
workflow contract expressed by the Markdown and skill metadata without
executing another role, launching an app, or running private replay material.
"""

from pathlib import Path
import re
import tempfile
import unittest
from urllib.parse import unquote


ROOT = Path(__file__).resolve().parents[2]
ROLE_NAMES = ("planner", "implementer", "tester", "reviewer", "closeout")
STAGE_TO_TASK_STATUS = {
    "discovery": "discovery",
    "planned": "planned",
    "implementation": "implementing",
    "test-ready": "test-ready",
    "testing": "testing",
    "review-ready": "review-ready",
    "review": "reviewing",
    "awaiting-physical-tests": "awaiting-physical-tests",
    "closeout-ready": "closeout-ready",
}
IMPLEMENTATION_REQUIRED_STAGES = frozenset(
    {
        "test-ready",
        "testing",
        "review-ready",
        "review",
        "awaiting-physical-tests",
        "closeout-ready",
    }
)


def read(relative_path: str) -> str:
    return (ROOT / relative_path).read_text(encoding="utf-8")


def front_matter_value(text: str, key: str) -> str:
    match = re.search(rf"(?m)^{re.escape(key)}:\s*(.+?)\s*$", text)
    if not match:
        raise AssertionError(f"Missing front-matter key {key!r}")
    return match.group(1).strip().strip('"\'')


def relative_markdown_targets(text: str):
    for target in re.findall(r"\[[^\]]+\]\(([^)]+)\)", text):
        target = target.strip()
        if target.startswith("<") and ">" in target:
            target = target[1 : target.index(">")]
        else:
            target = target.split("#", 1)[0]
        if not target or "://" in target or target.startswith("mailto:"):
            continue
        yield unquote(target)


def task_status(text: str) -> str:
    match = re.search(r"(?m)^- Status:\s*(.+?)\s*$", text)
    if not match:
        raise AssertionError("Missing task status")
    return match.group(1).strip()


def write_task_fixture(
    root: Path,
    task_id: str,
    stage: str,
    implementation_revision: int | None = None,
    *,
    pointer_task_id: str | None = None,
    pointer_path: str | None = None,
):
    """Create a small lifecycle fixture without using the live task folder."""
    task_path = pointer_path or f"docs/agent-workflow/tasks/active/{task_id}/"
    task_dir = root / task_path
    task_dir.mkdir(parents=True, exist_ok=True)
    status = STAGE_TO_TASK_STATUS[stage]
    (task_dir / "TASK.md").write_text(
        f"# Fixture task\n\n- Task ID: {task_id}\n- Status: {status}\n",
        encoding="utf-8",
    )
    (task_dir / "PLAN.md").write_text(
        f"# Fixture plan\n\n- Task ID: {task_id}\n",
        encoding="utf-8",
    )
    if implementation_revision is not None:
        (task_dir / "IMPLEMENTATION.md").write_text(
            "# Fixture implementation\n\n"
            f"- Task ID: {task_id}\n"
            f"- Implementation revision: {implementation_revision}\n",
            encoding="utf-8",
        )

    pointer_dir = root / "docs" / "agent-workflow"
    pointer_dir.mkdir(parents=True, exist_ok=True)
    (pointer_dir / "ACTIVE_TASK.md").write_text(
        "---\n"
        "status: active\n"
        f"task_id: {pointer_task_id or task_id}\n"
        f"path: {task_path}\n"
        f"stage: {stage}\n"
        "---\n",
        encoding="utf-8",
    )


def validate_active_pointer(root: Path):
    """Validate an active pointer and its task reports in a test fixture."""
    pointer_path = root / "docs" / "agent-workflow" / "ACTIVE_TASK.md"
    pointer = pointer_path.read_text(encoding="utf-8")
    pointer_status = front_matter_value(pointer, "status")

    if pointer_status == "idle":
        for key in ("task_id", "path", "stage"):
            if front_matter_value(pointer, key) != "none":
                raise AssertionError(f"Idle pointer has non-none {key}")
        return

    if pointer_status != "active":
        raise AssertionError(f"Unexpected pointer status: {pointer_status}")

    task_id = front_matter_value(pointer, "task_id")
    task_path = front_matter_value(pointer, "path")
    stage = front_matter_value(pointer, "stage")
    if task_path.rstrip("/").rsplit("/", 1)[-1] != task_id:
        raise AssertionError("Pointer task_id and path identify different tasks")
    if stage not in STAGE_TO_TASK_STATUS:
        raise AssertionError(f"Unexpected pointer stage: {stage}")

    task_dir = root / task_path
    if not task_dir.is_dir():
        raise AssertionError(f"Pointer path does not exist: {task_path}")
    task = (task_dir / "TASK.md").read_text(encoding="utf-8")
    if f"Task ID: {task_id}" not in task:
        raise AssertionError("TASK.md does not match pointer task_id")
    if task_status(task) != STAGE_TO_TASK_STATUS[stage]:
        raise AssertionError("TASK.md status does not match pointer stage")

    for report_name in ("PLAN.md",):
        report = (task_dir / report_name).read_text(encoding="utf-8")
        if f"Task ID: {task_id}" not in report:
            raise AssertionError(f"{report_name} does not match pointer task_id")

    implementation_path = task_dir / "IMPLEMENTATION.md"
    if implementation_path.is_file():
        implementation = implementation_path.read_text(encoding="utf-8")
        if f"Task ID: {task_id}" not in implementation:
            raise AssertionError("IMPLEMENTATION.md does not match pointer task_id")
        if not re.search(r"(?m)^- Implementation revision:\s*\d+\s*$", implementation):
            raise AssertionError("IMPLEMENTATION.md has no numbered revision")
    elif stage in IMPLEMENTATION_REQUIRED_STAGES:
        raise AssertionError(
            f"IMPLEMENTATION.md is required for lifecycle stage {stage}"
        )


class WorkflowSetupTests(unittest.TestCase):
    def test_all_role_metadata_is_explicit_and_manual(self):
        for role in ROLE_NAMES:
            skill_path = f".agents/skills/{role}/SKILL.md"
            metadata_path = f".agents/skills/{role}/agents/openai.yaml"
            skill = read(skill_path)
            metadata = read(metadata_path)

            self.assertEqual(front_matter_value(skill, "name"), role)
            self.assertIn(f"${role}", skill)
            self.assertIn(f'display_name: "{role.title()}"', metadata)
            self.assertIn(f'Use ${role}', metadata)
            self.assertIn("allow_implicit_invocation: false", metadata)

    def test_role_routing_covers_the_required_failure_scenarios(self):
        lifecycle = read("docs/agent-workflow/TASK_LIFECYCLE.md")
        tester = read(".agents/skills/tester/SKILL.md")
        reviewer = read(".agents/skills/reviewer/SKILL.md")
        implementer = read(".agents/skills/implementer/SKILL.md")

        # Passing task: the normal flow is explicit and user-controlled.
        self.assertIn("Planner → Implementer → Tester → Reviewer → Closeout", lifecycle)
        self.assertIn("Do not automatically invoke the next role", lifecycle)
        # Code defect: Reviewer routes product fixes back to Implementer.
        self.assertIn("route product defects to implementation", reviewer.lower())
        self.assertIn("Product fixes requested by Tester or Reviewer belong here", implementer)
        # Stale report: changed behavior invalidates affected evidence.
        self.assertIn("Behavior-affecting edits invalidate affected evidence", lifecycle)
        # Missing tests/evidence: the task returns to Tester.
        self.assertIn("missing automated evidence to test-ready", lifecycle)
        self.assertIn("Add or repair missing tests", tester)
        # Pending device feedback: it has its own state and cannot close normally.
        self.assertIn("awaiting-physical-tests", lifecycle)
        self.assertIn("Required feedback pending blocks normal closeout", lifecycle)

    def test_review_boundary_forbids_execution_and_fixes(self):
        reviewer = read(".agents/skills/reviewer/SKILL.md")
        self.assertIn("Do not run tests, launch the app or fix code", reviewer)
        self.assertIn("Do not fix code/tests", reviewer)
        self.assertNotIn("run tests or fix", read("README_AGENTS.md").lower())

    def test_task_identity_pointer_and_reports_are_consistent(self):
        pointer = read("docs/agent-workflow/ACTIVE_TASK.md")
        if front_matter_value(pointer, "status") == "active":
            task_id = front_matter_value(pointer, "task_id")
            task_path = front_matter_value(pointer, "path")
            task_dir = ROOT / task_path
            self.assertTrue(task_dir.is_dir())
            self.assertEqual(task_dir.name, task_id)
            self.assertTrue((task_dir / "TASK.md").is_file())
            self.assertTrue((task_dir / "PLAN.md").is_file())
            if front_matter_value(pointer, "stage") in IMPLEMENTATION_REQUIRED_STAGES:
                self.assertTrue((task_dir / "IMPLEMENTATION.md").is_file())
        validate_active_pointer(ROOT)

    def test_active_pointer_allows_early_states_without_implementation_report(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            fixture_root = Path(temporary_directory)
            for stage in ("discovery", "planned", "implementation"):
                with self.subTest(stage=stage):
                    write_task_fixture(
                        fixture_root,
                        f"fixture-{stage}",
                        stage,
                        implementation_revision=None,
                    )
                    validate_active_pointer(fixture_root)

    def test_active_pointer_validates_optional_early_implementation_report(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            fixture_root = Path(temporary_directory)
            write_task_fixture(
                fixture_root,
                "fixture-early-report",
                "implementation",
                implementation_revision=1,
            )
            validate_active_pointer(fixture_root)

            implementation_path = (
                fixture_root
                / "docs"
                / "agent-workflow"
                / "tasks"
                / "active"
                / "fixture-early-report"
                / "IMPLEMENTATION.md"
            )
            implementation_path.write_text(
                "# Fixture implementation\n\n"
                "- Task ID: another-task\n"
                "- Implementation revision: 1\n",
                encoding="utf-8",
            )

            with self.assertRaisesRegex(AssertionError, "does not match"):
                validate_active_pointer(fixture_root)

    def test_active_pointer_requires_implementation_after_handoff_to_tester(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            fixture_root = Path(temporary_directory)
            write_task_fixture(
                fixture_root,
                "fixture-missing-implementation",
                "test-ready",
                implementation_revision=None,
            )

            with self.assertRaisesRegex(
                AssertionError, "IMPLEMENTATION.md is required"
            ):
                validate_active_pointer(fixture_root)

    def test_task_identity_fixture_allows_transitions_and_rejects_mismatch(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            fixture_root = Path(temporary_directory)

            write_task_fixture(
                fixture_root,
                "fixture-review-ready",
                "review-ready",
                implementation_revision=2,
            )
            validate_active_pointer(fixture_root)

            write_task_fixture(
                fixture_root,
                "fixture-correction-round",
                "implementation",
                implementation_revision=7,
            )
            validate_active_pointer(fixture_root)

            write_task_fixture(
                fixture_root,
                "fixture-real-task",
                "test-ready",
                implementation_revision=3,
                pointer_task_id="fixture-other-task",
            )
            with self.assertRaisesRegex(AssertionError, "different tasks"):
                validate_active_pointer(fixture_root)

            (fixture_root / "docs" / "agent-workflow" / "ACTIVE_TASK.md").write_text(
                "---\n"
                "status: idle\n"
                "task_id: none\n"
                "path: none\n"
                "stage: none\n"
                "---\n",
                encoding="utf-8",
            )
            validate_active_pointer(fixture_root)

    def test_active_pointer_rejects_unknown_stage(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            fixture_root = Path(temporary_directory)
            write_task_fixture(
                fixture_root,
                "fixture-unknown-stage",
                "test-ready",
                implementation_revision=4,
            )
            pointer_path = fixture_root / "docs" / "agent-workflow" / "ACTIVE_TASK.md"
            pointer_path.write_text(
                pointer_path.read_text(encoding="utf-8").replace(
                    "stage: test-ready", "stage: unsupported"
                ),
                encoding="utf-8",
            )

            with self.assertRaisesRegex(AssertionError, "Unexpected pointer stage"):
                validate_active_pointer(fixture_root)

    def test_active_pointer_rejects_task_status_drift(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            fixture_root = Path(temporary_directory)
            write_task_fixture(
                fixture_root,
                "fixture-status-drift",
                "review-ready",
                implementation_revision=5,
            )
            task_path = fixture_root / "docs" / "agent-workflow" / "tasks" / "active" / "fixture-status-drift" / "TASK.md"
            task_path.write_text(
                task_path.read_text(encoding="utf-8").replace(
                    "- Status: review-ready", "- Status: planned"
                ),
                encoding="utf-8",
            )

            with self.assertRaisesRegex(AssertionError, "TASK.md status"):
                validate_active_pointer(fixture_root)

    def test_active_pointer_rejects_report_identity_drift(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            fixture_root = Path(temporary_directory)
            write_task_fixture(
                fixture_root,
                "fixture-report-drift",
                "test-ready",
                implementation_revision=6,
            )
            plan_path = fixture_root / "docs" / "agent-workflow" / "tasks" / "active" / "fixture-report-drift" / "PLAN.md"
            plan_path.write_text(
                plan_path.read_text(encoding="utf-8").replace(
                    "Task ID: fixture-report-drift", "Task ID: another-task"
                ),
                encoding="utf-8",
            )

            with self.assertRaisesRegex(AssertionError, "PLAN.md does not match"):
                validate_active_pointer(fixture_root)

    def test_active_pointer_requires_numbered_implementation_revision(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            fixture_root = Path(temporary_directory)
            write_task_fixture(
                fixture_root,
                "fixture-missing-revision",
                "testing",
                implementation_revision=7,
            )
            implementation_path = (
                fixture_root
                / "docs"
                / "agent-workflow"
                / "tasks"
                / "active"
                / "fixture-missing-revision"
                / "IMPLEMENTATION.md"
            )
            implementation_path.write_text(
                "# Fixture implementation\n\n- Task ID: fixture-missing-revision\n",
                encoding="utf-8",
            )

            with self.assertRaisesRegex(AssertionError, "no numbered revision"):
                validate_active_pointer(fixture_root)

    def test_idle_pointer_requires_none_identity_fields(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            fixture_root = Path(temporary_directory)
            pointer_path = fixture_root / "docs" / "agent-workflow" / "ACTIVE_TASK.md"
            pointer_path.parent.mkdir(parents=True, exist_ok=True)
            pointer_path.write_text(
                "---\n"
                "status: idle\n"
                "task_id: stale-task\n"
                "path: none\n"
                "stage: none\n"
                "---\n",
                encoding="utf-8",
            )

            with self.assertRaisesRegex(AssertionError, "Idle pointer has non-none task_id"):
                validate_active_pointer(fixture_root)

    def test_evidence_freshness_and_physical_gate_are_documented(self):
        lifecycle = read("docs/agent-workflow/TASK_LIFECYCLE.md")
        implementation_template = read("docs/agent-workflow/templates/IMPLEMENTATION.md")
        testing_template = read("docs/agent-workflow/templates/TESTING.md")

        self.assertIn("numbered revision", lifecycle)
        self.assertIn("base/HEAD", lifecycle)
        self.assertIn("SHA-256 manifest", lifecycle)
        self.assertIn("Never copy secrets into reports", lifecycle)
        self.assertIn("Implementation revision:", implementation_template)
        self.assertIn("Git base / HEAD:", implementation_template)
        self.assertIn("Tested content manifest", testing_template)
        self.assertIn("User feedback, date, device/OS, build", testing_template)
        self.assertIn("pending / passed / failed / not-required", testing_template)

    def test_no_imported_forza_rules_remain_in_role_skills(self):
        for role in ROLE_NAMES:
            content = read(f".agents/skills/{role}/SKILL.md").lower()
            self.assertNotIn("forza", content)
            self.assertNotIn("milestone 17", content)

    def test_audit_and_public_workload_boundaries(self):
        audit = read("docs/01 AUDIT/AS_IS.md")
        workloads = read("benchmarks/workloads/README.md")

        self.assertIn("The experiment template declares v0.2, while the validator accepts only v0.1", audit)
        self.assertIn("No source folders were deleted or reorganized", audit)
        self.assertIn("Task-specific replay manifests", workloads)
        self.assertIn("private evaluator workspace", workloads)

    def test_all_workflow_templates_exist_and_are_role_specific(self):
        for name in ("TASK", "PLAN", "IMPLEMENTATION", "TESTING", "REVIEW", "CLOSEOUT"):
            path = ROOT / "docs" / "agent-workflow" / "templates" / f"{name}.md"
            self.assertTrue(path.is_file(), path)
            self.assertIn("{{TASK_ID}}", path.read_text(encoding="utf-8"))

        self.assertIn("$tester", read("docs/agent-workflow/templates/IMPLEMENTATION.md"))
        self.assertIn("$reviewer", read("docs/agent-workflow/templates/TESTING.md"))
        self.assertIn("Next role and exact-path handoff", read("docs/agent-workflow/templates/REVIEW.md"))

    def test_targeted_workflow_markdown_links_resolve(self):
        documents = (
            "README_AGENTS.md",
            "docs/agent-workflow/README.md",
            "docs/agent-workflow/TASK_LIFECYCLE.md",
            "docs/agent-workflow/DOCUMENTATION_MAP.md",
            "docs/01 AUDIT/AS_IS.md",
            "benchmarks/workloads/README.md",
            *(f".agents/skills/{role}/SKILL.md" for role in ROLE_NAMES),
        )
        for document in documents:
            for target in relative_markdown_targets(read(document)):
                resolved = (ROOT / document).parent / target
                self.assertTrue(resolved.exists(), f"{document} links to missing {target}")

    def test_markdown_link_parser_accepts_angle_bracket_destinations(self):
        targets = list(
            relative_markdown_targets("[Audit](<docs/01%20AUDIT/AS_IS.md>)")
        )
        self.assertEqual(targets, ["docs/01 AUDIT/AS_IS.md"])


if __name__ == "__main__":
    unittest.main(verbosity=2)
