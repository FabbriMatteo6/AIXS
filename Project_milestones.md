# AIXS Project Milestones

This is the execution plan for [Vision.md](Vision.md), revised from the [9 September adversarial review](docs/adversarial-review-2026-09-09.md). Gates determine completion; effort limits prevent indefinite planning. No implementation milestone is marked complete by this documentation update.

## Operating contract

One active coding task runs at a time. Development starts with an available consumer-class machine; bounded remote work, hardware access and contributor capacity are recorded as experiment constraints. Source/price research may proceed alongside waiting experiments.

Public breakthrough: ≥30 raw tok/s, ≥131,072 input tokens retained at decode start, quality pass and ≤€2,000 reproducible complete-system cost. Candidate system cases: ≥25 raw tok/s within €2,000, or ≥30 within €2,500, under the same context/quality conditions. Other combinations require a recorded decision. Approximately 10 tok/s or €3,000+ means preserve the budget.

Initial workload assumption: text-based repository tasks, one active agent. Visual coverage remains open until representative tasks are selected. Target models are DeepSeek-V4-Flash-Vision-Exp and Qwen3.8-Flash-Next; text Flash-0731 is a labeled control.

## Flow

```text
M0 Contract + evidence audit + executable fixture
 ↓
M1 Mac coding-agent vertical slice
 ↓                         ↘
M2 Target artifacts + affordable access decision
 ↓                         → no access: bounded Mac work / wait
M3 Target quality + occupied-context baseline
 ↓
M4 One bottleneck intervention, only if needed
 ↓
M5 Purchase or preserve-budget decision
 ↓ qualified purchase only
M6 Integrate and validate remote machine
 ↓
M7 Publish + seek independent reproduction
 ↓
M8 Close mission / open one evidence-earned successor
```

M2 accounting can begin alongside M1. M3 may run on a rental. Skip M4 if an upstream baseline already qualifies. M5 may reject a candidate early. Publishing negative results does not require M6.

## M0 — Freeze an executable research contract

**Objective:** one runnable task and valid experiment record.

**Effort:** 6–8 hours; inherited-package audit capped at four hours.

**Included work:**

- Obtain two development tasks with repository/start/final commits, original requirement, locked environment and acceptance tests. A synthetic fixture may validate infrastructure while these inputs are pending.
- Export only the starting snapshot; exclude future Git history, final solutions and hidden tests. Confirm start fails and historical final passes the relevant acceptance checks.
- Inventory installed Mac model IDs, representations, runtime versions, AC power and storage. Verify one small inherited result.
- Resolve the template's schema v0.2 versus validator's v0.1-only handling; preserve old records.
- Freeze task budgets, timing definitions, raw/speculative separation and occupied-context semantics.
- Calibrate quality thresholds before candidate comparison. Proposed release defaults: 80% absolute task success and five-percentage-point non-inferiority margin, using one-sided 95% paired uncertainty. These remain provisional until calibrated; inadequate statistical resolution is inconclusive.
- Reconcile subordinate mission protocols, quality documentation and inherited-results register with the revised top-level plan.

**Excluded:** broad runtime engineering, full benchmark corpus, purchases, schema redesign.

**Acceptance:** a populated valid record passes validation and a deliberately invalid record fails; task start/final controls work; solution separation is inspectable; thresholds and task budgets have explicit status.

**Manual test:** run both snapshot controls and inspect exactly what the agent can access.

**Known limitations:** a synthetic task does not close real-task selection; inherited results remain condition-scoped.

**Exit:** M1 has an executable fixture. Keep the real-task gate open if only a synthetic fixture exists.

## M1 — Mac coding-agent vertical slice

**Objective:** a local model receives a task, uses tools, edits code, runs tests and produces an evaluated result.

**Effort:** 6–10 hours. Reassess an installation path after two working sessions without a successful request.

**Included:** one installed Qwen artifact, one serving runtime, one agent client, a thin timing/parser adapter and disposable task workspaces. Begin with short context; extend to 4K/32K within measured memory. Compare non-speculative and production mode without silently changing prefix policy. Run on AC power.

**Excluded:** full DeepSeek on the initial development machine, new agent framework, new paging kernels, large cold-I/O matrices and premature 128K memory stress.

**Acceptance:** one real task attempt has a valid evaluator verdict and transcript, even if the model fails the task. A successful known control demonstrates harness correctness. Record task time, model/tool time, invalid calls, human interventions, tokens, peak memory, swap and context. Repeated runs preserve fixture identity.

