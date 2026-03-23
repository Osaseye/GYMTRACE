# GYMTRACE — Bug & Issue Report

> Generated from full codebase audit. 12 issues total across logic, UI, and architecture layers.

---

## 🔴 Critical — Feature Broken or Data Wrong

### BUG-01 · Booking status mismatch — `nextBooking` always null
**File:** `src/pages/member/MemberDashboard.jsx`

`MemberDashboard` filters for bookings where `status === 'confirmed'`, but `createBooking()` in `bookingService.js` writes `status: "upcoming"`. No booking ever has the value `'confirmed'`, so the "Next Booking" stat card always renders a dash regardless of what's in Firestore.

**Fix:** Change the filter from `'confirmed'` → `'upcoming'`.

```js
// BROKEN
.filter((b) => b.status === 'confirmed' && b.date >= todayStr)

// FIXED
.filter((b) => b.status === 'upcoming' && b.date >= todayStr)
```

---

### BUG-02 · QR code encodes `null` as the user ID
**File:** `src/pages/member/QRCodePage.jsx`

`generateQRCallback` runs at mount via `useEffect([], [])`, but `user` from `AuthContext` is still `null` during the initial Firebase auth resolution. The QR encodes `{"userId":null,...}` until the user manually hits "Regenerate". The effect has no dependency on `user`, so it never re-runs automatically once auth resolves.

**Fix:** Guard the callback and add `user` to the dependency array.

```js
// Add guard inside generateQRCallback
if (!user?.uid) return;

// Fix initial effect
useEffect(() => {
  if (user?.uid) generateQRCallback();
}, [user]);
```

---

### BUG-03 · `ClientsPage` references three non-existent keys
**File:** `src/pages/trainer/ClientsPage.jsx`
**Source:** `src/services/bookingService.js` → `getTrainerClients()`

`getTrainerClients` returns objects shaped as `{ uid, name, totalSessions, lastBooking }`, but the component reads three wrong field names:

| Used in component | Actual key | Result |
|---|---|---|
| `client.memberId` | `client.uid` | `undefined` — React key warning |
| `client.memberName` | `client.name` | `undefined` — name column blank |
| `client.lastBookingDate` | `client.lastBooking` | `undefined` — date always shows `—` |

**Fix:** Update all three references to match the returned shape.

---

### BUG-04 · `formatDate` in `ClientsPage` receives wrong type
**File:** `src/pages/trainer/ClientsPage.jsx`

Even after fixing BUG-03, `formatDate` does `new Date(dateStr + 'T00:00:00')`, expecting a `YYYY-MM-DD` string. But `lastBooking` is a JavaScript `Date` object, producing `new Date('[object Date]T00:00:00')` → `Invalid Date`.

**Fix:** Call `.toLocaleDateString()` directly on the Date object.

```js
const formatDate = (date) => {
  if (!date) return '—';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
```

---

## 🟡 High — Visible UX Defect

### BUG-05 · Broken Tailwind class — sidebar label unstyled
**File:** `src/pages/member/layout/MemberLayout.jsx`

```jsx
// BROKEN — double space inside class name
<p className="px-3 text-xs font-semibold text-gr  ay-400 uppercase tracking-wider mb-3">
```

`text-gr  ay-400` contains a double space, making it an unrecognised Tailwind class. The "Menu" sidebar section label receives no colour styling.

**Fix:** Remove the extra space → `text-gray-400`.

---

### BUG-06 · Email field appears editable but changes are silently dropped
**File:** `src/pages/member/ProfilePage.jsx`

The email `<input>` is enabled when `isEditing` is `true` and is wired to `onChange`, giving the user the impression they can change their email. However, `handleSave` only writes `name` and `phone` to Firestore — the email value is never saved.

**Fix:** Either mark the field as permanently `disabled` with a note that email cannot be changed here, or implement the change via Firebase Auth's `updateEmail()` method (requires re-authentication).

---

## 🟠 Medium — Architectural Debt / Silent Failure

### BUG-07 · Double Firestore write per booking — stats double-count
**File:** `src/pages/member/BookingPage.jsx`

Every booking creates two documents:

```js
await Promise.all([
  createBooking({ ... }),  // writes to /bookings
  createSession({ ... }),  // writes to /sessions — same data
]);
```

`getSessionsByTrainer` and `getBookingsByTrainer` both query their respective collections, causing session counts and booking counts to represent the same appointments twice. Trainer dashboard stats will always be inflated.

**Fix:** Pick one collection as the source of truth, or add a clear `type` field and ensure stat queries only touch one collection.

---

### BUG-08 · No check-out flow — attendance records stuck on "Active"
**Files:** `src/services/attendanceService.js`, `src/pages/member/AttendancePage.jsx`

`recordCheckIn` creates records with `status: "Active"` and `checkOut: null`. There is no `recordCheckOut` function anywhere in the codebase. Every attendance record — including ones from weeks ago — will permanently display as "Active". The `getStatusColor("Completed")` branch in `AttendancePage` is currently unreachable.

