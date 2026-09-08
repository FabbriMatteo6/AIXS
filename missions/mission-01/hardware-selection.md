# Mission 01 — Hardware selection

Mission 01 does **not** freeze a hardware architecture in advance.

The purpose of hardware selection is to expose the real performance/cost frontier with systems that are obtainable, instrumentable and comparable.

## Roles

- **reference** — part of the canonical comparison series;
- **exploratory** — tests a hypothesis or ceiling but is not required for canonical claims;
- **replication** — independently reproduces a result or topology;
- **access-only** — borrowed/remote hardware used to answer a narrow question without becoming part of the cost-compliant reference set.

A machine can serve different roles in different experiments.

## Immediate hardware questions

1. What CPU platform gives the best **usable expert throughput per euro**, not merely headline DRAM GB/s?
2. How do 1P and 2P topologies scale the measured expert phase after Amdahl-limited end-to-end effects?
3. Which 24–32+ GB accelerator gives the best supported experimental path for dense/attention/KV work at occupied long context?
4. What configuration can be **reproducibly purchased as a complete system** within the current cost target?

## Priority access classes

### High-channel DDR CPU systems

Prefer borrowed access to at least one of:

- EPYC 7002/7003-class 8-channel DDR4 system;
- Ice Lake Xeon 8-channel DDR4 comparator;
- relevant 2P variant if access is easy.

The first question is not “which has more nominal bandwidth?” but whether the actual expert kernel is limited by:

- physical DRAM bandwidth;
- unpack/dequant instruction throughput;
- cache/coherence;
- thread/NUMA placement;
- synchronization.

### Accelerators

Preferred experimental order:

- RTX 3090 — direct comparison with current community hybrid results and mature CUDA support;
- RTX 4090/5090 — reference/latency ceilings when borrowed access exists;
- other datacenter or AMD accelerators — exploratory only when runtime support and cost make the experiment worthwhile.

Do not make an unsupported/legacy accelerator a Mission 01 dependency simply because one unit is cheap.

### Unified-memory systems

Useful as a reference class for comparing a very different memory topology. They may fail the ≤€2k target while still revealing an important performance ceiling.

## Complete-system economics

AIXS does not qualify a hardware target from a CPU/GPU-only price.

For a cost claim, construct at least **three independently purchasable compatible baskets** where practical, including:

- CPU / motherboard;
- RAM;
- GPU/accelerator;
- storage;
- PSU;
- cooling;
- enclosure/chassis;
- required adapters/cables;
- VAT;
- shipping/import charges to the target region.

Use the median complete basket as the qualifying replacement-cost estimate and publish the observed range and pricing date.

Exclude defective/parts-only listings, conditional discounts and obviously incompatible/vendor-locked components.

Borrowed hardware records:

- research cash spent;
- **replacement purchase cost** separately.

## Power / practicality

Record:

- idle wall power;
- inference wall power;
- dimensions/chassis class;
- cooling requirements;
- noise where practical.

Mission 01 will measure these first; a hard desk/noise/power gate should be frozen only after the initial feasibility experiments and target-user workload are understood.

## Candidate table

| Profile | Class | Key question | Availability | Replacement cost | Status |
| --- | --- | --- | --- | --- | --- |
| 1P high-channel DDR4 | reference candidate | CPU expert roofline | seek access | TBD | `priority` |
| 2P high-channel DDR4 | exploratory | expert-phase scaling / Amdahl benefit | seek access | TBD | `conditional` |
| RTX 3090 hybrid | reference candidate | reproduce current V4 hybrid paths | seek access | TBD | `priority` |
| modern 32 GB GPU | exploratory ceiling | GPU serial / VRAM ceiling | seek access | TBD | `reference-only` |
| 128 GB unified memory | exploratory ceiling | Qwen / unified-memory comparison | seek access | TBD | `reference-only` |

Register machines in [`../../registry/hardware/profiles/`](../../registry/hardware/profiles/).
