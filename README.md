# জাতীয়তাবাদী ছাত্রদল — বেসরকারি বিশ্ববিদ্যালয় শাখা
## JCD Private University Wing — Committee Management Platform

An enterprise-grade, gov-quality committee-management platform and patriotic landing
site for the **Jatiyatabadi Chhatra Dal — Private University Wing**, the student front of
the **Bangladesh Nationalist Party (BNP)**. It carries forward the legacy of
**Shaheed President Ziaur Rahman** and **Deshnetri Begum Khaleda Zia**, under the leadership
of **Chairman Tarique Rahman**, Hon'ble Prime Minister of Bangladesh.

> Motto: **সবার আগে বাংলাদেশ — Bangladesh First**

---

## ✨ What's inside

| Page | File | Highlights |
|------|------|-----------|
| **Landing** | `index.html` | Hero, animated counters, about/vision/mission, **Bangladeshi Nationalism ideology (4 principles + 19-Point)**, platform capabilities, national structure, **legacy & leadership**, **history timeline (1971→2026)**, In-Memoriam band, university preview, notices & events, gallery, FAQ, CTA, contact |
| **Leadership & Legacy** | `pages/leadership.html` | **Central Committee** grid + full dossiers of **Ziaur Rahman, Begum Khaleda Zia (In Memoriam) & Tarique Rahman** — bio, key facts, quotes and **photo galleries** |
| **University Directory** | `pages/universities.html` | Debounced search + filter (division/status/grade) + sort, live card grid |
| **University Unit Profile** | `pages/university-profile.html` | Cover, leadership, activity timeline, performance ring, notice board, gallery (reads `?u=<id>`) |
| **Member Profile / Digital CV** | `pages/member-profile.html` | Verified nationalist CV, performance score ring, skill bars, **Digital ID card + QR**, **Download CV (PDF via print)** |
| **Central Dashboard** | `pages/dashboard.html` | KPIs, growth chart, **university grading table**, **notice composer** (national → individual), rankings, activity feed |

---

## 🎨 Design system

- **Palette:** deep green `#14532d`, rich maroon `#7a1a2b`, gold `#c9a227`, white — understated, gov-grade.
- **Type:** Hind Siliguri / Noto Sans Bengali (Bangla) + Inter (UI), with a full type scale.
- **Grid:** 8px spacing system · radius 12/16/24 · soft layered "Apple" shadows.
- **Motion:** AOS scroll reveals, animated counters, CSS transitions, hero particles — respects `prefers-reduced-motion`.
- **Icons:** Lucide (SVG).
- **Heritage Couture layer** (`assets/css/luxury.css`): Playfair Display + Cormorant serif display type, 24k gold-foil accents, ornamental Bengali dividers, grain texture and gilded surfaces — a super-premium, "expensive" finish.
- **Flag identity:** bottle-green `#006a4e` + patriotic red `#c8102e` (Bangladesh flag / BNP logo) lead, with gold as the luxury accent; tricolour rules throughout.
- Tokens in `assets/css/theme.css`; components in `assets/css/pages.css`; premium layer in `assets/css/luxury.css`. **No inline CSS in logic.**

---

## 📁 Structure

```
JCDPU/
├── index.html                 # Landing page
├── context.md                 # build notes, facts & image catalog
├── README.md
├── assets/
│   ├── css/theme.css          # design tokens + primitives
│   ├── css/pages.css          # components + page styles + print CV
│   ├── js/data.js             # mock data + card/notice/event renderers (ES module)
│   ├── js/main.js             # nav, counters, FAQ, drawer, particles (ES module)
│   └── img/                    # curated imagery (see context.md catalog)
├── pages/
│   ├── universities.html
│   ├── university-profile.html
│   ├── member-profile.html
│   └── dashboard.html
└── firebase/
    ├── firebase-config.js      # SDK init (replace placeholders)
    ├── firestore.rules         # role-based security rules
    └── collections.md          # Firestore data model
```

---

## 🚀 Run it

**Just double-click `index.html`** — it opens straight in your browser, no server needed.
All scripts are plain classic JavaScript (no ES modules), so everything works from `file://`:
counters, the directory filters, the map, galleries and dashboards all run on double-click.

> Needs an internet connection the first time, because Bootstrap, AOS, Lucide icons and the
> Google Fonts load from their CDNs. (To run fully offline, download those four and reference
> them locally.) If you prefer a local server you can still use one (e.g. VS Code "Live Server"),
> but it is **not** required.

---

## 🔥 Connecting Firebase (optional, to go live)

1. Create a project at <https://console.firebase.google.com>.
2. Enable **Authentication** (Email, Phone, Google), **Firestore**, **Storage**, **Cloud Messaging**, **Hosting**.
3. Paste your config into `firebase/firebase-config.js`.
4. Deploy rules & host:
   ```bash
   npm i -g firebase-tools
   firebase login
   firebase init            # choose Firestore + Hosting; public dir = "."
   firebase deploy --only firestore:rules
   firebase deploy --only hosting
   ```
5. Set custom auth claims (`role`, `universityId`, `verified`) from a trusted Cloud Function —
   the rules authorise on claims, never on client-writable fields.
6. Swap the mock arrays in `assets/js/data.js` for the Firestore queries sketched at the
   bottom of `firebase/firebase-config.js`. Data model & indexes: `firebase/collections.md`.

---

## 🔐 Roles

`super_admin` › `national_admin` › `university_admin` › `faculty_admin` › `committee_member` › `general_member` › visitor.
Grading & role changes are **central-committee only**; members may edit their own non-privileged CV fields.
Audit logs are append-only.

---

## 📝 Content accuracy

Historical facts are sourced from Wikipedia, Banglapedia, Britannica and Al Jazeera and are
summarised in `context.md`. BNP's own site (`bnpbd.org`) blocks automated fetching; update copy
from it manually where you want the party's exact wording. Please verify names, dates and titles
before public launch.

---

*© 2026 Jatiyatabadi Chhatra Dal — Private University Wing.*
