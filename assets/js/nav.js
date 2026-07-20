/* ============================================================================
   nav.js — Shared navbar behaviour (CLASSIC script, works on file://).
   ONE source of truth for: scroll shadow, mobile drawer, language toggle,
   back-to-top, and active-link highlight. The navbar MARKUP is identical on
   every page; this wires its behaviour. Load once per page after lucide.
   ============================================================================ */
(function () {
  "use strict";

  var nav = document.getElementById("nav");
  if (nav) {
    var setShadow = function () { nav.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", setShadow, { passive: true });
    setShadow();
  }

  // Mobile drawer
  var mn = document.getElementById("mobileNav");
  var openB = document.getElementById("navToggle");
  var closeB = document.getElementById("navClose");
  var setDrawer = function (open) { if (!mn) return; mn.classList.toggle("is-open", open); document.body.style.overflow = open ? "hidden" : ""; };
  if (openB) openB.addEventListener("click", function () { setDrawer(true); });
  if (closeB) closeB.addEventListener("click", function () { setDrawer(false); });
  if (mn) mn.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setDrawer(false); }); });

  // Language toggle (does not reflow the bar — nav/topbar are pinned to Inter)
  var lang = document.getElementById("langToggle");
  if (lang) lang.addEventListener("click", function () {
    document.body.classList.toggle("bn");
    lang.textContent = document.body.classList.contains("bn") ? "EN / বাংলা" : "বাংলা / EN";
  });

  // Back-to-top (if present on the page)
  var top = document.getElementById("toTop");
  if (top) {
    window.addEventListener("scroll", function () { top.classList.toggle("show", window.scrollY > 600); }, { passive: true });
    top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  // Active-link highlight for the current page
  var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav__menu .nav__link").forEach(function (a) {
    var href = (a.getAttribute("href") || "").toLowerCase();
    if (here !== "index.html" && here && href.indexOf(here) > -1) a.classList.add("is-active");
  });
})();
