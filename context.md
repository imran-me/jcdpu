# CONTEXT & PROGRESS — JCD Private University Wing Platform

> Working memory for this build. Update as work proceeds.
> Project root: `d:\JCDPU`

---

## 1. What we are building

An **enterprise committee-management platform + patriotic landing site** for the
**Jatiyatabadi Chhatra Dal — Private University Wing** (জাতীয়তাবাদী ছাত্রদল, বেসরকারি বিশ্ববিদ্যালয় শাখা),
the student wing of the **Bangladesh Nationalist Party (BNP)**.

**Purpose**
- Public landing page — nationalism / patriotism theme, legacy of Ziaur Rahman → Khaleda Zia → Tarique Rahman.
- History enlistment: BNP, Chhatra Dal, Private University wing, Liberation War, Ziaur Rahman, Khaleda Zia.
- Committee management: National → University → Faculty → Department committees.
- Each **university** gets a unit profile (activities, members, updates, performance grade).
- Each **member** gets a full nationalist CV profile (credentials, achievements, positions) + Digital CV (PDF).
- Central committee can **grade** universities & members and **send notices** (individual or broadcast).
- Universities can add members, maintain their unit profile & activity feed.

**Design bar:** Apple / Stripe / Linear / Vercel / gov-grade. 8px grid, deep green + maroon + gold + white,
Hind Siliguri + Inter, Lucide icons, soft layered shadows, tasteful motion (AOS/GSAP/counters). No AI-generic look.

---

## 2. VERIFIED FACTS (use these — do NOT invent)

Sourced from Wikipedia, Banglapedia, Britannica, Al Jazeera (bnpbd.org blocks scraping — 403).

- **BNP** founded **1 September 1978** by **President Ziaur Rahman** at Ramna, Dhaka. Ideology: Bangladeshi nationalism.
- **Ziaur Rahman** — proclaimer of independence (Kalurghat, 1971), Sector Commander / Z-Force, President, founder of BNP.
  Assassinated **30 May 1981**, Chittagong Circuit House. Honorific: *Shaheed President Ziaur Rahman*.
- **Jatiyatabadi Chhatra Dal (JCD / Chhatra Dal)** — founded **1 January 1979** as BNP's student wing.
  Adopted the 19-point programme. Vanguard against Ershad's autocracy. Founding anniversary = 1 Jan (46th in 2025).
- **Begum Khaleda Zia** — wife of Ziaur Rahman; BNP Chairperson; PM of Bangladesh 1991–96 & 2001–06;
  honorific *Deshnetri* ("Leader of the Nation"). **Passed away Dec 2025** (memorial framing — treat respectfully / In Memoriam).
- **Tarique Rahman** — returned Dec 2025 after ~17 yrs exile; BNP **Chairman**; BNP-led coalition won a **two-thirds
  majority in the Feb 2026 election**; became **Hon'ble Prime Minister of Bangladesh (2026)**. Time 100 (2026).
  → Title on site: **"Chairman, BNP & Hon'ble Prime Minister of Bangladesh"**. Slogan seen: *"সবার আগে বাংলাদেশ"* (Bangladesh First).

**Sensitivity note:** Real political org & real people. Keep copy factual & respectful; no fabricated achievements
about named individuals beyond documented history. Party/organizational sites are legitimate.

---

## 3. IMAGE CATALOG  (originals in root; working copies in `assets/img/`)

