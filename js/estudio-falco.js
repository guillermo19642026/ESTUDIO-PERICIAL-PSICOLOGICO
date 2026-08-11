const header = document.getElementById("efHeader");
const menuButton = document.getElementById("efMenuButton");
const menu = document.getElementById("efMenu");

const menuLinks = menu
  ? menu.querySelectorAll('a[href^="#"]')
  : [];

/* =========================================================
   MENÚ
========================================================= */

function setMenuState(isOpen) {
  if (!menu || !menuButton) return;

  menu.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("is-menu-open", isOpen);

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menu.setAttribute("aria-hidden", String(!isOpen));
}

function toggleMenu() {
  if (!menu) return;

  const isOpen = !menu.classList.contains("is-open");

  setMenuState(isOpen);
}

function closeMenu() {
  setMenuState(false);
}

if (menuButton) {
  menuButton.addEventListener("click", toggleMenu);
}

menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

if (menu) {
  const backdrop = menu.querySelector(".ef-menu__backdrop");

  if (backdrop) {
    backdrop.addEventListener("click", closeMenu);
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});


/* =========================================================
   HEADER
========================================================= */

function updateHeader() {
  if (!header) return;

  header.classList.toggle(
    "is-scrolled",
    window.scrollY > 30
  );
}

window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);

updateHeader();


/* =========================================================
   REDUCED MOTION
========================================================= */

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


/* =========================================================
   REVEAL GENERAL
========================================================= */

const revealElements = document.querySelectorAll(`
  .ef-intro__heading,
  .ef-intro__lead,
  .ef-intro__statement,
  .ef-intro__closing,
  .ef-intro__links,

  .ef-paths__header,
  .ef-path,

  .ef-practice__header,
  .ef-service,
  .ef-practice__footer,

  .ef-areas__header,
  .ef-areas__closing,

  .ef-direction__header,

  .ef-team__header,

  .ef-principles__header,

  .ef-method__header,
  .ef-method__footer,

  .ef-knowledge__header,
  .ef-knowledge-card,
  .ef-knowledge__closing,

  .ef-universe__header,
  .ef-universe__mobile-list,
  .ef-universe__footer,

  .ef-contact__header,
  .ef-contact-card
`);

revealElements.forEach((element) => {
  element.classList.add("ef-scroll-reveal");
});

if (!reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -55px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}


/* =========================================================
   STAGGER
   Aparición progresiva de grupos
========================================================= */

function applyStagger(selector, delay = 80) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element, index) => {
    element.style.transitionDelay =
      `${index * delay}ms`;
  });
}

applyStagger(".ef-path", 70);
applyStagger(".ef-service", 70);
applyStagger(".ef-knowledge-card", 85);
applyStagger(".ef-contact-card", 100);


/* =========================================================
   HERO
   MOVIMIENTO ATMOSFÉRICO
========================================================= */

const hero = document.querySelector(".ef-hero");
const glowOne = document.querySelector(
  ".ef-hero__glow--one"
);
const glowTwo = document.querySelector(
  ".ef-hero__glow--two"
);

if (
  hero &&
  glowOne &&
  glowTwo &&
  !reduceMotion &&
  window.matchMedia("(pointer: fine)").matches
) {
  hero.addEventListener(
    "pointermove",
    (event) => {
      const rect =
        hero.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width -
        0.5;

      const y =
        (event.clientY - rect.top) /
        rect.height -
        0.5;

      glowOne.style.transform =
        `translate3d(
          ${x * 28}px,
          ${y * 20}px,
          0
        )`;

      glowTwo.style.transform =
        `translate3d(
          ${x * -20}px,
          ${y * -16}px,
          0
        )`;
    },
    { passive: true }
  );

  hero.addEventListener(
    "pointerleave",
    () => {
      glowOne.style.transform =
        "translate3d(0, 0, 0)";

      glowTwo.style.transform =
        "translate3d(0, 0, 0)";
    }
  );
}


/* =========================================================
   UNIVERSO FALCO®
   MOVIMIENTO MUY SUAVE
========================================================= */

const universeStage = document.querySelector(
  ".ef-universe__stage"
);

const universeCenter = document.querySelector(
  ".ef-universe__center"
);

