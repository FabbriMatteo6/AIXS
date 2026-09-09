# AIXS Vision

> **Artificial Intelligence, Accessible.**
>
> Frontier-class open-weight AI should become practically usable on affordable local hardware.

## Why AIXS exists

AI capability is advancing faster than affordable local inference. Large open-weight models may be downloadable, but useful local operation is still constrained by memory capacity, bandwidth, compute, topology, software efficiency, context cost and total system price.

AIXS exists to investigate that gap as an **open, reproducible systems-research problem**.

The project is not trying to prove that one predetermined CPU, GPU, memory technology, runtime or optimization is the answer. It aims to discover, through measurement, which combination of model representation, software and hardware delivers the strongest useful capability per euro.

## North Star

AIXS aims to make frontier-class open-weight AI genuinely usable by people who cannot justify datacenter-class hardware.

The current provisional Breakthrough Challenge is:

> **Achieve ≥30 raw target-model decode tokens/second after genuinely occupying ≥128K context on a complete, reproducibly purchasable local system costing ≤€2,000, while passing a frozen source-lineage capability gate.**

This is a research target, not a promise and not a claim that the current state of the art already satisfies it.

The target may be revised only through an explicit recorded decision backed by evidence.

## What success means

AIXS succeeds if it produces **reproducible knowledge and working methods that materially move the local frontier**, even before the full Breakthrough Challenge is reached.

Success includes:

1. identifying the strongest frontier-class source model for the local-inference opportunity;
2. establishing the real per-token work and memory/compute envelope of that model;
3. measuring where token latency is actually spent rather than inferring bottlenecks from specification sheets;
4. demonstrating interventions that materially improve capability-per-euro or falsifying them cleanly;
5. publishing complete-system economics and reproducible experiment records;
6. enabling independent reproduction on other machines;
7. eventually demonstrating a complete affordable local system that crosses the frozen Breakthrough envelope.

Upstream adoption of an AIXS result is success. AIXS does not need to own a permanent runtime fork to be valuable.

## The scientific object AIXS is building

The durable product of AIXS is not a particular machine. It is an **evidence-backed local-inference envelope** connecting:

```text
source capability
      │
      ↓
model / representation
      │
      ↓
active work per token
      │
      ↓
CPU + GPU + memory + I/O ceilings
      │
      ↓
measured critical path
      │
      ↓
intervention
      │
      ↓
capability × latency × context × power × €
```

This lets hardware and software choices follow measured requirements instead of defining the project in advance.

## Current model-selection hypothesis

Mission 01 currently compares a small model set rather than building a benchmark zoo:

- **DeepSeek-V4-Flash-0731** — reproduction anchor;
- **Qwen3.8-Flash-Next** — target challenger;
- **GLM-5.3-Flash** — later portability/reference model;
- **Kimi K3** — stress / negative-control model.

This ordering is provisional. The primary source lineage is frozen only after the model/artifact challenge and capability gate.

The important comparison is not total checkpoint size alone. AIXS cares about **retained capability, active work per token, long-context behavior, representation size, runtime maturity and complete-system feasibility**.

## Architecture position

AIXS is deliberately architecture-agnostic until evidence earns a choice.

Potential architectures include, but are not limited to:

- unified-memory systems;
- high-channel CPU memory with CPU expert execution;
- CPU/GPU heterogeneous inference;
- tiered hot/cold memory;
- one- or multi-socket NUMA systems;
- multiple accelerators;
- architecture-preserving quantization and representation changes;
- eventually distributed systems or structural model transformation if measurements justify them.

None of these is the AIXS thesis by itself.

The normal decision loop is:

```text
freeze workload
      ↓
measure active work
      ↓
measure subsystem ceilings
      ↓
measure actual critical path
      ↓
identify largest exploitable gap
      ↓
apply one evidence-earned intervention
      ↓
re-measure quality + latency + cost
```

## Hardware position

AIXS is interested in depreciated, unusual and secondary-market hardware, but **hardware arbitrage is a supporting procurement function, not the research thesis**.

The hardware scanner should answer:

> Given a measured requirement, what reproducibly obtainable hardware satisfies it at the lowest complete-system cost and acceptable engineering friction?

It should not answer:

> What cheap hardware looks interesting, and how can we reshape the project around it?

Borrowed, rented or partner hardware is preferred before major purchases when it can resolve the same uncertainty.

## Core research principles

### 1. Measurement before architecture

Do not select NUMA, caching, a GPU family, a memory technology or model surgery because it sounds promising. Measure the bottleneck first.

### 2. Real workload before headline specifications

A configured 128K context is not an occupied 128K context. Peak DRAM bandwidth is not achieved expert throughput. GPU FLOPS are not end-to-end token latency.

### 3. Capability is part of performance

AIXS does not win by making a model fast but materially worse. Representation changes must pass a frozen capability gate against the source lineage.

### 4. Raw and speculative throughput are different metrics

Always separate raw target-model decode from emitted throughput produced by MTP/speculation.

### 5. Complete-system economics

A €300 accelerator is not a €300 inference system. Cost claims include the compatible CPU, motherboard, RAM, accelerator, storage, power delivery, cooling and other required components at dated replacement prices.

### 6. Upstream first

Reuse, pin, reproduce and instrument strong existing projects before creating AIXS-specific runtime code.

### 7. One earned intervention

After baseline measurement, attack the largest exploitable bottleneck. Avoid opening multiple attractive but unearned optimization tracks.

### 8. Negative results count

A reproducible result that kills an architecture or optimization is useful progress and must remain visible.

### 9. Reproducibility before rhetoric

Every important claim should include enough model, runtime, workload, hardware and measurement provenance for another contributor to challenge it.

### 10. Architecture can change; methodology should survive

Models, runtimes and used-hardware prices move quickly. AIXS should be designed so that a new model or upstream optimization can be inserted into the same evidence process without resetting the project.

## What AIXS is not

AIXS is not:

- a cheap-GPU shopping project;
- a checkpoint-size competition;
- a promise that a 500+ GB model must be the winning target;
- a predetermined DDR/NUMA architecture;
- a predetermined GPU expert-cache project;
- a permanent llama.cpp or KTransformers fork;
- a benchmark leaderboard without quality and methodology;
- an excuse to buy exotic hardware before an experiment requires it;
- five independent research teams running in parallel.

## Operating model

AIXS organizes work at three levels:

1. **Missions** — define the current decision boundary and success criteria.
2. **Research domains** — preserve reusable knowledge, hypotheses and tools.
3. **Experiments** — produce the evidence that changes decisions.

The project should maintain one active mission objective and no more than two engineering tracks in parallel after baseline work.

## Current Mission

**Mission 01 — Establish the Measured Frontier**

Mission 01 must determine:

1. which current frontier-class open-weight sparse model offers the strongest capability × local-feasibility opportunity;
2. what its real active-work and memory/compute envelope is;
3. which subsystem dominates its occupied-context critical path;
4. what architecture intervention is actually earned by those measurements;
5. how close a reproducible affordable system can move toward the Breakthrough Challenge.

See [`missions/mission-01/README.md`](missions/mission-01/README.md).

## Long-term direction

If Mission 01 establishes a credible path, AIXS should progressively move from **measurement → bottleneck removal → architecture selection → integration → external reproduction → affordable demonstrator**.

The long-term ambition is not merely to assemble one clever machine. It is to make the techniques and evidence reusable enough that future frontier open models can be evaluated and made locally accessible faster.

---

**Guiding question:**

> *What is the minimum-cost local system architecture that can preserve frontier-class capability while delivering genuinely interactive long-context inference — and what measured bottleneck must be removed next to get there?*
