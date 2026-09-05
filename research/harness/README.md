# Harness / Orchestration

## Scope

Routing, cache/context strategy, batching, speculative methods, scheduling, request orchestration and agent/workflow behavior around the model.

## Current questions

- Can future expert use be predicted early enough to hide I/O?
- How should KV cache, context and request scheduling interact with expert paging?
- When does speculative inference save compute versus increasing expert pressure?
- How should local interactive workloads be prioritized differently from server throughput?

Early prototypes live here; measured outcomes live in `experiments/`.
