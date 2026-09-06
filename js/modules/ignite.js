/**
 * ignite.js — maneja el click sobre el sol: reinicia el ciclador de
 * palabras, dispara el pulso de brillo, el ripple y el burst de brasas.
 */
export function initIgnite({ sunBtn, wordCycler, emberParticles, reduceMotion }) {
  function ignite(clientX, clientY) {
    wordCycler.restart();

    sunBtn.classList.add("is-igniting");
    setTimeout(() => sunBtn.classList.remove("is-igniting"), 700);

    const ripple = document.createElement("span");
    ripple.className = "ripple";
    sunBtn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 950);

    if (!reduceMotion) emberParticles.burst(clientX, clientY, 22);
  }

  sunBtn.addEventListener("click", (e) => ignite(e.clientX, e.clientY));
}
