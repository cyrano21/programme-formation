'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  getAuth, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  GoogleAuthProvider,
  updateProfile as firebaseUpdateProfile,
  updateEmail as firebaseUpdateEmail,
  updatePassword as firebaseUpdatePassword,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  User as FirebaseUser
} from 'firebase/auth'
import { initFirebase } from '@/lib/firebaseConfig'

type AuthError = {
  code?: string
  message: string
}

export function useFirebaseAuth() {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AuthError | null>(null)

  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log('Initializing Firebase...')
        await initFirebase()
        
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(
          auth, 
          (currentUser) => {
            console.log('Auth state changed:', currentUser)
            setUser(currentUser)
            setLoading(false)
          },
          (authError) => {
            console.error('Auth state change error:', authError)
            setError({
              message: authError.message || 'Erreur d\'authentification'
            })
            setLoading(false)
          }
        )

        return () => unsubscribe()
      } catch (initError) {
        console.error('Firebase initialization error:', initError)
        setError({
          message: 'Erreur d\'initialisation de Firebase'
        })
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const signUpWithEmail = useCallback(async (
    email: string, 
    password: string, 
    displayName?: string
  ) => {
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const newUser = userCredential.user

      if (displayName && newUser) {
        await firebaseUpdateProfile(newUser, { displayName })
      }

      setUser(newUser)
      return newUser
    } catch (signUpError: any) {
      console.error('Sign up error:', signUpError)
      setError({
        code: signUpError.code,
        message: signUpError.message || 'Erreur lors de l\'inscription'
      })
      return null
    }
  }, [])

  const signInWithEmail = useCallback(async (
    email: string, 
    password: string
  ) => {
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const signedInUser = userCredential.user

      setUser(signedInUser)
      return signedInUser
    } catch (signInError: any) {
      console.error('Sign in error:', signInError)
      setError({
        code: signInError.code,
        message: signInError.message || 'Erreur de connexion'
      })
      return null
    }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const googleUser = userCredential.user

      setUser(googleUser)
      return googleUser
    } catch (googleSignInError: any) {
      console.error('Google sign in error:', googleSignInError)
      setError({
        code: googleSignInError.code,
        message: googleSignInError.message || 'Erreur de connexion Google'
      })
      return null
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      const auth = getAuth()
      await signOut(auth)
      setUser(null)
    } catch (logoutError: any) {
      console.error('Logout error:', logoutError)
      setError({
        code: logoutError.code,
        message: logoutError.message || 'Erreur de déconnexion'
      })
    }
  }, [])

  const updateProfile = useCallback(async (
    displayName?: string, 
    photoURL?: string
  ) => {
    try {
      if (user) {
        await firebaseUpdateProfile(user, { 
          displayName: displayName || user.displayName, 
          photoURL: photoURL || user.photoURL 
        })
        
        // Refetch user to get updated info
        const auth = getAuth()
        const updatedUser = auth.currentUser
        setUser(updatedUser)
        
        return updatedUser
      }
      return null
    } catch (updateError: any) {
      console.error('Profile update error:', updateError)
      setError({
        code: updateError.code,
        message: updateError.message || 'Erreur de mise à jour du profil'
      })
      return null
    }
  }, [user])

  const updateEmail = useCallback(async (newEmail: string) => {
    try {
      if (user) {
        await firebaseUpdateEmail(user, newEmail)
        
        // Refetch user to get updated info
        const auth = getAuth()
        const updatedUser = auth.currentUser
        setUser(updatedUser)
        
        return updatedUser
      }
      return null
    } catch (emailError: any) {
      console.error('Email update error:', emailError)
      setError({
        code: emailError.code,
        message: emailError.message || 'Erreur de mise à jour de l\'email'
      })
      return null
    }
  }, [user])

  const updatePassword = useCallback(async (newPassword: string) => {
    try {
      if (user) {
        await firebaseUpdatePassword(user, newPassword)
        return user
      }
      return null
    } catch (passwordError: any) {
      console.error('Password update error:', passwordError)
      setError({
        code: passwordError.code,
        message: passwordError.message || 'Erreur de mise à jour du mot de passe'
      })
      return null
    }
  }, [user])

  const resetPassword = useCallback(async (email: string) => {
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      return true
    } catch (resetError: any) {
      console.error('Password reset error:', resetError)
      setError({
        code: resetError.code,
        message: resetError.message || 'Erreur de réinitialisation du mot de passe'
      })
      return false
    }
  }, [])

  return [
    { user, loading, error }, 
    { 
      signUpWithEmail, 
      signInWithEmail, 
      signInWithGoogle, 
      logout, 
      updateProfile, 
      updateEmail, 
      updatePassword, 
      resetPassword 
    }
  ]
}
