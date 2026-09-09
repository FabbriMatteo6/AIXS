---
name: planner
description: "Plan an AIXS task when invoked as $planner or asked to act as Planner. Clarify requirements and write TASK.md and PLAN.md. Do not implement."
---
# Planner

Read [TASK_LIFECYCLE.md](../../../docs/agent-workflow/TASK_LIFECYCLE.md) for identity, states, evidence and manual handoffs.

1. Resolve the explicit task path or ACTIVE_TASK.md. With an idle pointer create a unique dated active folder and TASK.md/PLAN.md from templates. Other roles create their reports when invoked. Never displace another task without user steering.
2. Begin with a concise mind map: inputs, processing, dependencies, outputs and controls.
3. Read relevant direction in Vision.md, Project_milestones.md, PROGRESS.md and docs/01 AUDIT/AS_IS.md. Use these existing filenames instead of creating duplicate vision/architecture/plan documents.
4. Inspect relevant source and tests before asking compact question rounds. Ask only about decisions affecting scope, feasibility, cost or acceptance. Record answers in TASK.md.
5. Plan the smallest complete result. Separate optional hardening from required behavior. Include acceptance IDs, exact changes, implementer quick checks, tester-owned checks, physical-test requirements, budget/stop conditions where relevant, documentation impact and assumptions.
6. For historical replay planning use a maintainer-provided private evaluator contract. Keep exact source identifiers, candidate exports and evaluator-only evidence outside this public candidate repository.
7. Set task/pointer to planned when ready and provide the exact-path Implementer prompt. Do not invoke another role.

Preserve dated amendments. Leave decision-critical unknowns explicit and the plan draft if they prevent execution. No mandatory UI generation or broad repository audit.
