import { research } from './content.mjs';

const esc=(s='')=>String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const opts=a=>a.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('');
const hidden=`<input type="hidden" name="utm_source"><input type="hidden" name="utm_medium"><input type="hidden" name="utm_campaign"><input type="hidden" name="utm_content"><input type="hidden" name="referrer"><input class="hp" tabindex="-1" autocomplete="off" name="website">`;

function heroSystem(c){
  const labels=c.layers.map((l,i)=>`<div class="hero-layer hero-layer-${i+1}"><span>0${i+1}</span><b>${esc(l.name)}</b><i></i></div>`).join('');
  return `<div class="hero-visual" aria-hidden="true">
    <div class="hero-system">
      <div class="hero-orbit orbit-a"></div><div class="hero-orbit orbit-b"></div><div class="hero-orbit orbit-c"></div>
      <div class="hero-axis axis-x"></div><div class="hero-axis axis-y"></div>
      <div class="hero-packet packet-a"></div><div class="hero-packet packet-b"></div><div class="hero-packet packet-c"></div>
      <div class="hero-core"><span class="hero-core-kicker">LOCAL / SYSTEM</span><strong>AIXS</strong><small>ONE OPTIMIZATION SURFACE</small></div>
      <div class="hero-layer-stack">${labels}</div>
      <div class="hero-telemetry"><span>MODEL FLOW</span><b>LIVE</b></div>
    </div>
  </div>`;
}

function researchCard(r,i,c){
  return `<a class="research-card reveal ${i>5?'research-extra':''}" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">
    <div class="research-top"><span class="research-num">${String(i+1).padStart(2,'0')}</span><span class="research-kind">${esc(r.kind)}</span></div>
    <h3>${esc(r.name)}</h3><p>${esc(r[c.lang])}</p><div class="research-link">${c.lang==='it'?'Apri fonte':'Open source'} <span>↗</span></div>
  </a>`;
}

