<p align="center">
  <img src="docs/assets/aixs-readme-banner.svg" alt="AIXS — Frontier AI should fit on your machine" width="100%" />
</p>

<p align="center"><strong>Artificial Intelligence, Accessible.</strong></p>

<p align="center">
  <img alt="Mission 01 active" src="https://img.shields.io/badge/Mission%2001-active-b8f3ff?style=flat-square&labelColor=0b0f12&color=b8f3ff" />
  <img alt="Open research" src="https://img.shields.io/badge/research-open-c9ffb2?style=flat-square&labelColor=0b0f12&color=c9ffb2" />
  <img alt="Apache 2.0" src="https://img.shields.io/badge/license-Apache--2.0-f2f5f7?style=flat-square&labelColor=0b0f12&color=f2f5f7" />
</p>

<p align="center">
  <a href="missions/mission-01/README.md"><strong>Explore Mission 01</strong></a> ·
  <a href="docs/envelope.md">AIXS Envelope</a> ·
  <a href="docs/research-map.md">Research map</a> ·
  <a href="CONTRIBUTING.md">Contribute</a> ·
  <a href="https://github.com/FabbriMatteo6/AIXS/discussions">Join the discussion</a>
</p>

---

## Frontier AI should fit on your machine.

**AIXS** is a community-led open research initiative investigating how far frontier-class open-weight AI can be pushed on affordable local hardware.

The project does not assume that one layer — model, runtime, OS, memory or accelerator — is the answer. It measures the full per-token critical path, identifies the current bottleneck, and tests only interventions with enough measured headroom to matter.

> **Not a finished product. Not a benchmark claim. A reproducible research challenge.**

## Mission 01 — Establish the Measured Frontier

Mission 01 asks two linked questions:

1. **Model frontier:** which current open-weight sparse model provides the strongest retained capability for its active inference cost?
2. **Systems frontier:** what is the lowest reproducible complete-system cost that makes that model genuinely interactive locally?

The immediate selection challenge is:

- **DeepSeek-V4-Flash-0731** — reproduction anchor;
- **Qwen3.8-Flash-Next** — target challenger;
- **GLM-5.3-Flash** — later portability/reference model;
- **Kimi K3** — stress / negative-control model.

The provisional Breakthrough Challenge is:

> **≥30 raw target-model decode tok/s after genuinely occupying ≥128K context on a complete, reproducibly purchasable ≤€2,000 local system, while passing a frozen source-lineage capability gate.**

This is a research objective, not a promise. Every result must separate raw target-model decode from speculative/emitted throughput and report the actual context occupancy.

Mission 01 starts with measurement, not architecture selection:

```text
source model / representation
          ↓
active work + memory traffic
          ↓
subsystem ceilings
          ↓
actual token critical path
          ↓
largest exploitable gap
          ↓
one intervention
          ↓
re-measure quality + cost + latency
```

Start here: **[`missions/mission-01/`](missions/mission-01/)**.

## The AIXS Envelope

AIXS aims to publish more than tokens/sec. A useful local-inference result should make the limiting resource visible.

For each model / representation / runtime / hardware combination, AIXS tracks where practical:

- source capability and quality gate;
- allocated **and actually occupied** context;
- cold prefill and TTFT;
- warm/prefix-reuse TTFT;
- raw target-model decode tok/s;
- emitted/speculative tok/s;
- logical expert bytes/token and measured memory traffic;
- CPU expert, GPU serial, synchronization and overlap time/token;
- RAM/VRAM/PCIe/storage behavior;
- wall power and energy/token;
- dated complete-system replacement cost.

See [`docs/envelope.md`](docs/envelope.md) and [`docs/methodology.md`](docs/methodology.md).

## Research domains

AIXS keeps five interlocking domains as knowledge areas. They are **not five parallel roadmaps**; missions decide what gets worked on now.

