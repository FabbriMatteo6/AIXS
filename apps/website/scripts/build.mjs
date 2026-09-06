import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { content } from '../src/content.mjs';
import { renderPage, renderPrivacy } from '../src/page.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const dist = path.join(root, 'dist');
const siteUrlRaw = (process.env.SITE_URL || '').trim();
const goatcounterEndpoint = (process.env.GOATCOUNTER_ENDPOINT || '').trim();
const joinFormUrl = (process.env.GOOGLE_JOIN_FORM_URL || '').trim();
const partnerFormUrl = (process.env.GOOGLE_PARTNER_FORM_URL || '').trim();
const cfg = {
  siteUrl: siteUrlRaw ? siteUrlRaw.replace(/\/$/, '') : '',
  joinEndpoint: '',
  sponsorEndpoint: '',
  privacyEmail: (process.env.PRIVACY_EMAIL || '').trim(),
  privacyController: (process.env.PRIVACY_CONTROLLER || '').trim(),
  plausibleDomain: ''
};

const escAttr = (value='') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const heroVideo = `<video class="cinematic-video hero-cinematic-video" data-static-video="hero" autoplay muted loop playsinline webkit-playsinline preload="auto" tabindex="-1" aria-hidden="true" disablepictureinpicture controlslist="nodownload noplaybackrate nofullscreen"><source src="/assets/video/hero-inference.mp4" type="video/mp4"></video>`;
const closingVideos = `<video class="cinematic-video closing-cinematic-video closing-video-a is-active" data-static-video="closing-a" muted playsinline webkit-playsinline preload="metadata" tabindex="-1" aria-hidden="true" disablepictureinpicture controlslist="nodownload noplaybackrate nofullscreen"><source src="/assets/video/closing-architecture.mp4" type="video/mp4"></video><video class="cinematic-video closing-cinematic-video closing-video-b" data-static-video="closing-b" muted playsinline webkit-playsinline preload="metadata" tabindex="-1" aria-hidden="true" disablepictureinpicture controlslist="nodownload noplaybackrate nofullscreen"><source src="/assets/video/closing-architecture.mp4" type="video/mp4"></video>`;

const withCinematicRuntime = html => {
  let out = html.replace(
    '</head>',
    '<link rel="stylesheet" href="/assets/video-enhancements.css"><link rel="stylesheet" href="/assets/external-forms.css"></head>'
  );
  out = out.replace(
    '<div class="hero-visual" aria-hidden="true">',
    `<div class="hero-visual" aria-hidden="true">${heroVideo}`
  );
  out = out.replace(
    '<section class="closing">',
    `<section class="closing">${closingVideos}`
  );
  return out.replace(
    '</body>',
    '<script src="/assets/ambient-video-runtime.js" defer></script></body>'
  );
};

const externalCard = ({lang, kind, url}) => {
  const isIt = lang === 'it';
  const join = kind === 'join';
  const kicker = join ? '01 / APPLICATION' : '02 / PARTNERSHIP';
  const title = join
    ? (isIt ? 'Candidati per contribuire ad AIXS' : 'Apply to contribute to AIXS')
    : (isIt ? 'Parliamo di una partnership' : 'Start a partnership conversation');
  const body = join
    ? (isIt ? 'Il modulo richiede circa 2–3 minuti e si apre in una nuova scheda. Non servono credenziali formali: ci interessa capire cosa vuoi esplorare o costruire.' : 'The form takes about 2–3 minutes and opens in a new tab. There is no formal credential gate: we want to understand what you would like to explore or build.')
    : (isIt ? 'Condividi in circa 3 minuti il tipo di supporto o collaborazione che vuoi esplorare. Il modulo si apre in una nuova scheda.' : 'Share in about 3 minutes what kind of support or collaboration you want to explore. The form opens in a new tab.');
  const cta = join
    ? (isIt ? 'Apri il modulo di candidatura' : 'Open application form')
    : (isIt ? 'Apri il modulo partnership' : 'Open partnership form');
  const event = join ? 'join_form_open' : 'partner_form_open';
  const href = url ? escAttr(url) : '#';
  const disabled = url ? '' : ' aria-disabled="true"';
  const target = url ? ' target="_blank" rel="noopener noreferrer"' : '';
  const note = url
    ? (isIt ? 'Gestito con Google Forms · si apre in una nuova scheda' : 'Handled with Google Forms · opens in a new tab')
    : (isIt ? 'Modulo non ancora configurato' : 'Form not configured yet');
  return `<div class="aixs-form external-form-card reveal"><div class="form-head"><span>${kicker}</span><h3>${title}</h3><p>${body}</p></div><div class="external-form-actions"><a class="btn btn-primary track-click external-form-link" data-event="${event}" href="${href}"${target}${disabled}>${cta} <span>↗</span></a><p>${note}</p></div></div>`;
};

