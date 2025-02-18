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

type AuthHookReturn = {
  user: FirebaseUser | null
  loading: boolean
  error: AuthError | null
  signUpWithEmail: (email: string, password: string) => Promise<FirebaseUser | null>
  signInWithEmail: (email: string, password: string) => Promise<FirebaseUser | null>
  signInWithGoogle: () => Promise<FirebaseUser | null>
  logout: () => Promise<void>
  updateProfile: (displayName?: string, photoURL?: string) => Promise<void>
  updateEmail: (newEmail: string) => Promise<void>
  updatePassword: (newPassword: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  getUserRoles: () => Promise<string[]>  
}

export function useFirebaseAuth(): AuthHookReturn {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AuthError | null>(null)

  const signUpWithEmail = useCallback(async (email: string, password: string) => {
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      return userCredential.user
    } catch (err: any) {
      setError({ message: err.message })
      throw err
    }
  }, [])

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return userCredential.user
    } catch (err: any) {
      setError({ message: err.message })
      throw err
    }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      return userCredential.user
    } catch (err: any) {
      setError({ message: err.message })
      throw err
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      const auth = getAuth()
      await signOut(auth)
      setUser(null)
    } catch (err: any) {
      setError({ message: err.message })
      throw err
    }
  }, [])

  const updateProfile = useCallback(async (displayName?: string, photoURL?: string) => {
    try {
      if (!user) throw new Error('Aucun utilisateur connecté')
      
      await firebaseUpdateProfile(user, { 
        displayName: displayName || user.displayName, 
        photoURL: photoURL || user.photoURL 
      })
      
      // Mettre à jour l'utilisateur local
      setUser(getAuth().currentUser)
    } catch (err: any) {
      setError({ message: err.message })
      throw err
    }
  }, [user])

  const updateEmail = useCallback(async (newEmail: string) => {
    try {
      if (!user) throw new Error('Aucun utilisateur connecté')
      
      await firebaseUpdateEmail(user, newEmail)
      
      // Mettre à jour l'utilisateur local
      setUser(getAuth().currentUser)
    } catch (err: any) {
      setError({ message: err.message })
      throw err
    }
  }, [user])

  const updatePassword = useCallback(async (newPassword: string) => {
    try {
      if (!user) throw new Error('Aucun utilisateur connecté')
      
      await firebaseUpdatePassword(user, newPassword)
    } catch (err: any) {
      setError({ message: err.message })
      throw err
    }
  }, [user])

  const resetPassword = useCallback(async (email: string) => {
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
    } catch (err: any) {
      setError({ message: err.message })
      throw err
    }
  }, [])

  const getUserRoles = async (): Promise<string[]> => {
    const auth = getAuth()
    if (!auth.currentUser) {
      return []
    }
    try {
      const token = await auth.currentUser.getIdTokenResult()
      const roles = token.claims.roles
      return Array.isArray(roles) ? roles : []
    } catch (error) {
      console.error('Erreur lors de la récupération des rôles:', error)
      return []
    }
  }

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
      } catch (err: any) {
        console.error('Initialization error:', err)
        setError({ message: err.message })
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  return {
    user,
    loading,
    error,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    logout,
    updateProfile,
    updateEmail,
    updatePassword,
    resetPassword,
    getUserRoles
  }
}
