# Awaken — Landing Page

Landing page oficial del movimiento **Awaken** (Pereira, Colombia). Sitio estático, sin frameworks, con contenido separado en JSON para facilitar su edición.

## ✨ Características

- Hero animado con sol interactivo (click para "encender"), parallax de mouse/scroll y partículas de brasas en `<canvas>`.
- Navegación con menú móvil y cambio de estilo al hacer scroll.
- Contenido 100% editable desde archivos `.json`, sin tocar HTML/CSS/JS.
- Soporte de `prefers-reduced-motion` para accesibilidad.
- 100% HTML, CSS y JavaScript nativo (ES Modules) — sin dependencias de build.

## 📁 Estructura del proyecto

```
awaken-landing/
├── index.html                 # Estructura HTML (contenedores que el JS rellena)
├── css/
│   ├── base.css                # Variables, reset, botones
│   ├── nav.css                 # Barra de navegación y menú móvil
│   ├── hero.css                # Hero animado
│   ├── sections.css            # Manifiesto, pilares, stats, encuentros, join, footer
│   └── responsive.css          # Media queries y accesibilidad de movimiento
├── js/
│   ├── main.js                  # Punto de entrada: carga datos, renderiza, activa interacciones
│   └── modules/
│       ├── dataLoader.js        # Carga todos los data/*.json
│       ├── templates.js         # Plantillas HTML puras a partir de los datos
│       ├── render.js            # Inyecta las plantillas en el DOM
│       ├── nav.js                # Scroll de nav + menú móvil
│       ├── wordCycler.js         # Ciclado de palabras del hero
│       ├── parallax.js           # Parallax de mouse/scroll
│       ├── emberParticles.js     # Sistema de partículas en canvas
│       └── ignite.js             # Interacción "click para encender"
├── data/
│   ├── site.json                # Metadatos (título, descripción, footer)
│   ├── nav.json                  # Marca y enlaces de navegación
│   ├── hero.json                  # Textos, palabras rotativas y CTAs del hero
│   ├── manifesto.json             # Texto del manifiesto
│   ├── pillars.json               # Las 4 comunidades/pilares
│   ├── stats.json                 # Cifras del movimiento
│   ├── encounters.json            # Sección "Noches que se sienten distintas"
│   └── join.json                  # Sección "Únete" + redes sociales
├── assets/icons/                # SVGs reutilizables (logo, sol, llama, colinas)
├── .github/workflows/deploy.yml # Despliegue automático a GitHub Pages
├── package.json
├── LICENSE
└── .gitignore
```

## ✏️ Editar contenido

Todo el texto, enlaces y cifras del sitio viven en `data/*.json`. Por ejemplo, para cambiar las cifras de la sección de estadísticas, edita `data/stats.json`:

```json
{
  "items": [
    { "number": "3.169", "label": "avivadores siguiendo el movimiento" }
  ]
}
```

No hace falta tocar `index.html`, `css/` ni `js/` para actualizar textos.

## 🚀 Cómo correrlo localmente

Como el sitio usa `fetch()` para cargar los JSON y módulos ES (`type="module"`), necesitas servirlo por HTTP (no funciona abriendo `index.html` directo con doble clic).

```bash
npm install --no-save http-server   # opcional, npx lo descarga solo
npm start
```

Luego abre **http://localhost:8080** en el navegador.

Alternativa sin Node, con Python:

```bash
python3 -m http.server 8080
```

## 🌐 Desplegar en GitHub Pages

1. Sube este proyecto a un repositorio de GitHub.
2. Ve a **Settings → Pages → Build and deployment → Source** y selecciona **GitHub Actions**.
3. Cada `push` a `main` ejecutará `.github/workflows/deploy.yml` y publicará el sitio automáticamente.

## 🛠️ Stack

- HTML5 semántico
- CSS3 (variables, grid, flexbox, `clamp()`, animaciones)
- JavaScript ES2022 (módulos nativos, `fetch`, Canvas API)
- Sin frameworks, sin build step

## 📄 Licencia

MIT — ver [LICENSE](./LICENSE).
