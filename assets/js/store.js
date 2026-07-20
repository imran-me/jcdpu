/* ============================================================================
   store.js — Content store (CLASSIC script). Merges the default dataset
   (window.JCD from data.js) with admin edits saved in localStorage, so changes
   an admin makes in the dashboard appear across the PUBLIC site (same browser).
   Load AFTER data.js and BEFORE the page's render logic.
   Replace with Firestore reads/writes for a real multi-user backend.
   ============================================================================ */
(function (g) {
  "use strict";
  function ls(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function save(k, v) { localStorage.setItem(k, JSON.stringify(v)); }

  /* Apply saved overrides onto the in-memory JCD arrays (mutate in place) */
  function apply() {
    if (!g.JCD) return;
    var grades = ls("jcd_grades", {});
    g.JCD.universities.forEach(function (u) { if (grades[u.id]) u.grade = grades[u.id]; });

    ls("jcd_addedUnis", []).forEach(function (u) {
      if (!g.JCD.universities.some(function (x) { return x.id === u.id; })) g.JCD.universities.push(u);
    });

    var notices = ls("jcd_notices", []);
    if (notices.length) g.JCD.notices = notices.concat(g.JCD.notices);
  }
  apply();

  g.JCDStore = {
    setGrade: function (id, grade) { var m = ls("jcd_grades", {}); m[id] = grade; save("jcd_grades", m); if (g.JCD) { var u = g.JCD.universities.filter(function (x) { return x.id === id; })[0]; if (u) u.grade = grade; } },
    addNotice: function (n) { var a = ls("jcd_notices", []); a.unshift(n); save("jcd_notices", a); if (g.JCD) g.JCD.notices.unshift(n); },
    addUniversity: function (u) { var a = ls("jcd_addedUnis", []); a.push(u); save("jcd_addedUnis", a); if (g.JCD && !g.JCD.universities.some(function (x) { return x.id === u.id; })) g.JCD.universities.push(u); },
    resetAll: function () { ["jcd_grades", "jcd_notices", "jcd_addedUnis"].forEach(function (k) { localStorage.removeItem(k); }); }
  };
})(window);