if (
  universeStage &&
  universeCenter &&
  !reduceMotion &&
  window.matchMedia("(pointer: fine)").matches
) {
  universeStage.addEventListener(
    "pointermove",
    (event) => {
      const rect =
        universeStage.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width -
        0.5;

      const y =
        (event.clientY - rect.top) /
        rect.height -
        0.5;

      universeCenter.style.transform =
        `translate(
          calc(-50% + ${x * 10}px),
          calc(-50% + ${y * 10}px)
        )`;
    },
    { passive: true }
  );

  universeStage.addEventListener(
    "pointerleave",
    () => {
      universeCenter.style.transform =
        "translate(-50%, -50%)";
    }
  );
}


/* =========================================================
   LINKS INTERNOS
   SCROLL SUAVE CONTROLADO
========================================================= */

const internalLinks =
  document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
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

    if (!target) return;

    event.preventDefault();

    closeMenu();

    target.scrollIntoView({
      behavior: reduceMotion
        ? "auto"
        : "smooth",
      block: "start"
    });
  });
});


/* =========================================================
   ESTADO ACTIVO DEL MENÚ
========================================================= */

const sections = document.querySelectorAll(
  "main section[id]"
);

const navAnchors = menu
  ? menu.querySelectorAll(
      '.ef-menu__nav a[href^="#"]'
    )
  : [];

if (sections.length && navAnchors.length) {
  const sectionObserver =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const id =
            entry.target.getAttribute("id");

          navAnchors.forEach((link) => {
            const isCurrent =
              link.getAttribute("href") ===
              `#${id}`;

            link.classList.toggle(
              "is-current",
              isCurrent
            );
          });
        });
      },
      {
        threshold: 0.35
      }
    );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}



/* =========================================================
   APERTURA CINEMATOGRÁFICA FALCO®
========================================================= */

const cinematicIntro =
  document.getElementById("efCinematicIntro");

const cinematicAlreadyPlayed =
  sessionStorage.getItem("efCinemaPlayed");

if (cinematicIntro) {

  if (reduceMotion || cinematicAlreadyPlayed) {

    cinematicIntro.remove();

    document.body.classList.add(
      "ef-cinema-complete"
    );

  } else {

    document.body.classList.add(
      "ef-cinema-running"
    );

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto"
    });

    window.setTimeout(() => {

      cinematicIntro.classList.add(
        "is-ending"
      );

      document.body.classList.remove(
        "ef-cinema-running"
      );

      document.body.classList.add(
        "ef-cinema-complete"
      );

    }, 4700);


    window.setTimeout(() => {

      cinematicIntro.remove();

      sessionStorage.setItem(
        "efCinemaPlayed",
        "true"
      );

    }, 6000);

  }

}


/* =========================================================
   TRANSICIÓN CINEMATOGRÁFICA
   HERO → EL ESTUDIO
========================================================= */

const discoverButton =
  document.getElementById("efDiscoverButton");

const introSection =
  document.getElementById("estudio");

const heroSection =
  document.getElementById("inicio");


/* overlay de transición */

const sceneTransition =
  document.createElement("div");

sceneTransition.className =
  "ef-scene-transition";

sceneTransition.innerHTML = `
  <div class="ef-scene-transition__line"></div>
`;

document.body.appendChild(sceneTransition);


if (
  discoverButton &&
  introSection &&
  heroSection
) {

  discoverButton.addEventListener(
    "click",
    (event) => {

      if (reduceMotion) {
        return;
      }

      event.preventDefault();


      /* preparamos la nueva escena */

      introSection.classList.add(
        "is-cinema-preparing"
      );


      /* el hero se retira */

      heroSection.classList.add(
        "is-cinema-leaving"
      );


      /* línea cinematográfica */

      sceneTransition.classList.add(
        "is-active"
      );


      window.setTimeout(() => {

        introSection.scrollIntoView({
          behavior: "auto",
          block: "start"
        });

      }, 650);


      window.setTimeout(() => {

        introSection.classList.remove(
          "is-cinema-preparing"
        );

        introSection.classList.add(
          "is-cinema-arriving"
        );

      }, 780);


      window.setTimeout(() => {

        sceneTransition.classList.remove(
          "is-active"
        );

        heroSection.classList.remove(
          "is-cinema-leaving"
        );

      }, 1800);


      window.setTimeout(() => {

        introSection.classList.remove(
          "is-cinema-arriving"
        );

      }, 2600);

    }
  );

}


