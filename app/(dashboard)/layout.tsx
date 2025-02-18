'use client'

//import { redirect } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
//import { getAuth, onAuthStateChanged } from 'firebase/auth'
//import { initFirebase } from '@/lib/firebaseConfig'
//import { useEffect, useState } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Temporarily remove authentication checks
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );

  // Commented out original authentication logic
  /*
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Initialiser Firebase côté client
        await initFirebase()
        
        const auth = getAuth()
        
        // Vérifier l'état de l'authentification
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          console.log('Dashboard Layout - User:', user)
          
          if (user) {
            // Utilisateur connecté
            setIsAuthenticated(true)
          } else {
            // Pas d'utilisateur connecté
            console.log('Pas d\'utilisateur connecté, redirection vers login')
            setIsAuthenticated(false)
          }
        }, (error) => {
          console.error('Erreur de vérification d\'authentification:', error)
          setIsAuthenticated(false)
        })

        // Nettoyer l'abonnement
        return () => unsubscribe()
      } catch (error) {
        console.error('Erreur d\'initialisation:', error)
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  // Gérer les différents états d'authentification
  if (isAuthenticated === null) {
    return <div>Chargement de l'authentification...</div>
  }

  if (isAuthenticated === false) {
    redirect('/auth/login')
  }

  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
  */
}
