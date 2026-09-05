(() => {
  'use strict';
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const clamp = (n,min=0,max=1) => Math.max(min,Math.min(max,n));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const header = $('[data-header]');
  const onScrollHeader = () => header?.classList.toggle('scrolled', scrollY > 18);
  onScrollHeader(); addEventListener('scroll', onScrollHeader, {passive:true});

  if (!reduceMotion) {
    const glow = $('.cursor-glow');
    addEventListener('pointermove', e => {
      if (!glow) return;
      glow.style.left = `${e.clientX}px`; glow.style.top = `${e.clientY}px`; glow.style.opacity = '1';
    }, {passive:true});
  }

  const io = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  }, {threshold:.12, rootMargin:'0px 0px -4% 0px'});
  $$('.reveal').forEach(el => io.observe(el));

  const assembly = $('.assembly-section');
  const stack = $('.stack-assembly');
  const cloud = $('.cloud-cluster');
  const stream = $('.data-stream');
  const device = $('.device-shell');
  const copy = $('.assembly-copy');
  const layers = $$('.assembly-layer');
  let ticking = false;
  const updateAssembly = () => {
    ticking = false;
    if (!assembly || reduceMotion) return;
    const r = assembly.getBoundingClientRect();
    const travel = Math.max(1, r.height - innerHeight);
    const p = clamp(-r.top / travel);
    const mobile = innerWidth <= 700;
    if (cloud) {
      cloud.style.opacity = String(clamp(1 - p*1.75));
      if (!mobile) cloud.style.transform = `translateY(-50%) translateX(${-50*p}px) scale(${1-.08*p})`;
    }
    if (stream) stream.style.opacity = String(clamp(1 - Math.abs(p-.32)*1.65));
    if (device) {
      device.style.opacity = String(.2 + .8*p);
      if (!mobile) device.style.transform = `translateY(-50%) scale(${.93+.07*p})`;
      else device.style.transform = `translate(-50%,-50%) scale(${.92+.08*p})`;
    }
    if (stack) {
      if (!mobile) stack.style.left = `${50 + 18*clamp((p-.22)/.78)}%`;
      stack.style.opacity = String(.6 + .4*clamp(p/.25));
      stack.style.transform = `translate(-50%,-50%) scale(${1-.14*clamp((p-.25)/.75)})`;
    }
    layers.forEach((el,i) => {
      const index = i-2;
      const initial = index * (mobile ? 72 : 92);
      const final = index * (mobile ? 13 : 15);
      const settle = clamp((p-.28)/.65);
      const y = initial + (final-initial)*settle;
      const x = mobile ? 0 : 12*Math.sin((i+1)*1.3)*(1-settle);
      el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      el.style.boxShadow = settle > .7 ? `0 0 ${18 + i*3}px rgba(184,243,255,${.025 + i*.006})` : '';
    });
    if (copy) {
      const cp = clamp((p-.68)/.22);
      copy.style.opacity = String(cp);
      copy.style.transform = `translateX(-50%) translateY(${14*(1-cp)}px)`;
    }
  };
  const requestAssembly = () => { if (!ticking) { ticking = true; requestAnimationFrame(updateAssembly); } };
  updateAssembly(); addEventListener('scroll', requestAssembly, {passive:true}); addEventListener('resize', requestAssembly, {passive:true});

  const params = new URLSearchParams(location.search);
  const campaign = {
    utm_source: params.get('utm_source') || '', utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '', utm_content: params.get('utm_content') || '',
    referrer: document.referrer || ''
  };
  for (const form of $$('.aixs-form')) {
    Object.entries(campaign).forEach(([name,value]) => { const f = form.elements[name]; if (f) f.value = value; });
    let started = false;
    form.addEventListener('focusin', () => { if (!started) { started = true; track(`${form.dataset.form}_form_start`); } });
  }

  function track(name, props={}) {
    if (typeof window.plausible === 'function') window.plausible(name, {props});
    window.dataLayer?.push?.({event:name, ...props});
    window.dispatchEvent(new CustomEvent('aixs:analytics', {detail:{name, props}}));
  }
  $$('.track-click').forEach(a => a.addEventListener('click', () => track(a.dataset.event || 'cta_click')));

  $$('.support-type').forEach(btn => btn.addEventListener('click', () => {
    $$('.support-type').forEach(b => b.classList.remove('active')); btn.classList.add('active');
    const select = $('.sponsor-form select[name="support_type"]'); if (select) { select.value = btn.dataset.supportType; select.focus(); }
  }));

  async function submitForm(form) {
    const status = $('.form-status', form); const button = $('button[type="submit"]', form);
    status.className = 'form-status'; status.textContent = '';
    if (!form.reportValidity()) return;
    if (form.elements.website?.value) { form.reset(); return; }
    const kind = form.dataset.form;
    const endpoint = kind === 'join' ? document.body.dataset.joinEndpoint : document.body.dataset.sponsorEndpoint;
    if (!endpoint) { status.classList.add('error'); status.textContent = status.dataset.endpoint; return; }
    button.disabled = true; button.style.opacity = '.55';
    try {
      const data = new FormData(form);
      data.append('page_language', document.documentElement.lang);
      data.append('page_url', location.href);
      data.append('submitted_at', new Date().toISOString());
      const res = await fetch(endpoint, {method:'POST', body:data, headers:{'Accept':'application/json'}});
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      status.classList.add('success'); status.textContent = status.dataset.success;
      track(`${kind}_submit_success`, {utm_source:campaign.utm_source || 'direct'});
      form.reset();
      Object.entries(campaign).forEach(([name,value]) => { const f = form.elements[name]; if (f) f.value = value; });
    } catch (err) {
      console.error(err); status.classList.add('error');
      status.textContent = document.documentElement.lang === 'it' ? 'Invio non riuscito. Riprova tra poco.' : 'Submission failed. Please try again shortly.';
      track(`${kind}_submit_error`);
    } finally { button.disabled = false; button.style.opacity = ''; }
  }
  $$('form[data-form]').forEach(form => form.addEventListener('submit', e => {e.preventDefault(); submitForm(form);}));
})();