export function renderPage(c,cfg){
  const root=c.lang==='it'?'/it/':'/';
  const privacy=c.lang==='it'?'/it/privacy/':'/privacy/';
  const canonical=cfg.siteUrl?`${cfg.siteUrl}${c.lang==='it'?'/it/':'/'}`:'';
  const og=cfg.siteUrl?`${cfg.siteUrl}/assets/aixs-og.png`:'/assets/aixs-og.png';
  const layers=c.layers.map(l=>`<article class="layer-card reveal"><div class="layer-index">${l.n}</div><div class="layer-name">${esc(l.name)}</div><div class="layer-body"><h3>${esc(l.title)}</h3><p>${esc(l.body)}</p></div></article>`).join('');
  const researchCards=research.map((r,i)=>researchCard(r,i,c)).join('');
  const steps=c.missionSteps.map(s=>`<div class="mission-step reveal"><span class="mission-number">${s[0]}</span><h3>${esc(s[1])}</h3><p>${esc(s[2])}</p></div>`).join('');
  const targets=c.targetCards.map(t=>`<div class="target-card reveal"><span>${esc(t[0])}</span><p>${esc(t[1])}</p></div>`).join('');
  const tracks=c.joinTracks.map(x=>`<span class="track-pill">${esc(x)}</span>`).join('');
  const supports=c.supportTypes.map((x,i)=>`<button type="button" class="support-type" data-support-type="${esc(x[0])}"><span>0${i+1}</span><strong>${esc(x[0])}</strong><small>${esc(x[1])}</small></button>`).join('');
  const faqs=c.faqs.map((x,i)=>`<details class="faq-item reveal" ${i===0?'open':''}><summary><span>0${i+1}</span>${esc(x[0])}<i></i></summary><p>${esc(x[1])}</p></details>`).join('');
  const analytics=cfg.plausibleDomain?`<script>window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}</script><script defer data-domain="${esc(cfg.plausibleDomain)}" src="https://plausible.io/js/script.js"></script>`:'';
  const stackTitle=c.lang==='it'?'Cinque livelli. Un’unica superficie di ottimizzazione.':'Five layers. One optimization surface.';
  const researchOpen=c.lang==='it'?'Esplora tutta la ricerca':'Explore all research';
  const researchClose=c.lang==='it'?'Mostra meno':'Show less';
  const optionalLabel=c.lang==='it'?'Aggiungi esperienza e disponibilità (opzionale)':'Add experience & availability (optional)';
  const joinSignals=c.lang==='it'?['Nessun gate di credenziali','Beginner benvenuti','Async friendly','Ricerca aperta']:['No credential gate','Beginners welcome','Async friendly','Open research'];
  const joinSignalHtml=joinSignals.map(x=>`<span>${esc(x)}</span>`).join('');

  return `<!doctype html><html lang="${c.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>${esc(c.title)}</title><meta name="description" content="${esc(c.description)}"><meta name="robots" content="index,follow,max-image-preview:large"><meta name="theme-color" content="#07090b">${canonical?`<link rel="canonical" href="${canonical}">`:''}<link rel="alternate" hreflang="en" href="${cfg.siteUrl?cfg.siteUrl+'/':'/'}"><link rel="alternate" hreflang="it" href="${cfg.siteUrl?cfg.siteUrl+'/it/':'/it/'}"><meta property="og:type" content="website"><meta property="og:site_name" content="AIXS"><meta property="og:title" content="${esc(c.title)}"><meta property="og:description" content="${esc(c.description)}"><meta property="og:image" content="${og}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${og}"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/styles.css">${analytics}<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'WebSite',name:'AIXS',description:c.description,inLanguage:c.lang,...(cfg.siteUrl?{url:cfg.siteUrl}:{})})}</script></head>
  <body data-join-endpoint="${esc(cfg.joinEndpoint)}" data-sponsor-endpoint="${esc(cfg.sponsorEndpoint)}"><a class="skip-link" href="#main">Skip to content</a><div class="noise"></div><div class="cursor-glow"></div>
  <header class="site-header" data-header><a class="brand" href="${root}"><span>AI</span><span class="brand-x">X</span><span>S</span></a><nav><a href="#thesis">${esc(c.nav.thesis)}</a><a href="#stack">${esc(c.nav.stack)}</a><a href="#research">${esc(c.nav.research)}</a><a href="#mission">${esc(c.nav.mission)}</a></nav><div class="header-actions"><a class="language" href="${c.langHref}">${c.language}</a><a class="header-cta track-click" data-event="join_cta_click" href="#join">${esc(c.nav.join)}</a></div></header>
  <main id="main">
    <section class="hero"><div class="hero-grid"></div><div class="orb orb-a"></div><div class="orb orb-b"></div><div class="hero-content"><div class="eyebrow reveal">${esc(c.heroEyebrow)}</div><div class="hero-wordmark"><span>AI</span><em>X</em><span>S</span></div><p class="tagline reveal">${esc(c.tagline)}</p><h1><span>${esc(c.heroTitleA)}</span><strong>${esc(c.heroTitleB)}</strong></h1><p class="hero-copy reveal">${esc(c.heroCopy)}</p><div class="hero-actions reveal"><a class="btn btn-primary track-click" data-event="join_cta_click" href="#join">${esc(c.joinCta)} <span>↘</span></a><a class="btn btn-ghost track-click" data-event="support_cta_click" href="#support">${esc(c.supportCta)} <span>↘</span></a></div><div class="hero-meta reveal"><div class="chips">${c.chips.map(x=>`<span class="chip">${esc(x)}</span>`).join('')}</div><p>${esc(c.heroNote)}</p></div></div>${heroSystem(c)}<div class="scroll-cue">SCROLL <span></span></div></section>

    <section class="question section-pad" id="thesis"><div class="section-head"><div><div class="eyebrow">${esc(c.problemEyebrow)}</div><h2>${esc(c.problemTitle)}</h2></div><p>${esc(c.problemCopy)}</p></div><div class="thesis-block reveal"><div class="eyebrow">${esc(c.thesisEyebrow)}</div><h2>${esc(c.thesisTitle)}</h2><p>${esc(c.thesisCopy)}</p></div></section>

    <section class="assembly-section" aria-label="AIXS system assembly"><div class="assembly-sticky"><div class="assembly-label">${esc(c.assemblyLabel)}</div>
      <div class="assembly-phase-rail" aria-hidden="true"><span data-phase="0">01 REMOTE</span><span data-phase="1">02 DECOMPOSE</span><span data-phase="2">03 OPTIMIZE</span><span data-phase="3">04 LOCAL</span></div>
      <div class="cloud-cluster"><div class="server-grid">${'<i></i>'.repeat(12)}</div><span class="cluster-label">REMOTE COMPUTE</span></div>
      <div class="api-gate"><span>API</span></div>
      <div class="data-stream">${'<i></i>'.repeat(5)}</div>
      <div class="stack-assembly">${c.layers.map((l,i)=>`<div class="assembly-layer layer-${i+1}"><span>0${i+1}</span><b>${esc(l.name)}</b><small>${i===0?'WEIGHTS':i===1?'ROUTING':i===2?'RUNTIME':i===3?'SCHEDULING':'COMPUTE'}</small></div>`).join('')}</div>
      <div class="device-shell"><div class="screen"><div class="screen-core">AIXS</div><div class="screen-lines"><i></i><i></i><i></i></div></div><div class="base"></div><span class="device-label">LOCAL MACHINE</span></div>
      <div class="assembly-copy"><span>ONE SYSTEM</span><strong>MODEL × HARNESS × SOFTWARE × OS × HARDWARE</strong><p>${c.lang==='it'?'Portare il calcolo verso i pesi. Portare il sistema verso la macchina locale.':'Move compute toward the weights. Move the system toward the local machine.'}</p></div>
    </div></section>

    <section class="stack section-pad" id="stack"><div class="section-head"><div><div class="eyebrow">05 INTERLOCKING LAYERS</div><h2>${esc(stackTitle)}</h2></div><p>${esc(c.thesisCopy)}</p></div><div class="stack-layout"><div class="stack-schematic" aria-hidden="true">${c.layers.map((l,i)=>`<div class="schematic-node" data-layer-index="${i}"><span>0${i+1}</span><b>${esc(l.name)}</b></div>`).join('')}<div class="schematic-spine"></div></div><div class="layers-list">${layers}</div></div></section>

    <section class="research section-pad" id="research"><div class="section-head"><div><div class="eyebrow">${esc(c.researchEyebrow)}</div><h2>${esc(c.researchTitle)}</h2></div><p>${esc(c.researchCopy)}</p></div><div class="research-hint">${esc(c.researchHint)}</div><div class="research-grid">${researchCards}</div><div class="research-more"><button class="btn btn-ghost" type="button" data-research-toggle data-open="${esc(researchOpen)}" data-close="${esc(researchClose)}" aria-expanded="false">${esc(researchOpen)} <span>↓</span></button></div></section>

    <section class="mission section-pad" id="mission"><div class="mission-intro"><div class="eyebrow">${esc(c.missionEyebrow)}</div><h2>${esc(c.missionTitle)}</h2><p>${esc(c.missionCopy)}</p></div><div class="mission-grid">${steps}</div><div class="target-grid">${targets}</div></section>

    <section class="join section-pad" id="join"><div class="join-copy"><div class="eyebrow">${esc(c.joinEyebrow)}</div><h2>${esc(c.joinTitle)}</h2><p>${esc(c.joinCopy)}</p><div class="join-signals">${joinSignalHtml}</div><div class="track-pills">${tracks}</div></div><form class="aixs-form join-form reveal" data-form="join"><div class="form-head"><span>01 / APPLICATION</span><h3>${esc(c.joinForm.title)}</h3><p>${esc(c.joinForm.intro)}</p></div><div class="form-grid"><label><span>${esc(c.joinForm.name)}</span><input name="name" autocomplete="name" required></label><label><span>${esc(c.joinForm.email)}</span><input name="email" type="email" autocomplete="email" required></label><label><span>${esc(c.joinForm.profile)} <small>${c.lang==='it'?'opzionale':'optional'}</small></span><input name="profile" inputmode="url"></label><label><span>${esc(c.joinForm.track)}</span><select name="track" required><option value="">—</option>${opts(c.joinTracks)}</select></label><label class="span-2"><span>${esc(c.joinForm.contribution)}</span><textarea name="contribution" rows="5" required></textarea></label></div><details class="form-optional"><summary>${esc(optionalLabel)} <span>+</span></summary><div class="form-grid optional-grid"><label><span>${esc(c.joinForm.level)}</span><select name="level"><option value="">—</option>${opts(c.levels)}</select></label><label><span>${esc(c.joinForm.availability)}</span><select name="availability"><option value="">—</option>${opts(c.availability)}</select></label></div></details>${hidden}<label class="consent"><input type="checkbox" required><span>${esc(c.joinForm.consent)} <a href="${privacy}">${esc(c.privacy)}</a>.</span></label><div class="form-footer"><button class="btn btn-primary" type="submit">${esc(c.joinForm.submit)} <span>↗</span></button><div class="form-status" data-success="${esc(c.joinForm.success)}" data-endpoint="${esc(c.joinForm.endpoint)}"></div></div></form></section>

    <section class="support section-pad" id="support"><div class="support-top"><div><div class="eyebrow">${esc(c.supportEyebrow)}</div><h2>${esc(c.supportTitle)}</h2></div><p>${esc(c.supportCopy)}</p></div><div class="support-layout"><div class="support-types">${supports}</div><form class="aixs-form sponsor-form reveal" data-form="sponsor"><div class="form-head"><span>02 / PARTNERSHIP</span><h3>${esc(c.sponsorForm.title)}</h3></div><label><span>${esc(c.sponsorForm.org)}</span><input name="organisation" required></label><label><span>${esc(c.sponsorForm.email)}</span><input name="email" type="email" required></label><label><span>${esc(c.sponsorForm.type)}</span><select name="support_type" required><option value="">—</option>${opts(c.supportTypes.map(x=>x[0]))}</select></label><label><span>${esc(c.sponsorForm.message)}</span><textarea name="message" rows="5" required></textarea></label>${hidden}<label class="consent"><input type="checkbox" required><span>${esc(c.sponsorForm.consent)} <a href="${privacy}">${esc(c.privacy)}</a>.</span></label><div class="form-footer"><button class="btn btn-primary" type="submit">${esc(c.sponsorForm.submit)} <span>↗</span></button><div class="form-status" data-success="${esc(c.sponsorForm.success)}" data-endpoint="${esc(c.sponsorForm.endpoint)}"></div></div></form></div></section>

    <section class="faq section-pad"><div class="faq-head"><div class="eyebrow">${esc(c.faqEyebrow)}</div><h2>${esc(c.faqTitle)}</h2></div><div class="faq-list">${faqs}</div></section>

    <section class="closing"><div class="closing-grid"></div><div class="closing-system" aria-hidden="true"><div class="closing-ring"></div><div class="closing-stack">${c.layers.map((l,i)=>`<i style="--i:${i}"></i>`).join('')}</div></div><div class="eyebrow">AIXS · ${esc(c.tagline)}</div><h2>${esc(c.heroTitleA)}<br><strong>${esc(c.heroTitleB)}</strong></h2><div class="hero-actions"><a class="btn btn-primary" href="#join">${esc(c.joinCta)} ↗</a><a class="btn btn-ghost" href="#support">${esc(c.supportCta)} ↗</a></div></section>
  </main>
  <footer class="footer"><div><a class="brand footer-brand" href="${root}">AI<span class="brand-x">X</span>S</a><p>${esc(c.footerNote)}</p></div><div class="footer-links"><a href="https://github.com/FabbriMatteo6/AIXS" target="_blank" rel="noopener">${esc(c.github)} ↗</a><a href="${privacy}">${esc(c.privacy)}</a><a href="${c.langHref}">${c.language}</a></div></footer><script src="/assets/app.js" defer></script></body></html>`;
}

