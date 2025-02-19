'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  getAuth, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth'
import { initFirebase } from '@/lib/firebaseConfig'

export interface User {
  id: string
  email: string
  displayName?: string
  photoURL?: string
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (credentials: AuthCredentials) => Promise<void>
  logout: () => Promise<void>
  register: (credentials: AuthCredentials & { displayName?: string }) => Promise<void>
  signInWithGoogle: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

export function useAuth(): AuthContextType {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initAuth = async () => {
      try {
        await initFirebase()
        const auth = getAuth()
        
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            const authUser: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || '',
              photoURL: firebaseUser.photoURL || ''
            }
            setUser(authUser)
          } else {
            setUser(null)
          }
          setIsLoading(false)
        })

        return () => unsubscribe()
      } catch (err) {
        console.error('Authentication initialization error', err)
        setError('Erreur d\'initialisation de l\'authentification')
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = useCallback(async (credentials: AuthCredentials) => {
    setIsLoading(true)
    setError(null)
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        credentials.email, 
        credentials.password
      )
      
      const firebaseUser = userCredential.user
      const authUser: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || ''
      }
      setUser(authUser)
    } catch (err: any) {
      setError(err.message || 'Échec de la connexion')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
      const auth = getAuth()
      await signOut(auth)
      setUser(null)
    } catch (err: any) {
      setError(err.message || 'Échec de la déconnexion')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (credentials: AuthCredentials & { displayName?: string }) => {
    setIsLoading(true)
    setError(null)
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        credentials.email, 
        credentials.password
      )
      
      const firebaseUser = userCredential.user
      const authUser: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: credentials.displayName || '',
        photoURL: firebaseUser.photoURL || ''
      }
      setUser(authUser)
    } catch (err: any) {
      setError(err.message || 'Échec de l\'inscription')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      
      const firebaseUser = userCredential.user
      const authUser: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || ''
      }
      setUser(authUser)
    } catch (err: any) {
      setError(err.message || 'Échec de la connexion Google')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
    } catch (err: any) {
      setError(err.message || 'Échec de la réinitialisation du mot de passe')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    register,
    signInWithGoogle,
    resetPassword
  }
}
