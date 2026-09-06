/* ==========================================================================
   HERO SUN — SOL / LLAMA INTERACTIVA
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const sunBtn = document.getElementById("sunBtn");
  const sunHint = document.getElementById("sunHint");

  // Si el HTML no tiene el botón, no hacemos nada
  if (!sunBtn) return;

  /* ------------------------------------------------------------------------
     CONFIGURACIÓN INICIAL
     ------------------------------------------------------------------------ */

  // El sol comienza encendido
  sunBtn.classList.add("is-on");

  sunBtn.setAttribute("aria-pressed", "true");
  sunBtn.setAttribute("aria-label", "Apagar la llama");

  if (sunHint) {
    sunHint.textContent = "toca para apagar";
  }

  /* ------------------------------------------------------------------------
     FUNCIÓN: CREAR RIPPLE
     ------------------------------------------------------------------------ */

  function createRipple() {
    const ripple = document.createElement("span");

    ripple.className = "ripple";

    sunBtn.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 900);
  }

  /* ------------------------------------------------------------------------
     FUNCIÓN: ACTUALIZAR ACCESIBILIDAD
     ------------------------------------------------------------------------ */

  function updateAccessibility(isOn) {
    sunBtn.setAttribute("aria-pressed", String(isOn));

    if (isOn) {
      sunBtn.setAttribute("aria-label", "Apagar la llama");

      if (sunHint) {
        sunHint.textContent = "toca para apagar";
      }
    } else {
      sunBtn.setAttribute("aria-label", "Encender la llama");

      if (sunHint) {
        sunHint.textContent = "toca para encender";
      }
    }
  }

  /* ------------------------------------------------------------------------
     CLICK — ENCENDER / APAGAR
     ------------------------------------------------------------------------ */

  sunBtn.addEventListener("click", () => {
    const isOn = sunBtn.classList.contains("is-on");

    // Efecto de onda
    createRipple();

    /* ======================================================================
       APAGAR
       ====================================================================== */

    if (isOn) {
      sunBtn.classList.remove("is-on");
      sunBtn.classList.add("is-off", "is-extinguishing");

      updateAccessibility(false);

      // Quitamos la clase de animación después de ejecutarla
      setTimeout(() => {
        sunBtn.classList.remove("is-extinguishing");
      }, 500);

      return;
    }

    /* ======================================================================
       ENCENDER
       ====================================================================== */

    sunBtn.classList.remove("is-off");
    sunBtn.classList.add("is-on", "is-igniting");

    updateAccessibility(true);

    // Quitamos la clase de animación después de ejecutarla
    setTimeout(() => {
      sunBtn.classList.remove("is-igniting");
    }, 700);
  });

  /* ------------------------------------------------------------------------
     TECLADO — ENTER / ESPACIO
     ------------------------------------------------------------------------ */

  sunBtn.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      sunBtn.click();
    }
  });

});