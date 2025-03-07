// Configuration Firebase sécurisée
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Type pour la configuration Firebase
type FirebaseConfigType = {
  apiKey: string | undefined;
  authDomain: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
  measurementId?: string | undefined;
}

// Vérifier la configuration
const validateFirebaseConfig = (config: FirebaseConfigType) => {
  const requiredKeys: (keyof FirebaseConfigType)[] = [
    'apiKey', 
    'authDomain', 
    'projectId', 
    'storageBucket', 
    'messagingSenderId', 
    'appId'
  ];

  const missingKeys = requiredKeys.filter(key => 
    !config[key] || config[key] === 'undefined'
  );

  if (missingKeys.length > 0) {
    console.error('Configuration Firebase incomplète. Clés manquantes:', missingKeys);
    throw new Error(`Configuration Firebase incomplète. Clés manquantes : ${missingKeys.join(', ')}`);
  }

  console.log('Configuration Firebase validée avec succès');
};

// Fonction pour initialiser Firebase côté client
export const initFirebase = () => {
  try {
    // Validation de la configuration
    validateFirebaseConfig(firebaseConfig);

    if (typeof window !== 'undefined') {
      console.log('Initialisation de Firebase côté client...');

      // Import synchronously to avoid initialization issues
      const { initializeApp } = require('firebase/app');
      
      // Initialize Firebase app first
      const app = initializeApp(firebaseConfig);
      console.log('Firebase App initialisé:', app);
      
      return app;
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de Firebase:', error);
    throw error;
  }
};

// Exporter la configuration pour des vérifications supplémentaires si nécessaire
export const getFirebaseConfig = () => {
  return firebaseConfig;
};
