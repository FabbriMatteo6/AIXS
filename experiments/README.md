# Experiments

Experiments are the durable evidence record of AIXS.

## Layout

```text
experiments/
├── schema/                     # Versioned machine-readable contracts
├── templates/                  # Starting point for a new experiment
└── mission-01/
    └── M01-E001-short-name/
        ├── experiment.yaml     # Reproducibility/config metadata
        ├── results.json        # Small machine-readable results
        ├── README.md           # Interpretation, caveats, links
        └── data/               # Optional small committed artifacts
```

## IDs

Mission 01 uses `M01-E###`. IDs are never reused, even when an experiment is superseded.

## Statuses

- `planned` — hypothesis/method defined, not started;
- `running` — evidence is being collected;
- `completed` — planned run finished and evidence is recorded;
- `failed` — the tested approach did not work as intended; valid negative evidence;
- `inconclusive` — evidence is insufficient or contradictory;
- `superseded` — replaced by a newer experiment, while historical evidence stays.

## Schema evolution

Every experiment declares `schema_version`.

- `0.1` — original generic experiment contract; preserved for historical records.
- **`0.2` — current Mission 01 contract**, adding explicit model identity, occupied-context semantics, raw/emitted throughput separation, critical-path metrics and complete-system economics.

New experiments should start from schema `0.2`. Historical `0.1` experiments are not silently rewritten.

## Context semantics

A long-context result must not report only a configured context flag.

Schema `0.2` separates:

- capacity;
- ingested prompt tokens;
- retained tokens at decode start;
- reused prefix tokens;
- generated tokens.

This makes `128K allocated` distinguishable from `128K actually occupied`.

## Performance semantics

Report separately:

- prefill;
- cold TTFT;
- warm/prefix TTFT;
- **raw target-model decode**;
- speculative/MTP **emitted throughput**.

Do not promote emitted speculative throughput as raw model decode.

## Measurement scope

The schema contains many optional subsystem measurements. An experiment does **not** need to collect every field.

Collect the metrics required to test the hypothesis, plus enough end-to-end data to show that the local improvement matters.

When a metric central to the hypothesis is missing, record why.

See [`../docs/methodology.md`](../docs/methodology.md), [`../docs/envelope.md`](../docs/envelope.md) and Mission 01's [`baseline-protocol.md`](../missions/mission-01/baseline-protocol.md).

## Large artifacts

Do not commit model weights, checkpoints, giant logs, datasets or traces. Record external locations plus hashes and provenance where practical.

Copy [`templates/experiment/`](templates/experiment/) to start a new experiment.
