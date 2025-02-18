// Déclarations de types pour Firebase

declare global {
  interface Window {
    firebase: {
      initializeApp: (config: {
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
        measurementId?: string;
      }) => any;
      
      analytics: (app?: any) => any;
      
      auth: () => {
        GoogleAuthProvider: new () => any;
        createUserWithEmailAndPassword: (email: string, password: string) => Promise<any>;
        signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
        signInWithPopup: (provider: any) => Promise<any>;
        signOut: () => Promise<void>;
        onAuthStateChanged: (callback: (user: any | null) => void) => () => void;
        currentUser: FirebaseUser | null;
      };
      
      firestore: () => {
        collection: (path: string) => any;
        doc: (path: string) => any;
        FieldValue: {
          arrayUnion: (...elements: any[]) => any;
        };
      };
    }
  }
}

// Types de rôles possibles
export type UserRole = 'user' | 'coach' | 'admin' | 'student';

// Types pour l'utilisateur Firebase avec rôles
export interface FirebaseUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  roles?: UserRole[];
}

// Configuration Firebase
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

// Structure du document utilisateur dans Firestore
export interface UserDocument {
  email: string;
  displayName?: string | null;
  roles: UserRole[];
  createdAt: string;
  lastLogin?: string;
}

// Exporter pour permettre l'importation
export {};