export function renderPrivacy(c,cfg){
  const home=c.lang==='it'?'/it/':'/';
  const email=cfg.privacyEmail||'[configure PRIVACY_EMAIL]';
  const controller=cfg.privacyController||'AIXS community initiative';
  const rows=c.lang==='it'?
    [['Titolare e contatto',`${controller}. Contatto privacy: ${email}.`],['Dati raccolti','I moduli raccolgono i dati inseriti volontariamente e i parametri di attribuzione della visita.'],['Finalità','Usiamo i dati solo per gestire partecipazione, supporto o partnership AIXS. Non vendiamo questi dati.'],['Diritti',`Per accesso, rettifica o cancellazione scrivi a ${email}.`],['Nota','Completa provider, retention policy e dettagli del titolare prima del lancio pubblico.']]:
    [['Controller and contact',`${controller}. Privacy contact: ${email}.`],['Data collected','Forms collect the information you provide voluntarily plus basic campaign attribution.'],['Purpose','We use this data only to manage AIXS participation, support or partnership requests. We do not sell it.'],['Your rights',`For access, correction or deletion contact ${email}.`],['Launch note','Complete the provider, retention policy and controller details before public launch.']];
  return `<!doctype html><html lang="${c.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Privacy — AIXS</title><meta name="robots" content="noindex,follow"><link rel="stylesheet" href="/assets/styles.css"></head><body class="privacy-page"><header class="site-header solid"><a class="brand" href="${home}">AI<span class="brand-x">X</span>S</a><a class="header-cta" href="${home}">← ${c.lang==='it'?'Torna al sito':'Back to site'}</a></header><main class="privacy-main"><div class="eyebrow">AIXS · PRIVACY</div><h1>${c.lang==='it'?'Informativa privacy':'Privacy notice'}</h1>${rows.map(r=>`<section><h2>${esc(r[0])}</h2><p>${esc(r[1])}</p></section>`).join('')}</main></body></html>`;
}
