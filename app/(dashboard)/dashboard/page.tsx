'use client';

import { DashboardStats } from '@/features/dashboard/components/DashboardStats';
import QuickActions from '@/features/dashboard/components/QuickActions';
import { RecentActivities } from '@/features/dashboard/components/RecentActivities';
import { Icons } from '@/utils/icons';
import { useAuth } from '@/features/auth/hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/95 to-background">
      <header className="bg-gradient-to-r from-primary to-primary/90 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Icons.Home className="h-7 w-7 mr-3 text-primary-foreground/90" />
              <h1 className="text-2xl font-bold text-primary-foreground">
                Tableau de Bord
              </h1>
            </div>
            <div>
              {user && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-primary-foreground/95">
                    Bonjour, {user.displayName || 'Utilisateur'}
                  </span>
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="h-10 w-10 rounded-full border-2 border-primary-foreground/70 shadow-lg"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground font-semibold shadow-lg">
                      {user.displayName?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">
              Votre progression
            </h1>
            <div className="flex space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-card text-primary border border-border rounded-lg shadow hover:shadow-md hover:bg-accent/50 transition-all flex items-center"
              >
                <Icons.Calendar className="h-4 w-4 mr-2" />
                Cette semaine
              </button>
              <button
                type="button"
                className="p-2 bg-card text-muted-foreground border border-border rounded-lg shadow hover:shadow-md hover:bg-accent/50 transition-all"
                aria-label="Rafraîchir les données"
              >
                <Icons.RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </div>

          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RecentActivities />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
