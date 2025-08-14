import { addDoc, collection, getFirestore, serverTimestamp, type FieldValue } from 'firebase/firestore';
import { app } from './config';
import { ensureAnonAuth } from './auth';

export const db = getFirestore(app);

export interface RSVPData {
  nom: string;
  email: string;
  nombrePersonnes: number;
  message?: string;
  dateLimite: string;
  timestamp: FieldValue;
}

export async function addRSVP(data: Omit<RSVPData, 'timestamp' | 'dateLimite'>) {
  try {
    await ensureAnonAuth();

    const rsvpData: RSVPData = {
      ...data,
      dateLimite: '2025-10-01',
      timestamp: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'rsvp'), rsvpData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Erreur lors de l'ajout du RSVP:", error);
    throw error;
  }
}

export function isDateLimiteDepassee(): boolean {
  const dateLimite = new Date('2025-10-01');
  const aujourdhui = new Date();
  return aujourdhui > dateLimite;
}
