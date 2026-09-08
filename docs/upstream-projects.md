# AIXS upstream project watchlist

AIXS is upstream-first. This file tracks projects that can test Mission 01 hypotheses before AIXS writes new runtime code.

| Project | Current relevance | Evidence class | Mission 01 use |
| --- | --- | --- | --- |
| **KTransformers** | CPU/GPU heterogeneous MoE execution; current DeepSeek-V4 support; optimized CPU expert kernels including AVX2 MXFP4 work | B until AIXS reproduces | primary CPU-expert / hybrid baseline |
| **llama.cpp** | broad local runtime, DeepSeek/Qwen support, long-context paths, active expert-cache work | B/A by feature | canonical broad baseline and instrumentation target |
| **gamozolabs/llama.cpp** | detailed multi-socket CPU-MoE branch, fusion/NUMA/affinity/prefill lessons and negative results | B | independent comparison / mechanism source |
| **FreeToken** | bandwidth-adaptive CPU/GPU MoE serving and host expert caching | B / young | watch and benchmark only if it directly answers an active bottleneck |
| **HybriMoE** | hybrid CPU/GPU scheduling, cache and prefetch | research B | conceptual/comparison baseline |
| **MoE-Infinity** | SSD/CPU/GPU tiering and expert cache/prefetch | research B | later if cold-tier capacity becomes active problem |
| **WARP** | detailed Kimi K3 streaming/cache measurements and null results | B | stress-model methodology / inherited evidence |
| **ds4 / DwarfStar** | specialized high-memory local inference | B | competitive/reference envelope |
| **exo** | topology-aware distributed inference | B | later only if distributed capacity is re-opened |

## Current priority

Mission 01 should first attempt to answer its questions with:

1. current KTransformers;
2. current upstream llama.cpp;
3. gamozolabs branch as a mechanism/reproduction comparator.

Do not start an AIXS runtime because an upstream project lacks one convenience feature. Build a thin adapter/patch or contribute upstream unless the experiment requires a fundamentally different execution model.

## Watchlist maintenance

For a result that influences an AIXS decision, record:

- project;
- exact commit/release;
- model / representation;
- hardware;
- context occupancy semantics;
- raw vs emitted throughput;
- claimed mechanism;
- evidence class;
- AIXS reproduction status.

The local-AI runtime landscape changes quickly; re-check upstream immediately before opening an engineering track.
