# AIXS quality protocol

Performance improvements are valid only when the tested model behavior remains within the declared quality boundary.

AIXS uses two levels of evaluation so routine systems work stays fast while public/representation claims remain defensible.

## Reference layers

Use two distinct references:

1. **Same representation + reference runtime** — detects implementation/kernel/runtime regressions.
2. **Frozen source-model lineage** — measures capability loss introduced by quantization or representation changes.

Do not use one reference for both questions.

## Fast gate

Run during kernel/runtime iteration.

Minimum scope:

- deterministic operator or short-generation checks where practical;
- routing/expert-ID sanity for MoE changes;
- teacher-forced logits/logprobs on a small fixed code+prose corpus;
- small fixed coding set;
- small fixed reasoning set;
- at least two long-context retrieval probes when context behavior could change.

The purpose is to catch large regressions quickly, not to claim precise retained-capability percentages.

## Release gate

Run for:

- representation/quantization changes;
- public performance claims;
- candidate Mission 01 winners;
- structural model changes.

Provisional suite:

- held-out teacher-forced code/prose corpus;
- fixed coding tasks with executable tests;
- fixed reasoning tasks;
- tool/schema/multi-step cases;
- long-context retrieval + multi-evidence tasks at 32K and ≥128K;
- several fixed realistic repository/agent tasks with identical tool/time budgets.

Report paired results and uncertainty where practical.

## Acceptance

Do not freeze a universal KL/logit threshold before calibration.

For task families, a provisional rule is:

> no material degradation versus the frozen source/reference within the resolution of the small suite; ambiguous results expand the test rather than silently pass.

Structural model changes require an explicit accepted degradation budget before the experiment begins.

## Reproducibility controls

Record:

- prompt/template;
- token/reasoning budget;
- temperature/seed;
- tool permissions;
- evaluator version;
- source/reference revision;
- representation and runtime commit.

Quality methodology may evolve, but historical experiment interpretation must remain reproducible.
