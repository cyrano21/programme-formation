'use client'

import { DashboardStats } from '@/features/dashboard/components/DashboardStats'
import QuickActions from '@/features/dashboard/components/QuickActions'
import { RecentActivities } from '@/features/dashboard/components/RecentActivities'
import { Icons } from '@/utils/icons'
import { useAuth } from '@/features/auth/hooks/useAuth'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Icons.Home className="h-6 w-6 mr-2 text-primary" />
              <h1 className="text-xl font-bold text-gray-900">Tableau de Bord</h1>
            </div>
            <div>
              {user && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Bonjour, {user.displayName || 'Utilisateur'}
                  </span>
                  {user.photoURL && (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full" 
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6 p-6">
          <h1 className="text-3xl font-bold mb-6">Tableau de Bord</h1>
          
          <DashboardStats />
          <QuickActions />
          <RecentActivities />
        </div>
      </main>
    </div>
  )
}
