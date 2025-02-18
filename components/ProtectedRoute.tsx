'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { Icons } from '@/utils/icons';
import { UserRole } from '@/types/global';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

export function ProtectedRoute({ 
  children, 
  requiredRoles = [] 
}: ProtectedRouteProps) {
  const [{ user, loading }, { getUserRoles }] = useFirebaseAuth();
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      if (loading) return

      if (!user) {
        router.push('/login')
        return
      }

      if (requiredRoles.length > 0) {
        const userRoles = await getUserRoles()
        const hasRequiredRole = requiredRoles.some(role => 
          userRoles.includes(role)
        )

        if (!hasRequiredRole) {
          router.push('/unauthorized')
        }
      }
    }

    checkAccess()
  }, [user, loading, requiredRoles])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <Icons.Loader className="animate-spin" />
          <p>Vérification de l'accès...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
