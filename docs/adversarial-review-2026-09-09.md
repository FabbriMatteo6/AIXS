# AIXS adversarial review and execution recommendation

This public brief records the research decisions and uncertainty boundaries from the 9 September 2026 review. Private source packages, prior conversations, exact replay identifiers and evaluator material are intentionally omitted.

## Decision

Start with a coding-agent evaluation on an existing Mac, audit reusable evidence, and use only a bounded remote-compute allowance to resolve target-model compatibility and occupied-context performance. Preserve the machine budget until one complete configuration passes the quality, latency, context and delivered-cost gates. No configuration reviewed here establishes all of those conditions.

This is an absence of qualifying evidence, not proof that the target is impossible. Near-target reports justify experiments; they do not justify a purchase by themselves.

## Public research contract

The intended outcome is a local model API that can support one coding agent through a real loop: inspect a repository, edit files, execute tests, respond to failures and deliver a working result. Raw decode speed is necessary for the public challenge but is not sufficient for useful agent behavior.

Measure task success, time to a passing solution, tool failures, interventions, cold prefill, warm-turn latency, actual context occupancy, memory, power and complete-system cost. Keep speculative/emitted throughput separate from raw target-model decode.

## Adversarial findings

### Access must be an explicit gate

If every high-channel CPU, accelerator and full-context measurement is required before selecting an access route, the project can deadlock. Begin with a Mac vertical slice, a small evaluator fixture and a bounded access-feasibility experiment. A failed access search is a valid defer decision, not a reason to redesign the project indefinitely.

### Agent usefulness is broader than tokens per second

Prompt ingestion, tool-call correctness, repeated context rebuilding and task completion can dominate user experience. Report raw decode, prefill, time to first token, warm-turn reuse, tool errors and end-to-end task time separately.

### Model identity and representation must remain explicit

DeepSeek-V4-Flash-Vision-Exp and the text Flash-0731 checkpoint have different roles. Qwen3.8-Flash-Next has additional lookup, routing and draft components that must be inventoried rather than reduced to an active-parameter count. Model cards and hosted APIs do not by themselves establish local runtime compatibility or capability parity.

### Hardware claims need complete conditions

Vendor bandwidth, a short prompt, a configured context limit or a speculative output rate does not establish an occupied-128K coding-agent result. Record exact hardware, memory population, runtime revision, representation, context counts, quality result and complete delivered cost.

### Reuse evidence selectively

Inherited Mac findings and public upstream reports are useful leads, not automatically transferable results. Verify identity and scope before importing code or claims. Keep source-checkpoint quality separate from same-representation correctness.

### Fix the measurement contract before scaling experiments

The experiment template and validator need a consistent schema and one populated dry run before the first canonical measurement. Preserve old records and keep this fix bounded; do not build a registry or orchestration framework for hypothetical scale.

### Freeze the mission long enough to measure

Run one implementation task at a time, use explicit gates and review decisions on a short cadence. New models and attractive hardware listings belong on a watchlist until they change an evidence-based decision.

## Public reproducibility boundary

Public documentation should describe methods, assumptions, public sources and reproducible claims. Exact private source checkouts, local filesystem paths, historical solution reports, hidden acceptance tests, held-out task identities and evaluator-only findings belong in a private evaluator workspace. Candidate exports must contain only the baseline inputs they are allowed to see.

## Next bounded work

1. Freeze a small public task fixture and its private evaluator controls.
2. Resolve the experiment-template/validator mismatch with valid and invalid populated records.
3. Run one Mac coding-agent baseline with timing, tool and evaluator evidence.
4. Refresh target-artifact compatibility and cost assumptions before any purchase decision.

## Public sources

- [DeepSeek-V4-Flash-Vision-Exp model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp)
- [DeepSeek-V4-Flash-0731 model card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731)
- [Qwen3.8-Flash-Next model card](https://huggingface.co/Qwen/Qwen3.8-Flash-Next)
- [KTransformers deployment guide](https://github.com/kvcache-ai/ktransformers/blob/main/doc/en/DeepSeek-V4-Flash.md)
- [llama.cpp discussion on Qwen coding results](https://github.com/ggml-org/llama.cpp/discussions/28512)
- [Supermicro H12SSL-i specifications](https://www.supermicro.com/en/products/motherboard/H12SSL-i)
- [ROCm Linux system requirements](https://rocm.docs.amd.com/projects/install-on-linux/en/docs-7.2.0/reference/system-requirements.html)
- [Vast.ai pricing documentation](https://docs.vast.ai/guides/instances/pricing)
