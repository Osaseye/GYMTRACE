import {
  collection,
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const sessionsRef = collection(db, "sessions");

/**
 * Create a new session (used when a booking is confirmed).
 */
export const createSession = async ({
  trainerId,
  trainerName,
  memberId,
  memberName,
  date,
  time,
  duration,
  type,
}) => {
  const docRef = await addDoc(sessionsRef, {
    trainerId,
    trainerName,
    memberId,
    memberName,
    date,
    time,
    duration: duration || "1h",
    type: type || "Personal Training",
    status: "upcoming",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

/**
 * Mark a session as completed.
 */
export const completeSession = async (sessionId) => {
  const ref = doc(db, "sessions", sessionId);
  await updateDoc(ref, { status: "completed" });
};

/**
 * Cancel a session.
 */
export const cancelSession = async (sessionId) => {
  const ref = doc(db, "sessions", sessionId);
  await updateDoc(ref, { status: "cancelled" });
};

/**
 * Fetch all sessions for a trainer.
 */
export const getSessionsByTrainer = async (trainerId) => {
  const q = query(
    sessionsRef,
    where("trainerId", "==", trainerId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/**
 * Fetch sessions for a trainer on a specific date range (for schedule).
 */
export const getSessionsForWeek = async (trainerId, startDate, endDate) => {
  const q = query(
    sessionsRef,
    where("trainerId", "==", trainerId),
    where("date", ">=", startDate),
    where("date", "<=", endDate),
    orderBy("date", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/**
 * Get today's sessions for a trainer.
 */
export const getTodaySessions = async (trainerId) => {
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  const q = query(
    sessionsRef,
    where("trainerId", "==", trainerId),
    where("date", "==", today)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};
