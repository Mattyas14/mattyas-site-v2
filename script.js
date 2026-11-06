
/* MATTYAS 2.0 — subtle animations */

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!reduceMotion) {
  const sections = document.querySelectorAll(
    ".section, .feature"
  );

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(22px)";
    section.style.transition =
      "opacity 800ms ease, transform 800ms ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );
  
/* Gentle sakura animation */

const sakuraLayer = document.querySelector(".sakura-layer");
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (sakuraLayer && !reducedMotion) {
  const petalCount = window.innerWidth < 600 ? 10 : 18;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("span");
    petal.className = "sakura-petal";

    petal.style.setProperty("--left", `${Math.random() * 100}%`);
    petal.style.setProperty("--size", `${5 + Math.random() * 7}px`);
    petal.style.setProperty("--duration", `${9 + Math.random() * 10}s`);
    petal.style.setProperty("--delay", `${-Math.random() * 18}s`);
    petal.style.setProperty("--drift", `${-70 + Math.random() * 140}px`);

    sakuraLayer.appendChild(petal);
  }
}


  sections.forEach((section) => observer.observe(section));
}

/* MATTYAS — navigation active au défilement */

const navLinks = document.querySelectorAll(
  '.navbar nav a[href^="#"]'
);

const navSections = [...navLinks]
  .map(link => document.querySelector(link.getAttribute("href")))
  .filter(section => section !== null);

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

  navLinks.forEach(link => {
    const isActive =
      currentSection &&
      link.getAttribute("href") === `#${currentSection.id}`;

    if (isActive) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }

    if (isActive) {
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

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    setTimeout(updateActiveNav, 350);
  });
});

updateActiveNav();

