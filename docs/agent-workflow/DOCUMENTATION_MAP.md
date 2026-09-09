# Documentation map

Inspect targets only when their trigger applies. Record changed, unchanged or deferred with a reason. Preserve historical evidence; do not reread every target for every task.

| Path | Owns | Update trigger |
| --- | --- | --- |
| Vision.md | Intent and constraints | Accepted goal/resource changes |
| Project_milestones.md | Execution and gates | Scope, sequence or acceptance changes |
| PROGRESS.md | Current outcome and next action | Each coherent stage |
| README.md | Public entry point | Setup, capability or navigation changes |
| docs/architecture.md | Placement and responsibility rules | Architecture changes |
| docs/01 AUDIT/AS_IS.md | Verified current structure and gaps | Relevant implementation or audit changes |
| README_AGENTS.md | Role prompts | Invocation/responsibility changes |
| docs/agent-workflow/TASK_LIFECYCLE.md | States, evidence and gates | Process changes |
| missions/mission-01/README.md, decisions.md | Mission decisions | Accepted mission change |
| missions/mission-01/baseline-protocol.md | Baseline method | Protocol changes |
| missions/mission-01/model-selection.md, hardware-selection.md | Selection evidence | Verified selection changes |
| docs/methodology.md, quality-protocol.md, envelope.md | Measurement contracts | Accepted methodology changes |
| docs/inherited-results.md | Inherited evidence | Verification or reclassification |
| benchmarks/workloads/ | Public workload definitions | Public workload or evaluation-method changes; exact replay/evaluator manifests stay outside the candidate repository |
| experiments/mission-01/<experiment>/ | Measurements | A real run yields evidence |
| research/<domain>/README.md | Reusable findings | A finding generalizes beyond one experiment |
| registry/hardware/profiles/<profile>.yaml | Actual machine identity | Inventory/configuration changes |
| tools/README.md | Shared commands | Tool usage changes |
| apps/website/README.md | Website operation | Website setup/build changes |

Comma-separated filenames share the directory of the first path. Angle-bracket paths are routing patterns, not files to create automatically. Adapters/patches gain documentation when real implementations exist. Vision.md and Project_milestones.md govern older mission documents until M0 reconciliation.