**Fix:** Implement a `recordCheckOut(attendanceId)` service function that sets `checkOut: serverTimestamp()` and `status: "Completed"`. Wire it to the scanner or a check-out button.

---

### BUG-09 · `deleteMember` / `deleteTrainer` leave orphaned Firebase Auth accounts
**Files:** `src/services/memberService.js`, `src/services/trainerService.js`

Both delete functions only remove the Firestore document. The Firebase Authentication account for that user remains active — they can still sign in and land on a broken state (no user profile found).

**Fix:** Deleting a Firebase Auth account requires the Admin SDK, which must run server-side. Create a Cloud Function `deleteUser(uid)` that calls `admin.auth().deleteUser(uid)` after deleting the Firestore document, and call that function from the admin pages instead.

---

### BUG-10 · Compound Firestore queries missing composite indexes — will fail in production
**Files:** `src/services/adminService.js`, `src/services/memberService.js`, `src/services/trainerService.js`

The following queries combine `where()` + `orderBy()` on different fields, which requires composite indexes in Firestore. These will throw `FirebaseError: The query requires an index` on any fresh production project that hasn't deployed the index definitions.

| Service | Query |
|---|---|
| `getAllMembers` | `where("role") + orderBy("createdAt")` |
| `getAllTrainers` | `where("role") + orderBy("createdAt")` |
| `getMonthlyGrowth` | `where("role") + where("createdAt", ">=") + orderBy("createdAt")` |
| `getWeeklyCheckIns` | `where("checkIn", ">=") + orderBy("checkIn")` |
| `getAttendanceByMember` | `where("memberId") + orderBy("checkIn")` |

**Fix:** Run each query in the Firebase console, click "Create Index" on the error link, then commit the generated `firestore.indexes.json` to the repo and deploy with `firebase deploy --only firestore:indexes`.

---

### BUG-11 · QR code timer creates/destroys 60 intervals per minute
**File:** `src/pages/member/QRCodePage.jsx`

```js
useEffect(() => {
  const timer = setInterval(...);
  return () => clearInterval(timer);
}, [timeLeft]); // re-runs every second
```

Because `timeLeft` is in the dependency array and updates every second, a new `setInterval` is created and destroyed 60 times per minute. While not broken, it's wasteful and can cause drift.

**Fix:** Use a single `setTimeout` with a ref, or a `useRef`-stored interval that isn't recreated on every tick.

```js
useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) { generateQRCallback(); return 60; }
      return prev - 1;
    });
  }, 1000);
  return () => clearInterval(timer);
}, []); // run once only
```

---

### BUG-12 · Inconsistent logo import — `AdminLoginPage` and `Footer` bypass the asset pipeline
**Files:** `src/pages/admin/AdminLoginPage.jsx`, `src/pages/public/components/Footer.jsx`

```js
// AdminLoginPage.jsx — public folder URL, bypasses Vite
import logo from '/logo.png';

// Every other page — correctly processed by Vite
import logo from '../../assets/logo.png';
```

`Footer.jsx` also hardcodes `src="/logo.png"` directly in JSX. The public-folder version skips Vite's asset fingerprinting and optimisation pipeline. In production builds this means the admin login logo won't be cache-busted on updates, and could resolve to a stale or different file than the rest of the app.

**Fix:** Move `logo.png` entirely into `src/assets/` (if not already), and update both files to use the relative import path consistent with the rest of the codebase.

---

## Summary

| ID | Severity | File | Description |
|---|---|---|---|
| BUG-01 | 🔴 Critical | `MemberDashboard.jsx` | Booking status filter typo — next booking always null |
| BUG-02 | 🔴 Critical | `QRCodePage.jsx` | QR generated before auth resolves — encodes null UID |
| BUG-03 | 🔴 Critical | `ClientsPage.jsx` | Three wrong field keys from `getTrainerClients` |
| BUG-04 | 🔴 Critical | `ClientsPage.jsx` | `formatDate` receives Date object not string |
| BUG-05 | 🟡 High | `MemberLayout.jsx` | Double space breaks Tailwind `text-gray-400` class |
| BUG-06 | 🟡 High | `ProfilePage.jsx` | Email field editable but save silently discards changes |
| BUG-07 | 🟠 Medium | `BookingPage.jsx` | Double write to bookings + sessions inflates stats |
| BUG-08 | 🟠 Medium | `attendanceService.js` | No checkout flow — records permanently "Active" |
| BUG-09 | 🟠 Medium | `memberService.js` / `trainerService.js` | Delete skips Firebase Auth — orphaned accounts |
| BUG-10 | 🟠 Medium | `adminService.js` + others | Compound queries need composite Firestore indexes |
| BUG-11 | 🟠 Medium | `QRCodePage.jsx` | setInterval recreated every second — timer anti-pattern |
| BUG-12 | 🟠 Medium | `AdminLoginPage.jsx` / `Footer.jsx` | Logo loaded from public URL instead of asset pipeline |
