# Mission 01 — Establish the Baseline

## Objective

Establish a reproducible local baseline for a frontier-class open-weight Mixture-of-Experts model on clearly documented consumer hardware before claiming any cross-layer optimization breakthrough.

The exact model and reference hardware set are intentionally undecided. Selecting them is part of the mission.

## Workstreams

1. **Model selection** — choose candidates using explicit quality, accessibility, reproducibility and hardware-fit criteria.
2. **Hardware selection** — define a small reference set while still accepting heterogeneous exploratory and replication machines.
3. **Reference behavior** — document hosted/reference quality and behavior without assuming local parity.
4. **Local baseline** — run the strongest practical open local stack.
5. **Measurement** — quality, TTFT, tokens/sec, RAM/VRAM, storage I/O and energy where feasible.
6. **Optimization** — test one hypothesis at a time across the five pillars.
7. **Publication** — preserve method, results, failures and reproducibility metadata.

## Exit criteria

- [ ] Model candidate selected and decision recorded.
- [ ] Reference hardware set selected and decision recorded.
- [ ] Baseline protocol frozen for the first comparison series.
- [ ] At least one complete baseline experiment published.
- [ ] At least one independent or cross-machine replication attempted.
- [ ] Initial optimization experiments published with before/after evidence.
- [ ] Mission report and reproducible demo/method published.

## Documents

- [`model-selection.md`](model-selection.md)
- [`hardware-selection.md`](hardware-selection.md)
- [`baseline-protocol.md`](baseline-protocol.md)
- [`decisions.md`](decisions.md)

## Experiments

Mission experiments live in [`../../experiments/mission-01/`](../../experiments/mission-01/). Use IDs `M01-E###`.
