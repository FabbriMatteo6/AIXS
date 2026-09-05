(() => {
  'use strict';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = Boolean(navigator.connection?.saveData);
  if (reduceMotion || saveData) return;

  const hero = document.querySelector('[data-static-video="hero"]');
  const closingA = document.querySelector('[data-static-video="closing-a"]');
  const closingB = document.querySelector('[data-static-video="closing-b"]');

  function forceAmbient(video, hostClass='cinematic-playing') {
    if (!video) return;
    const host = video.parentElement;
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;
    video.controls = false;
    video.removeAttribute('controls');
    video.setAttribute('muted','');
    video.setAttribute('playsinline','');
    video.setAttribute('webkit-playsinline','');
    const start = () => video.play().then(() => host?.classList.add(hostClass)).catch(() => {});
    video.addEventListener('playing', () => host?.classList.add(hostClass));
    video.addEventListener('canplay', start, {once:true});
    if (video.readyState >= 2) start();
    else try { video.load(); } catch (_) {}
    return start;
  }

  const startHero = forceAmbient(hero);
  startHero?.();
  requestAnimationFrame(() => startHero?.());
  setTimeout(() => startHero?.(), 100);
  setTimeout(() => startHero?.(), 450);

  // Retry muted autoplay on the first benign interaction without requiring the user
  // to click the video itself.
  const retry = () => {
    if (hero?.paused) startHero?.();
    if (closingA?.paused && closingA?.parentElement?.getBoundingClientRect().top < innerHeight + 700) {
      closingA.play().catch(()=>{});
    }
  };
  addEventListener('pointermove', retry, {passive:true, once:true});
  addEventListener('scroll', retry, {passive:true, once:true});
  addEventListener('keydown', retry, {once:true});

  if (closingA && closingB) {
    const host = closingA.parentElement;
    [closingA, closingB].forEach(v => {
      v.controls = false;
      v.removeAttribute('controls');
      v.muted = true;
      v.defaultMuted = true;
      v.volume = 0;
      v.playsInline = true;
      v.setAttribute('muted','');
      v.setAttribute('playsinline','');
      v.setAttribute('webkit-playsinline','');
    });

    let active = closingA;
    let standby = closingB;
    let swapping = false;
    const CROSSFADE_SECONDS = 0.55;

    const markPlaying = () => host?.classList.add('cinematic-playing');
    closingA.addEventListener('playing', markPlaying);
    closingB.addEventListener('playing', markPlaying);

    const swap = async () => {
      if (swapping || !active.duration || active.duration < 1) return;
      swapping = true;
      try {
        standby.currentTime = 0;
        await standby.play();
        standby.classList.add('is-active');
        active.classList.remove('is-active');
        const old = active;
        active = standby;
        standby = old;
        setTimeout(() => {
          standby.pause();
          try { standby.currentTime = 0; } catch (_) {}
          swapping = false;
        }, Math.round(CROSSFADE_SECONDS * 1000));
      } catch (_) {
        swapping = false;
      }
    };

    const tick = () => {
      if (!active.paused && Number.isFinite(active.duration) && active.duration > 0) {
        const remaining = active.duration - active.currentTime;
        if (remaining <= CROSSFADE_SECONDS + .08) swap();
      }
      requestAnimationFrame(tick);
    };

    const startClosing = () => {
      if (active.paused) active.play().catch(()=>{});
    };

    const io = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) startClosing();
        else {
          closingA.pause();
          closingB.pause();
        }
      }
    }, {threshold:.01, rootMargin:'700px 0px'});
    io.observe(host);

    requestAnimationFrame(tick);
  }
})();
