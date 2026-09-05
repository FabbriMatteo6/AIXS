(() => {
  'use strict';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = Boolean(navigator.connection?.saveData);
  if (reduceMotion || saveData) return;

  function prepare(video, {eager=false} = {}) {
    if (!video) return null;
    const host = video.parentElement;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;
    video.setAttribute('muted','');
    video.setAttribute('playsinline','');
    video.setAttribute('webkit-playsinline','');
    video.setAttribute('autoplay','');
    video.setAttribute('loop','');
    if (eager) video.preload = 'auto';

    const markReady = () => {
      video.classList.add('is-ready');
      host?.classList.add('cinematic-ready');
    };

    const start = () => {
      const p = video.play();
      if (p && typeof p.then === 'function') {
        p.then(markReady).catch(() => {});
      }
    };

    video.addEventListener('loadeddata', markReady);
    video.addEventListener('canplay', markReady);
    video.addEventListener('playing', markReady);
    video.addEventListener('error', () => {
      video.classList.remove('is-ready');
      host?.classList.remove('cinematic-ready');
    });

    try { video.load(); } catch (_) {}
    if (video.readyState >= 2) markReady();
    return start;
  }

  const hero = document.querySelector('.hero-cinematic-video');
  const closing = document.querySelector('.closing-cinematic-video');
  const startHero = prepare(hero, {eager:true});
  const startClosing = prepare(closing, {eager:false});

  // The hero is already visible at first paint, so start it immediately instead of
  // waiting for an IntersectionObserver callback that can be delayed on some browsers.
  startHero?.();
  requestAnimationFrame(() => startHero?.());
  setTimeout(() => startHero?.(), 120);

  if (closing && startClosing) {
    const io = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) startClosing();
        else entry.target.pause();
      }
    }, {threshold:.02, rootMargin:'500px 0px'});
    io.observe(closing);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      hero?.pause();
      closing?.pause();
    } else {
      if (hero && hero.getBoundingClientRect().bottom > 0) startHero?.();
      if (closing) {
        const r = closing.getBoundingClientRect();
        if (r.top < innerHeight + 500 && r.bottom > -500) startClosing?.();
      }
    }
  });
})();
