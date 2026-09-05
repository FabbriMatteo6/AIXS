# Repository architecture

AIXS is a research monorepo organized around three distinct concepts.

## 1. Missions — execution

A mission is a finite objective with exit criteria. It owns baseline decisions and coordinates work that spans several pillars.

## 2. Research pillars — knowledge and implementation ownership

`research/model`, `research/harness`, `research/software`, `research/os`, and `research/hardware` are long-lived domains. Early code lives next to the research question that owns it.

## 3. Experiments — evidence

`experiments/` is the durable record of what was actually tested. Experiments reference hardware profiles, exact upstream revisions, workloads, code and external artifacts rather than duplicating them.

## Shared infrastructure

- `registry/hardware/` describes heterogeneous machines;
- `benchmarks/` contains reusable workload/quality definitions;
- `adapters/` integrates upstream projects without vendoring them;
- `patches/` stores focused changes against pinned upstream revisions;
- `tools/` contains shared repository/research tooling;
- `apps/website/` contains the public site and is intentionally isolated from research code.

## Design rules

1. Prefer links and stable identifiers over duplicated facts.
2. Preserve historical experiment records; evolve schemas with versions.
3. Keep large artifacts external while committing reproducibility metadata.
4. Do not force one programming language across unrelated system layers.
5. Avoid large vendored dependencies unless there is a documented reason.
6. Treat negative and inconclusive results as useful evidence.
7. Keep process lean: add structure when it prevents ambiguity or wasted work, not for ceremony.
