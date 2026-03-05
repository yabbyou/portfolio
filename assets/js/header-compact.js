// assets/js/header-compact.js
// Registers compact header behavior (scroll direction)

console.log('[header-compact] file loaded');

window.__initHeaderCompact = function () {
  console.log('[header-compact] init called');

  const header = document.querySelector('.header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;

    if (Math.abs(delta) < 6) {
      ticking = false;
      return;
    }

    if (delta > 0) {
      header.classList.add('is-compact');
    } else {
      header.classList.remove('is-compact');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  function onScrollThrottled() {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScrollThrottled, { passive: true });
};
