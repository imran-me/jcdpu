/* ============================================================================
   ui.js — Shared UI behaviours (self-initialising ES module).
   Currently: a gallery lightbox that binds to any <figure><img> inside
   .gallery or .dossier__gallery. Keyboard: Esc closes, ←/→ navigate.
   ============================================================================ */

function initLightbox() {
  const figures = Array.from(document.querySelectorAll(".gallery figure img, .dossier__gallery figure img"));
  if (!figures.length) return;

  // Build overlay once
  const box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.innerHTML = `
    <button class="lightbox__close" aria-label="Close">&times;</button>
    <button class="lightbox__btn lightbox__prev" aria-label="Previous">&#8249;</button>
    <img class="lightbox__img" alt="" />
    <button class="lightbox__btn lightbox__next" aria-label="Next">&#8250;</button>
    <div class="lightbox__cap"></div>`;
  document.body.appendChild(box);

  const imgEl = box.querySelector(".lightbox__img");
  const capEl = box.querySelector(".lightbox__cap");
  let idx = 0;

  const show = (i) => {
    idx = (i + figures.length) % figures.length;
    const src = figures[idx].currentSrc || figures[idx].src;
    imgEl.src = src;
    imgEl.alt = figures[idx].alt || "";
    capEl.textContent = figures[idx].alt || "";
  };
  const open = (i) => { show(i); box.classList.add("open"); document.body.style.overflow = "hidden"; };
  const close = () => { box.classList.remove("open"); document.body.style.overflow = ""; };

  figures.forEach((img, i) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => open(i));
  });

  box.querySelector(".lightbox__close").addEventListener("click", close);
  box.querySelector(".lightbox__prev").addEventListener("click", (e) => { e.stopPropagation(); show(idx - 1); });
  box.querySelector(".lightbox__next").addEventListener("click", (e) => { e.stopPropagation(); show(idx + 1); });
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(idx - 1);
    else if (e.key === "ArrowRight") show(idx + 1);
  });
}

if (document.readyState !== "loading") initLightbox();
else window.addEventListener("DOMContentLoaded", initLightbox);
