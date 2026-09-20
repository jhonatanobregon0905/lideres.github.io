/* =========================================
   EL ROSTRO DEL LIDERAZGO
   script.js
   ETAPA 3 — INTERACCIONES Y ANIMACIONES
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTOS PRINCIPALES
       ========================================= */

    const body = document.body;
    const menuButton = document.querySelector(".menu-button");
    const mainNav = document.querySelector(".main-nav");

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".main-nav a");
    const progressItems = document.querySelectorAll(".progress-item");

    const revealElements = document.querySelectorAll(
        ".section-heading, .concept-content, .trait, .leader-card, .environment-placeholder, .reflection-content, .site-footer"
    );


    /* =========================================
       1. MENÚ MÓVIL
       ========================================= */

    if (menuButton) {

        menuButton.addEventListener("click", () => {

            body.classList.toggle("menu-open");

            const menuOpen = body.classList.contains("menu-open");

            menuButton.setAttribute(
                "aria-expanded",
                menuOpen ? "true" : "false"
            );

        });

    }


    /* Cerrar menú al seleccionar una sección */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            body.classList.remove("menu-open");

            if (menuButton) {
                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    });


    /* =========================================
       2. ANIMACIONES AL HACER SCROLL
       ========================================= */

    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =========================================
       3. NAVEGACIÓN ACTIVA
       ========================================= */

    const updateActiveSection = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >=
                sectionTop - window.innerHeight * 0.35
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        /* Links superiores */

        navLinks.forEach(link => {

            link.classList.remove("active");

            const target = link.getAttribute("href");

            if (target === `#${currentSection}`) {

                link.classList.add("active");

            }

        });


        /* Progreso lateral */

        progressItems.forEach(item => {

            item.classList.remove("active");

            const target = item.getAttribute("href");

            if (target === `#${currentSection}`) {

                item.classList.add("active");

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveSection,
        { passive: true }
    );


    updateActiveSection();


    /* =========================================
       4. PROGRESO DE SCROLL
       ========================================= */

    const updateScrollProgress = () => {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (documentHeight <= 0) {
            return;
        }

        const progress =
            (scrollTop / documentHeight) * 100;


        document.documentElement.style.setProperty(
            "--scroll-progress",
            `${progress}%`
        );

    };


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );


    updateScrollProgress();


    /* =========================================
       5. INTERACCIÓN DE LOS CONCEPTOS
       ========================================= */

    const traits = document.querySelectorAll(".trait");

    traits.forEach(trait => {

        trait.addEventListener("mouseenter", () => {

            traits.forEach(otherTrait => {

                if (otherTrait !== trait) {

                    otherTrait.style.opacity = "0.55";

                }

            });

        });


        trait.addEventListener("mouseleave", () => {

            traits.forEach(otherTrait => {

                otherTrait.style.opacity = "1";

            });

        });

    });


    /* =========================================
       6. INTERACCIÓN DE TARJETAS DE LÍDERES
       ========================================= */

    const leaderCards = document.querySelectorAll(".leader-card");

    leaderCards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            leaderCards.forEach(otherCard => {

                if (otherCard !== card) {

                    otherCard.style.opacity = "0.72";

                }

            });

        });


        card.addEventListener("mouseleave", () => {

            leaderCards.forEach(otherCard => {

                otherCard.style.opacity = "1";

            });

        });

    });


    /* =========================================
       7. EFECTO SUAVE DEL HERO
       ========================================= */

    const heroBackground =
        document.querySelector(".hero-background");


    if (heroBackground) {

        window.addEventListener(
            "scroll",
            () => {

                const scrollPosition = window.scrollY;

                if (scrollPosition < window.innerHeight) {

                    heroBackground.style.transform =
                        `scale(1.02) translateY(${scrollPosition * 0.08}px)`;

                }

            },
            { passive: true }
        );

    }


    /* =========================================
       8. ENLACES "EXPLORAR PERFIL"
       ========================================= */

    const leaderLinks =
        document.querySelectorAll(".leader-link");


    leaderLinks.forEach(link => {

        link.addEventListener("click", event => {

            /*
             * Por ahora evitamos que "#" lleve
             * automáticamente al principio de la página.
             *
             * En la siguiente etapa podremos conectar
             * cada botón con el perfil completo del líder.
             */

            if (link.getAttribute("href") === "#") {

                event.preventDefault();

            }

        });

    });


    /* =========================================
       9. SCROLL SUAVE PARA ENLACES INTERNOS
       ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       10. DETECTAR CAMBIO DE TAMAÑO
       ========================================= */

    window.addEventListener("resize", () => {

        /*
         * Si se cambia a una pantalla grande,
         * cerramos el menú móvil para evitar
         * que quede abierto accidentalmente.
         */

        if (window.innerWidth > 900) {

            body.classList.remove("menu-open");

            if (menuButton) {

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    });


    /* =========================================
       11. ENTRADA INICIAL
       ========================================= */

    window.setTimeout(() => {

        document.body.classList.add("page-loaded");

    }, 100);


});