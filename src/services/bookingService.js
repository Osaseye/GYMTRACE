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

const bookingsRef = collection(db, "bookings");

/**
 * Create a new booking (member books a trainer).
 * Also creates a matching session document.
 */
export const createBooking = async ({
  memberId,
  memberName,
  trainerId,
  trainerName,
  date,
  time,
  sessionType,
}) => {
  const docRef = await addDoc(bookingsRef, {
    memberId,
    memberName,
    trainerId,
    trainerName,
    date,
    time,
    sessionType: sessionType || "Personal Training",
    status: "upcoming",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

/**
 * Cancel a booking by ID.
 */
export const cancelBooking = async (bookingId) => {
  const ref = doc(db, "bookings", bookingId);
  await updateDoc(ref, { status: "cancelled" });
};

/**
 * Fetch bookings for a member (sorted newest first).
 */
export const getBookingsByMember = async (memberId) => {
  const q = query(
    bookingsRef,
    where("memberId", "==", memberId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/**
 * Fetch bookings for a trainer (sorted newest first).
 */
export const getBookingsByTrainer = async (trainerId) => {
  const q = query(
    bookingsRef,
    where("trainerId", "==", trainerId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/**
 * Get unique client info for a trainer from their bookings.
 */
export const getTrainerClients = async (trainerId) => {
  const q = query(bookingsRef, where("trainerId", "==", trainerId));
  const snap = await getDocs(q);

  const clientMap = new Map();
  snap.docs.forEach((d) => {
    const data = d.data();
    if (!clientMap.has(data.memberId)) {
      clientMap.set(data.memberId, {
        uid: data.memberId,
        name: data.memberName,
        totalSessions: 0,
        lastBooking: null,
      });
    }
    const client = clientMap.get(data.memberId);
    client.totalSessions++;
    const ts = data.createdAt?.toDate?.();
    if (ts && (!client.lastBooking || ts > client.lastBooking)) {
      client.lastBooking = ts;
    }
  });

  return Array.from(clientMap.values());
};
