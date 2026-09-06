/**
 * main.js — punto de entrada de la aplicación.
 * 1) Carga el contenido desde /data/*.json
 * 2) Renderiza ese contenido dentro del HTML estático
 * 3) Activa toda la interactividad (nav, sol, partículas, parallax)
 */
import { loadSiteData } from "./modules/dataLoader.js";
import { renderSite } from "./modules/render.js";
import { initNav } from "./modules/nav.js";
import { createWordCycler } from "./modules/wordCycler.js";
import { createParallax } from "./modules/parallax.js";
import { createEmberParticles } from "./modules/emberParticles.js";
import { initIgnite } from "./modules/ignite.js";

async function bootstrap() {
  let data;
  try {
    data = await loadSiteData();
  } catch (err) {
    console.error("[Awaken] No se pudo cargar el contenido del sitio:", err);
    return;
  }

  renderSite(data);
  initNav();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const heroSection = document.getElementById("heroSection");
  const sunParallax = document.getElementById("sunParallax");
  const contentParallax = document.getElementById("contentParallax");
  const sunBtn = document.getElementById("sunBtn");
  const canvas = document.getElementById("emberCanvas");

  const wordCycler = createWordCycler(data.hero.cyclerWords, data.hero.cyclerIntervalMs);

  const parallax = createParallax({
    heroSection,
    sunParallax,
    contentParallax,
    reduceMotion,
  });

  const emberParticles = createEmberParticles({
    canvas,
    heroSection,
    reduceMotion,
    getMouse: parallax.getMouse,
  });

  initIgnite({ sunBtn, wordCycler, emberParticles, reduceMotion });
}

document.addEventListener("DOMContentLoaded", bootstrap);
