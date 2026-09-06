/**
 * dataLoader.js
 * Carga todo el contenido del sitio desde /data/*.json en paralelo.
 * Mantener el contenido en JSON permite editar textos, enlaces y cifras
 * sin tocar el HTML ni el CSS.
 */

const DATA_FILES = {
  site: "./data/site.json",
  nav: "./data/nav.json",
  hero: "./data/hero.json",
  manifesto: "./data/manifesto.json",
  pillars: "./data/pillars.json",
  stats: "./data/stats.json",
  encounters: "./data/encounters.json",
  join: "./data/join.json",
};

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`No se pudo cargar ${url} (status ${response.status})`);
  }
  return response.json();
}

/**
 * Devuelve un objeto con todas las secciones de contenido cargadas:
 * { site, nav, hero, manifesto, pillars, stats, encounters, join }
 */
export async function loadSiteData() {
  const entries = Object.entries(DATA_FILES);
  const results = await Promise.all(entries.map(([, url]) => fetchJson(url)));

  return entries.reduce((data, [key], index) => {
    data[key] = results[index];
    return data;
  }, {});
}
