# AIXS Project Milestones

This document translates [`Vision.md`](Vision.md) into a staged execution plan.

It is intentionally **decision-gated**, not calendar-driven. A milestone is complete when its exit criteria are met, not because a date has passed.

The project should avoid opening downstream work before upstream uncertainty has been resolved.

## Project flow

```text
M0  Freeze the challenge + method
            ↓
M1  Select the reference model
            ↓
M2  Establish subsystem rooflines
            ↓
M3  Reproduce occupied-context end to end
            ↓
M4  Select the first architecture intervention
            ↓
M5  Validate the architecture direction
            ↓
M6  Build the best ≤€2K candidate system
            ↓
M7  External reproduction + publish
            ↓
M8  Decide the next mission
```

The current active program is **Mission 01 — Establish the Measured Frontier**.

---

# M0 — Freeze the challenge and research contract

## Purpose

Ensure AIXS has one stable question and one reproducibility standard before generating large amounts of benchmark data.

## Deliverables

- [x] Provisional Breakthrough Challenge defined.
- [x] Evidence hierarchy defined.
- [x] Long-context occupancy rules defined.
- [x] Raw vs speculative throughput distinction defined.
- [x] Complete-system cost principle defined.
- [x] Architecture-preserving vs structural transformation distinction defined.
- [ ] Fast capability gate frozen.
- [ ] Release capability gate frozen.
- [ ] Exact baseline workload prompts / context construction frozen.
- [ ] Minimum experiment metadata schema validated with one dry run.

## Exit gate

M0 is complete when a new contributor can answer:

1. exactly what counts as a 128K occupied run;
2. exactly what performance number counts toward the Breakthrough Challenge;
3. exactly what model/capability degradation is allowed;
4. exactly what cost is included;
5. exactly what metadata must be recorded.

## Relevant files

- [`Vision.md`](Vision.md)
- [`docs/methodology.md`](docs/methodology.md)
- [`docs/envelope.md`](docs/envelope.md)
- [`docs/quality-protocol.md`](docs/quality-protocol.md)
- [`experiments/`](experiments/)

---

# M1 — Select the reference model and representation

## Core question

> Which current frontier-class open-weight sparse model provides the strongest retained capability for its active local-inference cost?

## Initial candidates

| Role | Candidate | Why it is included |
| --- | --- | --- |
| Reproduction anchor | DeepSeek-V4-Flash-0731 | Strong current systems evidence and mature hybrid paths. |
| Target challenger | Qwen3.8-Flash-Next | Smaller active parameter footprint and architecture explicitly designed for efficient long-context/local execution. |
| Later portability reference | GLM-5.3-Flash | Different architecture and useful portability test. |
| Stress / negative control | Kimi K3 | Tests whether techniques survive much harder working-set pressure. |

## Required work

### M1.1 Artifact accounting

For V4 and Qwen, record:

- exact source revision;
- license;
- total parameters;
- active parameters/token;
- expert count and routing;
- shared/dense tensors;
- attention architecture;
- native context length;
- source representation;
- candidate local representations;
- disk size;
- RAM/VRAM fit estimates;
- runtime support status.

### M1.2 Active-work accounting

Estimate and then measure where possible:

- logical expert bytes/token;
- shared/dense bytes/token;
- attention/KV cost versus context;
- expert routing distribution;
- repeated-expert locality;
- representation conversion overhead.

### M1.3 Capability screen

Run the fast quality gate against each practical representation.

## PASS criteria

A candidate becomes the Mission 01 primary model when it has:

- a reproducible artifact;
- sufficient runtime maturity for meaningful experiments;
- a representation that fits at least one accessible research topology;
- capability retention above the frozen gate;
- an active-work envelope with a plausible path toward interactive local inference.

## KILL / deprioritize criteria

Deprioritize a candidate when one of these is true:

- runtime support is too immature to separate runtime bugs from architectural limits;
- representation required for affordability fails the quality gate;
- active work/token makes the ≤€2K challenge physically implausible without structural model changes;
- another candidate dominates it on both capability and local feasibility.

