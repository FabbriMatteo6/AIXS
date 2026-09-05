# AIXS — first-week launch plan

## Goal

Target: **50 qualified requests to join or contribute within seven days.** This is an acquisition target, not something SEO can guarantee. A new domain has little search authority in week one, so distribution and conversion matter more than organic rankings at launch.

## Funnel

Measure daily: landing-page visits → Join CTA clicks → form starts → successful applications. The site preserves UTM source/medium/campaign/content and referrer in both forms, and exposes lightweight analytics events for CTA clicks, form starts and successful submissions.

## Before launch

- Deploy the static build and set `SITE_URL`.
- Configure and test `JOIN_FORM_ENDPOINT` and `SPONSOR_FORM_ENDPOINT`.
- Complete `PRIVACY_EMAIL` and `PRIVACY_CONTROLLER`.
- Test English and Italian pages on desktop and mobile.
- Verify social sharing metadata before posting publicly.
- Add the live URL to the GitHub repository description.

## Reddit launch angle

Lead with the research question, not a claim that AIXS has already solved local frontier inference. A good framing is:

> Can frontier-class MoE inference become practical on consumer hardware if we optimize the entire stack together? AIXS is assembling an open research group to test it.

Explain that Mission 01 is deliberately conservative: select an open-weight MoE, establish a reproducible consumer-hardware baseline, measure it honestly, then test hypotheses across Model × Harness × Software × OS × Hardware.

Use tagged links such as `/?utm_source=reddit&utm_medium=community&utm_campaign=launch_week` so applications can be attributed to the channel.

## Week-one behavior

- Adapt the post to each community and check current self-promotion rules.
- Ask for criticism of the research plan, not only signups.
- Answer technical objections with sources and measurements.
- Share to high-fit local-LLM, ML, open-source, systems, hardware and homelab communities where allowed.
- Add direct outreach to labs, university groups, makerspaces and relevant open-source communities.

## Conversion experiments

Change one variable at a time: hero CTA wording, application length, amount of research proof above the fold, and beginner-friendly contributor messaging. If form starts are strong but completions are weak, shorten the form before redesigning the whole site.

## Durable SEO

After launch, build authority with useful indexable material: benchmark methodology, exact hardware/software experiment reports, comparisons of expert-streaming approaches, a maintained research map and reproducible negative results. This will outperform keyword stuffing on a new domain.
