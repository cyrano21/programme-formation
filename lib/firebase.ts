import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBTH9hB5Mz2gB5aYpK-PRPOF0RPrhaZNH4",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "programformation-bfd28.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "programformation-bfd28",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "programformation-bfd28.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "580862934160",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:580862934160:web:76e80d427ab158939fec15",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-9KT84WKQ65"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics
export const initAnalytics = async () => {
  if (typeof window !== 'undefined') {
    const analyticsSupported = await isSupported();
    return analyticsSupported ? getAnalytics(app) : null;
  }
  return null;
};


