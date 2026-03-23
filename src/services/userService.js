import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

/**
 * Create a user document in Firestore after registration.
 */
export const createUserDoc = async (uid, data) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, {
    name: data.name,
    email: data.email,
    role: data.role,
    phone: "",
    status: "active",
    createdAt: serverTimestamp(),
  });
};

/**
 * Fetch the user document from Firestore.
 */
export const getUserDoc = async (uid) => {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) return null;
  return { uid, ...snap.data() };
};

/**
 * Update fields on an existing user document.
 */
export const updateUserDoc = async (uid, fields) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, fields);
};