**Manual test:** trace request → tools → final diff → hidden-test verdict; confirm no solution leakage.

**Known limitations:** surrogate performance and quality do not establish target feasibility.

**Exit:** working evaluator and Mac baseline. Do not confuse an honestly measured task failure with broken instrumentation.

## M2 — Target artifacts and affordable access

**Objective:** establish exactly what can be tested within current resources.

**Effort:** 6–10 hours plus one prepriced pilot; remote charges remain within the declared experiment budget.

**Included:**

- Preserve M01-E001 as Vision-Exp/Qwen artifact and active-work comparison, with text Flash-0731 as control.
- Pin source revision/license, tensor sizes, converter, representation and runtime commit. Account for routed/shared weights, lookup tables, vision, draft and context state.
- Estimate host/GPU/disk needs including conversion expansion, temporary buffers and headroom.
- Verify actual loading, prompt encoding, reasoning/tool parsing and selected image support. Model-card examples are not tested compatibility.
- Price rentals including CPU/RAM/topology access, setup, downloads, storage and transfers. Start with a small pilot.
- Prepare requirements-based hardware candidates without committing to components.

**Excluded:** benchmark zoo, speculative multi-GPU purchase, assuming hosted API precision equals source precision.

**Acceptance:** each target has an affordable runnable path or a documented access/compatibility gap. An affordable pilot loads one target and completes a short tool roundtrip. Failed access closes as deferred with a reopen trigger.

**Manual test:** inspect real allocated topology and send a request through the intended client.

**Known limitations:** shared cloud CPU tests cannot qualify a home CPU roofline. Vision incompatibility can block Vision-Exp while another explicitly labeled target/control advances.

**Exit:** supported targets enter M3; otherwise preserve funds and continue bounded evaluator work.

## M3 — Quality and occupied-context baseline

**Objective:** establish actual coding capability and latency before optimization.

**Effort:** one to two weekly cycles as access permits; obey the declared experiment budget.

**Included:** preserve M01-E003 for occupied end-to-end measurements and M01-E002 for targeted expert/roofline diagnostics. Begin a small E003 baseline before expanding E002 instrumentation.

- Use two development tasks, then aim initially for ten distinct held-out tasks and three matched attempts per task where affordable. Freeze fixtures before representation comparison.
- Separate same-representation correctness from frozen-source capability. Label uncertain API references as proxies.
- Increase occupied input through 4K, 32K, approximately 65K and 131,072 tokens, with output reserve. Add 196K/256K only when justified.
- Record cold load/prefill/TTFT, warm-turn TTFT/reuse, raw decode, separate speculative output rate, task completion time and tool errors.
- Starting performance protocol: three independent runs per affordable rung, target 512 generated tokens, retain early EOS and run-level median/range.
- Quantify the dominant phase. Mark unavailable counters missing; avoid overlap double-counting.

**Excluded:** unearned kernels/cache changes, context extrapolation, procurement from configured-context results.

**Acceptance:** quality is pass/fail/inconclusive under the frozen protocol; context and memory are measured; dominant latency is quantified or unresolved. Full qualification requires the 131,072-token rung. A short-context pass only unlocks the next rung.

**Manual test:** inspect one full task and one long-context record for retained history, cache reuse and speculative state.

**Known limitations:** inadequate suite size/reference fidelity cannot certify quantization retention; unavailable hardware cannot support a 128K claim.

**Exit:** M4, direct M5 qualification, or a bounded no-purchase finding.

## M4 — One measured intervention

**Objective:** improve the bottleneck that matters end to end.

**Effort:** one week initially; extend once only with new evidence.

**Included:** choose one of kernel/dequantization, affinity/NUMA, GPU placement, prefill/prefix reuse, context/indexer work, representation or expert caching. Caching needs traces and a VRAM opportunity-cost estimate. Prefer an upstream change. Predeclare maximum plausible gain, effort, exact A/B, quality checks and kill rule.

**Excluded:** parallel optimization programs, unapproved structural model changes, buying from microbenchmark gains.

**Acceptance:** paired improvement exceeds noise and preserves quality. Proposed materiality: ≥15% improvement in the constrained end-to-end metric, or a smaller improvement crossing the purchase boundary. Null results close honestly.

**Manual test:** toggle the change and repeat a task plus the relevant context rung.

**Known limitations:** faster kernels need not improve agent time; a new runtime requires a new baseline.

