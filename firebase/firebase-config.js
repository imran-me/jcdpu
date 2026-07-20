/* ============================================================================
   firebase-config.js — Firebase initialisation (ES modules, v10 modular SDK).
   Replace the placeholder config with your own project's values from the
   Firebase console → Project settings → General → "Your apps".

   The front-end currently runs on mock data (assets/js/data.js). To go live,
   swap the mock renderers for the Firestore reads shown at the bottom of this
   file and import `db`, `auth`, etc. where needed.
   ============================================================================ */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
// import { getMessaging } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey:            "REPLACE_WITH_YOUR_API_KEY",
  authDomain:        "jcd-pu-wing.firebaseapp.com",
  projectId:         "jcd-pu-wing",
  storageBucket:     "jcd-pu-wing.appspot.com",
  messagingSenderId: "REPLACE_SENDER_ID",
  appId:             "REPLACE_APP_ID",
  measurementId:     "REPLACE_MEASUREMENT_ID",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const messaging = getMessaging(app);
// export const analytics = getAnalytics(app);

/* ---------------------------------------------------------------------------
   Example: replace the mock university list with a live Firestore query.

   import { collection, query, where, orderBy, getDocs } from
     "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
   import { db } from "../firebase/firebase-config.js";
   import { uniCardHTML } from "../assets/js/data.js";

   export async function loadUniversities({ division, status, grade } = {}) {
     let q = collection(db, "universities");
     const clauses = [];
     if (division) clauses.push(where("division", "==", division));
     if (status)   clauses.push(where("status", "==", status));
     if (grade)    clauses.push(where("grade", "==", grade));
     const snap = await getDocs(clauses.length ? query(q, ...clauses, orderBy("name")) : query(q, orderBy("name")));
     return snap.docs.map(d => ({ id: d.id, ...d.data() }));
   }
--------------------------------------------------------------------------- */