const withGoogleForms = (html, lang) => {
  let out = html
    .replace(/<form class="aixs-form join-form reveal" data-form="join">[\s\S]*?<\/form>/, externalCard({lang, kind:'join', url:joinFormUrl}))
    .replace(/<form class="aixs-form sponsor-form reveal" data-form="sponsor">[\s\S]*?<\/form>/, externalCard({lang, kind:'partner', url:partnerFormUrl}))
    .replace(/<button type="button" class="support-type"[^>]*>([\s\S]*?)<\/button>/g, '<div class="support-type support-type-static">$1</div>');
  return out;
};

const withGoatCounter = html => {
  if (!goatcounterEndpoint) return html;
  const endpoint = escAttr(goatcounterEndpoint.replace(/\/$/, ''));
  let out = html.replace(
    '</head>',
    `<script data-goatcounter="${endpoint}" async src="https://gc.zgo.at/count.js"></script></head>`
  );
  return out.replace(
    '</body>',
    '<script src="/assets/goatcounter-bridge.js" defer></script></body>'
  );
};

const preparePage = c => withGoatCounter(withCinematicRuntime(withGoogleForms(renderPage(c, cfg), c.lang)));

const preparePrivacy = c => {
  let html = renderPrivacy(c, cfg);
  html = html
    .replace(/<section><h2>Launch note<\/h2><p>Complete the provider, retention policy and controller details before public launch\.<\/p><\/section>/, '')
    .replace(/<section><h2>Nota<\/h2><p>Completa provider, retention policy e dettagli del titolare prima del lancio pubblico\.<\/p><\/section>/, '')
    .replace('Forms collect the information you provide voluntarily plus basic campaign attribution.', 'Application and partnership responses are collected through Google Forms. AIXS also uses privacy-friendly aggregate website analytics through GoatCounter.')
    .replace('I moduli raccolgono i dati inseriti volontariamente e i parametri di attribuzione della visita.', 'Le candidature e le richieste di partnership vengono raccolte tramite Google Forms. AIXS utilizza inoltre statistiche aggregate e orientate alla privacy tramite GoatCounter.');
  return html;
};

await fs.rm(dist, { recursive:true, force:true });
await fs.mkdir(path.join(dist,'assets'), { recursive:true });
await fs.mkdir(path.join(dist,'it'), { recursive:true });
await fs.mkdir(path.join(dist,'privacy'), { recursive:true });
await fs.mkdir(path.join(dist,'it','privacy'), { recursive:true });
await fs.cp(path.join(root,'src','assets'), path.join(dist,'assets'), { recursive:true });

await fs.writeFile(path.join(dist,'index.html'), preparePage(content.en));
await fs.writeFile(path.join(dist,'it','index.html'), preparePage(content.it));
await fs.writeFile(path.join(dist,'privacy','index.html'), preparePrivacy(content.en));
await fs.writeFile(path.join(dist,'it','privacy','index.html'), preparePrivacy(content.it));
await fs.writeFile(path.join(dist,'404.html'), preparePage(content.en));

const robots = cfg.siteUrl
  ? `User-agent: *\nAllow: /\nSitemap: ${cfg.siteUrl}/sitemap.xml\n`
  : 'User-agent: *\nAllow: /\n';
await fs.writeFile(path.join(dist,'robots.txt'), robots);

if (cfg.siteUrl) {
  const now = new Date().toISOString().slice(0,10);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n  <url><loc>${cfg.siteUrl}/</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority><xhtml:link rel="alternate" hreflang="en" href="${cfg.siteUrl}/"/><xhtml:link rel="alternate" hreflang="it" href="${cfg.siteUrl}/it/"/></url>\n  <url><loc>${cfg.siteUrl}/it/</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority><xhtml:link rel="alternate" hreflang="en" href="${cfg.siteUrl}/"/><xhtml:link rel="alternate" hreflang="it" href="${cfg.siteUrl}/it/"/></url>\n</urlset>\n`;
  await fs.writeFile(path.join(dist,'sitemap.xml'), sitemap);
}

const launchCheck = [
  ['SITE_URL', cfg.siteUrl],
  ['GOOGLE_JOIN_FORM_URL', joinFormUrl],
  ['GOOGLE_PARTNER_FORM_URL', partnerFormUrl],
  ['PRIVACY_EMAIL', cfg.privacyEmail],
  ['PRIVACY_CONTROLLER', cfg.privacyController]
];
const missing = launchCheck.filter(([,v]) => !v).map(([k]) => k);
console.log(`AIXS static site built at ${dist}`);
if (missing.length) console.log(`Launch configuration still needed: ${missing.join(', ')}`);
if (!goatcounterEndpoint) console.log('Optional analytics configuration missing: GOATCOUNTER_ENDPOINT');
