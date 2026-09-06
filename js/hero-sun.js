/* ==========================================================================
   HERO SUN — encendido / apagado
   ========================================================================== */

const sunButton = document.querySelector(".hero__sun-btn");

if (sunButton) {
  sunButton.setAttribute("aria-pressed", "true");
  sunButton.setAttribute("aria-label", "Apagar la llama");

  sunButton.classList.add("is-on");

  sunButton.addEventListener("click", () => {
    const isOn = sunButton.classList.contains("is-on");

    /* Crear ondas */
    const ripple = document.createElement("span");
    ripple.className = "ripple";

    sunButton.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 900);

    /* Encender */
    if (!isOn) {
      sunButton.classList.remove("is-off");
      sunButton.classList.add("is-on", "is-igniting");

      sunButton.setAttribute("aria-pressed", "true");
      sunButton.setAttribute("aria-label", "Apagar la llama");

      setTimeout(() => {
        sunButton.classList.remove("is-igniting");
      }, 700);

      return;
    }

    /* Apagar */
    sunButton.classList.remove("is-on");
    sunButton.classList.add("is-off", "is-extinguishing");

    sunButton.setAttribute("aria-pressed", "false");
    sunButton.setAttribute("aria-label", "Encender la llama");

    setTimeout(() => {
      sunButton.classList.remove("is-extinguishing");
    }, 450);
  });
}