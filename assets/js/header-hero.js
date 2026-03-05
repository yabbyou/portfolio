console.log('[header-hero] loaded');

function heroHeaderObserver() {
  const header = document.querySelector('.header');
  const sentinel = document.querySelector('#hero-end');

  if (!header || !sentinel) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        document.documentElement.classList.remove('scrolled-past-hero');
        header.classList.add('is-hero-active');
        header.classList.remove('is-scrolled');
      } else {
        document.documentElement.classList.add('scrolled-past-hero');
        header.classList.remove('is-hero-active');
        header.classList.add('is-scrolled');
      }
    },
    {
      rootMargin: `-${header.offsetHeight}px 0px 0px 0px`,
      threshold: 0
    }
  );

  observer.observe(sentinel);
}

// expose explicitly
window.__initHeroHeaderObserver = heroHeaderObserver;
