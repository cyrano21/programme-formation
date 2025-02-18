'use client'

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { ThemeProvider, ThemeToggle, useTheme } from '@/contexts/ThemeContext';
import { Icons } from '@/utils/icons';
import Footer from './Footer';
import SupportContact from '../SupportContact';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';

type MainLayoutProps = {
  children: React.ReactNode;
};

type SidebarNavItem = {
  href: string;
  icon: keyof typeof Icons;
  label: string;
};

const SIDEBAR_NAVIGATION: SidebarNavItem[] = [
  { href: "/dashboard", icon: "Home", label: "Tableau de Bord" },
  { href: "/modules", icon: "BookOpen", label: "Modules" },
  { href: "/lessons", icon: "FileText", label: "Leçons" },
  { href: "/profile", icon: "User", label: "Profil" },
  { href: "/settings", icon: "Settings", label: "Paramètres" }
];

function MainLayoutContent({ children }: MainLayoutProps) {
  // Temporarily comment out authentication
  /*
  const { user, logout } = useFirebaseAuth();
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

  const getAvatarUrl = useCallback((user: any) => {
    if (user.photoURL) return user.photoURL;

    const name = user.displayName || user.email || 'User';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128`;
  }, []);

  useEffect(() => {
    if (user) {
      const url = getAvatarUrl(user);
      setAvatarSrc(url);
      
      const img = new Image();
      img.onload = () => console.log('Avatar loaded:', url);
      img.onerror = (e) => console.error('Avatar load error:', url, e);
      img.src = url;
    }
  }, [user, getAvatarUrl]);
  */

  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleSupportModal = () => setIsSupportModalOpen(prev => !prev);

  return (
    <div className={`main-layout ${theme} flex`}>
      {/* Sidebar */}
      <aside 
        className={`main-sidebar 
          ${isSidebarOpen ? 'w-64' : 'w-16'} 
          transition-all duration-300 
          bg-background 
          border-r 
          overflow-hidden
        `}
      >
        <nav className="sidebar-nav p-2">
          <ul className="space-y-2">
            {SIDEBAR_NAVIGATION.map((item) => {
              const IconComponent = Icons[item.icon];
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className={`
                      flex items-center 
                      p-2 
                      hover:bg-accent 
                      rounded-md 
                      transition-colors
                      ${isSidebarOpen ? 'justify-start' : 'justify-center'}
                    `}
                  >
                    <IconComponent className="mr-2" />
                    {isSidebarOpen && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {isSidebarOpen && (
          <div className="sidebar-support p-2 border-t">
            <Button 
              variant="ghost" 
              onClick={toggleSupportModal} 
              className="w-full"
            >
              <Icons.HelpCircle className="mr-2" /> Support
            </Button>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Navigation Bar */}
        <nav className="main-navbar flex items-center justify-between p-4 border-b">
          <div className="navbar-brand flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="mr-4"
            >
              <Icons.Menu />
            </Button>
            <h1 className="text-xl font-bold">Programme de Formation</h1>
          </div>
          
          <div className="navbar-user flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Commented out user authentication section */}
            {/*
            {user ? (
              <div className="flex items-center space-x-2">
                {avatarSrc && (
                  <img 
                    src={avatarSrc}
                    alt={user.displayName || 'Utilisateur'}
                    className="w-10 h-10 rounded-full" 
                  />
                )}
                <span>{user.displayName || 'Utilisateur'}</span>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={logout}
                >
                  <Icons.LogOut className="mr-2" /> Déconnexion
                </Button>
              </div>
            ) : (
              <Link href="/auth/login" className="login-button">
                Connexion <Icons.LogOut />
              </Link>
            )}
            */}
          </div>
        </nav>

        {/* Main Content */}
        <main className="main-content flex-1 p-4 overflow-auto">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Support Contact Modal */}
      {isSupportModalOpen && (
        <SupportContact onClose={() => setIsSupportModalOpen(false)} />
      )}

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <ThemeProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </ThemeProvider>
  );
}

export default MainLayout;
