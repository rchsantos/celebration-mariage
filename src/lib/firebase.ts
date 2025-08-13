import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Configuration Firebase - Clés réelles
const firebaseConfig = {
  apiKey: "AIzaSyD8yffVi3Lfjm-E93QiFTEA4FqBe5PTyWk",
  authDomain: "celebration-mariage.firebaseapp.com",
  projectId: "celebration-mariage",
  storageBucket: "celebration-mariage.firebasestorage.app",
  messagingSenderId: "333074020119",
  appId: "1:333074020119:web:af67460c29075a81d32952",
  measurementId: "G-NZB9NZ3TNM"
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
  timestamp: any;
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
