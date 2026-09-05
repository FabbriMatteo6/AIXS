# Model

## Scope

Model architecture and representation: MoE structure, quantization, sparsity, expert sharing, expert transformation, compression and changes to what must be resident or loaded.

## Current questions

- Which weights or experts truly need high precision?
- Can expert structure be shared, compressed or transformed without unacceptable quality loss?
- Which architecture-level changes reduce memory movement most effectively?
- How should model-side changes be evaluated against reference intelligence and behavior?

## Code

Early model-side prototypes may live in this directory. Every material claim should link to an experiment in `experiments/`.

## Evidence

See [`../../docs/research-map.md`](../../docs/research-map.md) and link new papers/projects with cautious attribution.
