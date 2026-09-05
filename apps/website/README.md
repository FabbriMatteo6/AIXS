# AIXS website

This directory contains the public AIXS landing page. It is intentionally isolated from the research code so the repository reads first as an AI-systems research monorepo, not as a web project.

## Local development

```bash
npm ci
npm run build
npx serve dist
```

`npm run check` validates the browser JavaScript and performs a production build.

## Build-time configuration

The static generator reads these environment variables during build:

- `SITE_URL`
- `JOIN_FORM_ENDPOINT`
- `SPONSOR_FORM_ENDPOINT`
- `PRIVACY_EMAIL`
- `PRIVACY_CONTROLLER`
- `PLAUSIBLE_DOMAIN` (optional)

The repository-level `render.yaml` deploys this app from `apps/website/`.

Website-specific launch and motion notes live in [`docs/`](docs/).
