/* ============================================================================
   auth.js — Client-side role-based auth (demo, CLASSIC script, works on file://).
   Session is kept in localStorage. The PUBLIC site stays fully visible to all;
   only the dashboard/admin actions check permissions. Replace with Firebase Auth
   (see firebase/firebase-config.js) for production — the role/permission model
   here mirrors the Firestore security rules.
   ============================================================================ */
(function (g) {
  "use strict";
  var SESSION = "jcd_session";

  /* Demo accounts (password shown on the login page). Real names of the wing. */
  var USERS = [
    { email: "admin@jcdpu.org",    pass: "admin123",    name: "Md Abu Huraira",             role: "super_admin" },
    { email: "national@jcdpu.org", pass: "national123", name: "M Rajibul Islam Talukder",   role: "national_admin" },
    { email: "nsu@jcdpu.org",      pass: "uni123",      name: "Ashiqur Rahman",             role: "university_admin", universityId: "nsu" },
    { email: "member@jcdpu.org",   pass: "member123",   name: "Tanvir Hasan",               role: "general_member" }
  ];

  /* Permission matrix — '*' = all. Mirrors firestore.rules. */
  var PERMS = {
    super_admin:      ["*"],
    national_admin:   ["viewDash", "grade", "notice", "editUni", "manageMembers", "reports"],
    university_admin: ["viewDash", "notice", "editUni:own", "manageMembers:own"],
    faculty_admin:    ["viewDash", "manageMembers:own"],
    committee_member: ["viewDash"],
    general_member:   []
  };

  var LABELS = {
    super_admin: "Super Admin", national_admin: "National Admin", university_admin: "University Admin",
    faculty_admin: "Faculty Admin", committee_member: "Committee Member", general_member: "General Member"
  };

  function login(email, pass) {
    var e = (email || "").trim().toLowerCase();
    var u = USERS.filter(function (x) { return x.email === e && x.pass === pass; })[0];
    if (!u) return null;
    var sess = { email: u.email, name: u.name, role: u.role, universityId: u.universityId || null, ts: Date.now() };
    localStorage.setItem(SESSION, JSON.stringify(sess));
    return sess;
  }
  function logout() { localStorage.removeItem(SESSION); }
  function current() { try { return JSON.parse(localStorage.getItem(SESSION)); } catch (e) { return null; } }
  function can(perm) {
    var u = current(); if (!u) return false;
    var p = PERMS[u.role] || [];
    return p.indexOf("*") > -1 || p.indexOf(perm) > -1 || p.indexOf(perm + ":own") > -1;
  }
  function requireAuth(redirect) { if (!current()) { location.href = redirect; return false; } return true; }
  function roleLabel(r) { return LABELS[r] || r; }

  g.JCDAuth = { login: login, logout: logout, current: current, can: can, requireAuth: requireAuth, roleLabel: roleLabel, USERS: USERS };
})(window);