| Domain | Question | Working area |
| --- | --- | --- |
| **Model** | Which representation or structural changes reduce active work without unacceptable capability loss? | [`research/model/`](research/model/) |
| **Harness / Orchestration** | How do context reuse, batching, speculation, routing and scheduling reduce wasted work? | [`research/harness/`](research/harness/) |
| **Software / Runtime** | Which kernels, formats, placement and execution policies move useful work fastest? | [`research/software/`](research/software/) |
| **OS / System Layer** | How should memory, I/O, affinity, NUMA and power be managed? | [`research/os/`](research/os/) |
| **Hardware** | Which affordable memory/compute topologies offer the best usable performance per euro? | [`research/hardware/`](research/hardware/) |

## How AIXS works

AIXS separates three things that are often mixed together:

- **Missions** define the current objective and decision boundary.
- **Research domains** accumulate reusable hypotheses, code and knowledge.
- **Experiments** are the evidence: reproducible records of what was tested and what happened.

A failed or inconclusive result is a valid contribution when it is reproducible and changes a decision.

### Experiment status vocabulary

| Status | Meaning |
| --- | --- |
| `planned` | Hypothesis and method defined; run not started. |
| `running` | Data being collected or reproduced. |
| `completed` | Planned experiment finished and evidence recorded. |
| `failed` | The tested approach did not work as intended; valid negative result. |
| `inconclusive` | Evidence insufficient or contradictory. |
| `superseded` | A newer experiment replaces it while preserving history. |

Read [`experiments/README.md`](experiments/README.md) and [`docs/methodology.md`](docs/methodology.md).

## Reproducibility before rhetoric

A completed inference experiment should make it possible to reconstruct:

1. exact hardware, NUMA topology and memory population;
2. exact source model, representation and conversion provenance;
3. exact runtime/upstream commit and AIXS patch;
4. allocated, ingested, retained, reused and generated token counts;
5. correctness and capability checks;
6. prefill, TTFT, raw decode and emitted throughput;
7. RAM/VRAM/PCIe/storage behavior relevant to the hypothesis;
8. power and dated complete-system economics where feasible;
9. uncertainty / repetitions and the measurement method;
10. failures, null results and assumptions.

Large weights, traces and datasets stay outside Git. The repository stores the **reproducibility contract**: configs, hashes, small results, exact revisions, summaries and artifact links.

## Repository map

```text
AIXS/
├── apps/website/
├── missions/
│   └── mission-01/
├── research/
│   ├── model/
│   ├── harness/
│   ├── software/
│   ├── os/
│   └── hardware/
├── experiments/
│   ├── schema/
│   ├── templates/
│   └── mission-01/
├── registry/hardware/
├── benchmarks/
├── adapters/
├── patches/
├── tools/
└── docs/
```

## Contribute

High-value contributions right now include:

- reproducing DeepSeek-V4-Flash or Qwen3.8-Flash-Next on a documented machine;
- providing borrowed access to high-channel EPYC/Xeon or 24–32 GB GPU systems;
- measuring CPU expert throughput, memory traffic or GPU critical-path timing;
- building occupied-context / prefix-reuse workloads;
- improving the quality gate;
- documenting an upstream result or a negative reproduction.

Start with [`CONTRIBUTING.md`](CONTRIBUTING.md). Use Discussions for research questions and Issues/PRs for concrete experiments.

## What AIXS is — and is not

| AIXS is | AIXS is not |
| --- | --- |
| Open, evidence-first systems research | A claim that frontier AI already runs perfectly on cheap hardware |
| Focused on capability-per-euro and usability | A checkpoint-size contest |
| Upstream-first | A new runtime unless evidence requires one |
| Willing to publish failures | A benchmark leaderboard without methodology |
| Architecture-agnostic until measurement | A predetermined NUMA/GPU/pruning strategy |

## License

Original AIXS code and repository material are released under the **Apache License 2.0** unless a file or imported component states otherwise. Third-party projects, papers and patches retain their respective licenses and attribution requirements.

See [`LICENSE`](LICENSE) and [`CITATION.cff`](CITATION.cff).

---

<p align="center"><strong>AIXS — Artificial Intelligence, Accessible.</strong></p>
