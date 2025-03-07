'use client';

import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { onAuthStateChanged, Auth } from 'firebase/auth';
import { firebaseClient } from '@/lib/firebaseClient';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Use state to track Firebase auth initialization
  const [auth, setAuth] = useState<Auth | null>(null);

  // Initialize Firebase when component mounts
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Initialize Firebase using the client singleton
        const client = await firebaseClient.initialize();
        if (client.auth) {
          setAuth(client.auth);
        } else {
          console.error('Firebase auth not initialized');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error initializing Firebase:', error);
        setIsAuthenticated(false);
      }
    };

    initAuth();
  }, []);

  useEffect(() => {
    let unsubscribe: () => void;

    const setupAuth = () => {
      if (!auth) {
        setIsAuthenticated(false);
        return;
      }

      unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      });
    };

    if (auth) {
      setupAuth();
    }

    return () => unsubscribe?.();
  }, [auth]);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  return <MainLayout>{children}</MainLayout>;
}
