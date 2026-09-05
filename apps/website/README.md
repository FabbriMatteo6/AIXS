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
- `WEB3FORMS_ACCESS_KEY`
- `GOATCOUNTER_ENDPOINT` (optional analytics)
- `PRIVACY_EMAIL`
- `PRIVACY_CONTROLLER`

### Web3Forms

AIXS submits both the contributor and partnership forms to `https://api.web3forms.com/submit`. The build injects `WEB3FORMS_ACCESS_KEY` into both forms, while adding a different subject and `form_type` value so the submissions remain easy to distinguish.

The access key is necessarily present in the generated client-side HTML; treat it as a form-routing identifier, not as a server secret.

### GoatCounter

Set `GOATCOUNTER_ENDPOINT` to the endpoint shown by your GoatCounter site, for example:

```text
https://your-code.goatcounter.com/count
```

The build injects GoatCounter's pageview script. `goatcounter-bridge.js` also forwards AIXS conversion events such as CTA clicks, form starts, successful submissions, and submission errors as GoatCounter events.

The repository-level `render.yaml` deploys this app from `apps/website/`.

Website-specific launch and motion notes live in [`docs/`](docs/).