/* =========================================================
   DIRECCIÓN — ENTRADA CINEMATOGRÁFICA
========================================================= */

const directionSection =
  document.querySelector(".ef-direction-cinema");

if (directionSection) {

  if (reduceMotion) {

    directionSection.classList.add(
      "is-cinema-visible"
    );

  } else {

    const directionObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "is-cinema-visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.28,
          rootMargin:
            "0px 0px -10% 0px"
        }
      );

    directionObserver.observe(
      directionSection
    );

  }

}


/* =========================================================
   MÉTODO FALCO® — SECUENCIA CINEMATOGRÁFICA
========================================================= */

const methodSection =
  document.querySelector(".ef-method-cinema");

if (methodSection) {

  const methodSteps =
    methodSection.querySelectorAll(
      ".ef-method-step"
    );

  const methodStatement =
    methodSection.querySelector(
      ".ef-method__statement"
    );


  if (reduceMotion) {

    methodSteps.forEach((step) => {
      step.classList.add(
        "is-method-active"
      );
    });

    if (methodStatement) {
      methodStatement.classList.add(
        "is-method-visible"
      );
    }

  } else {

    const methodObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            const activeStep =
              entry.target;

            methodSteps.forEach(
              (step, index) => {

                const activeIndex =
                  [...methodSteps].indexOf(
                    activeStep
                  );

                step.classList.remove(
                  "is-method-active",
                  "is-method-past"
                );

                if (index < activeIndex) {
                  step.classList.add(
                    "is-method-past"
                  );
                }

                if (index === activeIndex) {
                  step.classList.add(
                    "is-method-active"
                  );
                }

              }
            );

          });

        },
        {
          threshold: 0.55,
          rootMargin:
            "-20% 0px -30% 0px"
        }
      );


    methodSteps.forEach((step) => {
      methodObserver.observe(step);
    });


    if (methodStatement) {

      const statementObserver =
        new IntersectionObserver(
          (entries, observer) => {

            entries.forEach(
              (entry) => {

                if (!entry.isIntersecting) {
                  return;
                }

                methodStatement.classList.add(
                  "is-method-visible"
                );

                observer.unobserve(
                  methodStatement
                );

              }
            );

          },
          {
            threshold: 0.3
          }
        );

      statementObserver.observe(
        methodStatement
      );

    }

  }

}


/* =========================================================
   UNIVERSO FALCO® — ENTRADA CINEMATOGRÁFICA
========================================================= */

const universeSection =
  document.querySelector(".ef-universe-cinema");

if (universeSection) {

  if (reduceMotion) {

    universeSection.classList.add(
      "is-universe-visible"
    );

  } else {

    const universeObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "is-universe-visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.2,
          rootMargin:
            "0px 0px -10% 0px"
        }
      );

    universeObserver.observe(
      universeSection
    );

  }

}


/* =========================================================
   CIERRE FINAL — ENTRADA CINEMATOGRÁFICA
========================================================= */

const finaleSection =
  document.querySelector(".ef-finale-cinema");

if (finaleSection) {

  if (reduceMotion) {

    finaleSection.classList.add(
      "is-finale-visible"
    );

  } else {

    const finaleObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "is-finale-visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.22,
          rootMargin:
            "0px 0px -8% 0px"
        }
      );

    finaleObserver.observe(
      finaleSection
    );

  }

}


/* =========================================================
   ÁREAS — SCROLL CINEMATOGRÁFICO
========================================================= */

const areasSection =
  document.querySelector(".ef-areas-cinema");

if (areasSection) {

  const areaItems =
    [...areasSection.querySelectorAll(".ef-area")];

  if (reduceMotion) {

    areaItems.forEach((area) => {
      area.classList.add("is-area-visible");
    });

  } else {

    const areasObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            const activeArea = entry.target;
            const activeIndex =
              areaItems.indexOf(activeArea);

            areaItems.forEach((area, index) => {

              area.classList.remove(
                "is-area-visible",
                "is-area-past"
              );

              if (index < activeIndex) {
                area.classList.add("is-area-past");
              }

              if (index === activeIndex) {
                area.classList.add("is-area-visible");
              }

            });

          });

        },
        {
          threshold: 0.48,
          rootMargin: "-15% 0px -25% 0px"
        }
      );

    areaItems.forEach((area) => {
      areasObserver.observe(area);
    });

  }

}


