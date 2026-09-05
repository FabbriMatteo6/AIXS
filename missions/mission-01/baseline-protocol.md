# Mission 01 — Baseline protocol

This document will become the frozen comparison protocol for the first Mission 01 baseline series.

Until model and reference hardware are selected, the protocol remains **draft**.

## Required baseline dimensions

- exact model and weight revision;
- exact quantization / representation;
- runtime/upstream repository and commit;
- hardware profile and relevant power/thermal mode;
- OS, driver and accelerator/runtime versions;
- prompt/workload/context configuration;
- quality/correctness checks;
- time-to-first-token;
- generation throughput;
- RAM/VRAM/storage footprint and storage I/O where relevant;
- energy/power where feasible;
- warm/cold-cache state where it changes results;
- repeated runs or uncertainty when practical.

## Comparison rule

Optimization experiments should change the smallest practical number of variables and state all deviations from the baseline explicitly.

The first frozen protocol version will be referenced by experiment metadata rather than copied into every result.
