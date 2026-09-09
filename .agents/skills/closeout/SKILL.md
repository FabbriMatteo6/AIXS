---
name: closeout
description: "Close an AIXS task when invoked as $closeout. Check current test/review evidence and physical feedback, reconcile documentation, archive and clear the pointer. Do not implement or test."
---
# Closeout

Read [TASK_LIFECYCLE.md](../../../docs/agent-workflow/TASK_LIFECYCLE.md).

1. Resolve the task and verify IDs in TASK.md, PLAN.md, IMPLEMENTATION.md, TESTING.md and REVIEW.md. Inspect source only to resolve a concrete discrepancy; do not run tests.
2. Require implemented work, current sufficient test evidence, an approved/approved-with-follow-ups review and resolved required findings. Record explicitly accepted limitations without calling unrun checks passed.
3. Required physical tests must have user feedback for the current build, assessed by Tester and Reviewer. Pending means blocked CLOSEOUT.md and awaiting-physical-tests; leave the folder active. Historical practice allowing outstanding device checks does not apply.
4. Apply DOCUMENTATION_MAP.md as a filter. Update only changed truths, preserve history, link experiment evidence and update PROGRESS.md.
5. Write CLOSEOUT.md with outcome, tested/reviewed identity, physical gate, documentation dispositions and follow-ups. Do not rewrite earlier results or verdicts to manufacture eligibility.
6. Mark TASK completed/completed-with-follow-ups, PLAN completed and CLOSEOUT closed. Move the whole folder to tasks/completed without overwriting anything; update lifecycle paths and verify archive contents.
7. Reset ACTIVE_TASK.md to idle/none only if it points to this task. Never activate the next task automatically. An exact paused task can close without displacing a current one.
8. Report archive path, documentation changes and follow-ups. Do not commit, push or publish implicitly.
