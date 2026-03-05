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
    }, 170); //
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
     AUTO BLINK (EVERY 4s)
  ========================== */

  setInterval(() => {
    quickBlink();
  }, 5000);
})();
