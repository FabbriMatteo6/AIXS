# Contributing to AIXS

AIXS is starting from a research question, not a finished answer.

We welcome experienced researchers and engineers, but also motivated contributors who are willing to learn, reproduce experiments carefully, document failures, and separate measurements from assumptions.

## The five working areas

- **Model** — MoE architecture, quantization, sparsity, expert sharing, model transformations.
- **Harness** — orchestration, routing, context/cache strategy, speculative methods, agent workflows.
- **Software** — inference engines, kernels, formats, paging, prefetching, distributed execution.
- **OS** — memory, I/O, scheduling, power, device topology and potentially AI-tailored system layers.
- **Hardware** — consumer accelerators, Apple Silicon, heterogeneous/recycled machines, storage/memory-centric designs.

## Mission 01

The first working group should select an open-weight frontier-class MoE candidate, establish a reproducible consumer-hardware baseline, and publish an honest benchmark before trying to claim a breakthrough.

A useful contribution can be as small as reproducing one result on one machine and documenting exactly what happened.

## Research standard

When proposing an optimization, always record:

1. Hardware and OS.
2. Model and exact weights/quantization.
3. Runtime and commit/version.
4. Prompt/workload and context settings.
5. Quality/correctness checks.
6. Time-to-first-token and generation throughput.
7. RAM/VRAM/storage footprint and I/O where relevant.
8. Before/after measurement and uncertainty.
9. What failed.

Avoid replacing evidence with estimates when a reproducible measurement is possible.
