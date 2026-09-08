# AIXS inherited results register

AIXS should not spend contributor time rediscovering known results unless the hardware, model, representation or mechanism has materially changed.

This register records external findings that influence Mission 01. They remain external evidence until reproduced by AIXS.

## Evidence labels

- **A** — primary/established source;
- **B** — strong author/upstream result requiring independent reproduction;
- **C** — community lead;
- **X** — contradicted/superseded or measured null;
- **?** — unresolved.

## Current high-value results

### DeepSeek-V4-Flash / gamozolabs multi-socket CPU-MoE branch — B

Reported mechanisms/results include:

- large gain from a fused CPU MoE FFN path versus stock behavior on a 4-socket Cascade Lake system;
- expert-home NUMA placement reducing remote/inter-socket traffic and restoring thread scaling;
- useful thread pinning/persistent pool and THP/load lessons;
- host registration materially improving large prefill transfers;
- short `tg256` speed and configured 131072-context serving numbers that **must not be interpreted as proof of a fully occupied 128K prompt**.

Measured null/negative findings include:

- several barrier rewrites tied;
- full expert replication stopped helping beyond a point;
- SMT was negative;
- Q3_K experts were smaller but slower in that implementation;
- software prefetch was configuration-dependent/negative at the final thread count.

Re-test only when the new mechanism/platform gives a reason.

Source: https://github.com/gamozolabs/llama.cpp/blob/multisocket-cpu-moe/README.md

### KTransformers AVX2 MXFP4 optimization on Zen 2 — B

Recent upstream work reports that an earlier Zen-2 MXFP4 expert kernel was instruction/shuffle-bound despite significant unused STREAM bandwidth. A targeted AVX2 fast path reduced shuffle pressure and moved the expert path toward a memory-bound regime, with large reported end-to-end gains on dual EPYC 7452.

Mission implication:

> do not classify a CPU expert path as bandwidth-limited from STREAM alone; measure expert instruction/kernel behavior and logical/physical throughput.

Source: https://github.com/kvcache-ai/ktransformers/pull/2175

### llama.cpp persistent MoE expert cache — B

A current RFC reports substantial gains on Qwen3.8-Flash-Next for some workloads and smaller/model-dependent benefit on DeepSeek-V4-Flash.

Mission implication:

> expert caching is conditional on routing locality and VRAM opportunity cost. Trace/simulate first.

Source: https://github.com/ggml-org/llama.cpp/discussions/28248

### Qwen3.8-Flash-Next unified-memory community result — C

A recent llama.cpp community experiment reports strong local decode/prefill behavior on a 128 GB Ryzen AI Max+ 395 unified-memory machine, including real conversation replays.

Mission implication:

> Qwen is a credible target challenger, but this result does not satisfy AIXS cost/reproduction requirements and must be independently validated.

Source: https://github.com/ggml-org/llama.cpp/discussions/28512

### OSDI 2026 CPU–GPU local MoE design — A/B for paper result, not AIXS economics

Published work demonstrates that local MoE prefill and decode can benefit from distinct CPU/GPU execution strategies and reports strong DeepSeek-V3 decode/prefill results on substantially more expensive systems.

Mission implication:

> separate prefill, decode, CPU expert work and GPU critical path; do not import its economics into the ≤€2k claim.

Source: https://www.usenix.org/conference/osdi26/presentation/wang-wenxin

### WARP Kimi K3 measurements — B

WARP provides unusually detailed K3 resident/trunk/expert/cache/I/O measurements and negative results.

Mission implication:

> use K3 as an out-of-envelope stress/negative control; inherit WARP's measured dead ends unless the mechanism materially changes.

Sources:
- https://github.com/sqliteai/warp/blob/main/docs/TECHNICAL.md
- https://github.com/sqliteai/warp/blob/main/docs/LEARNED.md

## Re-open rule

When retrying a registered null/negative result, the experiment must state:

1. the prior result;
2. what materially changed;
3. why that change should alter the mechanism;
4. the explicit pass/kill criterion.
