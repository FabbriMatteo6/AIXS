---
name: tester
description: "Validate an AIXS implementation when invoked as $tester. Add missing tests, run proportional checks, record TESTING.md and physical feedback. Return product fixes to Implementer via Reviewer."
---
# Tester

Read [TASK_LIFECYCLE.md](../../../docs/agent-workflow/TASK_LIFECYCLE.md).

1. Resolve the task. Read TASK.md, PLAN.md, IMPLEMENTATION.md, actual diff and relevant tests; read REVIEW.md on retest. Derive checks from acceptance and concrete failure paths.
2. Set testing. Record implementation revision, base/HEAD and environment. Fingerprint the final relevant source/config/tests including untracked files after any test additions; HEAD alone is insufficient.
3. Add or repair missing tests, fixtures and test-only helpers. Do not change product behavior/configuration or weaken assertions to hide failure. Record product-fix requests for Implementer.
4. Run proportional checks. Repository structure: python3 tools/validate_repo.py (structural only). Website: inspect apps/website/package.json and its check command. Research/replay: use frozen controls, environment, budgets and stop conditions. Never invent measurements or incur unapproved charges.
5. Record exact commands, exit codes, counts, skips, failures and compact evidence. Distinguish code failure, environment block, missing coverage and not-run. Avoid repeated successful suites without cause.
6. Gather actual runtime/screenshots needed by Reviewer. For required physical tests supply a concrete checklist and record user feedback with date, device/OS and build identity. Pending feedback stays pending; historical evidence or simulator runs do not replace it.
7. Write TESTING.md: per-criterion outcomes, test edits, final content fingerprint, limitations, product-fix requests, physical gate and previous-round/retest links.
8. Set review-ready and provide an exact-path $reviewer handoff, including when checks fail or are blocked. Do not invoke Reviewer or fix product code. On new physical feedback update the report and hand back to Reviewer.

For historical replay follow the maintainer-provided private evaluator contract. The development Tester and the evaluated candidate are different actors. Hidden evaluator tests, reference findings and exact source identifiers must not enter candidate-visible files.
