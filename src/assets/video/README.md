# Cinematic video assets

Place the three generated MP4 files in this directory with these exact names:

- `hero-inference.mp4` — generated **AI inference system visualization** loop; used in the hero.
- `datacentre-to-local.mp4` — generated **AI datacentre converting to workstation/local machine** animation; scroll-scrubbed in the sticky assembly section.
- `closing-architecture.mp4` — generated **AI architecture loop animation**; used behind the closing CTA.

The website automatically detects successful video loading and fades from the CSS/SVG fallback into the cinematic layer. If a video is unavailable, autoplay is blocked, `prefers-reduced-motion` is enabled, or the browser reports data-saver mode, the existing lightweight CSS/SVG animation remains functional.

For production, retain MP4/H.264 compatibility unless alternative `<source>` formats are added. Keep ambient loops muted and free of embedded text because HTML overlays provide all readable copy.
