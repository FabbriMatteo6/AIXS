# Mission 01 — Establish the Measured Frontier

## Objective

Determine which current frontier-class open-weight sparse model offers the strongest **capability × local feasibility** opportunity, then establish the lowest reproducible complete-system cost that makes it genuinely interactive locally.

Mission 01 does **not** assume the winning model, runtime, CPU/GPU topology, memory technology or optimization technique in advance.

The provisional Breakthrough Challenge is:

> **≥30 raw target-model decode tok/s after genuinely occupying ≥128K context on a complete, reproducibly purchasable ≤€2,000 local system, while passing a frozen source-lineage capability gate.**

This is a research objective, not a promise.

## Immediate model-selection challenge

- **DeepSeek-V4-Flash-0731** — reproduction anchor: strong current systems evidence and mature hybrid inference paths.
- **Qwen3.8-Flash-Next** — target challenger: much smaller active expert working set and promising local results, but newer runtime/model maturity and different license.
- **GLM-5.3-Flash** — later portability/reference model.
- **Kimi K3** — stress / negative control.

The final primary model is frozen only after the selection experiment and capability gate.

## Research loop

```text
model / representation
        ↓
exact active work + traffic
        ↓
subsystem ceilings
        ↓
measured end-to-end critical path
        ↓
largest exploitable gap
        ↓
one intervention
        ↓
re-measure capability + latency + cost
```

## First experiments

Mission 01 begins with three evidence-building experiments before opening broader optimization tracks:

1. **Model/artifact challenge** — V4-Flash versus Qwen3.8-Flash-Next: exact artifact/tensor accounting, active-working-set traces, capability screening and reproducible cost/capacity envelope.
2. **CPU expert roofline** — replay the target expert workload on accessible high-channel CPU systems; measure logical payload throughput, physical memory traffic, instruction/kernel limits and 1P/2P scaling where access permits.
3. **Occupied-context end-to-end reproduction** — run actual 4K, 32K and ≥128K ingested contexts and decompose raw decode, prefill, TTFT, CPU expert, GPU serial, synchronization, memory and PCIe behavior.

Only after those results should the mission open one additional optimization path such as representation tuning, a targeted kernel/platform change, cache, prefill/prefix work or another socket.

## Measurement rules

A long-context claim must distinguish:

- configured/allocated context capacity;
- prompt tokens actually ingested;
- tokens retained at decode start;
- prefix tokens reused;
- tokens generated during measurement.

A performance claim must distinguish:

- cold prefill;
- cold TTFT;
- warm/prefix-reuse TTFT;
- **raw target-model decode tok/s**;
- speculative/MTP **emitted tok/s**.

Where relevant, experiments should also report:

- logical expert bytes/token;
- physical DRAM traffic and matched reference bandwidth;
- CPU expert time/token;
- GPU serial and total time/token;
- synchronization and overlap;
- PCIe/storage traffic;
- RAM/VRAM peak footprint;
- power/energy;
- dated complete-system replacement cost.

See [`../../docs/envelope.md`](../../docs/envelope.md).

## Operating constraints

- One active mission objective.
- Maximum **two engineering tracks** in parallel after the baseline experiments.
- Reuse and instrument upstream projects before creating AIXS-specific runtime code.
- A negative or falsifying result is a valid mission result.
- Do not purchase exotic hardware before an experiment shows why it is required.
- Quantization/representation changes that preserve the model graph may be tested with quality gates; structural model changes are a separate, evidence-triggered track.

## Exit criteria

- [ ] Primary source-model lineage and representation selected with alternatives documented.
- [ ] Fast and release quality/capability gates frozen.
- [ ] Baseline protocol frozen for occupied-context comparisons.
- [ ] Exact active-work / tensor / memory envelope documented for the primary model.
- [ ] CPU expert roofline measured on at least one relevant CPU topology.
- [ ] At least one complete occupied-context end-to-end experiment published.
- [ ] Complete-system cost methodology and at least one reproducible replacement-cost basket published.
- [ ] At least one independent or cross-machine reproduction attempted.
- [ ] One evidence-earned intervention tested with before/after evidence, or a conclusive negative result published.
- [ ] Mission report states explicitly whether the current path is below, near or beyond the frozen Breakthrough envelope.

## Documents

- [`model-selection.md`](model-selection.md)
- [`hardware-selection.md`](hardware-selection.md)
- [`baseline-protocol.md`](baseline-protocol.md)
- [`decisions.md`](decisions.md)
- [`../../docs/envelope.md`](../../docs/envelope.md)
- [`../../docs/quality-protocol.md`](../../docs/quality-protocol.md)
- [`../../docs/inherited-results.md`](../../docs/inherited-results.md)
- [`../../docs/upstream-projects.md`](../../docs/upstream-projects.md)

## Experiments

Mission experiments live in [`../../experiments/mission-01/`](../../experiments/mission-01/). Use IDs `M01-E###`.