| assets/img file            | Content                                              | Used for                          |
|----------------------------|------------------------------------------------------|-----------------------------------|
| logo-jcd.png               | JCD emblem (red/green, 3 stars)                      | Nav logo, favicon, footer         |
| hero-tarique-rally.jpg     | Tarique Rahman waving to massive crowd               | **Hero** background / feature      |
| pm-tarique.jpg             | Tarique seated, PM emblem (প্রধানমন্ত্রী)              | Leadership — current PM card       |
| tarique-manifesto.jpg      | Tarique w/ "সবার আগে বাংলাদেশ" manifesto              | Vision / news                      |
| thank-you-bangladesh.jpg   | "THANK YOU BANGLADESH" victory graphic               | CTA / news                         |
| ziaur-portrait.jpg         | Ziaur Rahman portrait (green, sunglasses)            | Legacy — founder card              |
| ziaur-un.jpg               | Ziaur Rahman at UN podium (duotone banner)           | History banner                     |
| ziaur-officer.jpg          | Young Zia (officer) w/ elder statesman, B&W          | Timeline (1971/founding)           |
| khaleda-podium-1/-2.jpg    | Khaleda Zia at podium                                | Legacy — Khaleda card              |
| khaleda-rally.jpg          | Khaleda Zia arms raised at rally, B&W                | Timeline (democracy movement)      |
| khaleda-tarique.jpg        | Khaleda tending to Tarique (personal)               | Legacy story                       |
| khaleda-memorial.jpg       | Khaleda Zia w/ black mourning ribbon                | **In Memoriam** block              |
| tarique-family.jpg         | Tarique w/ Dr. Zubaida Rahman & daughter at memorial | Legacy / return                    |
| gallery-1.jpg, gallery-2.jpg | Misc rally/event                                   | Gallery                            |
| flag-dark.jpg              | BD flag, dark negative space                        | Section band / hero overlay        |
| flag-sunset.jpg            | Silhouette waving BD flag at sunset                 | CTA band background                |
| timeline-a/-b/-c.png       | Historical B&W (rallies/leaders)                    | History timeline / gallery         |

---

## 4. ARCHITECTURE / FOLDER PLAN

```
d:\JCDPU\
├── index.html                     # Landing page (centerpiece)
├── context.md                     # this file
├── README.md                      # setup + deploy + architecture
├── assets/
│   ├── css/theme.css              # design system (DONE)
│   ├── css/pages.css              # page-specific styles
│   ├── js/main.js                 # nav, mega menu, counters, AOS/GSAP init, mobile
│   ├── js/data.js                 # mock data (universities, members, notices, events)
│   └── img/                       # images (DONE)
├── pages/
│   ├── universities.html          # University Directory (search/filter/sort)
│   ├── university-profile.html    # single university unit profile
│   ├── member-profile.html        # member profile + Digital CV
│   ├── dashboard.html             # central/admin dashboard (grading, notices, stats)
│   └── history.html               # (optional) full history enlistment
└── firebase/
    ├── firebase-config.js         # config placeholder
    ├── firestore.rules            # security rules (role-based)
    └── collections.md             # Firestore schema doc
```

---

## 5. TODO / PROGRESS

- [x] Research & verify facts (BNP, JCD, Zia, Khaleda, Tarique)
- [x] Catalog + import images to `assets/img/`
- [x] `assets/css/theme.css` — design system / tokens
- [x] `context.md` (this file)
- [x] `index.html` — landing (hero, stats, about, structure, history/timeline, legacy, universities, notices, events, gallery, FAQ, contact, footer)
- [x] `assets/css/pages.css`
- [x] `assets/js/main.js` + `assets/js/data.js`
- [x] `pages/universities.html` — directory (debounced search/filter/sort)
- [x] `pages/member-profile.html` — profile + Digital CV (print) + ID card + QR
- [x] `pages/dashboard.html` — admin/grading/notices/rankings/growth chart
- [x] `pages/university-profile.html` — unit profile (reads ?u=id)
- [x] `firebase/` scaffolding (config, rules, collections.md) + `README.md`
- [x] Smoke-tested: all pages + assets return HTTP 200

## ✅ BUILD COMPLETE (v1). Next ideas: faculty/department drill-down, real Firebase wiring,
##    Bangladesh interactive map (hero), more sample members, gallery lightbox.

## 7. LUXURY / PATRIOTIC UPGRADE (v2)
- `assets/css/luxury.css` — "Heritage Couture" layer loaded after pages.css on ALL pages:
  Playfair Display + Cormorant serif display type, 24k gold-foil accents, ornamental Bengali
  dividers (`.ornament`), grain texture, gilded surfaces, refined buttons/nav.