## Decision unlocked

Freeze:

- primary source lineage;
- baseline representation;
- challenger/reference lineage.

---

# M2 — Establish subsystem rooflines

## Core question

> Before changing architecture, what can each relevant subsystem actually deliver on the target workload?

Do not substitute vendor headline specifications for workload-specific measurements.

## M2.1 CPU expert roofline

Build or reuse an expert replay harness for the selected source model.

Measure on accessible high-channel CPU systems:

- CPU model and instruction set;
- channels populated;
- NUMA topology;
- matched DRAM read reference;
- physical DRAM traffic where counters allow;
- logical expert payload throughput;
- expert phase ms/token;
- thread scaling;
- dequantization/unpack/kernel cost;
- 1P vs 2P only where access permits.

### Key diagnostic

Determine whether expert execution is primarily:

- memory-bandwidth bound;
- compute/instruction bound;
- synchronization/threading bound;
- NUMA/locality bound.

### Gate

Do **not** recommend more memory channels/sockets merely because peak bandwidth looks insufficient. Extra channels are earned only if the actual expert path is already using the existing subsystem effectively.

## M2.2 GPU serial-path roofline

On a supported/borrowed accelerator, measure:

- mandatory GPU serial ms/token;
- total GPU ms/token;
- resident VRAM footprint;
- attention/KV cost versus context;
- PCIe traffic;
- useful CPU/GPU overlap.

For the 30 tok/s challenge, total end-to-end token time is roughly **33.3 ms/token**. The experiment should show how much of that budget is already consumed before CPU expert work and synchronization.

## M2.3 Storage / representation ceiling where relevant

Only if the selected representation requires streaming or frequent conversion, measure the relevant SSD/storage path separately.

## Exit gate

Publish a first **critical-path budget** such as:

```text
GPU mandatory serial    ? ms
CPU expert path         ? ms
sync/unhidden overhead  ? ms
other serial work       ? ms
useful overlap         -? ms
-----------------------------
end-to-end              ? ms/token
```

No architecture intervention should be selected before this budget exists.

---

# M3 — Occupied-context end-to-end baseline

## Core question

> What happens when we run the real workload, not an allocated context flag or isolated microbenchmark?

## Required contexts

At minimum:

- ~4K actually ingested;
- ~32K actually ingested;
- **≥128K actually ingested and retained at decode start**.

## Required metrics

- cold prefill tok/s;
- cold TTFT;
- warm/prefix-reuse TTFT where supported;
- raw target-model decode tok/s;
- emitted/speculative tok/s separately;
- actual ingested / retained / reused tokens;
- CPU expert ms/token;
- GPU serial and total ms/token;
- synchronization/unhidden overhead;
- DRAM traffic/bandwidth;
- PCIe traffic;
- RAM/VRAM footprint;
- wall power;
- dated complete-system replacement cost.

## Baseline runtime policy

Use the strongest practical upstream path first. Pin the exact revision.

Potential upstreams include, according to model support and experiment purpose:

- KTransformers;
- llama.cpp / relevant experimental upstream work;
- other current projects documented in [`docs/upstream-projects.md`](docs/upstream-projects.md).

AIXS-specific code should initially focus on instrumentation and reproducibility, not replacing the runtime.

## Exit gate

M3 is complete when AIXS can state with evidence:

> At 128K occupied context, the dominant current limitation is **X**, consuming approximately **Y ms/token or Z% of the critical path**, while the next-largest limitation is **W**.

That sentence unlocks M4.

---

# M4 — Select one evidence-earned intervention

## Rule

Choose the intervention with the highest expected end-to-end gain supported by the measured critical path.

Do **not** choose based on novelty or hardware availability alone.

## Candidate interventions

Examples only:

### CPU kernel / representation path

Use when CPU expert execution is compute/instruction bound or leaves significant memory throughput unused.

### Higher-bandwidth / more-channel CPU topology

