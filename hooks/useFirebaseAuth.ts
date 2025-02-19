import { useState, useEffect } from 'react';
import { 
  User,
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile as updateFirebaseProfile,
  updateEmail as updateFirebaseEmail
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [auth]);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error as Error);
      console.error('Google sign in error:', error);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error as Error);
      console.error('Email sign in error:', error);
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error as Error);
      console.error('Email sign up error:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.push('/auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = async (displayName: string) => {
    try {
      if (user) {
        const auth = getAuth();
        await updateFirebaseProfile(auth.currentUser!, { displayName });
        setUser({ ...user, displayName });
      }
    } catch (error) {
      setError(error as Error);
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const updateEmail = async (newEmail: string) => {
    try {
      if (user) {
        const auth = getAuth();
        await updateFirebaseEmail(auth.currentUser!, newEmail);
        setUser({ ...user, email: newEmail });
      }
    } catch (error) {
      setError(error as Error);
      console.error('Email update error:', error);
      throw error;
    }
  };

  const getUserRoles = async () => {
    try {
      if (!user) {
        return ['guest'];
      }

      if (typeof window !== 'undefined' && window.firebase) {
        const firestore = window.firebase.firestore();
        const userDoc = await firestore
          .collection('users')
          .doc(user.uid)
          .get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          return userData?.roles || ['guest'];
        } else {
          // Create default user document if it doesn't exist
          await firestore
            .collection('users')
            .doc(user.uid)
            .set({
              email: user.email,
              displayName: user.displayName,
              roles: ['guest']
            });
          return ['guest'];
        }
      }
      return ['guest'];
    } catch (error) {
      console.error('Error fetching user roles:', error);
      return ['guest'];
    }
  };

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    logout,
    updateProfile,
    updateEmail,
    getUserRoles
  };
}