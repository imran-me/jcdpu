/* ============================================================================
   main.js — Landing/site interactions (CLASSIC script — works on file://).
   Nav scroll state, mobile drawer, animated counters, FAQ accordion,
   language toggle, hero particles, AOS init + reveal fallback, back-to-top.
   Depends on data.js (window.JCD) and ui.js (lightbox), loaded before this.
   ============================================================================ */
(function () {
  "use strict";

  const drawIcons = function () { if (window.lucide && window.lucide.createIcons) window.lucide.createIcons(); };

  /* -- Nav shadow + back-to-top on scroll --------------------------------- */
  const nav = document.getElementById("nav");
  const onScroll = function () {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 8);
    const top = document.getElementById("toTop");
    if (top) top.classList.toggle("show", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* -- Mobile drawer ------------------------------------------------------ */
  const mobileNav = document.getElementById("mobileNav");
  const openBtn = document.getElementById("navToggle");
  const closeBtn = document.getElementById("navClose");
  const setDrawer = function (open) {
    if (!mobileNav) return;
    mobileNav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  if (openBtn) openBtn.addEventListener("click", function () { setDrawer(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setDrawer(false); });
  if (mobileNav) mobileNav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setDrawer(false); }); });

  /* -- Animated counters -------------------------------------------------- */
  function animateCount(el) {
    const target = +el.dataset.count;
    const dur = 1600;
    const start = performance.now();
    const fmt = function (n) { return n.toLocaleString("en-US"); };
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick); else el.textContent = fmt(target);
    }
    requestAnimationFrame(tick);
  }
  if ("IntersectionObserver" in window) {
    const countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { animateCount(e.target); countObs.unobserve(e.target); } });
    }, { threshold: 0.4 });
    document.querySelectorAll("[data-count]").forEach(function (el) { countObs.observe(el); });
  } else {
    document.querySelectorAll("[data-count]").forEach(function (el) { el.textContent = (+el.dataset.count).toLocaleString("en-US"); });
  }

  /* -- FAQ accordion ------------------------------------------------------ */
  document.querySelectorAll(".faq__item").forEach(function (item) {
    const q = item.querySelector(".faq__q");
    const a = item.querySelector(".faq__a");
    q.addEventListener("click", function () {
      const open = item.classList.toggle("is-open");
      a.style.maxHeight = open ? a.scrollHeight + "px" : "0";
    });
  });

  /* -- Language toggle ---------------------------------------------------- */
  const langBtn = document.getElementById("langToggle");
  if (langBtn) langBtn.addEventListener("click", function () {
    document.body.classList.toggle("bn");
    langBtn.textContent = document.body.classList.contains("bn") ? "EN / বাংলা" : "বাংলা / EN";
  });

  /* -- Hero floating particles ------------------------------------------- */
  const pWrap = document.getElementById("particles");
  if (pWrap) {
    const spots = [[10,20],[22,60],[35,35],[48,72],[60,25],[72,55],[84,40],[92,68],[16,80],[66,82]];
    spots.forEach(function (pt, i) {
      const dot = document.createElement("i");
      dot.style.left = pt[0] + "%"; dot.style.top = pt[1] + "%";
      dot.style.animationDelay = (i * 0.7) + "s"; dot.style.animationDuration = (7 + (i % 4)) + "s";
      pWrap.appendChild(dot);
    });
  }

  /* -- Duplicate marquee for seamless loop -------------------------------- */
  const strip = document.getElementById("strip");
  if (strip) strip.innerHTML += strip.innerHTML;

  /* -- Reveal helper (used as AOS fallback for [data-aos]/[data-lux]) ------ */
  function revealAll() {
    document.querySelectorAll("[data-aos]").forEach(function (el) { el.classList.add("aos-animate"); });
    document.querySelectorAll("[data-lux]").forEach(function (el) { el.classList.add("in"); });
  }

  /* -- Luxury reveal-on-scroll ([data-lux]) ------------------------------- */
  if ("IntersectionObserver" in window) {
    const luxObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); luxObs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll("[data-lux]").forEach(function (el) { luxObs.observe(el); });
  } else {
    revealAll();
  }

  /* -- Back to top -------------------------------------------------------- */
  const toTop = document.getElementById("toTop");
  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* -- Boot --------------------------------------------------------------- */
  function boot() {
    if (window.JCD && window.JCD.mountLandingPreviews) window.JCD.mountLandingPreviews();
    drawIcons();
    onScroll();
    if (window.AOS && window.AOS.init) {
      try { window.AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 60 }); }
      catch (err) { revealAll(); }
    } else {
      revealAll();   // AOS library missing → show everything
    }
  }
  if (document.readyState !== "loading") boot();
  else document.addEventListener("DOMContentLoaded", boot);

  /* -- Hard safety net: if anything left hidden after load, reveal it ------ */
  window.addEventListener("load", function () {
    setTimeout(function () {
      const h = document.querySelector('[data-aos]');
      if (h && getComputedStyle(h).opacity === "0") revealAll();
      drawIcons();
    }, 800);
  });
})();
