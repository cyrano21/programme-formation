import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';

export interface DashboardStats {
  totalModules: number;
  completedModules: number;
  inProgressModules: number;
  totalLessons: number;
  completedLessons: number;
}

export interface UserProgress {
  userId: string;
  weeklyStudyTime: number;
  overallProgress: number;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
}

export function useDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalModules: 0,
    completedModules: 0,
    inProgressModules: 0,
    totalLessons: 0,
    completedLessons: 0,
  });

  const [userProgress, setUserProgress] = useState<UserProgress>({
    userId: '',
    weeklyStudyTime: 0,
    overallProgress: 0,
  });

  const quickActions: QuickAction[] = [
    {
      id: 'start-module',
      title: 'Commencer un module',
      description: 'Explorez de nouveaux modules de formation',
      icon: 'BookOpen',
      route: '/modules',
    },
    {
      id: 'continue-lesson',
      title: 'Continuer une leçon',
      description: 'Reprendre votre dernière leçon',
      icon: 'Play',
      route: '/lessons',
    },
    {
      id: 'view-progress',
      title: 'Voir mon progrès',
      description: 'Suivez votre progression',
      icon: 'BarChart2',
      route: '/progress',
    }
  ];

  useEffect(() => {
    if (user) {
      // Simulate data fetching
      const fetchDashboardData = async () => {
        try {
          // In a real app, this would be an API call
          setStats({
            totalModules: 10,
            completedModules: 3,
            inProgressModules: 2,
            totalLessons: 50,
            completedLessons: 15,
          });

          setUserProgress({
            userId: user?.id || '',
            weeklyStudyTime: 5.5,
            overallProgress: 35,
          });
        } catch (error) {
          console.error('Failed to fetch dashboard data', error);
        }
      };

      fetchDashboardData();
    }
  }, [user]);

  return { 
    stats, 
    userProgress, 
    quickActions 
  };
}
