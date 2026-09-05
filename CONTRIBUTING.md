# Contributing to AIXS

AIXS is an open research initiative. The goal of this contribution process is to make people **productive quickly without sacrificing reproducibility**.

You do not need to be an expert. A careful reproduction, a documented negative result, a useful hardware profile, or a good review can be a high-value contribution.

## Where work belongs

- **Missions** — current execution goals: [`missions/`](missions/)
- **Model** — architecture, quantization, sparsity, expert transformations: [`research/model/`](research/model/)
- **Harness / Orchestration** — routing, cache, context, batching, speculation, scheduling: [`research/harness/`](research/harness/)
- **Software / Runtime** — kernels, formats, paging, prefetch, distributed execution: [`research/software/`](research/software/)
- **OS / System Layer** — memory, I/O, scheduling, power, topology: [`research/os/`](research/os/)
- **Hardware** — accelerators, memory systems, heterogeneous machines: [`research/hardware/`](research/hardware/)
- **Experiments** — reproducible evidence: [`experiments/`](experiments/)

Early implementation code should live directly under the relevant research pillar. Mature shared utilities can later move into `tools/` or another dedicated package.

## The lean workflow

1. **Discuss or open an issue** if the hypothesis affects several people or pillars.
2. **Define the experiment** before optimizing the result.
3. **Register the hardware** if the machine is not already in `registry/hardware/profiles/`.
4. **Pin upstream work** by repository URL and exact commit/revision.
5. **Run and record** the experiment using the current schema.
6. **Open a focused PR** containing code/configs/results and the interpretation.
7. **Invite reproducibility review**, not just code review.

Small fixes do not need ceremony. If the change is obvious and self-contained, open the PR.

## Research standard

For experiments, record as much of the following as is relevant and measurable:

1. hardware profile and OS;
2. exact model, weights/revision and quantization;
3. runtime/upstream repository and exact commit;
4. prompt/workload/context settings;
5. quality/correctness checks;
6. time-to-first-token and generation throughput;
7. RAM/VRAM/storage footprint and I/O;
8. energy/power where feasible;
9. before/after measurements and uncertainty;
10. failures, caveats and unexpected behavior.

Do not replace a practical measurement with a confident estimate.

## Experiment states

- `planned` — method is defined; run has not started.
- `running` — data is being collected or reproduced.
- `completed` — the planned experiment finished and evidence is recorded.
- `failed` — the tested approach did not work as intended. This is a valid negative result.
- `inconclusive` — evidence is insufficient or contradictory.
- `superseded` — a newer experiment replaces it; the historical record stays.

The schema is versioned. Do not silently rewrite old experiments to match a new schema version.

## Upstream projects

AIXS should avoid vendoring large upstream repositories by default.

Prefer:

- adapters in `adapters/`;
- focused patches in `patches/<project>/`;
- exact upstream URLs and commit SHAs in experiment metadata;
- PR review before adopting or maintaining significant upstream modifications.

Submodules and large vendored trees should require an explicit repository-level decision.

## Data and large artifacts

Commit small machine-readable results, configs and summaries. Do **not** commit model weights, large datasets, giant traces, checkpoints or raw logs.

For external artifacts, record the URL/location, content hash when practical, generation method, and enough metadata to reproduce or verify them.

## Pull requests

A good PR answers four questions:

- What changed?
- Why?
- What evidence supports it?
- How can someone else reproduce or review it?

Keep PRs focused. Separating a hypothesis, implementation and unrelated cleanup usually makes all three easier to review.

## Language and tooling

AIXS is intentionally language-agnostic. Use the language or system layer that best fits the problem. Do not introduce a toolchain merely for stylistic consistency.

If a contribution introduces a new language/build system, document the minimal setup and why it is appropriate.

## Community behavior

Be rigorous with claims and generous with people. Challenge evidence, methodology and assumptions without attacking contributors.

See [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).
