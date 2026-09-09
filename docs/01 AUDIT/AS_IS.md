# AIXS current structure audit

Inspected 2026-09-09. Scope: repository organization, workflow instructions and existing validation. This is not an inference benchmark or a full website review.

## Current facts

- Executable application code is concentrated in apps/website (JavaScript website and build scripts).
- tools/validate_repo.py provides standard-library structural checks. CI runs it and the website npm check command.
- research's five domains currently contain README files; no research runtime implementation was found there.
- experiments/mission-01, registry/hardware/profiles, benchmarks, adapters and patches were primarily reserved/documented areas at inspection. No populated Mission 01 experiment package or hardware profile was found.
- Vision.md and Project_milestones.md already define revised direction. Older subordinate mission/public documents are awaiting the documented M0 reconciliation.
- The experiment template declares v0.2, while the validator accepts only v0.1. An empty experiment inventory allows a structural pass without exercising this mismatch.
- Imported workflow instructions contained Forza-specific audit/UI rules, duplicate test execution and a dangling Milestone 17 pointer. The setup change replaces those role rules and documents the pointer repair.

## Keep, simplify, defer

| Area | Decision | Practical reason / maintenance trigger |
| --- | --- | --- |
| missions | Keep | Owns finite research decisions; update on accepted decisions |
| research domains | Keep as lightweight knowledge folders | Do not maintain five parallel roadmaps; update when a reusable finding exists |
| experiments | Keep | Essential evidence/provenance; create only for actual planned/running experiments |
| benchmarks | Keep, add selected pilot contract | Shared task definitions are a real M0 need |
| tools | Keep | Existing validator and future genuinely shared utilities |
| apps/website | Keep isolated | Existing working application; research work should not force site rebuilds |
| adapters and patches | Dormant | Add code only for an actual upstream integration or patch; no maintenance ceremony |
| hardware registry | Keep dormant until inventory | Machine identity supports reproducibility; no hypothetical profiles |
| workflow | Simplify to five explicit roles and six small reports | One owner for validation and one shared lifecycle |
| copied .agents/skills/.system | Leave untouched, outside workflow | Duplicates installed system tooling; check consumers before any later removal |

No source folders were deleted or reorganized. There is insufficient implemented research code to justify a source-layer refactor. Removing small placeholder folders now would save little and require repairing links.

## Documentation ownership

Vision.md owns intent; Project_milestones.md owns planned work; PROGRESS.md owns current state; docs/architecture.md owns placement rules; this audit owns verified gaps. Task reports own delivery history; experiment records own measurements. Closeout updates only changed truths through DOCUMENTATION_MAP.md.

The long root AGENTS.md contains unrelated meeting-assistant examples. A project-specific routing section now clarifies actual filenames and role boundaries while preserving the user's general collaboration guidance.

## Prioritized follow-up

1. Important: fix and meaningfully exercise v0.2 validator support before the first new experiment record. A passing empty-repository check does not resolve it.
2. Important: freeze pilot inputs, environment, budgets, acceptance and historical controls before model comparison. Historical reports have outstanding physical gates.
3. Improvement: reconcile older mission/public model direction during M0 using the existing plan; this setup does not reselect models.
4. Optional: remove copied system skills only after checking use and explicit cleanup scope. Do not create a general scaffolding-management framework.

Next evidence of progress: one clean fixture and working evaluator control. This setup does not complete M0.
