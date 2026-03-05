(() => {
  const frame = document.getElementById("portrait-frame");
  const iris = document.getElementById("iris-layer");
  const eyelids = document.querySelector(".eyelids");

  if (!frame || !iris || !eyelids) return;

  /* =========================
     IRIS TRACKING
  ========================== */

  const MAX_OFFSET = 3; // px — realism hard limit

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  document.addEventListener("mousemove", (e) => {
    const rect = frame.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const offsetX = clamp(dx * 0.02, -MAX_OFFSET, MAX_OFFSET);
    const offsetY = clamp(dy * 0.02, -MAX_OFFSET, MAX_OFFSET);

    iris.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });

  /* =========================
     GLOBAL BLINK + HOLD
  ========================== */

  let isHolding = false;
  let blinkTimeout = null;

  function closeEyes() {
    eyelids.classList.add("is-blinking");
  }

  function openEyes() {
    eyelids.classList.remove("is-blinking");
  }

  function quickBlink() {
    closeEyes();

    blinkTimeout = setTimeout(() => {
      if (!isHolding) openEyes();
    }, 120);
  }

  // Mouse down anywhere = close eyes
  document.addEventListener("mousedown", () => {
    isHolding = true;
    clearTimeout(blinkTimeout);
    closeEyes();
  });

  // Mouse up anywhere = open eyes
  document.addEventListener("mouseup", () => {
    if (!isHolding) return;
    isHolding = false;
    openEyes();
  });

  // Click anywhere = blink
  document.addEventListener("click", () => {
    if (!isHolding) quickBlink();
  });
})();
