'use client';

import React, { useState, memo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

// Memoized navigation item to prevent re-renders
const NavItem = memo(
  ({ item, onClick, isActive = false }: { item: SidebarNavItem; onClick: () => void; isActive?: boolean }) => {
    const IconComponent = Icons[item.icon];
    return (
      <li key={item.href}>
        <Link
          href={item.href}
          className={`
          flex items-center gap-3.5
          px-4 py-3.5
          hover:bg-primary/10 dark:hover:bg-primary/20
          rounded-xl
          transition-all duration-300 ease-in-out
          shadow-sm hover:shadow-md
          text-foreground/80 hover:text-primary
          group relative overflow-hidden
          ${isActive ? 'bg-primary/15 text-primary shadow-md' : ''}
          before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/0 before:via-primary/5 before:to-primary/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
          after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300 ${isActive ? 'after:w-1/2' : ''}
        `}
          onClick={onClick}
          prefetch={true}
        >
          <div className="relative z-10 flex items-center justify-center w-9 h-9 rounded-lg bg-primary/5 group-hover:bg-primary/15 transition-colors duration-300 shadow-sm group-hover:shadow">
            <IconComponent className="h-[18px] w-[18px] text-primary/80 group-hover:text-primary transition-colors duration-300" />
          </div>
          <span className="font-medium relative z-10 group-hover:translate-x-0.5 transition-transform duration-300">{item.label}</span>
          {isActive && (
            <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          )}
        </Link>
      </li>
    );
  }
);
NavItem.displayName = 'NavItem';

// Memoized sidebar component
const Sidebar = memo(
  ({
    isSidebarOpen,
    toggleSidebar,
    toggleSupportModal,
    currentPath,
  }: {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    toggleSupportModal: () => void;
    currentPath: string;
  }) => {
    return (
      <aside
        className={`
        fixed md:sticky md:top-0 md:h-screen
        inset-y-0 left-0 z-50
        ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } 
        w-[280px] md:w-72
        transition-all duration-300 ease-in-out
        bg-background/95 backdrop-blur-xl
        border-r border-border/30
        shadow-[0_0_20px_rgba(0,0,0,0.06)]
        dark:shadow-[0_0_20px_rgba(0,0,0,0.25)]
        flex flex-col
        overflow-hidden
      `}
      >
        <div className="flex items-center justify-between p-5 border-b border-border/30 bg-gradient-to-r from-background/80 via-background/90 to-background">
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-primary-dark animate-gradient-x">CoachVerse</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden text-primary hover:bg-primary/10 transition-all duration-200 active:scale-95 rounded-lg"
          >
            <Icons.X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="sidebar-nav p-5 overflow-y-auto custom-scrollbar">
          <div className="mb-5 px-2">
            <h3 className="text-xs uppercase font-semibold text-foreground/50 tracking-wider">Menu principal</h3>
          </div>
          <ul className="space-y-2.5">
            {SIDEBAR_NAVIGATION.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                onClick={() => toggleSidebar()}
                isActive={currentPath.startsWith(item.href)}
              />
            ))}
          </ul>
        </nav>

        <div className="mt-auto p-5 border-t border-border/30 bg-gradient-to-b from-transparent via-background/30 to-background/80">
          <Button
            variant="outline"
            onClick={toggleSupportModal}
            className="w-full flex items-center gap-2 justify-center text-primary hover:bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md rounded-xl py-5"
          >
            <Icons.HelpCircle className="h-4 w-4" />
            <span className="font-medium">Support</span>
          </Button>
        </div>
      </aside>
    );
  }
);
Sidebar.displayName = 'Sidebar';

function MainLayoutContent({ children }: MainLayoutProps) {
  const { theme } = useTheme();
  const { user, logout } = useFirebaseAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Get current path for active state highlighting
    setCurrentPath(window.location.pathname);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleSupportModal = () => setIsSupportModalOpen((prev) => !prev);

  return (
    <div
      className={`main-layout ${theme} flex flex-col md:flex-row min-h-screen max-h-screen overflow-hidden bg-gradient-to-br from-background via-background/98 to-background/95`}
    >
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        toggleSupportModal={toggleSupportModal}
        currentPath={currentPath}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen w-full relative overflow-hidden">
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-40 w-full flex items-center justify-between px-5 py-4 border-b border-border/30 bg-gradient-to-r from-background/95 via-background/90 to-background/95 backdrop-blur-xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_20px_-5px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden text-primary hover:bg-primary/10 active:scale-95 transition-all duration-200 rounded-lg"
            >
              <Icons.Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary-dark truncate hover:opacity-80 transition-all duration-300 hover:scale-[1.01]">
              Programme de Formation
            </h1>
          </div>

          <div className="flex items-center justify-end gap-3 md:gap-6">
            <div className="flex items-center space-x-3 md:space-x-5">
              <ThemeToggle />
              {user && (
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="hidden md:flex items-center gap-3 bg-primary/5 px-3.5 py-2 rounded-xl transition-all duration-300 hover:bg-primary/10 border border-primary/10 hover:border-primary/20 shadow-sm hover:shadow-md">
                    {user.photoURL && (
                      <Image
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        width={32}
                        height={32}
                        className="rounded-full ring-2 ring-primary/30 shadow-md object-cover transition-all duration-200 hover:ring-primary/50"
                      />
                    )}
                    <span className="font-medium text-foreground/90 hover:text-primary transition-colors duration-200">
                      {user.displayName}
                    </span>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={logout}
                    className="flex items-center gap-2 transition-all duration-300 hover:bg-destructive/90 active:scale-95 shadow-md hover:shadow-lg bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground hover:translate-y-[-1px] rounded-xl"
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
        <main className="flex-1 p-5 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-background via-background/98 to-background/95 custom-scrollbar">
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

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-md z-40 md:hidden animate-in fade-in duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Global styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(var(--primary-rgb, 79, 70, 229), 0.2);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(var(--primary-rgb, 79, 70, 229), 0.3);
        }
        
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease infinite;
        }
      `}</style>
    </div>
  );
}

const MainLayout = memo(({ children }: MainLayoutProps) => {
  return (
    <ThemeProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </ThemeProvider>
  );
});
MainLayout.displayName = 'MainLayout';

export default MainLayout;
