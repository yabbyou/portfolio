// assets/js/header-scroll-direction.js

console.log('[header-scroll-direction] file loaded');

(function () {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 10) {
      // scrolling down
      header.classList.add('is-compact');
    } else {
      // scrolling up
      header.classList.remove('is-compact');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  });
})();
