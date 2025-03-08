import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Icons } from '@/utils/icons';

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
};

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
        // Dans un environnement de production, nous utiliserions fetchData de Supabase
        // const data = await fetchData('lessons');
        // setLessons(data);

        // Pour le moment, utilisons des données simulées
        // Mais avec une structure qui pourrait facilement être remplacée par des données réelles
        setTimeout(() => {
          const mockLessons: Lesson[] = [
            {
              id: 'communication-non-violente',
              title: 'Communication Non-Violente',
              description: 'Apprenez à communiquer de manière empathique',
              module: 'Leadership Avancé',
              duration: '45 min',
              progress: user ? 75 : 0, // Progression personnalisée si l'utilisateur est connecté
              icon: 'MessageCircle',
              category: 'Leadership',
              recommended: true,
              lastAccessed: '2023-06-15T10:30:00',
              difficulty: 'intermédiaire',
              tags: ['communication', 'empathie', 'leadership'],
            },
            {
              id: 'gestion-stress',
              title: 'Techniques de Gestion du Stress',
              description: 'Stratégies pour gérer le stress professionnel',
              module: 'Bien-être Professionnel',
              duration: '60 min',
              progress: user ? 45 : 0,
              icon: 'Activity',
              category: 'Bien-être',
              recommended: user?.id === 'stress-management-needed',
              lastAccessed: '2023-06-10T14:20:00',
              difficulty: 'débutant',
              tags: ['stress', 'bien-être', 'santé mentale'],
            },
            {
              id: 'prise-decision',
              title: 'Prise de Décision Stratégique',
              description: 'Développez votre capacité de décision',
              module: 'Leadership Avancé',
              duration: '30 min',
              progress: user ? 60 : 0,
              icon: 'BookOpen',
              category: 'Leadership',
              recommended: false,
              lastAccessed: '2023-06-05T09:15:00',
              difficulty: 'avancé',
              prerequisites: ['communication-non-violente'],
              tags: ['décision', 'stratégie', 'leadership'],
            },
            {
              id: 'intelligence-emotionnelle',
              title: 'Intelligence Émotionnelle',
              description: 'Comprendre et gérer vos émotions',
              module: 'Développement Personnel',
              duration: '50 min',
              progress: user ? 85 : 0,
              icon: 'Users',
              category: 'Développement Personnel',
              recommended: true,
              lastAccessed: '2023-06-20T16:45:00',
              difficulty: 'intermédiaire',
              tags: ['émotions', 'développement personnel', 'conscience de soi'],
            },
            {
              id: 'negociation-avancee',
              title: 'Négociation Avancée',
              description: 'Techniques de négociation professionnelle',
              module: 'Leadership Avancé',
              duration: '40 min',
              progress: user ? 55 : 0,
              icon: 'TrendingUp',
              category: 'Leadership',
              recommended: false,
              lastAccessed: '2023-06-12T11:30:00',
              difficulty: 'avancé',
              prerequisites: ['communication-non-violente', 'prise-decision'],
              tags: ['négociation', 'persuasion', 'leadership'],
            },
          ];

          setLessons(mockLessons);
          setIsLoading(false);
        }, 500); // Simuler un délai de chargement
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