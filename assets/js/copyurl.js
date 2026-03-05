document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("copy-url-btn");
    if (!btn) return;

    const icons = Array.from(btn.querySelectorAll("img.copy-url-icon"));
    const defaultLight = btn.querySelector("img.light-icon.default-icon");
    const defaultDark  = btn.querySelector("img.dark-icon.default-icon");
    const successLight = btn.querySelector("img.light-icon.success-icon");
    const successDark  = btn.querySelector("img.dark-icon.success-icon");


    function isDarkMode() {
        return document.documentElement.dataset.theme === "dark";
    }

    function showDefaultIcons() {
        icons.forEach(i => i.style.display = "none");

        if (isDarkMode()) {
            defaultDark.style.display = "block";
        } else {
            defaultLight.style.display = "block";
        }
    }

    function showSuccessIcons() {
        icons.forEach(i => i.style.display = "none");

        if (isDarkMode()) {
            successDark.style.display = "block";
        } else {
            successLight.style.display = "block";
        }
    }

    // Initial state: always show correct default icon
    showDefaultIcons();

    btn.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            showSuccessIcons();

            setTimeout(() => {
                showDefaultIcons();
            }, 2000);

        } catch (err) {
            console.error("Copy failed:", err);
        }
    });

    // Watch for theme change (html[data-theme] toggles)
    const observer = new MutationObserver(() => {
        showDefaultIcons();
    });

observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
});

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
});
