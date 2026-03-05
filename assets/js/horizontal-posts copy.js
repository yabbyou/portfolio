// horizontal-posts.js
console.log('[horizontal-posts] script loaded');

const wrappers = document.querySelectorAll('.horizontal-posts');

wrappers.forEach(wrapper => {
  const scroller = wrapper.querySelector('main.main');
  const leftBtn = wrapper.querySelector('.scroll-btn.left');
  const rightBtn = wrapper.querySelector('.scroll-btn.right');

  if (!scroller || !leftBtn || !rightBtn) {
    console.warn('[horizontal-posts] missing elements', {
      scroller,
      leftBtn,
      rightBtn
    });
    return;
  }

  console.log('[horizontal-posts] binding arrows');

  const card = scroller.querySelector('.post-entry');
  const gap = parseInt(getComputedStyle(scroller).gap || 0, 10);
  const scrollAmount = card ? card.offsetWidth + gap : 320;

  leftBtn.addEventListener('click', () => {
    console.log('[horizontal-posts] left click');
    scroller.scrollLeft -= scrollAmount;
  });

  rightBtn.addEventListener('click', () => {
    console.log('[horizontal-posts] right click');
    scroller.scrollLeft += scrollAmount;
  });
});
