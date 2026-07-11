document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".faq-accordion");

  accordions.forEach(accordion => {
    const buttons = accordion.querySelectorAll("button");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const isExpanded = button.getAttribute("aria-expanded") === "true";

        buttons.forEach(b =>
          b.setAttribute("aria-expanded", "false")
        );

        if (!isExpanded) {
          button.setAttribute("aria-expanded", "true");
        }
      });
    });
  });
});