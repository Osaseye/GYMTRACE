import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const attendanceRef = collection(db, "attendance");

/**
 * Record a check-in for a member (called by admin scanner).
 */
export const recordCheckIn = async (memberId, memberName) => {
  const docRef = await addDoc(attendanceRef, {
    memberId,
    memberName,
    checkIn: serverTimestamp(),
    checkOut: null,
    status: "Active",
  });
  return docRef.id;
};

/**
 * Fetch attendance records for a specific member, ordered by most recent.
 */
export const getAttendanceByMember = async (memberId) => {
  const q = query(
    attendanceRef,
    where("memberId", "==", memberId),
    orderBy("checkIn", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/**
 * Fetch attendance for the current week (Mon-Sun) for a given member.
 * Returns an array of { day, count } for the chart.
 */
export const getWeeklyAttendance = async (memberId) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=Sun
  const diffToMon = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMon);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const q = query(
    attendanceRef,
    where("memberId", "==", memberId),
    where("checkIn", ">=", Timestamp.fromDate(monday)),
    where("checkIn", "<=", Timestamp.fromDate(sunday)),
    orderBy("checkIn", "asc")
  );

  const snap = await getDocs(q);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const counts = [0, 0, 0, 0, 0, 0, 0];

  snap.docs.forEach((d) => {
    const ts = d.data().checkIn?.toDate();
    if (ts) {
      const idx = ts.getDay() === 0 ? 6 : ts.getDay() - 1;
      counts[idx]++;
    }
  });

  return days.map((name, i) => ({ name, visits: counts[i] }));
};

/**
 * Look up a member by UID and return basic info for scanner display.
 */
export { getUserDoc as lookupMember } from "./userService";
