# AIXS research methodology

## Evidence hierarchy

Label important external evidence by class:

- **A — primary / established:** vendor or official model/runtime specification, peer-reviewed paper, or an AIXS result independently reproduced under a frozen protocol;
- **B — strong author result / active upstream benchmark / preprint:** useful and technically credible, but not yet an AIXS reproduction;
- **C — community lead:** Reddit/forum/personal branch result used to generate a hypothesis;
- **X — contradicted / superseded:** preserved so contributors do not casually repeat it;
- **? — missing evidence:** material unknown that must be measured rather than silently assumed.

Prefer, in order:

1. reproducible AIXS measurements on clearly specified systems;
2. independent/cross-machine replication;
3. pinned upstream or published measurements;
4. analytical estimates with explicit assumptions;
5. hypotheses labeled as unmeasured.

Do not present a lower level as a higher one.

## Measure the real workload, not the allocation

Configured resources are not equivalent to occupied workload state.

For long-context inference distinguish:

- allocated context capacity;
- prompt tokens actually ingested;
- tokens retained at decode start;
- prefix tokens reused;
- generated tokens measured.

A `128K` context flag is not a `128K occupied` benchmark.

## Measure the critical path

Headline memory bandwidth, FLOPS or VRAM capacity are insufficient on their own.

A useful token-latency model is:

```text
GPU serial work
+ CPU expert work
+ synchronization / unhidden overhead
+ other serial work
- useful overlap
= end-to-end token time
```

Experiments should measure the subsystem that the hypothesis claims to improve.

For CPU expert work, distinguish:

1. **physical memory traffic/bandwidth** where counters permit;
2. **logical expert payload throughput** = selected logical bytes / expert-phase time;
3. **matched read-reference throughput** with comparable thread/placement behavior;
4. general STREAM results as supporting machine metadata, not a universal saturation threshold.

This prevents a compute/dequantization-bound expert kernel from being misclassified as a memory-bandwidth problem.

## Change one thing when practical

Cross-layer optimization is the thesis, but causal understanding still matters. Experiments should isolate hypotheses where practical, then test interactions explicitly.

The normal research loop is:

```text
measure envelope
    ↓
identify largest exploitable gap
    ↓
change one mechanism
    ↓
re-measure end to end
```

Open no more than two engineering tracks in parallel for the active mission.

## Upstream first

Before building AIXS-specific runtime code:

1. identify the strongest current upstream path;
2. pin the exact commit;
3. reproduce it if practical;
4. instrument the missing metric;
5. contribute upstream when the experiment produces generally useful code.

Upstream adoption of an AIXS result is **success**, not loss of differentiation. AIXS should own reproducible workloads, economic evidence, critical-path measurements and independent validation rather than a permanent fork.

## Quality is part of performance

Tokens/sec is not a win if capability is materially degraded.

Use two references:

- same representation + reference runtime for implementation correctness;
- frozen source lineage for representation/capability retention.

Use a fast gate during kernel/runtime iteration and a larger release gate for representation changes or public claims. See [`quality-protocol.md`](quality-protocol.md).

## Representation vs structural transformation

The architecture-preserving systems track may test:

- quantization;
- runtime format conversion;
- mixed numerical representation;
- tensor/layer-dependent bit allocation;

provided the model graph, layers, expert inventory, routing semantics and top-k remain intact and quality passes.

Structural changes such as deleting experts, changing routing/top-k, pruning layers or distillation are a distinct model-transformation track and should open only when measurements justify it.

## Economics are part of reproducibility

AIXS cost claims refer to a **complete compatible system**, not isolated component bargains.

Prefer multiple contemporaneous purchasable baskets and record:

- date;
- region;
- new/used/refurbished condition;
- VAT/shipping/import treatment;
- replacement cost separately from research cash spent.

## Heterogeneous hardware

Different contributor machines are useful provided each is precisely registered and its experiment role is explicit: reference, exploratory, replication or access-only.

Use Amdahl's law when evaluating additional compute/memory domains. A fixed multi-socket speedup threshold is misleading when only part of token latency can scale.

## Failures stay visible

Failed, null and inconclusive experiments are first-class evidence. Preserve them with their conditions and mechanism so later contributors can identify what genuinely changed before retrying.

## Revisions and provenance

Pin model revisions, representations, runtime commits, benchmark versions and external artifacts as exactly as possible. Store hashes and origin for large artifacts that remain outside Git.
