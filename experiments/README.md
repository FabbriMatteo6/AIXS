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

Every experiment declares `schema_version`. The initial contract is `0.1`. New versions should be additive where practical and should never silently rewrite the meaning of historical records.

## Large artifacts

Do not commit model weights, checkpoints, giant logs, datasets or traces. Record external locations plus hashes and provenance where practical.

Copy [`templates/experiment/`](templates/experiment/) to start a new experiment.
