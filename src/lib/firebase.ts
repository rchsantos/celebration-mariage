import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { addDoc, collection, getFirestore, serverTimestamp, type FieldValue } from 'firebase/firestore';

// Configuration Firebase via variables d'environnement
// Les valeurs doivent être définies dans `.env.local`
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string,
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Analytics (optionnel, pour le suivi des utilisateurs)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialiser Firestore
export const db = getFirestore(app);

// Interface pour les données RSVP
export interface RSVPData {
  nom: string;
  email: string;
  nombrePersonnes: number;
  message?: string;
  dateLimite: string;
  timestamp: FieldValue;
}

// Fonction pour ajouter un RSVP
export const addRSVP = async (data: Omit<RSVPData, 'timestamp' | 'dateLimite'>) => {
  try {
    const rsvpData: RSVPData = {
      ...data,
      dateLimite: '2025-10-01',
      timestamp: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'rsvp'), rsvpData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Erreur lors de l\'ajout du RSVP:', error);
    throw error;
  }
};

// Fonction pour vérifier si la date limite est dépassée
export const isDateLimiteDepassee = (): boolean => {
  const dateLimite = new Date('2025-10-01');
  const aujourdhui = new Date();
  return aujourdhui > dateLimite;
};
