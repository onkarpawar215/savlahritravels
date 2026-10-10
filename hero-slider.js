/* ============================================
   SAVLA HRI TRAVELS
   AUTOMATIC FOUR-SLIDE HOMEPAGE
   ============================================ */

(() => {
    "use strict";

    // Find the homepage slider.
    const root = document.querySelector(".hero-slider");

    // Stop if the slider is not present on this page.
    if (!root) {
        console.warn("Homepage slider was not found.");
        return;
    }

    // Find the slides, navigation dots and arrows.
    const slides = Array.from(
        root.querySelectorAll(".hero-slide")
    );

    const dots = Array.from(
        root.querySelectorAll(".hero-dot")
    );

    const prevButton = root.querySelector(".hero-prev");
    const nextButton = root.querySelector(".hero-next");

    // We need exactly four slides and four navigation dots.
    if (slides.length !== 4 || dots.length !== 4) {
        console.warn(
            "The homepage requires four slides and four navigation dots."
        );
        return;
    }

    // Current slide number.
    let currentIndex = 0;

    // Automatic slideshow timer.
    let slideTimer = null;

    // Respect the visitor's reduced-motion preference.
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // ==========================================
    // DISPLAY A SLIDE
    // ==========================================

    function showSlide(number) {

        // Keep the index between 0 and 3.
        currentIndex =
            (number + slides.length) % slides.length;

        // Display the selected slide.
        slides.forEach((slide, index) => {

            slide.classList.toggle(
                "is-active",
                index === currentIndex
            );

        });

        // Update the navigation dots.
        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "is-active",
                index === currentIndex
            );

            if (index === currentIndex) {

                dot.setAttribute(
                    "aria-current",
                    "true"
                );

            } else {

                dot.removeAttribute("aria-current");

            }

        });

    }

    // ==========================================
    // STOP AUTOMATIC SLIDING
    // ==========================================

    function stopSlideshow() {

        if (slideTimer !== null) {

            window.clearInterval(slideTimer);

            slideTimer = null;

        }

    }

    // ==========================================
    // START AUTOMATIC SLIDING
    // ==========================================

    function startSlideshow() {

        // Prevent multiple timers running together.
        stopSlideshow();

        // Change the slide every five seconds.
        if (!reducedMotion) {

            slideTimer = window.setInterval(() => {

                showSlide(currentIndex + 1);

            }, 5000);

        }

    }

    // ==========================================
    // PREVIOUS SLIDE BUTTON
    // ==========================================

    if (prevButton) {

        prevButton.addEventListener("click", () => {

            showSlide(currentIndex - 1);

            // Restart the five-second timer.
            startSlideshow();

        });

    }

    // ==========================================
    // NEXT SLIDE BUTTON
    // ==========================================

    if (nextButton) {

        nextButton.addEventListener("click", () => {

            showSlide(currentIndex + 1);

            startSlideshow();

        });

    }

    // ==========================================
    // NAVIGATION DOTS
    // ==========================================

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showSlide(index);

            startSlideshow();

        });

    });

    // ==========================================
    // PAUSE WHEN MOUSE ENTERS THE SLIDER
    // ==========================================

    root.addEventListener("mouseenter", () => {

        stopSlideshow();

    });

    // Resume when the mouse leaves.
    root.addEventListener("mouseleave", () => {

        startSlideshow();

    });

    // Pause while a visitor interacts with controls.
    root.addEventListener("focusin", () => {

        stopSlideshow();

    });

    root.addEventListener("focusout", () => {

        startSlideshow();

    });

    // Pause when the browser tab is hidden.
    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                stopSlideshow();

            } else {

                startSlideshow();

            }

        }
    );

    // ==========================================
    // START THE HOMEPAGE SLIDER
    // ==========================================

    showSlide(0);

    startSlideshow();

    console.log(
        "Savla Hri Travels: Homepage slider initialized."
    );

})();