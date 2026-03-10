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
  if (window.innerWidth > 768) return;

  const menu   = document.getElementById('menu');
  const header = document.querySelector('.header');
  const isHero = document.documentElement.classList.contains('has-hero') &&
                 !document.documentElement.classList.contains('scrolled-past-hero');

  const isOpening = !menu.classList.contains('mobile-open');

  menu.classList.toggle('mobile-open');
  header.classList.toggle('menu-is-open', isOpening);

  if (isHero) {
    if (isOpening) {
      // single blur element spanning header + menu panel as one surface
      const blur = document.createElement('div');
      blur.className = 'menu-blur-bg';
      const menuHeight = menu.offsetHeight || 120;
      blur.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: calc(var(--header-height) + ${menuHeight}px);
        background: rgba(0, 0, 0, 0.35);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        z-index: 998;
        pointer-events: none;
      `;
      document.body.appendChild(blur);
    } else {
      // remove blur element
      document.querySelectorAll('.menu-blur-bg').forEach(el => el.remove());
    }
  }
}

// close menu on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    const menu   = document.getElementById('menu');
    const header = document.querySelector('.header');
    menu.classList.remove('mobile-open');
    header.classList.remove('menu-is-open');
    document.querySelectorAll('.menu-blur-bg').forEach(el => el.remove());
  }
});