# Mission 01 — Hardware selection

AIXS expects heterogeneous contributor hardware. Mission 01 therefore distinguishes **reference**, **exploratory**, and **replication** machines instead of requiring everyone to own the same system.

## Roles

- **reference** — part of the small hardware set used for the canonical baseline series;
- **exploratory** — useful for testing hypotheses or widening hardware coverage, but not required for canonical comparisons;
- **replication** — used to reproduce an existing experiment independently or on a different machine class.

A machine may serve different roles in different experiments. The role is recorded in experiment metadata; hardware profiles themselves describe the machine, not its permanent status.

## Reference-set criteria

- actually obtainable consumer hardware;
- precise, reproducible configuration;
- sufficient storage and memory to attempt the chosen model;
- representative of at least one meaningful local-AI user class;
- available to one or more contributors for repeated measurement;
- practical telemetry for memory/performance and, where possible, energy.

## Candidate table

| Profile | Class | Why useful | Limitations | Availability | Status |
| --- | --- | --- | --- | --- | --- |
| _TBD_ | | | | | `unreviewed` |

Register machines in [`../../registry/hardware/profiles/`](../../registry/hardware/profiles/).
