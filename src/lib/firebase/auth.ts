import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { app } from './config';

export const auth = getAuth(app);

export async function ensureAnonAuth(): Promise<void> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (!user) {
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.error('Anonymous auth failed', error);
        }
      }
      resolve();
    });
  });
}
