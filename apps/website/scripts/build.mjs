import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { content } from '../src/content.mjs';
import { renderPage, renderPrivacy } from '../src/page.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const dist = path.join(root, 'dist');
const siteUrlRaw = (process.env.SITE_URL || '').trim();
const web3formsAccessKey = (process.env.WEB3FORMS_ACCESS_KEY || '').trim();
const goatcounterEndpoint = (process.env.GOATCOUNTER_ENDPOINT || '').trim();
const web3formsEndpoint = 'https://api.web3forms.com/submit';
const cfg = {
  siteUrl: siteUrlRaw ? siteUrlRaw.replace(/\/$/, '') : '',
  joinEndpoint: web3formsAccessKey ? web3formsEndpoint : '',
  sponsorEndpoint: web3formsAccessKey ? web3formsEndpoint : '',
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
    '<link rel="stylesheet" href="/assets/video-enhancements.css"></head>'
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

const withWeb3Forms = (html, lang) => {
  if (!web3formsAccessKey) return html;
  const accessKey = escAttr(web3formsAccessKey);
  const joinSubject = lang === 'it' ? 'AIXS — Nuova candidatura' : 'AIXS — New contributor application';
  const sponsorSubject = lang === 'it' ? 'AIXS — Nuova richiesta partnership' : 'AIXS — New partnership inquiry';
  const common = `<input type="hidden" name="access_key" value="${accessKey}"><input type="hidden" name="from_name" value="AIXS website">`;
  return html
    .replace(
      '<form class="aixs-form join-form reveal" data-form="join">',
      `<form class="aixs-form join-form reveal" data-form="join">${common}<input type="hidden" name="subject" value="${escAttr(joinSubject)}"><input type="hidden" name="form_type" value="join">`
    )
    .replace(
      '<form class="aixs-form sponsor-form reveal" data-form="sponsor">',
      `<form class="aixs-form sponsor-form reveal" data-form="sponsor">${common}<input type="hidden" name="subject" value="${escAttr(sponsorSubject)}"><input type="hidden" name="form_type" value="sponsor">`
    );
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

const preparePage = c => withGoatCounter(withCinematicRuntime(withWeb3Forms(renderPage(c, cfg), c.lang)));

await fs.rm(dist, { recursive:true, force:true });
await fs.mkdir(path.join(dist,'assets'), { recursive:true });
await fs.mkdir(path.join(dist,'it'), { recursive:true });
await fs.mkdir(path.join(dist,'privacy'), { recursive:true });
await fs.mkdir(path.join(dist,'it','privacy'), { recursive:true });
await fs.cp(path.join(root,'src','assets'), path.join(dist,'assets'), { recursive:true });

await fs.writeFile(path.join(dist,'index.html'), preparePage(content.en));
await fs.writeFile(path.join(dist,'it','index.html'), preparePage(content.it));
await fs.writeFile(path.join(dist,'privacy','index.html'), renderPrivacy(content.en, cfg));
await fs.writeFile(path.join(dist,'it','privacy','index.html'), renderPrivacy(content.it, cfg));
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
  ['WEB3FORMS_ACCESS_KEY', web3formsAccessKey],
  ['PRIVACY_EMAIL', cfg.privacyEmail],
  ['PRIVACY_CONTROLLER', cfg.privacyController]
];
const missing = launchCheck.filter(([,v]) => !v).map(([k]) => k);
console.log(`AIXS static site built at ${dist}`);
if (missing.length) console.log(`Launch configuration still needed: ${missing.join(', ')}`);
if (!goatcounterEndpoint) console.log('Optional analytics configuration missing: GOATCOUNTER_ENDPOINT');
