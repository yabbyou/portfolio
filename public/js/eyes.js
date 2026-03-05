(function () {
  const MAX_OFFSET = 6;

  function isLightMode() {
    return document.documentElement.getAttribute("data-theme") === "light";
  }

  document.addEventListener("mousemove", (e) => {
    if (!isLightMode()) return;

    document.querySelectorAll(".eye").forEach((eye) => {
      const pupil = eye.querySelector(".pupil");
      if (!pupil) return;

      const rect = eye.getBoundingClientRect();

      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const angle = Math.atan2(dy, dx);

      const x = Math.cos(angle) * MAX_OFFSET;
      const y = Math.sin(angle) * MAX_OFFSET;

      pupil.style.left = `${rect.width / 2 + x - pupil.offsetWidth / 2}px`;
      pupil.style.top  = `${rect.height / 2 + y - pupil.offsetHeight / 2}px`;
    });
  });
})();
