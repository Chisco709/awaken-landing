/**
 * wordCycler.js — rota las palabras del kicker del hero ("encendiendo ...").
 */
export function createWordCycler(words, intervalMs) {
  const el = document.getElementById("cyclerWord");
  let index = 0;
  let timer = null;

  function swap() {
    el.classList.add("is-swapping");
    setTimeout(() => {
      index = (index + 1) % words.length;
      el.textContent = words[index];
      el.classList.remove("is-swapping");
    }, 260);
  }

  function start() {
    timer = setInterval(swap, intervalMs);
  }

  function restart() {
    clearInterval(timer);
    start();
  }

  start();

  return { swap, restart };
}
