/**
 * parallax.js — mueve el sol y el copy del hero según mouse/scroll.
 */
export function createParallax({ heroSection, sunParallax, contentParallax, reduceMotion }) {
  let mouseX = 0;
  let mouseY = 0;
  let scrollProgress = 0;

  function apply() {
    const sunT = `translate(${mouseX * 18}px, ${mouseY * 14 - scrollProgress * 70}px) scale(${1 + scrollProgress * 0.12})`;
    const contentT = `translate(${mouseX * -8}px, ${mouseY * -6}px)`;
    sunParallax.style.transform = sunT;
    contentParallax.style.transform = contentT;
  }

  if (!reduceMotion) {
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (hasFinePointer) {
      heroSection.addEventListener("mousemove", (e) => {
        const rect = heroSection.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        apply();
      });
      heroSection.addEventListener("mouseleave", () => {
        mouseX = 0;
        mouseY = 0;
        apply();
      });
    }
    window.addEventListener(
      "scroll",
      () => {
        scrollProgress = Math.min(Math.max(window.scrollY / heroSection.offsetHeight, 0), 1);
        apply();
      },
      { passive: true }
    );
  }

  return {
    getMouse: () => ({ x: mouseX, y: mouseY }),
  };
}
