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
    video.volume = 0;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;
    video.setAttribute('muted','');
    video.setAttribute('playsinline','');
    video.setAttribute('webkit-playsinline','');
    video.setAttribute('autoplay','');
    video.setAttribute('loop','');
    video.preload = eager ? 'auto' : 'metadata';

    const markReady = () => {
      video.classList.add('is-ready');
      host?.classList.add('cinematic-ready');
    };
    const markPlaying = () => {
      markReady();
      video.classList.add('is-playing');
      host?.classList.add('cinematic-playing');
    };
    const markStopped = () => {
      video.classList.remove('is-playing');
      host?.classList.remove('cinematic-playing');
    };

    const start = () => {
      if (video.readyState === 0) {
        try { video.load(); } catch (_) {}
      }
      const p = video.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          if (!video.paused) markPlaying();
        }).catch(() => markStopped());
      } else if (!video.paused) {
        markPlaying();
      }
    };

    video.addEventListener('loadeddata', markReady);
    video.addEventListener('canplay', markReady);
    video.addEventListener('playing', markPlaying);
    video.addEventListener('play', markPlaying);
    video.addEventListener('pause', markStopped);
    video.addEventListener('ended', markStopped);
    video.addEventListener('stalled', markStopped);
    video.addEventListener('error', () => {
      video.classList.remove('is-ready','is-playing');
      host?.classList.remove('cinematic-ready','cinematic-playing');
    });

    try { video.load(); } catch (_) {}
    if (video.readyState >= 2) markReady();
    return start;
  }

  const hero = document.querySelector('.hero-cinematic-video');
  const closing = document.querySelector('.closing-cinematic-video');
  const startHero = prepare(hero, {eager:true});
  const startClosing = prepare(closing, {eager:false});

  // Start the above-the-fold hero immediately. Multiple idempotent attempts cover
  // browsers that delay media readiness until the first paint.
  startHero?.();
  requestAnimationFrame(() => startHero?.());
  setTimeout(() => startHero?.(), 120);
  setTimeout(() => startHero?.(), 600);

  if (closing && startClosing) {
    const io = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) startClosing();
        else entry.target.pause();
      }
    }, {threshold:.01, rootMargin:'700px 0px'});
    io.observe(closing);
  }

  // A first user interaction is also a safe retry point on browsers with unusually
  // strict autoplay behavior. Since the videos are muted, this remains non-intrusive.
  const retryAmbient = () => {
    if (hero && hero.getBoundingClientRect().bottom > 0 && hero.paused) startHero?.();
    if (closing && closing.paused) {
      const r = closing.getBoundingClientRect();
      if (r.top < innerHeight + 700 && r.bottom > -700) startClosing?.();
    }
  };
  addEventListener('pointerdown', retryAmbient, {passive:true, once:true});
  addEventListener('keydown', retryAmbient, {once:true});

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      hero?.pause();
      closing?.pause();
    } else {
      retryAmbient();
    }
  });
})();