- **Flag palette leads:** `--flag-green #006a4e` + `--flag-red #c8102e` (BD flag / BNP logo) with
  gold luxury accent. Tricolour rules (green→gold→red), red eyebrows, green/red badges & covers.
- **Animations:** hero aurora + Ken-Burns drift, gold shimmer wordmark, pulsing flag dot,
  `[data-lux]` scroll-reveal (main.js + inline on leadership.html), card hover glow. Reduced-motion safe.
- **NEW PAGE `pages/leadership.html`** — Central Committee grid (monogram avatars) + full dossiers for
  Ziaur Rahman, Begum Khaleda Zia (In Memoriam), Tarique Rahman — each with bio, facts, quote, photo gallery.
- index.html enriched: ideology card (4 state principles + 19-Point), ornaments, detailed timeline,
  nav/footer link to Leadership, hero shimmer.
- Verified via headless-Chrome screenshots (landing, leadership, member, dashboard, universities) — all clean.
  Fixed: profile-header text contrast (dark ink below cover), directory nav → Leadership.
- Research sources added: Zia (Bir Uttam, Z-Force, 19-Point, 1400 canals), Khaleda (first woman PM,
  Chairperson 1984–2025), Bangladeshi nationalism (4 principles: democracy, faith, nationalism, social justice).

