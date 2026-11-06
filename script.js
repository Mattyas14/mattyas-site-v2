
/* MATTYAS 2.0 — animations nocturnes */

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* Apparition douce des sections */
if (!reduceMotion) {
  const sections = document.querySelectorAll(
    ".section, .feature"
  );

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  sections.forEach((section) => {
    section.classList.add("reveal-ready");
    observer.observe(section);
  });
}

/* Sakura — pétales nocturnes */
const sakuraLayer = document.querySelector(".sakura-layer");

if (sakuraLayer && !reduceMotion) {
  const petalCount = window.innerWidth < 600 ? 10 : 18;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("span");
    petal.className = "sakura-petal";

    petal.style.setProperty(
      "--left",
      `${Math.random() * 100}%`
    );
    petal.style.setProperty(
      "--size",
      `${5 + Math.random() * 7}px`
    );
    petal.style.setProperty(
      "--duration",
      `${12 + Math.random() * 12}s`
    );
    petal.style.setProperty(
      "--delay",
      `${-Math.random() * 24}s`
    );
    petal.style.setProperty(
      "--drift",
      `${-100 + Math.random() * 200}px`
    );
    petal.style.setProperty(
      "--sway",
      `${-35 + Math.random() * 70}px`
    );
    petal.style.setProperty(
      "--rotation",
      `${Math.random() * 360}deg`
    );

    fragment.appendChild(petal);
  }

  sakuraLayer.appendChild(fragment);
}

/* Navigation active au défilement */
const navLinks = document.querySelectorAll(
  '.navbar nav a[href^="#"]'
);

const navSections = [...navLinks]
  .map((link) =>
    document.querySelector(link.getAttribute("href"))
  )
  .filter(Boolean);

function updateActiveNav() {
  const marker = window.innerHeight * 0.35;
  let currentSection = null;

  for (const section of navSections) {
    const rect = section.getBoundingClientRect();

    if (rect.top <= marker && rect.bottom > marker) {
      currentSection = section;
      break;
    }
  }

  navLinks.forEach((link) => {
    const active =
      currentSection &&
      link.getAttribute("href") === `#${currentSection.id}`;

    link.classList.toggle("active", Boolean(active));

    if (active) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("scroll", updateActiveNav, {
  passive: true
});
window.addEventListener("resize", updateActiveNav);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    window.setTimeout(updateActiveNav, 350);
  });
});

updateActiveNav();
