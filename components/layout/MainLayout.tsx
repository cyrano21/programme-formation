'use client'

import React, { useState, useEffect } from 'react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { ThemeProvider, ThemeToggle, useTheme } from '@/contexts/ThemeContext';
import { Icons } from '@/utils/icons';
import Footer from './Footer';
import SupportContact from '../SupportContact';
import { Toaster } from '@/components/ui/toaster';

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayoutContent({ children }: MainLayoutProps) {
  const [{ user }, { logout }] = useFirebaseAuth();
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

  const getAvatarUrl = (user: any) => {
    // Si photoURL existe, l'utiliser
    if (user.photoURL) {
      console.log('Using photoURL:', user.photoURL);
      return user.photoURL;
    }

    // Générer un avatar basé sur le nom ou l'email
    const name = user.displayName || user.email || 'User';
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128`;
    console.log('Generated avatar URL:', avatarUrl);
    return avatarUrl;
  };

  useEffect(() => {
    if (user) {
      const url = getAvatarUrl(user);
      setAvatarSrc(url);
      
      // Test de chargement de l'image
      const img = new Image();
      img.onload = () => {
        console.log('Image loaded successfully:', url);
      };
      img.onerror = (e) => {
        console.error('Image failed to load:', url, e);
      };
      img.src = url;
    }
  }, [user]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSupportModal = () => setIsSupportModalOpen(!isSupportModalOpen);

  return (
    <div className={`main-layout ${theme}`}>
      {/* Barre de Navigation */}
      <nav className="main-navbar">
        <div className="navbar-brand">
          <button 
            className="sidebar-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <Icons.Menu />
          </button>
          <h1>Programme de Formation Coaching</h1>
        </div>
        
        <div className="navbar-user">
          <ThemeToggle />
          
          {user ? (
            <div className="user-profile">
              {avatarSrc && (
                <img 
                  src={avatarSrc}
                  alt={user.displayName || 'Utilisateur'}
                  className="user-avatar" 
                  style={{ 
                    border: '2px solid red', 
                    backgroundColor: 'blue',
                    display: 'block' 
                  }}
                />
              )}
              <span>{user.displayName || 'Utilisateur'}</span>
              <button 
                onClick={logout}
                className="logout-button"
                aria-label="Déconnexion"
              >
                <Icons.LogOut />
              </button>
            </div>
          ) : (
            <a href="/auth/login" className="login-button">
              Connexion <Icons.LogOut />
            </a>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`main-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <a href="/dashboard">
                <Icons.Home /> Tableau de Bord
              </a>
            </li>
            <li>
              <a href="/modules">
                <Icons.BookOpen /> Modules
              </a>
            </li>
            <li>
              <a href="/lessons">
                <Icons.FileText /> Leçons
              </a>
            </li>
            <li>
              <a href="/profile">
                <Icons.User /> Profil
              </a>
            </li>
            <li>
              <a href="/settings">
                <Icons.Settings /> Paramètres
              </a>
            </li>
          </ul>
        </nav>
        <div className="sidebar-support">
          <button onClick={toggleSupportModal}>
            <Icons.HelpCircle /> Support
          </button>
        </div>
      </aside>

      {/* Contenu Principal */}
      <main className="main-content">
        {children}
      </main>

      {/* Footer */}
      <Footer />

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
