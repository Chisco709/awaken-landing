/**
 * emberParticles.js — sistema de partículas tipo "brasas" en canvas.
 */
export function createEmberParticles({ canvas, heroSection, reduceMotion, getMouse }) {
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let particles = [];
  let lastSpawn = 0;

  function resize() {
    const rect = heroSection.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  function makeParticle(x, y, burst) {
    return {
      x,
      y,
      r: burst ? 1.2 + Math.random() * 2 : 1 + Math.random() * 2,
      vx: burst ? (Math.random() - 0.5) * 6 : (Math.random() - 0.5) * 0.4,
      vy: burst ? -(2 + Math.random() * 4) : -(0.4 + Math.random() * 0.6),
      phase: Math.random() * Math.PI * 2,
      alpha: 0.85,
      decay: burst ? 0.02 + Math.random() * 0.02 : 0.0035 + Math.random() * 0.003,
      hue: Math.random() > 0.5 ? "245,116,29" : "255,182,72",
    };
  }

  function burst(clientX, clientY, count) {
    const rect = heroSection.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    for (let i = 0; i < count; i++) particles.push(makeParticle(x, y, true));
  }

  function loop(ts) {
    const rect = heroSection.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    if (!reduceMotion && ts - lastSpawn > 220 && particles.length < 70) {
      lastSpawn = ts;
      particles.push(makeParticle(Math.random() * rect.width, rect.height + 10, false));
    }

    const { x: mouseX, y: mouseY } = getMouse();

    particles.forEach((p) => {
      p.x += p.vx + Math.sin(ts / 900 + p.phase) * 0.15;
      p.y += p.vy;
      p.vx *= 0.98;
      p.vy *= 0.995;
      p.alpha -= p.decay;

      if (mouseX !== 0 || mouseY !== 0) {
        const mx = (mouseX * 0.5 + 0.5) * rect.width;
        const my = (mouseY * 0.5 + 0.5) * rect.height;
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90 && dist > 0.1) {
          const force = ((90 - dist) / 90) * 0.6;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force * 0.4;
        }
      }

      ctx.beginPath();
      ctx.fillStyle = `rgba(${p.hue}, ${Math.max(p.alpha, 0)})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    particles = particles.filter((p) => p.alpha > 0.02 && p.y > -20);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  return { burst };
}
