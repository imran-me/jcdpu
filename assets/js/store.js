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

    // Universities: grade overrides + added units
    var grades = ls("jcd_grades", {});
    g.JCD.universities.forEach(function (u) { if (grades[u.id]) u.grade = grades[u.id]; });
    ls("jcd_addedUnis", []).forEach(function (u) {
      if (!g.JCD.universities.some(function (x) { return x.id === u.id; })) g.JCD.universities.push(u);
    });

    // Notices: admin-published prepended
    var notices = ls("jcd_notices", []);
    if (notices.length) g.JCD.notices = notices.concat(g.JCD.notices);

    // Members: status overrides + added members
    if (g.JCD.members) {
      var mStatus = ls("jcd_memberStatus", {});
      g.JCD.members.forEach(function (m) { if (mStatus[m.id]) m.status = mStatus[m.id]; });
      ls("jcd_addedMembers", []).forEach(function (m) {
        if (!g.JCD.members.some(function (x) { return x.id === m.id; })) g.JCD.members.push(m);
      });
    }

    // Committees: status overrides + added committees
    if (g.JCD.committees) {
      var cStatus = ls("jcd_committeeStatus", {});
      g.JCD.committees.forEach(function (c) { if (cStatus[c.id]) c.status = cStatus[c.id]; });
      ls("jcd_addedCommittees", []).forEach(function (c) {
        if (!g.JCD.committees.some(function (x) { return x.id === c.id; })) g.JCD.committees.push(c);
      });
    }
  }
  apply();

  function logAudit(user, action) {
    var a = ls("jcd_audit", []);
    a.unshift({ ts: Date.now(), user: user || "system", action: action });
    save("jcd_audit", a.slice(0, 200));
  }

  g.JCDStore = {
    // Universities
    setGrade: function (id, grade, user) { var m = ls("jcd_grades", {}); m[id] = grade; save("jcd_grades", m); if (g.JCD) { var u = g.JCD.universities.filter(function (x) { return x.id === id; })[0]; if (u) u.grade = grade; } logAudit(user, "Graded " + id.toUpperCase() + " → " + grade); },
    addUniversity: function (u, user) { var a = ls("jcd_addedUnis", []); a.push(u); save("jcd_addedUnis", a); if (g.JCD && !g.JCD.universities.some(function (x) { return x.id === u.id; })) g.JCD.universities.push(u); logAudit(user, "Added university: " + u.name); },

    // Notices
    addNotice: function (n, user) { var a = ls("jcd_notices", []); a.unshift(n); save("jcd_notices", a); if (g.JCD) g.JCD.notices.unshift(n); logAudit(user, "Published notice: " + n.title); },
    getNotices: function () { return (g.JCD && g.JCD.notices) || []; },

    // Members
    getMembers: function () { return (g.JCD && g.JCD.members) || []; },
    setMemberStatus: function (id, status, user) { var m = ls("jcd_memberStatus", {}); m[id] = status; save("jcd_memberStatus", m); if (g.JCD) { var x = g.JCD.members.filter(function (y) { return y.id === id; })[0]; if (x) x.status = status; } logAudit(user, "Member " + id + " → " + status); },
    addMember: function (m, user) { var a = ls("jcd_addedMembers", []); a.push(m); save("jcd_addedMembers", a); if (g.JCD && !g.JCD.members.some(function (x) { return x.id === m.id; })) g.JCD.members.push(m); logAudit(user, "Invited member: " + m.name); },

    // Committees
    getCommittees: function () { return (g.JCD && g.JCD.committees) || []; },
    setCommitteeStatus: function (id, status, user) { var m = ls("jcd_committeeStatus", {}); m[id] = status; save("jcd_committeeStatus", m); if (g.JCD) { var x = g.JCD.committees.filter(function (y) { return y.id === id; })[0]; if (x) x.status = status; } logAudit(user, "Committee " + id + " → " + status); },
    addCommittee: function (c, user) { var a = ls("jcd_addedCommittees", []); a.push(c); save("jcd_addedCommittees", a); if (g.JCD && !g.JCD.committees.some(function (x) { return x.id === c.id; })) g.JCD.committees.push(c); logAudit(user, "Created committee: " + c.name); },

    // Profile edits (member-owned)
    getProfile: function (id) { return ls("jcd_profile_" + id, null); },
    setProfile: function (id, data, user) { save("jcd_profile_" + id, data); logAudit(user, "Updated profile: " + id); },

    // Audit
    logAudit: logAudit,
    getAudit: function () { return ls("jcd_audit", []); },

    resetAll: function () {
      ["jcd_grades", "jcd_notices", "jcd_addedUnis", "jcd_memberStatus", "jcd_addedMembers",
       "jcd_committeeStatus", "jcd_addedCommittees", "jcd_audit"].forEach(function (k) { localStorage.removeItem(k); });
      Object.keys(localStorage).forEach(function (k) { if (k.indexOf("jcd_profile_") === 0) localStorage.removeItem(k); });
    }
  };
})(window);
