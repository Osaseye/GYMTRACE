import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const settingsRef = doc(db, "settings", "global");

/**
 * Fetch global settings from Firestore.
 */
export const getSettings = async () => {
  const snap = await getDoc(settingsRef);
  if (!snap.exists()) return null;
  return snap.data();
};

/**
 * Save global settings (merge so partial updates work).
 */
export const saveSettings = async (fields) => {
  await setDoc(settingsRef, fields, { merge: true });
};
