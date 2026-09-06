/**
 * templates.js
 * Funciones puras: reciben datos (de /data/*.json) y devuelven fragmentos
 * de HTML. No tocan el DOM directamente; eso lo hace render.js.
 */

const ICONS = {
  logo: "./assets/icons/logo.svg",
  flame: "./assets/icons/flame.svg",
};

/** Escapa texto plano antes de insertarlo como HTML. */
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function brandMarkup(brand) {
  return `
    <img class="mark" src="${ICONS.logo}" alt="" width="30" height="30">
    ${escapeHtml(brand)}
  `;
}

function actionButton(action) {
  const variantClass = action.variant === "solid" ? "btn--solid" : action.variant === "dark" ? "btn--dark" : "btn--ghost";
  const isExternal = /^https?:\/\//.test(action.href);
  const externalAttrs = isExternal ? ' target="_blank" rel="noopener"' : "";
  return `<a href="${escapeHtml(action.href)}" class="btn ${variantClass}"${externalAttrs}>${escapeHtml(action.label)}</a>`;
}

export function renderNav(nav) {
  const links = nav.links.map((link) => `<a class="nav__link" href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join("\n");

  return `
    <a href="#" class="nav__brand">${brandMarkup(nav.brand)}</a>
    <div class="nav__links">${links}</div>
    <button class="nav__burger" id="burgerBtn" aria-label="Abrir menú">
      <span></span><span></span><span></span>
    </button>
  `;
}

export function renderMobileMenu(nav) {
  const links = nav.links.map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join("\n");

  return `
    <div class="mobile-menu__top">
      <a href="#" class="nav__brand" style="color:var(--ink)">${brandMarkup(nav.brand)}</a>
      <button class="mobile-menu__close" id="closeBtn" aria-label="Cerrar menú">&times;</button>
    </div>
    <div class="mobile-menu__links">${links}</div>
  `;
}

export function renderHero(hero) {
  const titleHtml = hero.titleLines.map(escapeHtml).join("<br>");
  const actionsHtml = hero.actions.map(actionButton).join("\n");

  return `
    <p class="hero__kicker">${escapeHtml(hero.kickerPrefix)} <span id="cyclerWord">${escapeHtml(hero.cyclerWords[0])}</span></p>
    <h1 class="hero__title">${titleHtml}</h1>
    <p class="hero__sub">${escapeHtml(hero.subtitle)}</p>
    <div class="hero__actions">${actionsHtml}</div>
  `;
}

export function renderManifesto(manifesto) {
  return `
    <p class="manifesto__label">${escapeHtml(manifesto.label)}</p>
    <p class="manifesto__text">${manifesto.htmlText}</p>
  `;
}

function pillarItem(item) {
  return `
    <div class="flame-item">
      <img src="${ICONS.flame}" alt="" style="height:${item.flameHeightPx}px" width="118" height="${item.flameHeightPx}">
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
    </div>
  `;
}

export function renderPillarsHead(pillars) {
  return `
    <h2>${escapeHtml(pillars.heading)}</h2>
    <p>${escapeHtml(pillars.description)}</p>
  `;
}

export function renderPillarsList(pillars) {
  return pillars.items.map(pillarItem).join("\n");
}

function statItem(stat) {
  return `
    <div class="stats__item">
      <div class="stats__num">${escapeHtml(stat.number)}</div>
      <div class="stats__label">${escapeHtml(stat.label)}</div>
    </div>
  `;
}

export function renderStats(stats) {
  return stats.items.map(statItem).join("\n");
}

function encounterRow(item) {
  return `<div><span>${escapeHtml(item.number)}</span> ${escapeHtml(item.text)}</div>`;
}

export function renderEncounters(encounters) {
  const rows = encounters.items.map(encounterRow).join("\n");
  return `
    <h2>${escapeHtml(encounters.heading)}</h2>
    <p>${escapeHtml(encounters.description)}</p>
    <div class="encounters__list">${rows}</div>
  `;
}

export function renderJoin(join) {
  const actionsHtml = join.actions.map(actionButton).join("\n");
  return `
    <h2>${escapeHtml(join.heading)}</h2>
    <p>${escapeHtml(join.description)}</p>
    <div class="join__actions">${actionsHtml}</div>
    <div class="join__handle"><span class="dot"></span>${escapeHtml(join.handle)}</div>
  `;
}

export function renderFooter(site) {
  return `
    <div class="site-footer__brand">
      <img src="${ICONS.logo}" alt="" width="24" height="24">
      ${escapeHtml(site.footer.brand)}
    </div>
    <div class="site-footer__copy">${escapeHtml(site.footer.copy)}</div>
  `;
}
