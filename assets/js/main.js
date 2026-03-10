document.addEventListener('DOMContentLoaded', () => {
  if (window.__initHeroHeaderObserver) {
    window.__initHeroHeaderObserver();
  }

  if (window.__initHeaderCompact) {
    window.__initHeaderCompact();
  }
});

const dot = document.querySelector('.scroll-dot');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = scrollTop / maxScroll;

  dot.style.top = progress * 100 + '%';
});

function toggleMenu() {
  // no-op on desktop — hamburger should not trigger panel above 768px
  if (window.innerWidth > 768) return;

  const menu   = document.getElementById('menu');
  const header = document.querySelector('.header');

  const isOpening = !menu.classList.contains('mobile-open');

  menu.classList.toggle('mobile-open');
  header.classList.toggle('menu-is-open', isOpening);
}

// close menu if window is resized to desktop width
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    const menu   = document.getElementById('menu');
    const header = document.querySelector('.header');
    menu.classList.remove('mobile-open');
    header.classList.remove('menu-is-open');
  }
});