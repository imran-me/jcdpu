/* ============================================================================
   data.js — Mock dataset + renderers (CLASSIC script, no ES modules).
   Exposes everything on window.JCD so the site also works when opened directly
   from disk (file://), where <script type="module"> is blocked by the browser.
   In production these arrays are replaced by Firestore queries (see firebase/).
   ============================================================================ */
(function (global) {
  "use strict";

  const universities = [
    { id: "nsu",  name: "North South University",        short: "NSU",  division: "Dhaka",      district: "Dhaka",     type: "Private", status: "Active",  grade: "A", members: 640, committees: 12, established: 1992, cover: "" },
    { id: "bracu",name: "BRAC University",               short: "BRAC", division: "Dhaka",      district: "Dhaka",     type: "Private", status: "Active",  grade: "A", members: 512, committees: 10, established: 2001, cover: "alt1" },
    { id: "aiub", name: "American Intl. University-BD",  short: "AIUB", division: "Dhaka",      district: "Dhaka",     type: "Private", status: "Active",  grade: "B", members: 398, committees: 8,  established: 1994, cover: "alt2" },
    { id: "ewu",  name: "East West University",          short: "EWU",  division: "Dhaka",      district: "Dhaka",     type: "Private", status: "Active",  grade: "B", members: 356, committees: 7,  established: 1996, cover: "" },
    { id: "iub",  name: "Independent University, BD",    short: "IUB",  division: "Dhaka",      district: "Dhaka",     type: "Private", status: "Active",  grade: "A", members: 421, committees: 9,  established: 1993, cover: "alt1" },
    { id: "uiu",  name: "United International University",short: "UIU",  division: "Dhaka",      district: "Dhaka",     type: "Private", status: "Active",  grade: "C", members: 289, committees: 6,  established: 2003, cover: "alt2" },
    { id: "diu",  name: "Daffodil International Univ.",  short: "DIU",  division: "Dhaka",      district: "Dhaka",     type: "Private", status: "Active",  grade: "B", members: 470, committees: 9,  established: 2002, cover: "" },
    { id: "premier", name: "Premier University",         short: "PU",   division: "Chattogram", district: "Chattogram",type: "Private", status: "Active",  grade: "C", members: 240, committees: 5,  established: 2001, cover: "alt1" },
    { id: "ustc", name: "University of Sc. & Tech Ctg.", short: "USTC", division: "Chattogram", district: "Chattogram",type: "Private", status: "Renewing",grade: "C", members: 198, committees: 4,  established: 1989, cover: "alt2" },
    { id: "leading", name: "Leading University",         short: "LU",   division: "Sylhet",     district: "Sylhet",    type: "Private", status: "Active",  grade: "B", members: 210, committees: 5,  established: 2001, cover: "" },
    { id: "metro", name: "Metropolitan University",      short: "MU",   division: "Sylhet",     district: "Sylhet",    type: "Private", status: "Active",  grade: "C", members: 176, committees: 4,  established: 2003, cover: "alt1" },
    { id: "varendra", name: "Varendra University",       short: "VU",   division: "Rajshahi",   district: "Rajshahi",  type: "Private", status: "Active",  grade: "B", members: 188, committees: 4,  established: 2013, cover: "alt2" },
    { id: "nwu",  name: "North Western University",       short: "NWU",  division: "Khulna",     district: "Khulna",    type: "Private", status: "Active",  grade: "B", members: 196, committees: 4,  established: 2012, cover: "" },
    { id: "nubt", name: "Northern Univ. of Business & Tech.", short: "NUBT", division: "Khulna", district: "Khulna",    type: "Private", status: "Renewing",grade: "C", members: 150, committees: 3,  established: 2014, cover: "alt1" },
    { id: "ugv",  name: "University of Global Village",    short: "UGV",  division: "Barishal",   district: "Barishal",  type: "Private", status: "Active",  grade: "C", members: 132, committees: 3,  established: 2021, cover: "alt2" },
    { id: "rmu",  name: "Rangpur Metropolitan University",short: "RMU",  division: "Rangpur",    district: "Rangpur",   type: "Private", status: "Active",  grade: "B", members: 168, committees: 4,  established: 2020, cover: "" },
    { id: "must", name: "Mymensingh Univ. of Sc. & Tech.",short: "MUST", division: "Mymensingh", district: "Mymensingh",type: "Private", status: "Active",  grade: "C", members: 120, committees: 3,  established: 2022, cover: "alt1" },
  ];

  const notices = [
    { day: "18", mon: "JUL", title: "National Council 2026 — delegate registration open", body: "All university units must submit delegate lists by 5 August. Verified members only.", tags: ["National", "Priority"] },
    { day: "12", mon: "JUL", title: "Performance grading cycle Q3 published", body: "Unit grades for the July quarter are now live on university profiles and dashboards.", tags: ["Grading"] },
    { day: "04", mon: "JUL", title: "Founding Martyr's Day observance guidelines", body: "Guidelines for wreath-laying and doa mahfil across all divisional units.", tags: ["Programme"] },
    { day: "28", mon: "JUN", title: "New unit approved — Varendra University", body: "Welcome to the 142nd private-university unit of the Wing.", tags: ["Committee"] },
  ];

  const events = [
    { day: "02", mon: "AUG", title: "Nationalist Youth Convention 2026", place: "Engineers' Institution, Dhaka", img: "assets/img/gallery-2.jpg" },
    { day: "15", mon: "AUG", title: "Blood donation & relief drive", place: "All divisional units", img: "assets/img/gallery-1.jpg" },
    { day: "01", mon: "SEP", title: "BNP Founding Anniversary rally", place: "Naya Paltan, Dhaka", img: "assets/img/tarique-manifesto.jpg" },
  ];

  const gradeClass = (g) => "grade grade--" + g;

  function uniCardHTML(u, hrefBase) {
    hrefBase = (hrefBase === undefined) ? "pages/" : hrefBase;
    return (
      '<a class="uni-card" href="' + hrefBase + 'university-profile.html?u=' + u.id + '">' +
        '<div class="uni-card__cover ' + u.cover + '">' +
          '<span class="uni-card__grade ' + gradeClass(u.grade) + '">' + u.grade + '</span>' +
          '<div class="uni-card__logo">' + u.short.slice(0, 2) + '</div>' +
        '</div>' +
        '<div class="uni-card__body">' +
          '<h3>' + u.name + '</h3>' +
          '<div class="uni-card__meta"><i data-lucide="map-pin" style="width:14px;height:14px;"></i> ' + u.district + ', ' + u.division + ' · Est. ' + u.established + '</div>' +
          '<div class="uni-card__stats">' +
            '<div><b>' + u.members + '</b><span>Members</span></div>' +
            '<div><b>' + u.committees + '</b><span>Committees</span></div>' +
            '<div><b>' + u.status + '</b><span>Status</span></div>' +
          '</div>' +
        '</div>' +
      '</a>'
    );
  }

  function noticeHTML(n) {
    const tags = (n.tags || []).map(function (t) {
      const cls = t === "Priority" ? "maroon" : t === "National" ? "info" : "green";
      return '<span class="badge badge--' + cls + '">' + t + "</span>";
    }).join("");
    return (
      '<article class="notice">' +
        '<div class="notice__date"><b>' + n.day + "</b><span>" + n.mon + "</span></div>" +
        '<div class="notice__body"><h4>' + n.title + "</h4><p>" + n.body + "</p>" +
          '<div class="notice__tags">' + tags + "</div></div>" +
      "</article>"
    );
  }

  function eventHTML(e) {
    return (
      '<article class="event-card">' +
        '<div class="event-card__img">' +
          '<span class="event-card__date"><b>' + e.day + "</b><span>" + e.mon + "</span></span>" +
          '<img src="' + e.img + '" alt="' + e.title + '" loading="lazy" />' +
        "</div>" +
        '<div class="event-card__body"><h4>' + e.title + "</h4>" +
          '<div class="event-card__foot"><i data-lucide="map-pin"></i> ' + e.place + "</div></div>" +
      "</article>"
    );
  }

  function mountLandingPreviews() {
    const uni = document.getElementById("uniPreview");
    if (uni) uni.innerHTML = universities.slice(0, 6).map(function (u) { return uniCardHTML(u); }).join("");
    const nl = document.getElementById("noticeList");
    if (nl) nl.innerHTML = notices.map(noticeHTML).join("");
    const ev = document.getElementById("eventList");
    if (ev) ev.innerHTML = events.map(eventHTML).join("");
  }

  global.JCD = {
    universities: universities,
    notices: notices,
    events: events,
    uniCardHTML: uniCardHTML,
    noticeHTML: noticeHTML,
    eventHTML: eventHTML,
    mountLandingPreviews: mountLandingPreviews,
  };
})(window);
