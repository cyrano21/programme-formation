import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Icons } from '@/utils/icons';
import { fetchData, supabase } from '@/lib/supabase';

export type Lesson = {
  id: string;
  title: string;
  description: string;
  module: string;
  duration: string;
  progress: number;
  icon: keyof typeof Icons;
  category: string;
  recommended?: boolean;
  lastAccessed?: string;
  difficulty?: 'débutant' | 'intermédiaire' | 'avancé';
  prerequisites?: string[];
  tags?: string[];
  content?: Array<{
    title: string;
    description: string;
    duration?: string;
  }>;
  exercises?: Array<{
    title: string;
    description: string;
    duration?: string;
  }>;
};

// Define interfaces for the user progress data
interface UserProgressItem {
  lesson_id: string;
  progress: number;
  user_id: string;
  // Add other fields that might be in the user_progress table
  last_accessed?: string;
  completed?: boolean;
}

interface UserProgressMap {
  [key: string]: number;
}

interface LessonData {
  id: string;
  title: string;
  description: string;
  module: string;
  duration: string;
  icon: keyof typeof Icons;
  category: string;
  recommended?: boolean;
  lastAccessed?: string;
  difficulty?: 'débutant' | 'intermédiaire' | 'avancé';
  prerequisites?: string[];
  tags?: string[];
  content?: Array<{
    title: string;
    description: string;
    duration?: string;
  }>;
  exercises?: Array<{
    title: string;
    description: string;
    duration?: string;
  }>;
  // Any other fields that might be in the lessons table
}

export interface LessonsState {
  lessons: Lesson[];
  isLoading: boolean;
  error: string | null;
  filteredLessons: Lesson[];
  searchTerm: string;
  activeCategory: string;
  setSearchTerm: (_term: string) => void;
  setActiveCategory: (_category: string) => void;
  getRecommendedLessons: () => Lesson[];
  getContinueLearningLessons: () => Lesson[];
  getLessonsByModule: (_moduleId: string) => Lesson[];
  getLessonsByCategory: (_category: string) => Lesson[];
}

export function useLessons(): LessonsState {
  const { user } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Charger les leçons depuis l'API ou la base de données
  useEffect(() => {
    const loadLessons = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Utiliser fetchData de Supabase pour récupérer les données réelles
        const data = await fetchData('lessons') as LessonData[];
        
        // Si l'utilisateur est connecté, récupérer également ses progressions
        let userProgress: UserProgressMap = {};
        if (user) {
          const { data: progressData, error: progressError } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', user.id);
            
          if (!progressError && progressData) {
            // Créer un objet avec les progressions indexées par lesson_id
            userProgress = progressData.reduce((acc: UserProgressMap, item: UserProgressItem) => {
              acc[item.lesson_id] = item.progress;
              return acc;
            }, {});
          }
        }
        
        // Transformer les données pour correspondre à la structure Lesson
        const formattedLessons = data.map((lesson: LessonData) => ({
          ...lesson,
          // Utiliser la progression de l'utilisateur si disponible, sinon 0
          progress: user && userProgress[lesson.id] ? userProgress[lesson.id] : 0
        }));
        
        setLessons(formattedLessons);
        setIsLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement des leçons', err);
        setError('Impossible de charger les leçons. Veuillez réessayer plus tard.');
        setIsLoading(false);
      }
    };

    loadLessons();
  }, [user]);

  // Filtrer les leçons en fonction des critères de recherche et de catégorie
  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lesson.tags && lesson.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesCategory =
      activeCategory === 'all' ||
      lesson.category.toLowerCase() === activeCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  // Obtenir les leçons recommandées pour l'utilisateur
  const getRecommendedLessons = () => {
    if (!user) return [];
    return lessons.filter(lesson => lesson.recommended);
  };

  // Obtenir les leçons que l'utilisateur a commencées mais pas terminées
  const getContinueLearningLessons = () => {
    if (!user) return [];
    return lessons
      .filter(lesson => lesson.progress > 0 && lesson.progress < 100)
      .sort((a, b) => {
        // Trier par date d'accès la plus récente
        if (a.lastAccessed && b.lastAccessed) {
          return new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime();
        }
        return 0;
      });
  };

  // Obtenir les leçons par module
  const getLessonsByModule = (moduleId: string) => {
    return lessons.filter(lesson => lesson.module === moduleId);
  };

  // Obtenir les leçons par catégorie
  const getLessonsByCategory = (category: string) => {
    return lessons.filter(lesson => lesson.category === category);
  };

  return {
    lessons,
    isLoading,
    error,
    filteredLessons,
    searchTerm,
    activeCategory,
    setSearchTerm,
    setActiveCategory,
    getRecommendedLessons,
    getContinueLearningLessons,
    getLessonsByModule,
    getLessonsByCategory,
  };
}