Use when CPU expert work is demonstrably bandwidth-bound and an Amdahl-aware model predicts worthwhile end-to-end gain.

### GPU / placement change

Use when GPU serial work or PCIe placement dominates.

### Context / prefill / KV optimization

Use when 128K attention/KV or prefill dominates usability.

### Expert cache

Use only when routing traces predict useful cache locality after accounting for VRAM opportunity cost.

### Architecture-preserving representation tuning

Use when bytes/token can be reduced while retaining capability.

### Structural model transformation

Open only if the measured systems envelope indicates that architecture-preserving systems work cannot close the required gap.

## Intervention proposal template

Every proposal must state:

- measured bottleneck;
- estimated theoretical maximum end-to-end gain;
- engineering cost;
- hardware/access required;
- PASS criterion;
- KILL criterion;
- exact before/after experiment.

## Exit gate

Select **one primary intervention** and at most one secondary engineering track.

---

# M5 — Validate the architecture direction

## Core question

> Does the selected intervention improve the full occupied-context workload enough to justify committing to its architecture class?

## Required comparison

Before and after on the same frozen workload where practical:

- source/model/representation;
- context occupancy;
- runtime revision;
- quality gate;
- raw decode;
- TTFT/prefill;
- critical-path decomposition;
- power;
- cost.

## PASS criterion

The intervention must produce a **material end-to-end improvement**, not merely a microbenchmark win, and preserve the capability gate.

A suggested rule for “material” during Mission 01 is:

- ≥15% improvement in the primary constrained end-to-end metric, **or**
- a smaller measured improvement that removes the dominant bottleneck and unlocks a quantitatively credible next step toward the Breakthrough Challenge.

This threshold may be revised in `missions/mission-01/decisions.md` with justification.

## KILL criterion

Kill or demote the approach if:

- the microbenchmark gain largely disappears end to end;
- quality fails;
- added hardware/software cost worsens capability-per-euro;
- the new bottleneck leaves insufficient theoretical headroom;
- complexity makes reproduction unrealistic for the target audience.

## Decision unlocked

Classify the architecture direction as:

- **promote** — build toward a complete candidate system;
- **iterate** — one clear remaining bottleneck with credible headroom;
- **park** — technically valid but poor economics/complexity;
- **kill** — insufficient path to the challenge.

---

# M6 — Candidate ≤€2,000 research system

## Core question

> Given the evidence-selected architecture, what is the cheapest reproducible complete system that can validate it at full scale?

This is where the **AIXS hardware scanner** becomes an active procurement tool.

## Hardware-scanner rule

The scanner searches for hardware that satisfies measured requirements, including:

- required RAM capacity;
- achieved memory bandwidth class;
- CPU instruction/kernel support;
- required VRAM;
- GPU architecture/runtime support;
- PCIe topology;
- power/cooling;
- supply depth;
- total complete-system cost;
- software friction.

A cheap component that does not satisfy an earned requirement is not an AIXS target.

## Procurement policy

Prefer in order:

1. existing hardware;
2. borrowed/partner access;
3. rental/cloud access for measurement;
4. used/refurbished purchase;
5. new hardware only when economics remain compelling.

## Required BOM methodology

For each candidate BOM record:

- date;
- region;
- condition;
- at least several contemporaneous purchasable price points where possible;
- VAT/shipping/import assumptions;
- motherboard/CPU/RAM/GPU/storage/PSU/cooling/chassis/network requirements;
- replacement cost;
- research cash actually spent separately.

## Exit gate

Publish at least one complete candidate BOM and either:

- build it;
- reproduce it through borrowed equivalent hardware;
- or falsify it before purchase using the subsystem measurements.

---

# M7 — Breakthrough attempt and external reproduction

## Breakthrough attempt

Run the frozen challenge on the best candidate architecture.

A passing result requires:

- ≥30 **raw target-model** tok/s;
- ≥128K context actually occupied/retained at decode start;
- ≤€2,000 reproducible complete-system replacement cost;
- frozen capability gate passed.

