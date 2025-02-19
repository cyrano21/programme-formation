'use client'

import { redirect } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { initFirebase } from '@/lib/firebaseConfig'
import { useEffect, useState } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Initializing Firebase in Dashboard Layout');
        await initFirebase()
        
        const auth = getAuth()
        console.log('Auth object:', auth);
        
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          console.log('Dashboard Layout - User:', user)
          
          if (user) {
            // Utilisateur connecté
            setIsAuthenticated(true)
          } else {
            // Pas d'utilisateur connecté
            console.log('Pas d\'utilisateur connecté, redirection vers login')
            setIsAuthenticated(false)
            redirect('/auth/login')
          }
        }, (error) => {
          console.error('Erreur de vérification d\'authentification:', error)
          setIsAuthenticated(false)
          redirect('/auth/login')
        })

        // Nettoyer l'abonnement
        return () => unsubscribe()
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de Firebase:', error)
        setIsAuthenticated(false)
        redirect('/auth/login')
      }
    }

    checkAuth()
  }, [])

  if (isAuthenticated === null) {
    return <div>Chargement...</div>
  }

  return (
    <MainLayout>
      {children}
    </MainLayout>
  )
}
