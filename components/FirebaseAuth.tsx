import { useState, useEffect } from 'react';
import { FirebaseUser } from '@/types/firebase';
import { GoogleAuthProvider } from 'firebase/auth';

export default function FirebaseAuth() {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    // Vérifier que Firebase est chargé côté client
    if (typeof window !== 'undefined' && window.firebase) {
      const auth = window.firebase.auth();
      
      // Écouter les changements d'authentification
      const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        setUser(currentUser ? {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          emailVerified: currentUser.emailVerified
        } : null);
      });

      // Se désabonner lors du démontage
      return () => unsubscribe();
    }
  }, []);

  const signInWithGoogle = async () => {
    if (typeof window !== 'undefined' && window.firebase) {
      const provider = new GoogleAuthProvider();
      try {
        await window.firebase.auth().signInWithPopup(provider);
      } catch (error) {
        console.error('Erreur de connexion :', error);
      }
    }
  };

  const signOut = async () => {
    if (typeof window !== 'undefined' && window.firebase) {
      try {
        await window.firebase.auth().signOut();
      } catch (error) {
        console.error('Erreur de déconnexion :', error);
      }
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Connecté en tant que : {user.displayName || user.email}</p>
          <button onClick={signOut}>Déconnexion</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Se connecter avec Google</button>
      )}
    </div>
  );
}