Also report even when not pass/fail criteria:

- cold prefill;
- cold TTFT;
- warm TTFT/prefix reuse;
- emitted speculative throughput;
- power and joules/token;
- full hardware/runtime/model provenance.

## External reproduction

At least one independent contributor or separate hardware owner should attempt the frozen result.

External reproduction may use an equivalent rather than identical BOM if the equivalence is explicitly documented.

## Outcome states

### Breakthrough validated

The challenge is met and independently reproduced.

### Near frontier

The best result is close enough that the remaining bottleneck is measured and quantitatively tractable.

### Envelope miss

The result remains materially outside the target, but Mission 01 has established why.

All three are publishable outcomes.

---

# M8 — Mission 01 closeout and next-mission decision

## Required Mission 01 report

Summarize:

- selected model and why;
- capability/representation choice;
- measured active work;
- CPU/GPU/memory critical path;
- interventions tried;
- negative results;
- best complete-system result;
- cost/power/context performance;
- external reproduction status;
- remaining physics/software gap.

## Possible Mission 02 directions

Open the next mission only from evidence. Examples:

- **Architecture integration** — if a near-breakthrough system has one or two clear remaining bottlenecks;
- **Representation / model transformation** — if active bytes/token must fall materially further;
- **Long-context usability** — if decode is solved but prefill/TTFT dominates;
- **Distributed local inference** — if a single-box cost/capacity wall is measured and activation traffic makes multi-node execution credible;
- **Hardware exploitation** — if a specific depreciated hardware class clearly matches measured needs;
- **New-model reset** — if a newer frontier open model dominates the Mission 01 target before the current path is worth continuing.

---

# Immediate execution backlog

These are the practical next actions from the current repository state.

## P0 — do now

- [ ] Freeze `quality-protocol.md` fast gate with exact tests and thresholds.
- [ ] Create `M01-E001` — V4 vs Qwen artifact/active-work comparison.
- [ ] Create `M01-E002` — CPU expert replay/roofline experiment.
- [ ] Create `M01-E003` — true occupied-context end-to-end baseline.
- [ ] Populate hardware-access registry for machines that can run E002/E003.
- [ ] Record exact upstream commits / supported paths for V4 and Qwen.

## P1 — after E001/E002 data

- [ ] Freeze Mission 01 primary model and representation.
- [ ] Publish first critical-path budget.
- [ ] Identify the single highest-value intervention.
- [ ] Define exact hardware access required for it.
- [ ] Activate hardware scanning only against those requirements.

## P2 — after E003/M4

- [ ] Run the earned intervention.
- [ ] Re-measure 128K occupied context.
- [ ] Decide whether 1P, 2P, different GPU, cache, representation or another architecture class is justified.
- [ ] Build candidate ≤€2K BOM.

---

# Project management rules

1. **One mission objective at a time.**
2. **No more than two engineering tracks in parallel after baselines.**
3. **Every hardware purchase must map to a named experiment or required reproduction.**
4. **Every optimization must name the measured bottleneck it targets.**
5. **Every performance claim must carry quality and context provenance.**
6. **Every important external result remains evidence until AIXS reproduces it.**
7. **Do not hide failed experiments.**
8. **Prefer deleting an unearned milestone to maintaining roadmap theatre.**

---

# Six-month strategic outcome

Within the first major research cycle, AIXS should be able to answer these questions with evidence:

1. What is the best current frontier-class sparse source model for affordable local inference?
2. What are its actual bytes/work per token at useful context?
3. Which subsystem prevents it from reaching 30 raw tok/s locally?
4. How much of that bottleneck is software versus hardware?
5. Which architecture class gives the best path per euro?
6. What complete system can be reproduced today, and how far is it from the Breakthrough Challenge?
7. What is the single most valuable next experiment?

If AIXS can answer those seven questions reproducibly, the first research cycle is successful even if the final 30 tok/s / 128K / €2K target has not yet been crossed.
