import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Validation de la configuration
const validateFirebaseConfig = (config: Record<string, string | undefined>) => {
  const requiredKeys = [
    'apiKey', 
    'authDomain', 
    'projectId', 
    'storageBucket', 
    'messagingSenderId', 
    'appId'
  ];

  const missingKeys = requiredKeys.filter(key => !config[key]);
  
  if (missingKeys.length > 0) {
    console.warn(`Firebase configuration missing keys: ${missingKeys.join(', ')}`);
    return false;
  }
  return true;
};

// Configuration sécurisée depuis les variables d'environnement
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Singleton pour gérer l'initialisation Firebase
class FirebaseClient {
  private static instance: FirebaseClient;
  public app: FirebaseApp | null = null;
  public analytics: Analytics | null = null;
  public auth: Auth | null = null;
  public firestore: Firestore | null = null;
  public storage: FirebaseStorage | null = null;

  private constructor() {}

  public static getInstance(): FirebaseClient {
    if (!FirebaseClient.instance) {
      FirebaseClient.instance = new FirebaseClient();
    }
    return FirebaseClient.instance;
  }

  public async initialize() {
    // Vérification de la configuration
    if (!validateFirebaseConfig(firebaseConfig)) {
      console.error('Firebase configuration is incomplete. Please check your environment variables.');
      return this;
    }

    // Vérifier que nous sommes côté client
    if (typeof window !== 'undefined') {
      try {
        this.app = initializeApp(firebaseConfig);
        
        // Initialisation conditionnelle des services
        const [analyticsSupported] = await Promise.all([
          isSupported()
        ]);

        if (analyticsSupported) {
          this.analytics = getAnalytics(this.app);
        }

        this.auth = getAuth(this.app);
        this.firestore = getFirestore(this.app);
        this.storage = getStorage(this.app);
      } catch (error) {
        console.error('Firebase initialization error:', error);
      }
    }

    return this;
  }

  // Méthode utilitaire pour vérifier si Firebase est initialisé
  public isInitialized(): boolean {
    return this.app !== null;
  }
}

export const firebaseClient = FirebaseClient.getInstance();


