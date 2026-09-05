# AIXS research methodology

## Evidence hierarchy

Prefer, in order:

1. reproducible measurements on clearly specified systems;
2. replicated measurements on another machine or by another contributor;
3. upstream/published measurements with exact source attribution;
4. analytical estimates with assumptions stated;
5. hypotheses clearly labeled as unmeasured.

Do not present a lower level as if it were a higher one.

## Change one thing when practical

Cross-layer optimization is the thesis, but causal understanding still matters. Experiments should isolate hypotheses where practical, then test interactions explicitly rather than changing everything at once.

## Quality is part of performance

Tokens/sec is not a useful win if the model behavior degrades beyond what the experiment is willing to accept. Every optimization should pair systems measurements with an appropriate quality/correctness check.

## Heterogeneous hardware

Different contributors will run different machines. That is useful, not noise, provided each machine is precisely registered and the experiment labels its role as reference, exploratory or replication hardware.

## Failures stay visible

A failed or inconclusive experiment should document what happened and remain linkable. Removing negative evidence makes future contributors repeat the same dead ends.

## Revisions and provenance

Pin model revisions, runtime commits, benchmark versions and external artifacts as exactly as possible. When large artifacts cannot live in Git, store their origin and integrity hash where practical.
