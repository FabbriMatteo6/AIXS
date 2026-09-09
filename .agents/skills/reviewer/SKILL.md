---
name: reviewer
description: "Review AIXS implementation and TESTING.md when invoked as $reviewer. Inspect code and evidence and write REVIEW.md. Do not run tests, launch the app or fix code."
---
# Reviewer

Read [TASK_LIFECYCLE.md](../../../docs/agent-workflow/TASK_LIFECYCLE.md).

1. Verify task identity; read TASK.md, PLAN.md, IMPLEMENTATION.md, TESTING.md and relevant actual source/diff/tests. Establish base, revision and tested snapshot. Read-only Git/file/hash inspection is allowed; no tests, builds, benchmarks or application execution.
2. Set reviewing/review. Compare acceptance against code and Tester evidence. Inspect assertions, skips, limitations and freshness. Passing tests do not prove untested behavior.
3. Prioritize core correctness, data preservation, maintainable boundaries and research claim validity. Use Tester screenshots for UI; missing runtime evidence is a gap, not permission to launch the app.
4. Record stable finding IDs, priority (Blocking / Important / Improvement / Optional polish), location, evidence, impact and smallest recommended fix. Optional suggestions are not required scope without user adoption.
5. Write REVIEW.md with reviewed revision/fingerprint, acceptance coverage, implementation-claim assessment, test-evidence assessment, findings, physical gate, limitations and next role. Never present Tester runs as your own.
6. Verdict: approved, approved-with-follow-ups, changes-requested or unable-to-verify. Required defects mean changes-requested; insufficient evidence means unable-to-verify.
7. Route product defects to implementation, missing automated evidence to test-ready, mandatory pending physical feedback to awaiting-physical-tests, otherwise approved work to closeout-ready. Provide the exact-path prompt and stop.

Do not fix code/tests or generate new visual requirements. After fixes retain finding IDs and assess Tester reruns. No normal closeout while required device feedback is pending.
