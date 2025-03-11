import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { fetchData, supabase } from '@/lib/supabase';

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
      const fetchDashboardData = async () => {
        try {
          // Fetch real modules data
          const modulesData = await fetchData('modules');
          const totalModules = modulesData.length;
          
          // Fetch user's module progress
          const { data: userModulesProgress, error: modulesError } = await supabase
            .from('user_module_progress')
            .select('*')
            .eq('user_id', user.id);
            
          if (modulesError) throw modulesError;
          
          // Calculate completed and in-progress modules
          const completedModules = userModulesProgress?.filter(m => m.progress === 100).length || 0;
          const inProgressModules = userModulesProgress?.filter(m => m.progress > 0 && m.progress < 100).length || 0;
          
          // Fetch lessons data
          const lessonsData = await fetchData('lessons');
          const totalLessons = lessonsData.length;
          
          // Fetch user's lesson progress
          const { data: userLessonsProgress, error: lessonsError } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', user.id);
            
          if (lessonsError) throw lessonsError;
          
          // Calculate completed lessons
          const completedLessons = userLessonsProgress?.filter(l => l.progress === 100).length || 0;
          
          setStats({
            totalModules,
            completedModules,
            inProgressModules,
            totalLessons,
            completedLessons,
          });
          
          // Fetch user's study time and overall progress
          const { data: userStats, error: userStatsError } = await supabase
            .from('user_stats')
            .select('*')
            .eq('user_id', user.id)
            .single();
            
          if (userStatsError && userStatsError.code !== 'PGRST116') throw userStatsError;
          
          setUserProgress({
            userId: user.id,
            weeklyStudyTime: userStats?.weekly_study_time || 0,
            overallProgress: userStats?.overall_progress || 0,
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
