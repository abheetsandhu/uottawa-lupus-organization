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