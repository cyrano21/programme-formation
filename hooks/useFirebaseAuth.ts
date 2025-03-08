import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  User,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile as updateFirebaseProfile,
  updateEmail as updateFirebaseEmail
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { firebaseClient } from '@/lib/firebaseClient';

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Initialize Firebase client and get auth instance
  const auth = useMemo(async () => {
    try {
      // Initialize Firebase using singleton pattern
      const client = await firebaseClient.initialize();
      if (!client.auth) {
        throw new Error('Failed to initialize Firebase authentication');
      }
      return client.auth;
    } catch (error) {
      console.error('Error initializing Firebase:', error);
      setError(error as Error);
      return null;
    }
  }, []);

  const router = useRouter();

  // Set up auth state listener with proper cleanup
  useEffect(() => {
    const initAuth = async () => {
      const authInstance = await auth;
      if (!authInstance) {
        setLoading(false);
        setError(new Error('Firebase authentication not initialized'));
        return;
      }

      // Subscribe to auth state changes
      const unsubscribe = authInstance.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoading(false);
      }, (error) => {
        console.error('Auth state change error:', error);
        setError(error as Error);
        setLoading(false);
      });

      return unsubscribe;
    };

    // Initialize auth and cleanup
    let unsubscribe: (() => void) | undefined;
    initAuth().then(cleanup => {
      unsubscribe = cleanup;
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [auth]);

  // Memoize auth functions to prevent unnecessary re-renders
  const signInWithGoogle = useCallback(async () => {
    try {
      const authInstance = await auth;
      if (!authInstance) throw new Error('Auth not initialized');
      
      const provider = new GoogleAuthProvider();
      await signInWithPopup(authInstance, provider);
    } catch (error) {
      setError(error as Error);
      console.error('Google sign in error:', error);
    }
  }, [auth]);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    try {
      const authInstance = await auth;
      if (!authInstance) throw new Error('Auth not initialized');
      
      await signInWithEmailAndPassword(authInstance, email, password);
    } catch (error) {
      setError(error as Error);
      console.error('Email sign in error:', error);
    }
  }, [auth]);

  const createAccount = useCallback(async (email: string, password: string) => {
    try {
      const authInstance = await auth;
      if (!authInstance) throw new Error('Auth not initialized');
      
      await createUserWithEmailAndPassword(authInstance, email, password);
    } catch (error) {
      setError(error as Error);
      console.error('Create account error:', error);
    }
  }, [auth]);

  const logout = useCallback(async () => {
    try {
      const authInstance = await auth;
      if (!authInstance) throw new Error('Auth not initialized');
      
      await signOut(authInstance);
      router.push('/auth/login');
    } catch (error) {
      setError(error as Error);
      console.error('Logout error:', error);
    }
  }, [auth, router]);

  const updateProfile = useCallback(async (displayName: string, photoURL?: string) => {
    try {
      const authInstance = await auth;
      if (!authInstance || !authInstance.currentUser) throw new Error('Auth not initialized or no current user');
      
      await updateFirebaseProfile(authInstance.currentUser, {
        displayName,
        photoURL: photoURL || authInstance.currentUser.photoURL
      });
      // Update local user state to reflect changes immediately
      setUser({ ...authInstance.currentUser });
    } catch (error) {
      setError(error as Error);
      console.error('Update profile error:', error);
    }
  }, [auth]);

  const updateEmail = useCallback(async (email: string) => {
    try {
      const authInstance = await auth;
      if (!authInstance || !authInstance.currentUser) throw new Error('Auth not initialized or no current user');
      
      await updateFirebaseEmail(authInstance.currentUser, email);
      // Update local user state to reflect changes immediately
      setUser({ ...authInstance.currentUser });
    } catch (error) {
      setError(error as Error);
      console.error('Update email error:', error);
    }
  }, [auth]);

  // Get user roles from Firestore
  const getUserRoles = useCallback(async () => {
    try {
      const authInstance = await auth;
      if (!authInstance || !authInstance.currentUser) {
        return ['guest'];
      }
      
      // For now, return a default role array
      // In a real implementation, this would fetch roles from Firestore
      return ['user'];
    } catch (error) {
      setError(error as Error);
      console.error('Get user roles error:', error);
      return ['guest'];
    }
  }, [auth]);

  // Memoize the auth object to prevent unnecessary re-renders
  const authObject = useMemo(() => ({
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithEmail,
    createAccount,
    logout,
    updateProfile,
    updateEmail,
    getUserRoles
  }), [
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithEmail,
    createAccount,
    logout,
    updateProfile,
    updateEmail,
    getUserRoles
  ]);

  return authObject;
}