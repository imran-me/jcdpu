# Firestore Data Model — JCD Private University Wing

Top-level collections and their document shapes. Field types use TS-like notation.
Denormalise counts (e.g. `members`, `committees`) onto parent docs for cheap directory reads;
keep them in sync with Cloud Functions triggers.

---

### `users/{uid}`  — auth account (private)
```
email: string
phone?: string
displayName: string
role: 'super_admin'|'national_admin'|'university_admin'|'faculty_admin'|'committee_member'|'general_member'
universityId?: string        // scope for university_admin
memberId?: string            // link to members/{id}
verified: boolean
createdAt: timestamp
```
> `role`, `universityId`, `verified` are ALSO set as custom auth claims by a Cloud Function.
> Security rules read the claims, never the client-writable doc, for authorization.

### `universities/{uniId}`  — unit / directory (public read)
```
name: string                 short: string
division: string             district: string
type: 'Private'              status: 'Active'|'Renewing'|'Archived'
grade: 'A'|'B'|'C'|'D'       established: number
members: number              committees: number   // denormalised counts
logoUrl?: string             coverUrl?: string
description?: string         socials?: { facebook?, email?, phone? }
createdAt: timestamp         updatedAt: timestamp
```

### `committees/{id}`  — national / university / faculty / department
```
tier: 'national'|'university'|'faculty'|'department'
name: string                 universityId?: string   parentId?: string
convener?: memberRef         memberSecretary?: memberRef
status: 'active'|'archived'  term: { start: timestamp, end: timestamp }
version: number              // committee version control
createdAt, updatedAt
```

### `members/{memberId}`  — nationalist CV (public read)
```
name: string                 photoUrl?: string
universityId: string         faculty: string        department: string
batch: string                joinedAt: timestamp
position: string             committeeId: string
memberCode: string           // e.g. JCD-PU-NSU-00417 (unique)
verified: boolean            grade: 'A'|'B'|'C'|'D'
skills: string[]             achievements: [{ title, detail, year }]
timeline: [{ role, from, to, detail }]
certificates: [{ name, issuer, year }]
eventsOrganised: [{ title, year }]
socials?: {...}
```

### `performance/{id}`  — grading (central committee writes)
```
subjectType: 'university'|'member'   subjectId: string
cycle: string                        // '2026-Q3'
scores: { activity, leadership, attendance, volunteering, events }  // 0–100
total: number                        grade: 'A'|'B'|'C'|'D'
gradedBy: uid                        gradedAt: timestamp
```

### `notices/{id}`  — notice board (public read)
```
title: string               body: string (rich text/HTML)
priority: 'normal'|'priority'|'emergency'
target: { scope: 'national'|'division'|'university'|'faculty'|'individual', ids: string[] }
publishAt?: timestamp       expiresAt?: timestamp
channels: ['inapp','email','push']
readBy: string[]            // or a subcollection for scale
createdBy: uid              createdAt: timestamp
```

### `events/{id}`
```
title, description, universityId?, venue, startAt, endAt
registrationOpen: boolean   attendees: number
certificateTemplate?: string   coverUrl?: string
```

### `attendance/{id}`
```
eventId: string   memberId: string   method: 'qr'|'manual'   at: timestamp
```

### Other collections
| collection        | purpose                                            | write access        |
|-------------------|----------------------------------------------------|---------------------|
| `roles`           | role definitions                                   | super_admin         |
| `permissions`     | granular permission matrix                         | super_admin         |
| `activities`      | unit activity feed items                           | uni/faculty admin   |
| `documents`       | unit document/file metadata (Storage refs)         | uni admin           |
| `gallery`         | photo metadata (Storage refs)                      | uni admin           |
| `messages`        | direct messages                                    | participants        |
| `notifications`   | per-user notification inbox (`uid` scoped)         | national (system)   |
| `verification`    | pending member/unit verification requests          | national            |
| `reports`         | generated analytics reports                        | national            |
| `logs`,`audit_logs`| append-only system & audit trail                  | system (immutable)  |
| `settings`        | platform settings/singletons                       | super_admin         |

---

### Suggested composite indexes
- `universities`: (`division` ASC, `name` ASC), (`status` ASC, `grade` ASC), (`grade` ASC, `members` DESC)
- `members`: (`universityId` ASC, `position` ASC), (`grade` DESC, `name` ASC)
- `notices`: (`target.scope` ASC, `createdAt` DESC)
- `performance`: (`subjectType` ASC, `cycle` ASC, `total` DESC)
