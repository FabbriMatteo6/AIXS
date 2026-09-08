# Mission 01 — Decision log

Record decisions that materially affect the mission baseline or interpretation.

## Template

### YYYY-MM-DD — Decision title

**Status:** proposed | accepted | superseded

**Decision**

What was chosen.

**Evidence**

Measurements, references, experiments or constraints supporting it.

**Alternatives considered**

What else was considered and why it was not chosen.

**Revisit when**

Conditions that should trigger reconsideration.

---

## 2026-09-08 — Mission 01 establishes the measured frontier

**Status:** accepted

**Decision**

Mission 01 is reframed from selecting a baseline and immediately optimizing it to **establishing the measured frontier**: freeze a credible source-model/workload, measure exact active work and the end-to-end critical path, then open only evidence-earned engineering tracks.

**Evidence**

Several independent review cycles and current upstream results show that nominal checkpoint size, memory bandwidth and accelerator specifications alone do not identify the actual bottleneck. CPU expert kernels, representation, memory locality, GPU serial work and context occupancy can each dominate.

**Alternatives considered**

- five parallel pillar programs;
- a predetermined multi-socket/DDR strategy;
- model surgery as the initial strategy;
- building a new runtime.

**Revisit when**

If Mission 01 cannot generate decision-changing evidence with this methodology or an upstream project already provides an equivalent reproducible economic/critical-path envelope.

---

## 2026-09-08 — Remove checkpoint size from the success criterion

**Status:** accepted

**Decision**

AIXS will not use a `500+ GB checkpoint` requirement as a proxy for frontier capability.

The provisional Breakthrough Challenge is capability- and workload-based:

> ≥30 raw target-model decode tok/s after genuinely occupying ≥128K context on a complete, reproducibly purchasable ≤€2,000 local system, while passing a frozen source-lineage capability gate.

**Evidence**

Sparse MoE models can have radically different active parameters/bytes per token at similar or larger total checkpoint sizes. File size does not identify inference traffic or capability.

**Alternatives considered**

Retaining 500+ GB as a simple public success rule.

**Revisit when**

Only if a future storage/capacity-specific mission explicitly needs a checkpoint-size constraint.

---

## 2026-09-08 — Long-context claims require occupied context

**Status:** accepted

**Decision**

AIXS will distinguish configured context capacity from actual workload occupancy.

Long-context experiments record:

- capacity tokens;
- ingested tokens;
- retained tokens at decode start;
- reused prefix tokens;
- generated tokens measured.

A configured `128K` context window alone cannot support a `128K performance` claim.

**Evidence**

Current upstream/community results often quote context allocation/configuration alongside short decode measurements. Context-dependent attention/indexer work and memory behavior require actual occupancy to evaluate the target workload.

**Alternatives considered**

A single `context_tokens` field.

**Revisit when**

Never for performance claims; additional context-state fields may be added as runtimes evolve.

---

## 2026-09-08 — Raw decode and emitted throughput are separate metrics

**Status:** accepted

**Decision**

The Breakthrough Challenge uses **raw target-model decode tok/s**. Speculative/MTP emitted throughput is reported separately with acceptance statistics.

**Evidence**

Speculative decoding can materially increase useful emitted tokens without changing target-model forward throughput. Conflating them hides the physical systems result.

**Alternatives considered**

Using the highest user-visible tok/s as a single performance number.

**Revisit when**

The target may later add a separate user-experience tier, but raw and emitted rates remain separately reported.

---

## 2026-09-08 — V4 is reproduction anchor; Qwen is immediate challenger

**Status:** accepted

**Decision**

Mission 01 will not freeze a final primary model before M01-E001.

Current roles:

- **DeepSeek-V4-Flash-0731** — reproduction anchor;
- **Qwen3.8-Flash-Next** — immediate target challenger;
- **GLM-5.3-Flash** — deferred portability/reference model;
- **Kimi K3** — stress/negative control.

**Evidence**

V4 currently has unusually rich CPU/GPU optimization evidence and open runtime support. Qwen's active routed working set appears materially smaller and recent local results make it a credible capability/local-feasibility challenger.

**Alternatives considered**

- freeze V4 immediately;
- use K3 as the six-month target;
- keep a large model zoo.

**Revisit when**

M01-E001 completes or a materially newer source model dominates both capability and local-feasibility evidence.

---

## 2026-09-08 — Upstream-first and maximum two engineering tracks

**Status:** accepted

**Decision**

AIXS will reuse, instrument and contribute to existing runtimes before building a new inference runtime. After the first evidence-building experiments, Mission 01 may run no more than two active engineering tracks in parallel.

**Evidence**

The local inference ecosystem changes quickly; targeted upstream kernel/runtime changes can move performance dramatically within days. AIXS's durable value is the reproducible workload/economic/critical-path evidence, not ownership of a permanent fork.

**Alternatives considered**

- build an AIXS runtime immediately;
- staff all five research domains simultaneously.

**Revisit when**

An experiment requires a fundamentally different execution model that cannot be tested as an upstream patch/adapter, or the mission evolves beyond its current scope.

---

## 2026-09-08 — Hardware topology remains an experimental variable

**Status:** accepted

**Decision**

AIXS will not assume that 1P, 2P, multi-socket NUMA, unified memory, HBM or GPU expert caching is the target architecture.

Mission 01 first measures expert/runtime ceilings and the end-to-end scalable fraction. Additional sockets are judged with the measured Amdahl headroom and complete-system economics rather than a universal speedup threshold.

**Evidence**

Recent CPU expert work shows both instruction-bound and memory-bound regimes on similar hardware. Multi-socket scaling only matters to the part of token latency that can actually scale.

**Alternatives considered**

- multi-socket DDR as the starting architecture;
- fixed 1P-only strategy;
- fixed ≥1.6× or ≥1.25× multi-socket pass rule.

**Revisit when**

M01-E002/E003 identify a topology-specific limiting mechanism.
