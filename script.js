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
   SCIENCE FRIDAYS CAROUSEL
========================================= */

document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
    const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    const currentLabel = carousel.querySelector("[data-carousel-current]");
    const card = carousel.closest(".science-instagram-card");
    const dots = card ? Array.from(card.querySelectorAll("[data-dot]")) : [];

    if (!slides.length) return;

    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function showSlide(index) {
        currentIndex = (index + slides.length) % slides.length;

        slides.forEach(function (slide, i) {
            slide.classList.toggle("is-active", i === currentIndex);
            slide.setAttribute("aria-hidden", i === currentIndex ? "false" : "true");
        });

        dots.forEach(function (dot, i) {
            dot.classList.toggle("is-active", i === currentIndex);
            dot.setAttribute("aria-current", i === currentIndex ? "true" : "false");
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

    carousel.addEventListener("touchstart", function (event) {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener("touchend", function (event) {
        touchEndX = event.changedTouches[0].screenX;
        const distance = touchEndX - touchStartX;

        if (Math.abs(distance) < 45) return;

        if (distance < 0) {
            showSlide(currentIndex + 1);
        } else {
            showSlide(currentIndex - 1);
        }
    }, { passive: true });

    carousel.setAttribute("tabindex", "0");

    carousel.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
            showSlide(currentIndex - 1);
        }

        if (event.key === "ArrowRight") {
            showSlide(currentIndex + 1);
        }
    });

    showSlide(0);
});
