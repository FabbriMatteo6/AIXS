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
- `GOOGLE_JOIN_FORM_URL`
- `GOOGLE_PARTNER_FORM_URL`
- `GOATCOUNTER_ENDPOINT` (optional analytics)
- `PRIVACY_EMAIL`
- `PRIVACY_CONTROLLER`

### Google Forms

AIXS keeps the public landing page static and sends contributor applications and partnership requests to two separate Google Forms. Set `GOOGLE_JOIN_FORM_URL` and `GOOGLE_PARTNER_FORM_URL` to the published responder links copied from Google Forms.

The landing page opens each form in a new tab and tracks the outbound CTA click before the visitor leaves AIXS. Google Forms handles the submitted responses and can store them in linked Google Sheets.

### GoatCounter

Set `GOATCOUNTER_ENDPOINT` to the endpoint shown by your GoatCounter site, for example:

```text
https://your-code.goatcounter.com/count
```

The build injects GoatCounter's pageview script. `goatcounter-bridge.js` also forwards AIXS interaction events such as CTA clicks and research interactions as GoatCounter events.

The repository-level `render.yaml` deploys this app from `apps/website/`.

Website-specific launch and motion notes live in [`docs/`](docs/).
