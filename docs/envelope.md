# The AIXS Envelope

The AIXS Envelope is the project's durable research artifact for comparing frontier-class local inference across models, representations, runtimes and hardware.

It asks two questions:

1. **What work is actually required per useful output token?**
2. **Which subsystem prevents the current system from reaching the next performance/cost boundary?**

## Breakthrough challenge

The provisional AIXS Breakthrough Challenge is:

> **≥30 raw target-model decode tok/s after genuinely occupying ≥128K context on a complete, reproducibly purchasable ≤€2,000 local system, while passing a frozen source-lineage capability gate.**

This is a research objective, not a claim that such a system already exists.

## Core dimensions

### Capability

- source-model lineage and revision;
- representation / quantization;
- implementation correctness;
- capability gate result.

### Context and usability

- configured context capacity;
- tokens ingested;
- tokens retained at decode start;
- prefix tokens reused;
- cold prefill tok/s;
- cold TTFT;
- warm/prefix-reuse TTFT;
- raw target-model decode tok/s;
- emitted/speculative tok/s.

### Active work and traffic

Where measurable or derivable:

- logical expert payload bytes/token;
- shared/dense bytes/token;
- physical DRAM bytes/token;
- remote-NUMA/inter-socket traffic;
- PCIe H2D/D2H bytes/token;
- storage/network bytes/token;
- routing entropy / expert locality.

### Critical path

- CPU expert ms/token;
- GPU serial ms/token;
- GPU total ms/token;
- synchronization / arrival-skew ms/token;
- useful CPU/GPU overlap ms/token;
- other material serial work.

### Hardware ceiling

- matched expert/read reference bandwidth;
- STREAM/reference machine bandwidth;
- CPU instruction/kernel throughput where relevant;
- GPU memory/compute characteristics;
- RAM/VRAM capacity;
- topology and memory-channel population.

### Economics / practicality

- complete replacement-cost BOM;
- price date, region and condition;
- wall power and energy/token;
- chassis/cooling/noise where practical.

## Interpretation

AIXS does not assume that memory bandwidth is always the bottleneck.

A CPU expert path may be limited by:

- DRAM bandwidth;
- FP4/INT4 unpack or dequantization instructions;
- arithmetic throughput;
- cache/coherence behavior;
- thread placement;
- NUMA/interconnect traffic;
- synchronization.

Similarly, a high-bandwidth GPU does not make host DRAM a high-bandwidth pool if work crosses a slower PCIe or dependency boundary.

The project therefore compares **measured subsystem time and traffic** rather than adding headline GB/s across hardware that cannot be used concurrently.

## Current Mission 01 hypotheses

### H1 — model choice materially changes the hardware frontier

DeepSeek-V4-Flash-0731 is the current reproduction anchor. Qwen3.8-Flash-Next is the immediate challenger because its active routed working set appears materially smaller.

### H2 — CPU expert kernels can leave large hardware headroom unused

Recent upstream/community work suggests MXFP4 expert kernels can move from instruction-bound to memory-bound after targeted optimization. Mission 01 must measure the actual roofline on accessible CPU platforms.

### H3 — additional sockets help only through the scalable part of token latency

1P/2P comparisons must be interpreted through the measured expert fraction and Amdahl's law, not a universal scaling threshold.

### H4 — expert caching is model/workload dependent

Routing traces must predict useful critical-path savings before VRAM is allocated to cached experts.

### H5 — model structural transformation is a fallback, not a starting assumption

Open structural changes only when architecture-preserving systems/representation work reaches a measured physical/economic limit.

## Decision loop

```text
freeze workload + capability reference
             ↓
measure active work and critical path
             ↓
classify the dominant limit
             ↓
select one intervention with enough headroom
             ↓
re-run end to end
             ↓
update the envelope and decision log
```

AIXS succeeds when the experiment changes a decision — including when it proves a proposed path cannot meet the target.
