export function initializeScrollReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>(".scroll-reveal");

  if (elements.length === 0) return;

  // Show everything immediately if reduced motion is preferred
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => {
      element.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  elements.forEach((element) => observer.observe(element));
}
