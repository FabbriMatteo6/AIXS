# Software / Runtime

## Scope

Inference engines, kernels, model formats, paging, prefetching, storage/RAM/VRAM hierarchy, distributed execution and integration with runtimes such as llama.cpp, MLX, vLLM or new systems.

## Current questions

- How should model weights move through storage, RAM and accelerator memory?
- Which paging/prefetch policies work for MoE expert access patterns?
- Where are current runtime abstractions too server-centric for local inference?
- Which missing kernels, schedulers or formats justify AIXS-specific implementation?

Avoid vendoring large upstream codebases. Prefer `adapters/`, `patches/`, pinned revisions and focused PRs.
