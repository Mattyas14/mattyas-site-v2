
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
