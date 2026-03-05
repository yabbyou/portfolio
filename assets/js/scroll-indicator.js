console.log('[scroll-indicator] loaded');

function initScrollIndicator() {

  const dot = document.querySelector(".scroll-dot");
  const indicator = document.querySelector("#scroll-indicator");

  if (!dot || !indicator) {
    console.warn('[scroll-indicator] elements missing');
    return;
  }

  let isDragging = false;

  function updateScrollIndicator() {

    const scrollTop = window.scrollY;

    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    let progress = scrollTop / maxScroll;
    progress = Math.max(0, Math.min(progress, 1));

    const trackHeight = indicator.clientHeight;
    const dotHeight = dot.offsetHeight;

    const maxTravel = trackHeight - dotHeight;

    dot.style.top = progress * maxTravel + "px";
  }

  function scrollFromPointer(e) {

    const rect = indicator.getBoundingClientRect();

    const pointerY = e.clientY - rect.top;
    const ratio = pointerY / rect.height;

    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    const target = Math.max(0, Math.min(ratio * maxScroll, maxScroll));

    window.scrollTo({
      top: target,
      behavior: "auto"
    });

    updateScrollIndicator();
  }

  window.addEventListener("scroll", updateScrollIndicator);
  window.addEventListener("resize", updateScrollIndicator);

  updateScrollIndicator();

  /* click-to-jump */
  indicator.addEventListener("click", (e) => {
    scrollFromPointer(e);
  });

  /* drag start */
  indicator.addEventListener("mousedown", (e) => {
    isDragging = true;
    document.body.style.userSelect = "none";
    scrollFromPointer(e);
  });

  /* dragging */
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    scrollFromPointer(e);
  });

  /* drag end */
  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    document.body.style.userSelect = "";
  });
}

/* run after DOM ready */
document.addEventListener("DOMContentLoaded", initScrollIndicator);