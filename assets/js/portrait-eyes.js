(() => {
  const eyelids = document.querySelector(".eyelids");
  if (!eyelids) return;

  let isHolding = false;
  let blinkTimeout = null;

  function closeEyes() {
    eyelids.classList.add("is-blinking");
  }

  function openEyes() {
    eyelids.classList.remove("is-blinking");
  }

  function quickBlink() {
    if (isHolding) return;
    closeEyes();
    blinkTimeout = setTimeout(() => {
      if (!isHolding) openEyes();
    }, 170);
  }

  /* =========================
     MANUAL INTERACTION
  ========================== */

  document.addEventListener("mousedown", () => {
    isHolding = true;
    clearTimeout(blinkTimeout);
    closeEyes();
  });

  document.addEventListener("mouseup", () => {
    if (!isHolding) return;
    isHolding = false;
    openEyes();
  });

  document.addEventListener("click", () => {
    quickBlink();
  });

  /* =========================
     SCROLL BLINK (mobile)
     blinks once when scroll
     motion is detected, then
     waits 1s before re-arming
  ========================== */

  let scrollBlinkArmed = true;
  let scrollBlinkCooldown = null;

  window.addEventListener("scroll", () => {
    if (!scrollBlinkArmed) return;
    scrollBlinkArmed = false;
    quickBlink();

    clearTimeout(scrollBlinkCooldown);
    scrollBlinkCooldown = setTimeout(() => {
      scrollBlinkArmed = true;
    }, 1000);
  }, { passive: true });

  /* =========================
     AUTO BLINK (EVERY 5s)
  ========================== */

  setInterval(() => {
    quickBlink();
  }, 5000);
})();