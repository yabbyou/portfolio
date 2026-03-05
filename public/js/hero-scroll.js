// assets/js/header-hero.js

export function initHeroHeader() {
  const header = document.querySelector('.header');
  const hero = document.querySelector('.post-hero');

  if (!header || !hero) return;

  header.classList.add('is-hero');

  const observer = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle('is-hero', entry.isIntersecting);
    },
    {
      rootMargin: `-${header.offsetHeight}px 0px 0px 0px`,
      threshold: 0
    }
  );

  observer.observe(hero);
}
