/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const isOpen =
            navLinks.classList.contains("active");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    const navItems =
        document.querySelectorAll(".nav-links a");

    navItems.forEach(function (item) {

        item.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================
   BACK TO TOP
========================================= */

const backToTopButton =
    document.getElementById("back-to-top");

if (backToTopButton) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 500) {

            backToTopButton.classList.add("show");

        } else {

            backToTopButton.classList.remove("show");

        }

    });


    backToTopButton.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealSections =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealSections.forEach(function (section) {

        revealObserver.observe(section);

    });

} else {

    revealSections.forEach(function (section) {

        section.classList.add("visible");

    });

}

/* =========================================
   SCIENCE FRIDAYS FEATURE SLIDER
========================================= */

document.querySelectorAll("[data-science-feature-slider]").forEach(function (slider) {
    const slides = Array.from(slider.querySelectorAll("[data-science-feature-slide]"));
    const prevButton = slider.querySelector("[data-science-feature-prev]");
    const nextButton = slider.querySelector("[data-science-feature-next]");
    const currentLabel = slider.querySelector("[data-science-feature-current]");
    const dots = Array.from(slider.querySelectorAll("[data-science-feature-dot]"));

    if (!slides.length) return;

    let currentIndex = 0;
    let touchStartX = 0;

    function showSlide(index) {
        currentIndex = (index + slides.length) % slides.length;

        slides.forEach(function (slide, i) {
            const active = i === currentIndex;
            slide.classList.toggle("is-active", active);
            slide.setAttribute("aria-hidden", active ? "false" : "true");
        });

        dots.forEach(function (dot, i) {
            const active = i === currentIndex;
            dot.classList.toggle("is-active", active);
            dot.setAttribute("aria-current", active ? "true" : "false");
        });

        if (currentLabel) {
            currentLabel.textContent = String(currentIndex + 1);
        }
    }

    if (prevButton) {
        prevButton.addEventListener("click", function () {
            showSlide(currentIndex - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", function () {
            showSlide(currentIndex + 1);
        });
    }

    dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            showSlide(index);
        });
    });

    slider.addEventListener("touchstart", function (event) {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener("touchend", function (event) {
        const touchEndX = event.changedTouches[0].screenX;
        const distance = touchEndX - touchStartX;

        if (Math.abs(distance) < 45) return;

        if (distance < 0) {
            showSlide(currentIndex + 1);
        } else {
            showSlide(currentIndex - 1);
        }
    }, { passive: true });

    slider.setAttribute("tabindex", "0");

    slider.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") showSlide(currentIndex - 1);
        if (event.key === "ArrowRight") showSlide(currentIndex + 1);
    });

    showSlide(0);
});


/* =========================================
   PREVIOUS SCIENCE FRIDAYS MONTH SLIDERS
========================================= */

document.querySelectorAll("[data-archive-slider]").forEach(function (slider) {
    const slides = Array.from(slider.querySelectorAll("[data-archive-slide]"));
    const prev = slider.querySelector("[data-archive-prev]");
    const next = slider.querySelector("[data-archive-next]");
    const current = slider.querySelector("[data-archive-current]");
    const dots = Array.from(slider.querySelectorAll("[data-archive-dot]"));
    let index = 0;
    let startX = 0;

    function show(i) {
        index = (i + slides.length) % slides.length;

        slides.forEach(function (slide, j) {
            slide.classList.toggle("is-active", j === index);
        });

        dots.forEach(function (dot, j) {
            dot.classList.toggle("is-active", j === index);
        });

        if (current) current.textContent = String(index + 1);
    }

    if (prev) prev.addEventListener("click", function () { show(index - 1); });
    if (next) next.addEventListener("click", function () { show(index + 1); });

    dots.forEach(function (dot, j) {
        dot.addEventListener("click", function () { show(j); });
    });

    slider.addEventListener("touchstart", function (e) {
        startX = e.changedTouches[0].screenX;
    }, {passive:true});

    slider.addEventListener("touchend", function (e) {
        const diff = e.changedTouches[0].screenX - startX;
        if (Math.abs(diff) < 45) return;
        show(diff < 0 ? index + 1 : index - 1);
    }, {passive:true});

    show(0);
});
