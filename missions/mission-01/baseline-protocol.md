# Mission 01 — Baseline protocol

This document defines the comparison contract for the first Mission 01 series. It remains **draft** until the primary model, representation and reference hardware are frozen.

## Required identity

Every completed inference baseline must record:

- exact source model repository and revision;
- license;
- exact representation / quantization;
- conversion tool, revision and parameters where applicable;
- runtime/upstream repository and commit;
- AIXS patch/branch hash if used;
- hardware profile;
- OS/kernel, driver and accelerator/runtime versions.

## Context semantics

Never treat configured context capacity as proof of long-context performance.

Record separately:

- `capacity_tokens` — configured maximum context;
- `ingested_tokens` — prompt tokens actually processed for this run;
- `retained_tokens` — tokens present at decode start;
- `reused_tokens` — prefix/cache tokens reused rather than recomputed;
- `generated_tokens` — tokens generated during the measured decode window.

A claim such as “128K decode” requires the experiment to state the actual occupied context at decode start.

## Performance dimensions

Report separately:

- cold model/process load time where relevant;
- uncached prefill tok/s;
- cold time-to-first-token;
- warm/prefix-reuse time-to-first-token;
- **raw target-model decode tok/s**;
- speculative/MTP **emitted tok/s**;
- draft/acceptance statistics when speculation is enabled;
- concurrency/parallel slots.

## Critical-path dimensions

Where the experiment tests performance mechanisms, measure or derive the smallest useful subset of:

- logical expert payload bytes/token;
- physical DRAM bytes/token;
- achieved DRAM GB/s;
- matched read-reference bandwidth;
- CPU expert ms/token;
- GPU serial ms/token;
- GPU total ms/token;
- synchronization / arrival-skew ms/token;
- CPU/GPU overlap ms/token;
- PCIe H2D/D2H bytes/token;
- remote-NUMA/inter-socket traffic;
- routing entropy / cache hit rate where relevant;
- RAM/VRAM peak use.

STREAM may be reported as hardware context, but it must not be treated as an expert-kernel saturation test by itself.

## Quality / correctness

Every baseline must identify the applicable quality gate and reference:

- same representation + reference runtime for implementation correctness;
- frozen source lineage for representation/capability loss.

See [`../../docs/quality-protocol.md`](../../docs/quality-protocol.md).

## Economics and energy

Where a cost/performance claim is made, record:

- wall power / energy where feasible;
- research cash spent;
- reproducible replacement-cost BOM;
- BOM date, region, condition and sources.

See [`hardware-selection.md`](hardware-selection.md).

## Measurement quality

Each primary metric should state:

- unit;
- measurement method/tool;
- sample count;
- warm/cold state;
- uncertainty or observed range when practical;
- missing-value reason when not measured.

Prefer same-session paired A/B measurements for optimization experiments on drifting systems.

## Comparison rule

Change the smallest practical number of variables for causal experiments. State all deviations from the frozen baseline explicitly.

A negative result is conclusive when it rules out the tested hypothesis within the measured conditions; it does not need to improve throughput to complete the experiment.
