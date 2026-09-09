# AIXS agent workflow

Use one explicit role per session. You control every handoff.

| Role        | Owns                                                                | Report            |
| ----------- | ------------------------------------------------------------------- | ----------------- |
| Planner     | Scope, questions, acceptance and implementation plan                | TASK.md, PLAN.md  |
| Implementer | Code, regression tests, inexpensive quick checks                    | IMPLEMENTATION.md |
| Tester      | Missing tests, full validation, runtime evidence, physical feedback | TESTING.md        |
| Reviewer    | Code inspection and test-evidence assessment; no test execution     | REVIEW.md         |
| Closeout    | Eligibility, affected documentation and archival                    | CLOSEOUT.md       |

Planner → Implementer → Tester → Reviewer → Closeout.
Required fixes return to Implementer → Tester → Reviewer. Missing evidence returns to Tester. Required physical testing waits for your feedback.

## Separate-session prompts

- `$planner Start a new task: <outcome>. Inspect current AIXS direction and audit, ask questions until clarified all the material decisions needed for the objective, and create a lean plan.`
- `$implementer Resolve docs/agent-workflow/ACTIVE_TASK.md. Implement the plan, add regression tests, run quick checks, and write IMPLEMENTATION.md for Tester.`
- `$tester Resolve docs/agent-workflow/ACTIVE_TASK.md. Add missing tests, run proportional validation, record TESTING.md and required physical checks, then hand off to Reviewer.`
- `$reviewer Resolve docs/agent-workflow/ACTIVE_TASK.md. Inspect code and TESTING.md without running tests or fixing code, and write REVIEW.md.`
- `$implementer Resolve the current task and implement required REVIEW.md findings. Increment the implementation revision and hand back to Tester.`
- `$closeout Resolve the current task. Check test/review evidence and physical feedback, update affected documentation, archive and clear the pointer.`

Each role's final handoff should use the exact task folder. Explicitly ask Planner to pause before switching unfinished tasks; resume with an exact paused path.

## Maintained references

[Lifecycle](docs/agent-workflow/TASK_LIFECYCLE.md) owns states and evidence rules. [Documentation map](docs/agent-workflow/DOCUMENTATION_MAP.md) routes closeout updates. [Audit](<docs/01%20AUDIT/AS_IS.md>) records current boundaries. [Workload guidance](benchmarks/workloads/README.md) describes the public boundary for task definitions.

Role skills live in `.agents/skills` with explicit invocation. Optional browser/discovery skills are local-only and are not mandatory workflow stages. Exact replay manifests, source identifiers, historical solutions and held-out evaluator evidence stay outside the public candidate repository. No fixed model pairing, automatic orchestration or obligatory UI mockup generation.
