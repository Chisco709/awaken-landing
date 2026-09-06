/**
 * nav.js — fondo de la barra al hacer scroll + menú móvil.
 */
export function initNav() {
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  });

  const burgerBtn = document.getElementById("burgerBtn");
  const closeBtn = document.getElementById("closeBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  burgerBtn.addEventListener("click", () => mobileMenu.classList.add("is-open"));
  closeBtn.addEventListener("click", () => mobileMenu.classList.remove("is-open"));
  mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => mobileMenu.classList.remove("is-open"))
  );
}
