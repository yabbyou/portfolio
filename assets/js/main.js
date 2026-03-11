document.addEventListener('DOMContentLoaded', () => {
  if (window.__initHeroHeaderObserver) {
    window.__initHeroHeaderObserver();
  }

  if (window.__initHeaderCompact) {
    window.__initHeaderCompact();
  }

  // close menu when any menu link is clicked
  document.querySelectorAll('#menu a, .menu-contact-mobile a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
});

const dot = document.querySelector('.scroll-dot');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollTop / maxScroll;
  dot.style.top = progress * 100 + '%';
});

function closeMenu() {
  const menu   = document.getElementById('menu');
  const header = document.querySelector('.header');
  menu.classList.remove('mobile-open');
  header.classList.remove('menu-is-open');
  document.querySelectorAll('.menu-blur-bg').forEach(el => el.remove());
}

/* inject mobile-only Contact item into menu once */
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('menu');
  if (menu && !menu.querySelector('.menu-contact-mobile')) {
    const li = document.createElement('li');
    li.className = 'menu-contact-mobile';
    // get current lang prefix from <html lang> attribute
    const lang = document.documentElement.lang || 'en';
    const base = window.location.pathname.includes('/sv/') ? '/portfolio/sv/' : '/portfolio/en/';
    li.innerHTML = `<a href="${base}#contact"><span class="contact-label">Contact</span></a>`;
    menu.appendChild(li);
    li.querySelector('a').addEventListener('click', () => closeMenu());
  }
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
      requestAnimationFrame(() => {
        const headerHeight = header.offsetHeight;
        const menuHeight   = menu.offsetHeight;

        const blur = document.createElement('div');
        blur.className = 'menu-blur-bg';
        blur.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: ${headerHeight + menuHeight}px;
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          z-index: 998;
          pointer-events: none;
        `;
        document.body.insertBefore(blur, document.body.firstChild);
      });
    } else {
      document.querySelectorAll('.menu-blur-bg').forEach(el => el.remove());
    }
  }
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});