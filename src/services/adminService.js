import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
  Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const usersRef = collection(db, "users");
const attendanceRef = collection(db, "attendance");
const bookingsRef = collection(db, "bookings");

/**
 * Get counts for the admin dashboard stats cards.
 */
export const getAdminStats = async () => {
  const [membersSnap, trainersSnap, todayCheckIns, bookingsSnap] = await Promise.all([
    getDocs(query(usersRef, where("role", "==", "member"))),
    getDocs(query(usersRef, where("role", "==", "trainer"))),
    getTodayCheckIns(),
    getDocs(bookingsRef),
  ]);

  return {
    totalMembers: membersSnap.size,
    totalTrainers: trainersSnap.size,
    todayCheckIns,
    totalBookings: bookingsSnap.size,
  };
};

/**
 * Count check-ins from today.
 */
const getTodayCheckIns = async () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const q = query(
    attendanceRef,
    where("checkIn", ">=", Timestamp.fromDate(start)),
    where("checkIn", "<=", Timestamp.fromDate(end))
  );
  const snap = await getDocs(q);
  return snap.size;
};

/**
 * Fetch the most recent activity (check-ins + new registrations).
 * Returns up to `count` items sorted by most recent.
 */
export const getRecentActivity = async (count = 10) => {
  const [checkInSnap, newUsersSnap] = await Promise.all([
    getDocs(query(attendanceRef, orderBy("checkIn", "desc"), limit(count))),
    getDocs(query(usersRef, orderBy("createdAt", "desc"), limit(count))),
  ]);

  const items = [];

  checkInSnap.docs.forEach((d) => {
    const data = d.data();
    items.push({
      id: d.id,
      type: "checkin",
      user: data.memberName || "Unknown",
      action: "Checked in",
      time: data.checkIn?.toDate?.() || new Date(),
    });
  });

  newUsersSnap.docs.forEach((d) => {
    const data = d.data();
    items.push({
      id: d.id,
      type: "register",
      user: data.name || "Unknown",
      action: `Registered as ${data.role}`,
      time: data.createdAt?.toDate?.() || new Date(),
    });
  });

  // Sort combined list by time descending
  items.sort((a, b) => b.time - a.time);
  return items.slice(0, count);
};

/**
 * Get member registration counts per month for the past 6 months.
 * Returns [{ month: 'Jan', count: 5 }, …]
 */
export const getMonthlyGrowth = async () => {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const q = query(
    usersRef,
    where("role", "==", "member"),
    where("createdAt", ">=", Timestamp.fromDate(sixMonthsAgo)),
    orderBy("createdAt", "asc")
  );
  const snap = await getDocs(q);

  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      month: d.toLocaleString("default", { month: "short" }),
      year: d.getFullYear(),
      monthIdx: d.getMonth(),
      count: 0,
    });
  }

  snap.docs.forEach((d) => {
    const ts = d.data().createdAt?.toDate?.();
    if (!ts) return;
    const entry = months.find(
      (m) => m.monthIdx === ts.getMonth() && m.year === ts.getFullYear()
    );
    if (entry) entry.count++;
  });

  return months.map(({ month, count }) => ({ month, count }));
};

/**
 * Get daily attendance counts for the past 7 days.
 * Returns [{ day: 'Mon', count: 3 }, …]
 */
export const getWeeklyCheckIns = async () => {
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const q = query(
    attendanceRef,
    where("checkIn", ">=", Timestamp.fromDate(sevenDaysAgo)),
    orderBy("checkIn", "asc")
  );
  const snap = await getDocs(q);

  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    days.push({
      label: d.toLocaleString("default", { weekday: "short" }),
      date: d.toDateString(),
      count: 0,
    });
  }

  snap.docs.forEach((d) => {
    const ts = d.data().checkIn?.toDate?.();
    if (!ts) return;
    const entry = days.find((day) => day.date === ts.toDateString());
    if (entry) entry.count++;
  });

  return days.map(({ label, count }) => ({ day: label, count }));
};
