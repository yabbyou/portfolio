/* Slider-Stable-v3.3 — Modified for poster, pagination-hide & zoom */
document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     HARD FIX — ENSURE OVERLAY LIVES UNDER <body>
     ========================================================= */
  const overlay = document.querySelector(".slider-overlay");
  if (!overlay) {
    console.warn("sliders.js: no .slider-overlay found in DOM");
    return;
  }
  if (overlay.parentElement !== document.body) {
    document.body.appendChild(overlay);
  }

  const overlayImg = overlay.querySelector(".slider-lightbox-img");
  const overlayVideo = overlay.querySelector(".slider-lightbox-video");
  const overlayCaption = overlay.querySelector(".slider-caption");
  const closeButton = overlay.querySelector(".slider-close");
  const overlayPrev = overlay.querySelector(".overlay-prev");
  const overlayNext = overlay.querySelector(".overlay-next");

  let activeSwiper = null;
  let activeSlides = null;
  let overlayIsSingle = false;
  let savedScroll = 0;

  document.querySelectorAll(".custom-slider").forEach(container => {

    /* =========================================================
       NEW — PER-SLIDER OVERLAY TOGGLE
       ========================================================= */
    const overlayDisabled = container.hasAttribute("data-disable-overlay");

    const swiperRoot = container.querySelector(".swiper");
    if (!swiperRoot) return;

    const slides = Array.from(container.querySelectorAll(".swiper-slide"));
    const count = slides.length;

    if (count === 1) container.classList.add("single-slide");

    const frame = container.closest(".slider-frame");

    const swiper = new Swiper(swiperRoot, {
      loop: count > 1,
      slidesPerView: 1,
      centeredSlides: true,
      speed: 300,

      pagination: {
        el: frame.querySelector(".swiper-pagination"),
        clickable: true,
      },

      navigation: {
        nextEl: frame.querySelector(".slider-arrow.next"),
        prevEl: frame.querySelector(".slider-arrow.prev"),
      },

      on: {
        slideChange() {
          stopInline(container);
        }
      }
    });

    (function applySlideClipping() {
      slides.forEach(slide => {
        if (slide.classList.contains("swiper-slide-duplicate")) return;

        const hasImg = !!slide.querySelector("img");
        const hasVideo = !!slide.querySelector("video");

        if (hasImg && !hasVideo) {
          slide.style.borderRadius = "4px";
          slide.style.overflow = "hidden";
          const img = slide.querySelector("img");
          if (img) {
            img.style.borderRadius = "0";
            img.style.display = "block";
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "contain";
          }
        }
        
      });

      if (container.classList.contains("single") || container.classList.contains("single-slide")) {
        container.querySelectorAll(".swiper-slide").forEach(s => {
          s.style.borderRadius = "";
          s.style.overflow = "";
          const img = s.querySelector("img, video");
          if (img) img.style.borderRadius = "";
        });
      }
    })();

    if (count <= 1) {
      frame.querySelectorAll(".slider-arrow, .swiper-pagination")
        .forEach(el => el.style.display = "none");
    }

    container.addEventListener("click", (e) => {

      if (e.target.closest(".slider-arrow")) return;

      const slideEl = e.target.closest(".swiper-slide");
      if (!slideEl) return;

      const type = slideEl.dataset.type;

      /* --------------------------
         VIDEO HANDLING (UNCHANGED)
      -------------------------- */
      if (type === "video") {
        const playBtn = e.target.closest(".video-play-overlay");
        const videoEl = slideEl.querySelector("video");

        if (e.target === videoEl) {
          e.preventDefault();
          e.stopPropagation();
          videoEl.paused ? playInline(slideEl) : pauseInline(slideEl);
          return;
        }

        if (playBtn) {
          e.preventDefault();
          e.stopPropagation();
          playInline(slideEl);
        }
        return;
      }

      /* =========================================================
         NEW — BLOCK OVERLAY WHEN DISABLED
         ========================================================= */
      if (overlayDisabled) return;

      e.preventDefault();

      const realSlides = slides.filter(s => !s.classList.contains("swiper-slide-duplicate"));
      const idx = realSlides.indexOf(slideEl);
      if (idx >= 0) swiper.slideToLoop(idx);

      openOverlayFromSwiper(swiper, slides, container);
    });

  });

  /* =========================
     INLINE VIDEO CONTROLS
     ========================= */

  function pauseInline(slide) {
    const video = slide.querySelector("video");
    const playBtn = slide.querySelector(".video-play-overlay");
    if (!video) return;

    slide.closest(".custom-slider")?.classList.remove("video-playing");
    slide.closest(".slider-frame")?.classList.remove("video-playing");

    video.pause();
    video.controls = false;
    video.classList.remove("playing");
    if (playBtn) playBtn.style.display = "flex";
  }

  function stopInline(scope) {
    scope.querySelectorAll(".swiper-slide video").forEach(video => {
      video.pause();
      video.controls = false;
      video.classList.remove("playing");
    });

    scope.querySelectorAll(".video-play-overlay").forEach(btn => {
      btn.style.display = "";
    });

    document.querySelectorAll(".video-playing")
      .forEach(el => el.classList.remove("video-playing"));
  }

  function playInline(slide) {
    const video = slide.querySelector("video");
    const playBtn = slide.querySelector(".video-play-overlay");
    if (!video) return;

    stopInline(document);

    slide.closest(".custom-slider")?.classList.add("video-playing");
    slide.closest(".slider-frame")?.classList.add("video-playing");

    if (playBtn) playBtn.style.display = "none";
    // keep controls off for hero/inline play — overlay has full controls
    const inHero = !!slide.closest(".post-hero-slider");
    video.controls = !inHero;
    video.classList.add("playing");
    video.play();
  }

  /* =========================
     OVERLAY FUNCTIONS
     ========================= */

  function openOverlayFromSwiper(swiper, slides, container) {
    stopInline(document);

    overlay.classList.remove("zoomed");

    const realSlides = slides.filter(s => !s.classList.contains("swiper-slide-duplicate"));
    const slideEl = realSlides[swiper.realIndex];
    if (!slideEl) return;

    overlayIsSingle =
      container.classList.contains("single") ||
      container.classList.contains("single-slide") ||
      realSlides.length === 1;

    overlayCaption.textContent = slideEl.dataset.caption || "";

    overlayImg.style.display = "none";
    overlayVideo.style.display = "none";
    overlayVideo.pause();

    if (slideEl.dataset.type === "video") {
      overlayVideo.src = slideEl.dataset.src;
      overlayVideo.poster = slideEl.dataset.overlayposter || "";
      overlayVideo.style.display = "block";
    } else {
      overlayImg.src = slideEl.dataset.src;
      overlayImg.style.display = "block";
    }

    activeSwiper = swiper;
    activeSlides = realSlides;

    overlayPrev.style.display = overlayIsSingle ? "none" : "flex";
    overlayNext.style.display = overlayIsSingle ? "none" : "flex";

    savedScroll = window.scrollY;
    document.body.classList.add("overlay-open");
    document.documentElement.classList.add("overlay-open");
    document.body.style.top = `-${savedScroll}px`;

    overlay.classList.add("active");
  }

  function closeOverlay() {
    overlay.classList.remove("active", "zoomed");
    overlayVideo.pause();
    overlayVideo.src = "";

    document.body.classList.remove("overlay-open");
    document.documentElement.classList.remove("overlay-open");
    document.body.style.top = "";
    window.scrollTo(0, savedScroll);

    activeSwiper = null;
    activeSlides = null;
  }

  /* =========================
     OVERLAY CONTROLS
     ========================= */

  overlayPrev.addEventListener("click", e => {
    e.stopPropagation();
    if (!overlayIsSingle && activeSwiper) {
      activeSwiper.slidePrev();
      setTimeout(updateOverlayMedia, 50);
    }
  });

  overlayNext.addEventListener("click", e => {
    e.stopPropagation();
    if (!overlayIsSingle && activeSwiper) {
      activeSwiper.slideNext();
      setTimeout(updateOverlayMedia, 50);
    }
  });

  closeButton.addEventListener("click", e => {
    e.stopPropagation();
    closeOverlay();
  });

  overlay.addEventListener("click", e => {
    if (
      e.target.closest(".slider-lightbox-video") ||
      e.target.closest(".overlay-prev") ||
      e.target.closest(".overlay-next") ||
      e.target.closest(".slider-close") ||
      e.target.closest(".slider-caption")
    ) return;

    // click on image → open full bleed in new tab
    if (e.target.closest(".slider-lightbox-img")) {
      const src = overlayImg.src;
      if (src) window.open(src, "_blank");
      return;
    }

    closeOverlay();
  });

  function updateOverlayMedia() {
    if (!activeSwiper || !activeSlides) return;

    overlay.classList.remove("zoomed");

    const slideEl = activeSlides[activeSwiper.realIndex];
    if (!slideEl) return;

    overlayCaption.textContent = slideEl.dataset.caption || "";

    overlayImg.style.display = "none";
    overlayVideo.style.display = "none";
    overlayVideo.pause();

    if (slideEl.dataset.type === "video") {
      overlayVideo.src = slideEl.dataset.src;
      overlayVideo.poster = slideEl.dataset.overlayposter || "";
      overlayVideo.style.display = "block";
    } else {
      overlayImg.src = slideEl.dataset.src;
      overlayImg.style.display = "block";
    }
  }

  /* =========================
     KEYBOARD SUPPORT
     ========================= */

  document.addEventListener("keydown", e => {
    if (!overlay.classList.contains("active")) return;

    if (overlay.classList.contains("zoomed") && e.key === "Escape") {
      overlay.classList.remove("zoomed");
      overlayImg.classList.remove("zoomed");
      overlayVideo.classList.remove("zoomed");
      return;
    }

    if (e.key === "ArrowRight" && !overlayIsSingle && activeSwiper) {
      e.preventDefault();
      activeSwiper.slideNext();
      setTimeout(updateOverlayMedia, 50);
    }

    if (e.key === "ArrowLeft" && !overlayIsSingle && activeSwiper) {
      e.preventDefault();
      activeSwiper.slidePrev();
      setTimeout(updateOverlayMedia, 50);
    }

    if (e.key === "Escape") {
      e.preventDefault();
      closeOverlay();
    }
  });

});