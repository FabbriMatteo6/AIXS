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
  <a href="docs/research-map.md">Research map</a> ·
  <a href="CONTRIBUTING.md">Contribute</a> ·
  <a href="https://github.com/FabbriMatteo6/AIXS/discussions">Join the discussion</a> ·
  <a href="docs/it/README.md">Italiano</a>
</p>

---

## Frontier AI should fit on your machine.

**AIXS** is a community-led open research initiative exploring how frontier-class AI models can run locally on affordable consumer hardware while preserving as much of their original intelligence and performance as technically possible.

The central bet is simple: the bottleneck is not one layer. **Model architecture, orchestration, runtime, operating system, memory movement and hardware are coupled constraints.** AIXS treats them as one optimization surface.

Today, the dominant path is:

```text
Frontier model → giant datacentre → API → user
```

AIXS investigates a different path:

```text
Model → Harness → Software → OS → Hardware → Your machine
```

This repository is the main AIXS research monorepo. It contains missions, experiments, pillar-specific research and code, reproducibility metadata, hardware profiles, benchmarks, integration work, and the public website.

> **Not a finished product. Not a benchmark claim. A research challenge worth attacking together.**

## Five interlocking research pillars

| Pillar | Question | Working area |
| --- | --- | --- |
| **1. Model** | What can we change in architecture, quantization, sparsity, expert sharing and loading without losing the capability we care about? | [`research/model/`](research/model/) |
| **2. Harness / Orchestration** | How do routing, cache, context, batching, speculation and scheduling reduce wasted work around the model? | [`research/harness/`](research/harness/) |
| **3. Software / Runtime** | How should kernels, paging, formats, prefetching and distributed execution move weights and compute? | [`research/software/`](research/software/) |
| **4. OS / System Layer** | Can memory, I/O, scheduling, power and topology be managed more intelligently for local AI? | [`research/os/`](research/os/) |
| **5. Hardware** | How far can consumer GPUs, Apple Silicon, heterogeneous systems and memory-centric designs be pushed? | [`research/hardware/`](research/hardware/) |

The pillars are **knowledge and ownership areas**. The actual execution units are **missions**.

## Mission 01 — Establish the Baseline

Before attempting a breakthrough, we need a starting point that is hard to argue with.

Mission 01 will select a frontier-class open-weight Mixture-of-Experts candidate and a clearly defined reference hardware set, establish hosted/reference behavior, run the strongest practical local baseline, and publish reproducible measurements.

The exact model and reference hardware are **deliberately undecided**. Their selection is part of the research.

### Exit criteria

- [ ] Select and document the model candidate using explicit criteria.
- [ ] Select a reference hardware set while still allowing heterogeneous exploratory machines.
- [ ] Define reference quality and behavior checks.
- [ ] Reproduce the strongest practical local baseline.
- [ ] Measure quality, TTFT, tokens/sec, memory, storage I/O and energy where feasible.
- [ ] Test optimizations one hypothesis at a time with before/after evidence.
- [ ] Publish method, results, failures and a reproducible demo/report.

Start here: **[`missions/mission-01/`](missions/mission-01/)**.

## How AIXS works

AIXS separates three things that are often mixed together:

- **Missions** define what the community is trying to accomplish now.
- **Research pillars** accumulate hypotheses, code, knowledge and open problems for each system layer.
- **Experiments** are the evidence: a reproducible record of exactly what was tested, where, and what happened.

A valid experiment does **not** need a positive result. Negative, failed and inconclusive results are first-class contributions when they are reproducible and documented clearly.

### Experiment status vocabulary

| Status | Meaning |
| --- | --- |
| `planned` | The hypothesis and method are defined, but the run has not started. |
| `running` | Data is actively being collected or reproduced. |
| `completed` | The planned experiment finished and its evidence is recorded. |
| `failed` | The experiment ran, but the tested approach did not work as intended. This is a valid negative result. |
| `inconclusive` | Evidence was insufficient or contradictory; no conclusion is claimed. |
| `superseded` | A newer experiment replaces this one while preserving the historical record. |

The canonical experiment schema starts at **`schema_version: "0.1"`** and is intentionally versioned so the methodology can evolve without rewriting history.

Read [`experiments/README.md`](experiments/README.md) and [`docs/methodology.md`](docs/methodology.md).

## Reproducibility before rhetoric

AIXS favors measured evidence over estimates whenever measurement is practical. An experiment should make it possible for another contributor to understand:

1. what hardware and OS were used;
2. which exact model weights, revision and quantization were tested;
3. which runtime/upstream commit was used;
4. what workload, prompts, context and settings were used;
5. what quality/correctness checks were applied;
6. TTFT and generation throughput;
7. RAM/VRAM/storage footprint and I/O where relevant;
8. energy/power measurements where feasible;
9. what changed versus the baseline;
10. what failed, surprised us, or remains uncertain.

Large model weights, traces and datasets should stay outside Git. The repository stores **the reproducibility contract**: configs, small results, hashes, exact revisions, summaries and links to external artifacts.

## Repository map

```text
AIXS/
├── apps/website/             # Public AIXS website
├── missions/                 # Execution units and current objectives
│   └── mission-01/
├── research/                 # Pillar knowledge + early implementation code
│   ├── model/
│   ├── harness/
│   ├── software/
│   ├── os/
│   └── hardware/
├── experiments/              # Reproducible experimental record
│   ├── schema/
│   ├── templates/
│   └── mission-01/
├── registry/hardware/        # Heterogeneous machine profiles
├── benchmarks/               # Shared workloads and quality methods
├── adapters/                 # AIXS integration code for upstream projects
├── patches/                  # Reviewable patches against pinned upstream revisions
├── tools/                    # Shared repository/research tooling
├── docs/                     # Architecture, methodology and research map
└── .github/                  # Lean contribution templates + CI
```

See [`docs/architecture.md`](docs/architecture.md) for the design rules behind the structure.

## Contribute

You do not need to arrive with a new architecture or a research paper.

Useful contributions include:

- reproducing one result on one machine;
- registering a hardware profile;
- testing a quantization, routing, paging or scheduling hypothesis;
- implementing an adapter or small patch against a pinned upstream revision;
- improving a benchmark or quality check;
- documenting a negative result;
- reviewing another experiment for reproducibility;
- mapping relevant public research.

Start with [`CONTRIBUTING.md`](CONTRIBUTING.md). For research questions and ideas, use **GitHub Discussions**. For concrete work, use **Issues** and **Pull Requests**.

## What AIXS is — and is not

| AIXS is | AIXS is not |
| --- | --- |
| Open, evidence-first systems research | A claim that frontier AI already runs perfectly on cheap hardware |
| Community-led and reproducibility-oriented | A founder-centric product repository |
| Willing to publish failed and negative results | A benchmark leaderboard without methodology |
| Open to experienced researchers and motivated beginners | A promise that every future component must use one license or business model |

## Website

The public website is **coming online**. Its source lives in [`apps/website/`](apps/website/).

## License and attribution

Original AIXS code and repository material are released under the **Apache License 2.0** unless a file or imported component states otherwise. Third-party projects, papers and patches retain their respective licenses and attribution requirements.

See [`LICENSE`](LICENSE) and [`CITATION.cff`](CITATION.cff).

---

<p align="center"><strong>AIXS — Artificial Intelligence, Accessible.</strong></p>
