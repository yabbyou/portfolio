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

function toggleMenu(){
  const menu=document.getElementById("menu");
  menu.classList.toggle("mobile-open");
}