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

// Vérifier la configuration
const validateFirebaseConfig = () => {
  const requiredKeys = [
    'apiKey', 
    'authDomain', 
    'projectId', 
    'storageBucket', 
    'messagingSenderId', 
    'appId'
  ];

  const missingKeys = requiredKeys.filter(key => 
    !firebaseConfig[key] || firebaseConfig[key] === 'undefined'
  );

  if (missingKeys.length > 0) {
    console.error('Configuration Firebase incomplète. Clés manquantes:', missingKeys);
    throw new Error(`Configuration Firebase incomplète. Clés manquantes : ${missingKeys.join(', ')}`);
  }

  console.log('Configuration Firebase validée avec succès');
};

// Fonction pour initialiser Firebase côté client
export const initFirebase = async () => {
  try {
    // Validation de la configuration
    validateFirebaseConfig();

    if (typeof window !== 'undefined') {
      console.log('Initialisation de Firebase côté client...');

      const { initializeApp } = await import('firebase/app');
      const { getAnalytics, isSupported } = await import('firebase/analytics');
      const { getAuth } = await import('firebase/auth');
      
      console.log('Importations Firebase réussies');

      const app = initializeApp(firebaseConfig);
      console.log('Firebase App initialisé:', app);

      const auth = getAuth(app);
      console.log('Firebase Auth initialisé:', auth);
      
      const analyticsSupported = await isSupported();
      console.log('Firebase Analytics supporté:', analyticsSupported);
      
      return {
        app,
        auth,
        analytics: analyticsSupported ? getAnalytics(app) : null
      };
    } else {
      console.warn('Initialisation Firebase ignorée - côté serveur');
      return null;
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de Firebase:', error);
    throw error;
  }
};

// Exporter la configuration pour des vérifications supplémentaires si nécessaire
export const getFirebaseConfig = () => firebaseConfig;