**Exit:** promote, one bounded iterate, park or kill; rerun only affected M3 comparisons.

## M5 — Purchase or preserve the budget

**Objective:** decide about the only planned machine.

**Effort:** 4–6 hours once measurements exist; refresh quotes before purchase.

**Included:** exact compatible CPU/board/DIMM population/GPU/SSD/PSU/cooling/chassis/network BOM, BIOS and vendor-lock checks, slot clearance, cables, condition, taxes and delivery. Link proposed topology to measured topology. Prefer multiple obtainable baskets for a public cost claim; disclose private discounts.

**Excluded:** buying a below-threshold research-only system, sold auctions as live stock, summing nominal device bandwidth, assuming single-socket boards can add a socket.

**Acceptance:** one stated purchase case has matched occupied-context raw performance, quality, useful task latency and a complete delivered quote. If topology differs, obtain matched validation before committing. Otherwise preserve budget with an explicit reopen trigger.

**Manual test:** independently sum the BOM and trace compatibility and performance claims.

**Known limitations:** private discounts do not establish public reproducibility; intermediate cost/performance combinations require a concrete owner decision.

**Exit:** purchase-ready proposal or a closed no-purchase decision. This milestone does not itself place orders.

## M6 — Integrate and validate the remote machine

**Objective:** operate the qualified machine reliably from the Mac.

**Included:** assembly help, component checks, pinned Linux/driver/runtime, private remote access, restart recovery, isolated coding workspaces, telemetry and repeat M3 on the actual machine. Test a sustained task session and restart cycle; record wall power and thermal behavior.

**Excluded:** unauthenticated public API, enterprise orchestration, treating solar availability as continuous free power.

**Acceptance:** remote task execution and recovery work, evidence persists, no blocking stability fault remains, and actual results meet the promised purchase case. A miss triggers remediation/return assessment, not retroactive threshold relaxation.

**Manual test:** restart remotely, reconnect, execute an evaluated task and inspect evidence.

**Known limitations:** physical faults need local assistance; recovery depends on chosen hardware.

**Exit:** validated personal system or documented failed qualification.

## M7 — Publish and seek independent reproduction

**Objective:** make results challengeable.

**Included:** source/runtime pins, commands, quality uncertainty, occupancy, raw logs, distributions, BOM and negative findings. Provide public substitutes for private fixtures with explicit differences. Seek independent reproduction when an actual collaborator is available.

**Excluded:** claiming independent reproduction before it occurs; publishing private code or identifiers.

**Acceptance:** internally replayable reproduction package. Label independent reproduction pending until performed. Breakthrough validation requires every public condition and independent reproduction; near-target and negative findings remain publishable.

**Manual test:** follow instructions in a clean environment, or inspect a complete dry run where hardware is unavailable.

**Known limitations:** external participation is not guaranteed and does not block a correctly labeled internal publication.

## M8 — Close Mission 01

**Objective:** record the best envelope and select one next question.

**Included:** task quality, costs, access limits, context results, failed interventions and unverified claims. Next directions may include longer-context usability, representation, a specific hardware opportunity or a materially better model.

**Excluded:** opening all research domains simultaneously.

**Acceptance:** claims link to evidence, open items have status, and one bounded successor or monitoring decision is recorded.

**Manual test:** a new contributor can explain what worked, why a purchase was rejected if applicable, and what evidence would change that decision.

**Known limitations:** not reaching the breakthrough can still produce a successful research cycle.

## Immediate queue and change control

1. Obtain real repository/commit pairs and freeze the first task controls.
2. Resolve the validator/template mismatch and validate one record.
3. Inventory installed Mac artifacts and verify one small inherited result.
4. Execute one local coding task with timing and evaluator output.
5. Finish target support accounting and price one remote pilot.

Week 1 aims for M0/M1; week 2 for M2; weeks 3–4 for available M3 evidence and an initial M5 decision. These are effort envelopes, not promises of passing hardware-dependent gates.

Update [PROGRESS.md](PROGRESS.md) after coherent stages with evidence, failures, spending and next action. Freeze baseline task/model/runtime combinations for four-week comparison cycles; weekly decision review is 30 minutes.

Reopen architecture for invalid evidence, quality failure, incompatible artifacts, lost access or demonstrated results changing procurement. News and attractive component prices alone enter the backlog. Preserve experiment IDs and historical records. This ordering supersedes the older milestone sequence; reconcile subordinate mission documents in M0.
