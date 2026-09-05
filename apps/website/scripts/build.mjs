import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { content } from '../src/content.mjs';
import { renderPage, renderPrivacy } from '../src/page.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const dist = path.join(root, 'dist');
const siteUrlRaw = (process.env.SITE_URL || '').trim();
const cfg = {
  siteUrl: siteUrlRaw ? siteUrlRaw.replace(/\/$/, '') : '',
  joinEndpoint: (process.env.JOIN_FORM_ENDPOINT || '').trim(),
  sponsorEndpoint: (process.env.SPONSOR_FORM_ENDPOINT || '').trim(),
  privacyEmail: (process.env.PRIVACY_EMAIL || '').trim(),
  privacyController: (process.env.PRIVACY_CONTROLLER || '').trim(),
  plausibleDomain: (process.env.PLAUSIBLE_DOMAIN || '').trim()
};

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

await fs.rm(dist, { recursive:true, force:true });
await fs.mkdir(path.join(dist,'assets'), { recursive:true });
await fs.mkdir(path.join(dist,'it'), { recursive:true });
await fs.mkdir(path.join(dist,'privacy'), { recursive:true });
await fs.mkdir(path.join(dist,'it','privacy'), { recursive:true });
await fs.cp(path.join(root,'src','assets'), path.join(dist,'assets'), { recursive:true });

await fs.writeFile(path.join(dist,'index.html'), withCinematicRuntime(renderPage(content.en, cfg)));
await fs.writeFile(path.join(dist,'it','index.html'), withCinematicRuntime(renderPage(content.it, cfg)));
await fs.writeFile(path.join(dist,'privacy','index.html'), renderPrivacy(content.en, cfg));
await fs.writeFile(path.join(dist,'it','privacy','index.html'), renderPrivacy(content.it, cfg));
await fs.writeFile(path.join(dist,'404.html'), withCinematicRuntime(renderPage(content.en, cfg)));

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
  ['SITE_URL', cfg.siteUrl], ['JOIN_FORM_ENDPOINT', cfg.joinEndpoint], ['SPONSOR_FORM_ENDPOINT', cfg.sponsorEndpoint],
  ['PRIVACY_EMAIL', cfg.privacyEmail], ['PRIVACY_CONTROLLER', cfg.privacyController]
];
const missing = launchCheck.filter(([,v]) => !v).map(([k]) => k);
console.log(`AIXS static site built at ${dist}`);
if (missing.length) console.log(`Launch configuration still needed: ${missing.join(', ')}`);
