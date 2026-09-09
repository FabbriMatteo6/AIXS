# AIXS task lifecycle

## Manual handoffs

The user invokes each role in a separate session for context and usage control. Do not automatically invoke the next role or spawn role agents. End each phase with an exact-path prompt.

```text
Planner → Implementer → Tester → Reviewer → Closeout
               ↑                    │
               └── required fixes ──┘
Tester ← missing/stale evidence ─ Reviewer
Tester + user physical feedback → Reviewer → Closeout
```

## Identity

Resolve an explicit task path first, otherwise ACTIVE_TASK.md. Verify Task IDs across artifacts. Never choose by recency, filename scans or remembered plans. Completed/paused records are historical evidence only and need an explicit reference.

With an idle pointer, Planner creates a unique YYYY-MM-DD-slug folder under tasks/active plus TASK.md and PLAN.md. Each later role creates its own report from templates. Do not displace an active task without user steering. Pause by updating TASK.md and moving the folder to tasks/paused; resume by exact path. A broken pointer requires a documented repair, not guessing a replacement.

## States

Pointer status is active or idle; stage is below or none when idle.

| Pointer stage | TASK status | Next user-invoked role |
| --- | --- | --- |
| discovery | discovery | Planner |
| planned | planned | Implementer |
| implementation | implementing | Implementer |
| test-ready | test-ready | Tester |
| testing | testing | Tester |
| review-ready | review-ready | Reviewer |
| review | reviewing | Reviewer |
| awaiting-physical-tests | awaiting-physical-tests | Tester after user feedback |
| closeout-ready | closeout-ready | Closeout |

Partial/blocked reports explain the blocker and retain the current phase. Tester hands findings to Reviewer even when checks fail; Reviewer assesses code and evidence and routes required product fixes to implementation, missing automated evidence to test-ready, and physical feedback to awaiting-physical-tests. All fixes pass through Tester and Reviewer again.

## Evidence freshness

IMPLEMENTATION.md records a numbered revision, Git base/HEAD and changed-file inventory including untracked files. TESTING.md identifies the revision and final relevant source/config/test contents after any Tester edits using a sorted path + SHA-256 manifest or equivalent reproducible fingerprint. Never copy secrets into reports.

REVIEW.md references that tested snapshot. HEAD alone cannot identify a dirty tree. Behavior-affecting edits invalidate affected evidence; Tester selects appropriate reruns and Reviewer reassesses. Documentation-only changes may be explained without repeating product tests. Preserve prior round summaries and finding IDs.

Passed, failed, blocked, skipped and not-run are distinct. Research outcome (including negative/inconclusive findings) is separate from successful completion of the measurement task.

## Physical gate

Planner marks physical testing required or not-required with a reason. Tester provides the checklist and records dated user feedback tied to device/OS/build. Reviewer assesses it. Required feedback pending blocks normal closeout; simulator results and historical reports cannot substitute. Relevant later fixes require fresh affected checks.

## Closeout

Require implemented work, current sufficient test evidence, review approval, resolved required findings and satisfied physical gates. Apply DOCUMENTATION_MAP.md, preserve reports, archive the whole folder, update lifecycle paths and reset only the matching pointer. Do not activate a successor.

User steering may change scope or explicitly accept a named limitation, but no role may invent a waiver or report an unperformed check as successful.
