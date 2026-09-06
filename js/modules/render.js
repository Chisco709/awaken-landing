/**
 * render.js
 * Toma los datos cargados por dataLoader.js y las plantillas de
 * templates.js, y actualiza el DOM real de index.html.
 */

import {
  renderNav,
  renderMobileMenu,
  renderHero,
  renderManifesto,
  renderPillarsHead,
  renderPillarsList,
  renderStats,
  renderEncounters,
  renderJoin,
  renderFooter,
} from "./templates.js";

function setContent(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function applyMeta(site) {
  document.documentElement.lang = site.meta.lang || "es";
  document.title = site.meta.title;

  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute("content", site.meta.description);

  let themeColor = document.querySelector('meta[name="theme-color"]');
  if (!themeColor) {
    themeColor = document.createElement("meta");
    themeColor.setAttribute("name", "theme-color");
    document.head.appendChild(themeColor);
  }
  themeColor.setAttribute("content", site.meta.themeColor);
}

/**
 * Renderiza todas las secciones del sitio a partir de los datos cargados.
 * @param {object} data - objeto devuelto por loadSiteData()
 */
export function renderSite(data) {
  applyMeta(data.site);

  setContent("navInner", renderNav(data.nav));
  setContent("mobileMenu", renderMobileMenu(data.nav));
  setContent("heroCopy", renderHero(data.hero));
  setContent("manifesto", renderManifesto(data.manifesto));
  setContent("pillarsHead", renderPillarsHead(data.pillars));
  setContent("pillarsList", renderPillarsList(data.pillars));
  setContent("statsGrid", renderStats(data.stats));
  setContent("encounters", renderEncounters(data.encounters));
  setContent("join", renderJoin(data.join));
  setContent("footer", renderFooter(data.site));
}
