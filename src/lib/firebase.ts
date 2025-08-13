import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Configuration Firebase - À remplacer par vos vraies clés
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firestore
export const db = getFirestore(app);

// Interface pour les données RSVP
export interface RSVPData {
  nom: string;
  email: string;
  nombrePersonnes: number;
  message?: string;
  dateLimite: string;
  timestamp: any;
}

// Fonction pour ajouter un RSVP
export const addRSVP = async (data: Omit<RSVPData, 'timestamp' | 'dateLimite'>) => {
  try {
    const rsvpData: RSVPData = {
      ...data,
      dateLimite: '2025-09-01',
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
  const dateLimite = new Date('2025-09-01');
  const aujourdhui = new Date();
  return aujourdhui > dateLimite;
};
