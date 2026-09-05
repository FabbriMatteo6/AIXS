# AIXS cinematic motion brief

The current site should remain CSS/SVG-first for speed. These concepts are optional production assets for a later motion pass. They are designed to work as subtle background video layers or as short scroll-scrub sequences without replacing the readable HTML content.

## Visual language

- Dark graphite / near-black environment, precision-engineering aesthetic.
- No humanoid robots, glowing brains, generic neural-network globes, stock datacentres or cyberpunk city imagery.
- The visual metaphor is **weights, memory, compute and orchestration converging into an accessible local machine**.
- Fine cyan-white light, occasional pale green/warm memory accents, low bloom, restrained contrast.
- Camera motion should be mechanical and deliberate rather than dramatic handheld movement.
- No embedded text in generated footage. HTML overlays provide all typography.

## Asset A — Hero ambient system

**Purpose:** silent 8–10 second seamless loop behind/right of the hero headline.

**Image/keyframe prompt:**

> A premium cinematic technical visualization of an artificial-intelligence inference system floating in a black graphite void. Five thin translucent precision-engineered layers form a compact vertical computational stack, connected by hairline luminous data paths. Sparse packets of light move between model weights, routing, runtime, operating-system scheduling and compute hardware. The stack is surrounded by subtle concentric measurement rings and topology traces, like a scientific instrument rather than a sci-fi hologram. Materials are matte black metal, smoked glass and fine etched circuitry, with restrained ice-cyan illumination, tiny pale-green cache indicators and almost no bloom. Wide negative space on the left for website typography. Museum-grade industrial design, photoreal but abstract, very high detail, no readable text, no logos, no people, no robots, no brain imagery, no neon cyberpunk.

**Animator instructions:**
- 16:10, 1920×1200 master; derive 1280×800 WebM/AV1.
- 8–10 seconds, 24 fps, seamless loop.
- Motion: rings rotate 2–4 degrees/sec; packets travel intermittently; individual layers breathe by less than 2 px equivalent.
- Keep the left 48% visually quiet.
- Target web asset under 3 MB if practical.

## Asset B — Datacentre → local machine transformation

**Purpose:** optional enhancement for the sticky assembly section. CSS/SVG remains the fallback.

**Opening keyframe prompt:**

> A large abstract remote AI datacentre represented as a disciplined grid of dark compute modules in a black technical void. Massive memory capacity is implied through repeated stacked modules and dense microscopic data channels. A narrow luminous API conduit exits the remote cluster toward the centre of frame. Precision scientific visualization, dark graphite, subtle cyan-white light, realistic material detail, low bloom, no text, no logos, no people.

**Midpoint keyframe prompt:**

> The remote AI datacentre is disassembling into five distinct functional layers suspended in space: model weights, orchestration and routing, inference runtime, operating-system scheduling, and hardware compute. Luminous weight blocks and expert packets move through a visible memory hierarchy from storage to system memory to accelerator memory. The scene communicates optimization and data movement with elegant thin trajectories, not explosions. Dark engineering visualization, smoked glass, graphite metal, restrained cyan light, small pale-green cache indicators, no text, no logos.

**Final keyframe prompt:**

> The five optimized AI system layers have converged into a compact low-end consumer workstation or laptop-like machine, shown as an elegant generic device rather than a branded product. The computational stack is visible as translucent layers inside the machine, with model-weight packets circulating locally between storage, memory and compute. The remote datacentre has disappeared into darkness. The final image feels achievable, local and precise rather than futuristic fantasy. Black graphite, fine cyan-white engineering light, subtle warm memory accents, no text, no logo, no people.

**Animator instructions:**
- Produce a 5–6 second deterministic transformation, 24 fps.
- Camera stays nearly locked; movement comes from the system itself.
- Frames 0–35: remote cluster clearly readable.
- Frames 35–80: decomposition into five layers.
- Frames 80–115: visible routing/paging and convergence.
- Frames 115–144: compact local machine locks into final state.
- Avoid particle explosions; use physical translation, folding, routing and compression.
- If used for scroll scrubbing, encode frequent keyframes or export an optimized image sequence. Standard long-GOP streaming video will scrub poorly.

## Asset C — Closing resolved system

**Purpose:** 6–8 second low-motion loop behind the final CTA.

**Image/keyframe prompt:**

> A completed five-layer AI inference architecture suspended inside the silhouette of a compact consumer computer in a vast black technical space. Thin concentric calibration rings and subtle topology lines surround the device. The internal stack is calm and stable, with only a few slow weight packets moving through memory and compute. It should feel like a solved engineering diagram that has become a real machine. Extremely restrained cyan-white illumination, dark graphite and smoked glass, elegant industrial visualization, centred composition, enough negative space around the centre for large website copy, no text, no logos, no people.

**Animator instructions:**
- 16:9 or 16:10, 6–8 second seamless loop.
- Very low motion: slight ring drift, sparse packet flow, soft internal pulse.
- Keep contrast low enough that white CTA text remains dominant.

## Integration rules

1. The site remains fully functional with video disabled.
2. Use `<video muted playsinline loop>` only for ambient hero/closing loops.
3. Prefer `preload="metadata"` and poster images; load video after the initial critical content.
4. Disable cinematic video under `prefers-reduced-motion: reduce` and optionally under data-saver conditions.
5. Do not use generated video as the only explanation of AIXS. The live HTML/SVG architecture must continue to explain the story.
6. For true scroll-scrub, prefer an optimized image sequence/canvas or a video encoded specifically for seeking; test on iPhone Safari and mid-range Android before launch.
