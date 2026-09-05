(() => {
  'use strict';

  const queue = [];
  let attempts = 0;
  let timer = null;

  const eventName = value => String(value || 'event')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'event';

  function send(detail) {
    const name = eventName(detail?.name);
    const gc = window.goatcounter;
    if (!gc || typeof gc.count !== 'function') {
      queue.push({ name });
      scheduleFlush();
      return;
    }
    gc.count({
      path: name,
      title: `AIXS · ${name}`,
      event: true
    });
  }

  function flush() {
    attempts += 1;
    const gc = window.goatcounter;
    if (gc && typeof gc.count === 'function') {
      while (queue.length) {
        const { name } = queue.shift();
        gc.count({
          path: name,
          title: `AIXS · ${name}`,
          event: true
        });
      }
      clearInterval(timer);
      timer = null;
      return;
    }
    if (attempts >= 40) {
      clearInterval(timer);
      timer = null;
      queue.length = 0;
    }
  }

  function scheduleFlush() {
    if (!timer) timer = setInterval(flush, 250);
  }

  window.addEventListener('aixs:analytics', event => send(event.detail));
})();
