
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

  sections.forEach((section) => observer.observe(section));
}
