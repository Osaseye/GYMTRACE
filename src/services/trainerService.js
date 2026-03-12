import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const usersRef = collection(db, "users");

/**
 * Fetch all users whose role === 'trainer'.
 */
export const getAllTrainers = async () => {
  const q = query(usersRef, where("role", "==", "trainer"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
};

/**
 * Update a trainer's profile fields (name, phone, specialty, status, etc.).
 */
export const updateTrainer = async (uid, fields) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, fields);
};

/**
 * Delete a trainer's Firestore document.
 */
export const deleteTrainer = async (uid) => {
  const userRef = doc(db, "users", uid);
  await deleteDoc(userRef);
};