/* =========================================================
   EQUIPO INTERDISCIPLINARIO — SCROLL CINEMATOGRÁFICO
========================================================= */

const teamSection =
  document.querySelector(".ef-team-cinema");

if (teamSection) {

  const teamCenter =
    teamSection.querySelector(".ef-team__center");

  const disciplines =
    [...teamSection.querySelectorAll(".ef-discipline")];

  const teamNote =
    teamSection.querySelector(".ef-team__note");


  if (reduceMotion) {

    teamSection.classList.add("is-team-started");

    disciplines.forEach((item) => {
      item.classList.add("is-discipline-active");
    });

    if (teamNote) {
      teamNote.classList.add("is-team-note-visible");
    }

  } else {

    /* activa primero Dirección */

    const teamStartObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            teamSection.classList.add(
              "is-team-started"
            );

            observer.unobserve(entry.target);

          });

        },
        {
          threshold: 0.35
        }
      );

    if (teamCenter) {
      teamStartObserver.observe(teamCenter);
    }


    /* activa disciplinas una por una */

    const disciplineObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            const activeItem = entry.target;
            const activeIndex =
              disciplines.indexOf(activeItem);

            disciplines.forEach((item, index) => {

              item.classList.remove(
                "is-discipline-active",
                "is-discipline-past"
              );

              if (index < activeIndex) {
                item.classList.add(
                  "is-discipline-past"
                );
              }

              if (index === activeIndex) {
                item.classList.add(
                  "is-discipline-active"
                );
              }

            });

          });

        },
        {
          threshold: 0.48,
          rootMargin:
            "-15% 0px -25% 0px"
        }
      );

    disciplines.forEach((item) => {
      disciplineObserver.observe(item);
    });


    /* nota final */

    if (teamNote) {

      const teamNoteObserver =
        new IntersectionObserver(
          (entries, observer) => {

            entries.forEach((entry) => {

              if (!entry.isIntersecting) {
                return;
              }

              entry.target.classList.add(
                "is-team-note-visible"
              );

              observer.unobserve(entry.target);

            });

          },
          {
            threshold: 0.35
          }
        );

      teamNoteObserver.observe(teamNote);

    }

  }

}


/* =========================================================
   PRINCIPIOS — SCROLL CINEMATOGRÁFICO
========================================================= */

const principlesSection =
  document.querySelector(".ef-principles-cinema");

if (principlesSection) {

  const principles =
    [...principlesSection.querySelectorAll(".ef-principle")];

  const principlesStatement =
    principlesSection.querySelector(".ef-principles__statement");

  const principlesClosing =
    principlesSection.querySelector(".ef-principles__closing");


  if (reduceMotion) {

    principles.forEach((item) => {
      item.classList.add("is-principle-active");
    });

    if (principlesStatement) {
      principlesStatement.classList.add("is-principles-visible");
    }

    if (principlesClosing) {
      principlesClosing.classList.add("is-principles-visible");
    }

  } else {

    const principlesObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const activeItem = entry.target;
            const activeIndex =
              principles.indexOf(activeItem);

            principles.forEach((item, index) => {

              item.classList.remove(
                "is-principle-active",
                "is-principle-past"
              );

              if (index < activeIndex) {
                item.classList.add("is-principle-past");
              }

              if (index === activeIndex) {
                item.classList.add("is-principle-active");
              }

            });

          });

        },
        {
          threshold: 0.48,
          rootMargin: "-15% 0px -25% 0px"
        }
      );

    principles.forEach((item) => {
      principlesObserver.observe(item);
    });


    const simpleReveal = (element) => {

      if (!element) return;

      const observer =
        new IntersectionObserver(
          (entries, currentObserver) => {

            entries.forEach((entry) => {

              if (!entry.isIntersecting) return;

              entry.target.classList.add(
                "is-principles-visible"
              );

              currentObserver.unobserve(
                entry.target
              );

            });

          },
          {
            threshold: 0.3
          }
        );

      observer.observe(element);
    };

    simpleReveal(principlesStatement);
    simpleReveal(principlesClosing);

  }

}