'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ThemeProvider, ThemeToggle, useTheme } from '@/contexts/ThemeContext';
import { Icons } from '@/utils/icons';
import Footer from './Footer';
import SupportContact from '../SupportContact';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';

type MainLayoutProps = {
  children: React.ReactNode;
};

type SidebarNavItem = {
  href: string;
  icon: keyof typeof Icons;
  label: string;
};

const SIDEBAR_NAVIGATION: SidebarNavItem[] = [
  { href: '/dashboard', icon: 'Home', label: 'Tableau de Bord' },
  { href: '/modules', icon: 'BookOpen', label: 'Modules' },
  { href: '/lessons', icon: 'FileText', label: 'Leçons' },
  { href: '/profile', icon: 'User', label: 'Profil' },
  { href: '/settings', icon: 'Settings', label: 'Paramètres' },
];

function MainLayoutContent({ children }: MainLayoutProps) {
  const { theme } = useTheme();
  const { user, logout } = useFirebaseAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleSupportModal = () => setIsSupportModalOpen((prev) => !prev);

  return (
    <div
      className={`main-layout ${theme} flex flex-col md:flex-row min-h-screen max-h-screen overflow-hidden bg-gradient-to-br from-background to-background/95`}
    >
      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky md:top-0 md:h-screen
          inset-y-0 left-0 z-50
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
          w-[280px] md:w-64
          transition-all duration-300 ease-in-out
          bg-background/98 backdrop-blur-xl
          border-r border-border/40
          shadow-xl
          flex flex-col
          overflow-hidden
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-border/40">
          <span className="text-xl font-semibold text-primary">CoachVerse</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <Icons.X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="sidebar-nav p-4">
          <ul className="space-y-3">
            {SIDEBAR_NAVIGATION.map((item) => {
              const IconComponent = Icons[item.icon];
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3
                      px-4 py-3
                      hover:bg-primary/10
                      rounded-lg 
                      transition-all duration-200
                      shadow-sm hover:shadow-md
                      text-foreground/80 hover:text-primary
                      group
                    `}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/40">
          <Button
            variant="ghost"
            onClick={toggleSupportModal}
            className="w-full flex items-center gap-2 justify-center"
          >
            <Icons.HelpCircle className="h-5 w-5" />
            <span>Support</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen w-full relative overflow-hidden">
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-40 w-full flex items-center justify-between px-4 py-3 md:py-4 border-b border-border/40 bg-background/98 backdrop-blur-xl shadow-md">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <Icons.Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg md:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark truncate">
              Programme de Formation
            </h1>
          </div>

          <div className="flex items-center justify-end gap-2 md:gap-4 flex-1">
            <div className="flex items-center space-x-2 md:space-x-4">
              <ThemeToggle />
              {user && (
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="hidden md:flex items-center gap-3">
                    {user.photoURL && (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="w-8 h-8 rounded-full ring-2 ring-primary/20 shadow-md object-cover"
                      />
                    )}
                    <span className="font-medium text-foreground/80">
                      {user.displayName}
                    </span>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={logout}
                    className="flex items-center gap-2 transition-all duration-200 hover:bg-destructive/90 active:scale-95"
                    size="sm"
                  >
                    <Icons.LogOut className="h-4 w-4" />
                    <span className="hidden md:inline">Déconnexion</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto overflow-x-hidden">{children}</main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Support Contact Modal */}
      {isSupportModalOpen && (
        <SupportContact onClose={() => setIsSupportModalOpen(false)} />
      )}

      {/* Toast Notifications */}
      <Toaster />

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
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
