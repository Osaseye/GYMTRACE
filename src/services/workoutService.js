import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

const col = collection(db, 'workouts');

/**
 * Log a new workout for a member.
 * Each workout has: memberId, title, exercises[], duration, calories, date, createdAt
 */
export async function logWorkout(data) {
  const docRef = await addDoc(col, {
    ...data,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

/** Get all workouts for a member, newest first. */
export async function getWorkoutsByMember(memberId) {
  const q = query(col, where('memberId', '==', memberId), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/** Get workouts for a member for a specific week (date strings YYYY-MM-DD). */
export async function getWorkoutsForWeek(memberId, startDate, endDate) {
  const q = query(
    col,
    where('memberId', '==', memberId),
    where('date', '>=', startDate),
    where('date', '<=', endDate),
    orderBy('date', 'asc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/** Delete a workout log. */
export async function deleteWorkout(workoutId) {
  await deleteDoc(doc(db, 'workouts', workoutId));
}