## 8. INTERACTIVE FEATURES (v3)
- **Nationwide Presence map** (index #presence): stylised SVG Bangladesh silhouette (gold edge) with
  8 pulsing red/green division markers (hover tooltips) + division list with unit counts. Click a
  division → `pages/universities.html?division=<name>` (directory pre-filters from URL params: division/grade/status/q).
- **Gallery lightbox** (`assets/js/ui.js`): binds to `.gallery` + `.dossier__gallery` figures on landing &
  leadership; Esc closes, ←/→ navigate, click-outside closes. Imported via main.js + <script> on leadership.
- Added sample universities in Khulna/Barishal/Rangpur/Mymensingh so every division returns results (17 total).
- Verified via screenshots: map renders, markers placed, Khulna deep-link shows 2 units.
- Map is labelled "illustrative" (stylised, not precise cartography).

## 9. CONTENT + DRILL-DOWN (v4)
- **Downloads & Resources** section on landing (index #downloads): 6 doc cards (Constitution, Unit
  Registration Form, Membership Application, Grading Rubric, Event Guidelines, Annual Report). `.doc` component.
- **Faculty & Department committees** accordion on university-profile.html (`.ftree`): 4 faculties →
  department committees with member counts; built + toggled in page script.
- Gallery lightbox now also on university-profile (added ui.js import).
- Footer: added Downloads link.
- All verified via headless-Chrome screenshots. No errors — every page returns HTTP 200.

## 10. FILE:// FIX (v5) — "empty page" bug
- ROOT CAUSE: pages used `<script type="module">` → browsers block modules over file:// (double-click),
  so nothing ran; AOS never initialised → all [data-aos] sections stayed opacity:0 = "empty page".
- FIX: converted ALL scripts to CLASSIC (no import/export). data.js now exposes `window.JCD`;
  main.js/ui.js are plain IIFEs; every page loads `data.js`+`ui.js`+`main.js` (or inline classic) via
  normal `<script src>`. Added AOS reveal fallback + 800ms safety net in main.js (reveals content if
  AOS/CDN fails). No server, no Python/PHP needed — **works by double-clicking index.html**.
- Verified via headless Chrome on `file:///D:/JCDPU/...`: landing hero renders, counters run,
  leadership committee cards render, directory `?division=Sylhet` filters correctly.
- Needs internet for CDN assets (Bootstrap/AOS/Lucide/fonts); otherwise fully local.

## 11. NAV FIX + LEADERSHIP REBUILD + MARTYRS (v6/v7)
### Navbar (fixed "items change position" bug)
- ROOT CAUSE: at 1040–1180px the brand wordmark wrapped to multiple lines → cramped/shifting menu;
  and the বাংলা/EN toggle changed the whole-body font → nav reflow.
- FIX (luxury.css NAVBAR block): brand/links `white-space:nowrap`; chrome (nav/topbar) forced to Inter
  even in `body.bn` (no reflow); mobile breakpoint raised 1040→1200 (skip the cramped zone); primary
  button hidden <560. Verified at 1090/1210/1300/1440.
- BD-FLAG theme: topbar = flag green (#006a4e); green→gold→red accent line under nav; brand wordmark
  green→red gradient; nav hover green; underline green→red.

### Leadership page (pages/leadership.html) — full rebuild to real hierarchy
- **Chain of command**: Supreme Guardian = **Tarique Rahman** (real photo) → National JCD (parent/formality)
  = **Md Rakibul Islam Rakib** (President) + **Nasir Uddin Nasir** (GS) → **Private University Wing**
  spotlight = **Md Abu Huraira** (President) + **M Rajibul Islam Talukder "Bindu"** (GS) — highlighted big.
- Central committee leaderboard (extended office-bearers, representative names + monograms).
- Martyrs / July 2024 Quota Uprising: **49 Chhatra Dal martyrs**, Shaheed **Wasim Akram** (Chattogram
  College, 16 Jul 2024, first July martyr Ctg) featured; respectful dark memorial band. (Sources: Daily
  Star, BSS, Dhaka Tribune "49 martyrs".)
- Chhatra Dal chronicle timeline (1979 → 2024 uprising → 2026) + Zia/Khaleda legacy dossiers retained.

### PHOTOS — real leader photos
- Could NOT auto-download (chatradal.com DNS fail; news sites 403; WebFetch returns text not images).
- SOLUTION: avatars use `img[data-avatar]` with `data-src` → real file, `onerror` → monogram fallback.
  **User drops files into `assets/img/central/`**: `huraira.jpg`, `bindu.jpg`, `rakib.jpg`, `nasir.jpg`,
  `wasim.jpg` → they replace monograms automatically. Tarique uses existing `pm-tarique.jpg`.

## 12. NAV CONSISTENCY + AUTH + DEEP FUNCTIONALITY (v8) — pushed to GitHub
- **Nav bug fixed properly**: every page had a DIFFERENT menu → items appeared to move. Now ALL pages
  share one identical navbar+topbar (About·Organisation·Leadership·History·Universities·Notices +
  Sign in + Member Portal) driven by `assets/js/nav.js`; current page highlighted green. Dropped the
  index mega-menu for parity. Verified by stacking 4 navbars.
- **Role-based auth** (`assets/js/auth.js`): demo accounts (admin@jcdpu.org/admin123, national, nsu, member),
  permission matrix. Public site stays fully open; only dashboard gated. `pages/login.html` split UI.
- **Content store** (`assets/js/store.js`): admin edits (grades, notices, member/committee status, added
  items, profile edits) persist to localStorage and surface on the PUBLIC site. Audit log of all actions.
- **Admin console** (`pages/dashboard.html`): multi-panel — Overview / Universities (grade+status+add) /
  Members (approve·suspend·invite) / Committees (create·approve·archive·renew) / Notices (publish+list) /
  Approvals queue / Reports / Audit log. Hash-routed panels. Permission-gated controls.
- **Public pages**: `pages/members.html` (member directory, search/filter) and `pages/notices.html`
  (notice board with NEW/SEEN read tracking, filters). Linked from landing + footer.
- **Member profile**: signed-in owner/admin gets inline **Edit profile** (about, position, skills) → persists.
- **Data**: added `members` (12) and `committees` (8) to data.js.
- GitHub: 19 commits, all authored **Md Imran Hossain <mohsind2kp@gmail.com>**, NO Claude co-author,
  pushed to https://github.com/imran-me/jcdpu.git (main).
- Demo login to explore admin: **admin@jcdpu.org / admin123**.

## 6. DECISIONS / NOTES
- Static, front-end-first build; Firebase scaffolded (not wired live) so it opens by double-click.
- Bootstrap 5.3 + Lucide via CDN; fonts via Google Fonts. No inline CSS; ES modules where practical.
- Bilingual (Bangla headline + English), `.text-bn` uses Hind Siliguri.
- Khaleda Zia → In Memoriam framing (mourning image + Dec 2025 passing).
