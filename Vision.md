# AIXS Vision

> Artificial Intelligence, Accessible.

AIXS investigates how to make frontier-class open-weight coding agents practically usable on affordable local hardware. Its durable output is reproducible evidence, useful upstream improvements and complete-system economics.

## Intended outcome

Serve a capable model through a local API so an agent can inspect a repository, implement a change, run tests, repair failures and deliver a working result. Evaluate it against real historical project tasks, starting from an earlier checkpoint and judging behavior against the successful outcome. Different correct implementations are acceptable.

The first operating assumption is one active coding-agent task. Long context is necessary to investigate, but allocated context and fluent chat do not establish coding-agent usefulness. Measure task success, completion time, tool reliability, prefill, prefix reuse and memory alongside decode speed.

## North Star and purchase boundary

The public Breakthrough Challenge remains:

> Achieve ≥30 raw target-model decode tokens/second after ingesting and retaining at least 131,072 input tokens at decode start, on a complete reproducibly purchasable local system costing ≤€2,000, while passing a frozen coding-capability gate.

This is a research target, not a demonstrated capability or a purchase promise. Reserve output headroom beyond occupied input. Record native attention compression separately from runtime truncation or history eviction.

Candidate procurement has two acceptable cases, subject to measured coding quality and useful agent latency:

- ≥25 raw tok/s at occupied 128K within €2,000 delivered.
- ≥30 raw tok/s at occupied 128K within €2,500 delivered.

Other cost/performance combinations require a concrete decision; do not automatically combine both relaxed limits. Approximately 10 tok/s at full context or a required €3,000+ machine means preserve the budget. A near-target purchase does not pass the public challenge.

Quantization is permitted when it passes a rigorous comparison against the frozen source checkpoint. Source precision, converted representation, KV precision and speculative settings must be recorded separately. Structural changes such as deleting experts or changing routing are a separate, evidence-earned track.

## Public evaluation starting point

- Begin with an available consumer-class development machine and a resident-model baseline.
- Use bounded remote-compute experiments to investigate architectures the development machine cannot represent.
- Record hardware, operating conditions, access costs and contributor constraints with each experiment rather than treating them as universal project facts.
- Keep model weights, private task data and evaluator controls outside Git.

Begin with the Mac evaluator and a resident-model baseline. Mac results validate the workflow and specific mechanisms, not full DeepSeek feasibility or x86 performance. Use bounded rentals to investigate other architectures. Do not buy an inadequate machine solely to keep research moving.

## Target models

| Role | Artifact | Rule |
| --- | --- | --- |
| Intended DeepSeek target | deepseek-ai/DeepSeek-V4-Flash-Vision-Exp | Verify backend and vision support separately |
| Immediate challenger | Qwen/Qwen3.8-Flash-Next | Account for lookup tables, vision, draft weights and context state |
| DeepSeek reference/control | deepseek-ai/DeepSeek-V4-Flash-0731 | Text-runtime control; cannot substitute silently for Vision-Exp |
| Mac development surrogate | One already downloaded Qwen artifact | Inventory exact ID/quantization/revision; no frontier-quality claim by association |

Official identities and limitations are documented in the [adversarial review](docs/adversarial-review-2026-09-09.md). The requested name DeepSeek-V4-Flash-Vision-0731 is not the official ID verified in that review. Pin revisions before experiments; new releases enter the watchlist rather than resetting the mission automatically. Visual capability remains unvalidated until representative image tasks are selected.

## Research flow

```text
checkpoint task + frozen evaluator
                ↓
Mac end-to-end baseline + artifact/access accounting
                ↓
target quality and occupied-context measurements
                ↓
measured bottleneck + achievable end-to-end gain
                ↓
one intervention → repeat quality and performance
                ↓
buy / rent / preserve budget → publish evidence
```

Measure a running baseline before building elaborate subsystem harnesses. Use analytical bounds and small probes to reject unaffordable or unsupported configurations early. Missing access is an explicit outcome, not a reason to invent measurements.

## Principles

1. **Coding capability is part of performance.** Separate same-representation correctness from source-checkpoint quality. Small smoke suites cannot prove non-inferiority.
2. **Raw and emitted throughput differ.** Use non-speculative decode for the challenge; evaluate speculation separately for practical agent use.
3. **Actual context matters.** Record ingested, retained, reused and generated tokens, output reserve, truncation, native compression and cache policy.
4. **Measure the critical path.** Distinguish CPU expert time, GPU serial work, synchronization, overlap, prefill and tool execution. Peak bandwidth is not achieved expert throughput.
5. **One machine has limits.** Prefer useful expansion and supported software; rent topology classes it cannot represent. No architecture is predetermined.
6. **Complete-system economics.** Include all required components, taxes and delivery. Record replacement cost separately from cash paid.
7. **Upstream first.** Reuse and instrument existing runtimes; upstream adoption is success. Avoid a permanent fork without demonstrated need.
8. **Reuse evidence selectively.** Preserve useful Mac findings and negative results without importing a large process framework or assuming cross-model transfer.
9. **Bound the work.** One implementation task at a time, lightweight procurement research alongside it, four-week baseline freeze and a 30-minute weekly decision review.
10. **Negative and inconclusive results count.** A justified no-purchase decision protects the project. Reopen failed approaches only when a relevant condition changes.

## Scope and governance

Mission 01 establishes a measured coding-agent frontier with existing resources and decides whether one affordable machine is justified. It is not a GPU shopping exercise, a universal operating system, a distributed-serving platform or a benchmark leaderboard without quality controls.

Keep the existing structure: missions own decisions, research domains preserve knowledge, experiments record evidence. Keep weights and private task data outside Git.

Follow [Project_milestones.md](Project_milestones.md) for execution and [PROGRESS.md](PROGRESS.md) for current state. The [review](docs/adversarial-review-2026-09-09.md) records sources, unresolved claims and later structural changes. Revised top-level documents govern over conflicting older mission plans until M0 reconciliation; historical decisions and measurements remain preserved.

## Success before breakthrough

Progress means a working task evaluator, a reliable Mac baseline, a verified target artifact, an affordable experiment, a measured bottleneck, a successful intervention or a defensible rejection. The final ambition is a capable local coding API with reproducible economics; the immediate commitment is evidence every week rather than repeated roadmap redesign.
