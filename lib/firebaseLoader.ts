// Script de chargement dynamique de Firebase

import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'

// Configuration Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// Initialisation de Firebase
export const firebaseApp = initializeApp(firebaseConfig)

// Initialisation conditionnelle des services
export const initializeFirebaseServices = async () => {
  try {
    // Vérifier le support de Firebase Analytics
    if (await isSupported()) {
      const analytics = getAnalytics(firebaseApp)
      return { analytics }
    }
    return null
  } catch (error) {
    console.error('Erreur d\'initialisation des services Firebase :', error)
    return null
  }
}

// Fonction utilitaire pour charger un service Firebase
export const loadFirebaseService = async (serviceName: 'auth' | 'firestore' | 'storage') => {
  try {
    switch (serviceName) {
      case 'auth':
        return { 
          auth: getAuth(firebaseApp),
          GoogleAuthProvider,
          signInWithPopup,
          signOut,
          onAuthStateChanged
        }
      // Ajoutez d'autres services si nécessaire
      default:
        console.warn(`Service ${serviceName} non implémenté`)
        return null
    }
  } catch (error) {
    console.error(`Erreur de chargement du service ${serviceName} :`, error)
    return null
  }
}

// Exemple d'utilisation dans un composant React
export const useFirebaseAuth = async () => {
  const authService = await loadFirebaseService('auth');
  if (authService) {
    const auth = authService.auth;
    // Logique d'authentification
    return auth;
  }
  return null;
}
