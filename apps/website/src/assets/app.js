(() => {
  'use strict';
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const clamp = (n,min=0,max=1) => Math.max(min,Math.min(max,n));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer:fine)').matches;
  const saveData = Boolean(navigator.connection?.saveData);

  // Load optional cinematic enhancement styles. The site remains fully usable if
  // the video assets are absent or the stylesheet cannot be loaded.
  const cinematicStyles = document.createElement('link');
  cinematicStyles.rel = 'stylesheet';
  cinematicStyles.href = '/assets/video-enhancements.css';
  document.head.appendChild(cinematicStyles);

  function buildVideo({className, src, preload='metadata', loop=false, scrub=false}) {
    if (reduceMotion || saveData) return null;
    const video = document.createElement('video');
    video.className = `cinematic-video ${className}`;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted','');
    video.setAttribute('playsinline','');
    video.setAttribute('webkit-playsinline','');
    video.preload = preload;
    if (loop) video.loop = true;
    if (scrub) video.dataset.scrubVideo = 'true';
    const source = document.createElement('source');
    source.src = src;
    source.type = 'video/mp4';
    video.appendChild(source);
    return video;
  }

  function installCinematicVideo({host, className, src, preload='metadata', loop=false, scrub=false, insert='prepend'}) {
    if (!host) return null;
    const video = buildVideo({className,src,preload,loop,scrub});
    if (!video) return null;
    if (insert === 'prepend') host.prepend(video); else host.append(video);
    const ready = () => host.classList.add('cinematic-ready');
    video.addEventListener('loadeddata', ready, {once:true});
    video.addEventListener('canplay', ready, {once:true});
    video.addEventListener('error', () => host.classList.remove('cinematic-ready'));
    return video;
  }

  const heroVisual = $('.hero-visual');
  const heroVideo = installCinematicVideo({
    host: heroVisual,
    className: 'hero-cinematic-video',
    src: '/assets/video/hero-inference.mp4',
    preload: 'metadata',
    loop: true
  });

  const assemblySticky = $('.assembly-sticky');
  const assemblyVideo = installCinematicVideo({
    host: assemblySticky,
    className: 'assembly-cinematic-video',
    src: '/assets/video/datacentre-to-local.mp4',
    preload: 'auto',
    scrub: true
  });

  const closing = $('.closing');
  const closingVideo = installCinematicVideo({
    host: closing,
    className: 'closing-cinematic-video',
    src: '/assets/video/closing-architecture.mp4',
    preload: 'metadata',
    loop: true
  });

  // Ambient loops play only while close to the viewport. If autoplay is blocked,
  // the existing CSS system remains visible as the fallback.
  const ambientVideos = [heroVideo, closingVideo].filter(Boolean);
  if (ambientVideos.length) {
    const videoIO = new IntersectionObserver(entries => {
      for (const e of entries) {
        const video = e.target;
        if (e.isIntersecting) video.play().catch(()=>{});
        else video.pause();
      }
    }, {threshold:.04, rootMargin:'180px 0px'});
    ambientVideos.forEach(v=>videoIO.observe(v));
  }

  const header = $('[data-header]');
  const onScrollHeader = () => header?.classList.toggle('scrolled', scrollY > 18);
  onScrollHeader();
  addEventListener('scroll', onScrollHeader, {passive:true});

  if (!reduceMotion && finePointer) {
    const glow = $('.cursor-glow');
    const heroSystem = $('.hero-system');
    addEventListener('pointermove', e => {
      if (glow) {
        glow.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0) translate(-50%,-50%)`;
        glow.style.opacity = '1';
      }
      if (heroSystem) {
        const nx = (e.clientX / innerWidth - .5);
        const ny = (e.clientY / innerHeight - .5);
        heroSystem.style.setProperty('--rx', `${(-ny*2.2).toFixed(2)}deg`);
        heroSystem.style.setProperty('--ry', `${(nx*3.4).toFixed(2)}deg`);
      }
    }, {passive:true});
  }

  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    }
  }, {threshold:.1, rootMargin:'0px 0px -3% 0px'});
  $$('.reveal').forEach(el => io.observe(el));

  const stackCards = $$('.layer-card');
  const schematicNodes = $$('.schematic-node');
  if (stackCards.length && schematicNodes.length) {
    const layerIO = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const idx = stackCards.indexOf(e.target);
        schematicNodes.forEach((n,i)=>n.classList.toggle('active', i===idx));
      }
    }, {threshold:.58, rootMargin:'-18% 0px -28% 0px'});
    stackCards.forEach(card=>layerIO.observe(card));
    schematicNodes[0]?.classList.add('active');
  }

  const assembly = $('.assembly-section');
  const stack = $('.stack-assembly');
  const cloud = $('.cloud-cluster');
  const gate = $('.api-gate');
  const stream = $('.data-stream');
  const device = $('.device-shell');
  const copy = $('.assembly-copy');
  const layers = $$('.assembly-layer');
  const phases = $$('.assembly-phase-rail [data-phase]');
  let ticking = false;
  let scrubDuration = 0;
  let scrubReady = false;

  if (assemblyVideo) {
    assemblyVideo.addEventListener('loadedmetadata', () => {
      scrubDuration = Number.isFinite(assemblyVideo.duration) ? assemblyVideo.duration : 0;
      scrubReady = scrubDuration > 0;
      if (scrubReady) {
        assemblyVideo.pause();
        try { assemblyVideo.currentTime = Math.min(.001, scrubDuration); } catch (_) {}
      }
      requestAssembly();
    });
  }

  const updateAssembly = () => {
    ticking = false;
    if (!assembly || reduceMotion) return;
    const r = assembly.getBoundingClientRect();
    const travel = Math.max(1, r.height - innerHeight);
    const p = clamp(-r.top / travel);
    const mobile = innerWidth <= 700;
    assembly.style.setProperty('--assembly-p', p.toFixed(4));

    const phase = p < .23 ? 0 : p < .48 ? 1 : p < .74 ? 2 : 3;
    phases.forEach((el,i)=>el.classList.toggle('active',i===phase));

    if (scrubReady && assemblyVideo?.readyState >= 2) {
      const target = p * Math.max(.01, scrubDuration - .04);
      const threshold = Math.max(.025, scrubDuration / 260);
      if (Math.abs(assemblyVideo.currentTime - target) > threshold) {
        try { assemblyVideo.currentTime = target; } catch (_) {}
      }
    }

    // CSS/SVG fallback animation remains live underneath until the video is ready,
    // and is also used automatically for reduced-motion/data-saver/failure cases.
    if (cloud) {
      const fade = 1 - clamp((p-.08)/.35);
      cloud.style.opacity = String(fade);
      cloud.style.transform = mobile
        ? `translate(-50%,-50%) scale(${.78-.08*p})`
        : `translateY(-50%) translateX(${-55*p}px) scale(${1-.08*p})`;
    }
    if (gate) {
      gate.style.opacity = String(1-clamp((p-.16)/.28));
      gate.style.transform = mobile
        ? `translate(-50%,-50%) scale(${1-.12*p})`
        : `translate(-50%,-50%) translateX(${-20*p}px)`;
    }
    if (stream) {
      const vis = clamp((p-.05)/.14) * (1-clamp((p-.7)/.22));
      stream.style.opacity = String(vis);
    }

    const spread = 1-clamp((p-.18)/.38);
    const settle = clamp((p-.34)/.38);
    const ingest = clamp((p-.64)/.3);
    layers.forEach((el,i) => {
      const index = i-2;
      const initial = index * (mobile ? 66 : 96);
      const final = index * (mobile ? 12 : 14);
      const y = initial*spread + final*(1-spread);
      const x = mobile ? 0 : (18*Math.sin((i+1)*1.4)*spread);
      const localScale = 1 - ingest*.12;
      el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${localScale})`;
      el.style.opacity = String(.35 + .65*clamp((p-.1)/.28));
      el.style.setProperty('--layer-glow', String(clamp((settle-.45)/.45)*(1-ingest*.5)));
    });

    if (stack) {
      if (mobile) {
        stack.style.left = '50%';
        stack.style.top = `${51 + 4*ingest}%`;
        stack.style.transform = `translate(-50%,-50%) scale(${1-.18*ingest})`;
      } else {
        stack.style.left = `${49 + 24*ingest}%`;
        stack.style.top = '50%';
        stack.style.transform = `translate(-50%,-50%) scale(${1-.24*ingest})`;
      }
      stack.style.opacity = String(.5+.5*clamp((p-.08)/.25));
    }

    if (device) {
      device.style.opacity = String(.12 + .88*clamp((p-.4)/.45));
      device.style.setProperty('--device-glow', clamp((p-.58)/.3).toFixed(3));
      if (!mobile) device.style.transform = `translateY(-50%) scale(${.92+.08*clamp((p-.42)/.4)})`;
      else device.style.transform = `translate(-50%,-50%) scale(${.92+.08*clamp((p-.42)/.4)})`;
    }

    if (copy) {
      const cp = clamp((p-.78)/.15);
      copy.style.opacity = String(cp);
      copy.style.transform = `translateX(-50%) translateY(${14*(1-cp)}px)`;
    }
  };
  const requestAssembly = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateAssembly);
    }
  };
  updateAssembly();
  addEventListener('scroll', requestAssembly, {passive:true});
  addEventListener('resize', requestAssembly, {passive:true});

  const researchToggle = $('[data-research-toggle]');
  if (researchToggle) {
    researchToggle.addEventListener('click', () => {
      const grid = $('.research-grid');
      const expanded = !grid?.classList.contains('expanded');
      grid?.classList.toggle('expanded', expanded);
      researchToggle.setAttribute('aria-expanded', String(expanded));
      researchToggle.firstChild.textContent = `${expanded ? researchToggle.dataset.close : researchToggle.dataset.open} `;
      const arrow = $('span',researchToggle);
      if (arrow) arrow.textContent = expanded ? '↑' : '↓';
      if (expanded) $$('.research-extra').forEach(el=>el.classList.add('visible'));
      track('research_toggle',{expanded});
    });
  }

  const params = new URLSearchParams(location.search);
  const campaign = {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
    referrer: document.referrer || ''
  };
  for (const form of $$('.aixs-form')) {
    Object.entries(campaign).forEach(([name,value]) => {
      const f = form.elements[name];
      if (f) f.value = value;
    });
    let started = false;
    form.addEventListener('focusin', () => {
      if (!started) {
        started = true;
        track(`${form.dataset.form}_form_start`);
      }
    });
  }

  function track(name, props={}) {
    if (typeof window.plausible === 'function') window.plausible(name, {props});
    window.dataLayer?.push?.({event:name, ...props});
    window.dispatchEvent(new CustomEvent('aixs:analytics', {detail:{name, props}}));
  }
  $$('.track-click').forEach(a => a.addEventListener('click', () => track(a.dataset.event || 'cta_click')));

  $$('.support-type').forEach(btn => btn.addEventListener('click', () => {
    $$('.support-type').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const select = $('.sponsor-form select[name="support_type"]');
    if (select) {
      select.value = btn.dataset.supportType;
      select.focus({preventScroll:true});
    }
  }));

  async function submitForm(form) {
    const status = $('.form-status', form);
    const button = $('button[type="submit"]', form);
    status.className = 'form-status';
    status.textContent = '';
    if (!form.reportValidity()) return;
    if (form.elements.website?.value) { form.reset(); return; }
    const kind = form.dataset.form;
    const endpoint = kind === 'join' ? document.body.dataset.joinEndpoint : document.body.dataset.sponsorEndpoint;
    if (!endpoint) {
      status.classList.add('error');
      status.textContent = status.dataset.endpoint;
      return;
    }
    button.disabled = true;
    button.setAttribute('aria-busy','true');
    try {
      const data = new FormData(form);
      data.append('page_language', document.documentElement.lang);
      data.append('page_url', location.href);
      data.append('submitted_at', new Date().toISOString());
      const res = await fetch(endpoint, {method:'POST', body:data, headers:{'Accept':'application/json'}});
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      status.classList.add('success');
      status.textContent = status.dataset.success;
      track(`${kind}_submit_success`, {utm_source:campaign.utm_source || 'direct'});
      form.reset();
      Object.entries(campaign).forEach(([name,value]) => {
        const f = form.elements[name];
        if (f) f.value = value;
      });
    } catch (err) {
      console.error(err);
      status.classList.add('error');
      status.textContent = document.documentElement.lang === 'it'
        ? 'Invio non riuscito. Riprova tra poco.'
        : 'Submission failed. Please try again shortly.';
      track(`${kind}_submit_error`);
    } finally {
      button.disabled = false;
      button.removeAttribute('aria-busy');
    }
  }
  $$('form[data-form]').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    submitForm(form);
  }));
})();