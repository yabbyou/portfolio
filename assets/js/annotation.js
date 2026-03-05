document.addEventListener("DOMContentLoaded", () => {

  const TOOLTIP_CLASS = "annotation-tooltip";
  let tooltip = null;
  let activeTarget = null;

  function createTooltip() {
    tooltip = document.createElement("div");
    tooltip.className = TOOLTIP_CLASS;
    document.body.appendChild(tooltip);
  }

  function positionTooltip(target) {
    if (!tooltip) return;

    const rect = target.getBoundingClientRect();
    const OFFSET_X = 15;
    const OFFSET_Y = 2;

    // Force layout so height is accurate
    const height = tooltip.offsetHeight;

    const top =
      rect.top + window.scrollY - height - OFFSET_Y;

    const left =
      rect.right + window.scrollX + OFFSET_X;

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }

  function showTooltip(target) {
    if (!tooltip) createTooltip();

    const text = target.getAttribute("data-note");
    if (!text) return;

    activeTarget = target;

    tooltip.textContent = text;
    tooltip.style.opacity = "0";
    tooltip.style.display = "block";

    // Wait for paint so height is measurable
    requestAnimationFrame(() => {
      positionTooltip(target);
      tooltip.style.opacity = "1";
    });
  }

  function hideTooltip() {
    if (!tooltip) return;
    tooltip.style.opacity = "0";
    activeTarget = null;
  }

  // Reposition on scroll while visible
  window.addEventListener("scroll", () => {
    if (activeTarget) positionTooltip(activeTarget);
  }, { passive: true });

  window.addEventListener("resize", () => {
    if (activeTarget) positionTooltip(activeTarget);
  });

  document.addEventListener("mouseover", (e) => {
    const target = e.target.closest(".annotated");
    if (!target) return;
    showTooltip(target);
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(".annotated")) {
      hideTooltip();
    }
  });

});