# Mission 01 — Model selection

Mission 01 starts with a **model challenge**, not a preselected winner.

## Selection question

Which current open-weight sparse model offers the strongest combination of:

1. source-model capability relevant to local developer/agent use;
2. low active inference work and memory traffic;
3. reproducible local runtime support;
4. quality-preserving representation options;
5. long-context behavior that can be measured locally;
6. licensing and artifact provenance suitable for open research;
7. credible complete-system economics.

## Immediate candidates

| Candidate | Mission role | Why it matters | Main risks / blockers | Status |
| --- | --- | --- | --- | --- |
| **DeepSeek-V4-Flash-0731** | reproduction anchor | Strong current coding/agent capability; official open release; 1M-context family; current llama.cpp/KTransformers paths; existing MXFP4 CPU/GPU community results | Exact occupied-128K performance and complete ≤€2k BOM remain unproven | `priority` |
| **Qwen3.8-Flash-Next** | target challenger | Much smaller routed expert working set; long-context-oriented architecture; promising early local results | Experimental/open-weight preview, fresh runtime support, different license, quality/runtime maturity must be independently validated | `priority` |
| **GLM-5.3-Flash** | later portability/reference | Strong current model and different long-context architecture | Native FP8 capacity and routed work are materially larger for the immediate ≤€2k question | `deferred` |
| **Kimi K3** | stress / negative control | Detailed WARP measurements make it useful for understanding an out-of-envelope working set | Too expensive in active traffic for the first cost-constrained mission unless new evidence changes the envelope | `reference-only` |

## Evidence required before selecting the primary target

For each priority candidate record:

- exact model repository, revision and license;
- exact representation/quantization and conversion provenance;
- tensor inventory and on-disk size;
- expert/layer/routing structure;
- estimated **and measured where possible** logical active bytes/token;
- RAM/VRAM requirements at the intended context;
- active upstream runtimes and pinned revisions;
- fast capability gate result;
- at least one local systems trace or reproducible external baseline;
- current complete-system feasibility/cost notes.

## Architecture-preserving systems track

The systems challenge may use representation changes that preserve the inference graph, such as:

- quantization;
- runtime format conversion;
- layer-/tensor-dependent bit width;
- mixed numerical representation.

These still require capability validation.

The following are **structural model transformations** and must be declared as a separate evidence-triggered track:

- deleting/merging experts;
- changing top-k or router behavior;
- pruning layers;
- architecture changes;
- distillation into a different graph.

## Decision rule

Do not select the model because it is the largest or because one benchmark is fastest.

Select the candidate with the strongest **capability × local-feasibility** opportunity after a controlled comparison. Record the decision in `decisions.md`, including:

- evidence used;
- alternative rejected;
- unresolved risks;
- conditions that re-open model selection.
