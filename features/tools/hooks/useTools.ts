import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Icons } from '@/utils/icons';

// Define types for our tool data
export type ToolStep = {
  title: string;
  description: string;
} | string;

export type ToolCategory = {
  name: string;
  questions: string[];
};

export type ToolSection = {
  title: string;
  prompt: string;
};

export type ToolContent = {
  steps?: ToolStep[];
  areas?: string[];
  categories?: ToolCategory[];
  sections?: ToolSection[];
};

export type Tool = {
  id: number | string;
  title: string;
  category: string;
  description: string;
  icon: JSX.Element;
  content: ToolContent;
  tags?: string[];
  relatedLessons?: string[];
  difficulty?: 'débutant' | 'intermédiaire' | 'avancé';
};

export interface ToolsState {
  tools: Tool[];
  isLoading: boolean;
  error: string | null;
  filteredTools: Tool[];
  searchTerm: string;
  activeCategory: string;
  setSearchTerm: (_term: string) => void;
  setActiveCategory: (_category: string) => void;
  getToolsByCategory: (_category: string) => Tool[];
  getToolsByTag: (_tag: string) => Tool[];
  getRelatedTools: (_lessonId: string) => Tool[];
  getToolsForLesson: (_lessonId: string) => Tool[];
}

// Mock tools data - will be replaced with real data from backend
const toolsData: Tool[] = [
  {
    id: 1,
    title: 'Modèle GROW',
    category: 'Cadre',
    description:
      'Goal, Reality, Options, Way Forward - Une approche structurée pour définir des objectifs et résoudre des problèmes.',
    icon: React.createElement(Icons.TrendingUp, { className: "h-5 w-5" }),
    content: {
      steps: [
        { title: 'Objectif', description: 'Que voulez-vous atteindre ?' },
        {
          title: 'Réalité',
          description:
            "Où en êtes-vous maintenant ? Qu'est-ce qui fonctionne/ne fonctionne pas ?",
        },
        {
          title: 'Options',
          description:
            'Que pourriez-vous faire ? Quelles sont vos possibilités ?',
        },
        {
          title: "Plan d'action",
          description: 'Que ferez-vous ? Quand le ferez-vous ?',
        },
      ],
    },
    tags: ['objectifs', 'planification', 'leadership'],
    relatedLessons: ['prise-decision', 'communication-non-violente'],
    difficulty: 'intermédiaire',
  },
  {
    id: 2,
    title: "Exercice d'Évaluation des Valeurs",
    category: 'Exercice',
    description:
      'Aidez les clients à identifier et prioriser leurs valeurs fondamentales pour une meilleure prise de décision.',
    icon: React.createElement(Icons.BookOpen, { className: "h-5 w-5" }),
    content: {
      steps: [
        'Présenter la liste des valeurs communes',
        'Demander au client de sélectionner ses 10 valeurs principales',
        'Réduire à 5 valeurs principales par comparaison',
        'Explorer ce que chaque valeur signifie personnellement',
      ],
    },
    tags: ['valeurs', 'développement personnel', 'conscience de soi'],
    relatedLessons: ['intelligence-emotionnelle'],
    difficulty: 'débutant',
  },
  {
    id: 3,
    title: 'Roue de la Vie',
    category: 'Modèle',
    description:
      'Outil visuel pour évaluer la satisfaction dans différents domaines de la vie.',
    icon: React.createElement(Icons.Users, { className: "h-5 w-5" }),
    content: {
      areas: [
        'Carrière',
        'Finances',
        'Santé',
        'Famille',
        'Relations',
        'Développement Personnel',
        'Loisirs',
        'Environnement Physique',
      ],
    },
    tags: ['équilibre', 'développement personnel', 'bien-être'],
    relatedLessons: ['gestion-stress', 'intelligence-emotionnelle'],
    difficulty: 'débutant',
  },
  {
    id: 4,
    title: 'Banque de Questions Puissantes',
    category: 'Ressource',
    description:
      'Collection de questions stimulantes pour différents scénarios de coaching.',
    icon: React.createElement(Icons.MessageCircle, { className: "h-5 w-5" }),
    content: {
      categories: [
        {
          name: "Définition d'Objectifs",
          questions: [
            'À quoi ressemblerait le succès ?',
            "Qu'est-ce qui vous freine ?",
          ],
        },
        {
          name: 'Exploration',
          questions: ["Quoi d'autre ?", "Qu'y a-t-il sous la surface ?"],
        },
        {
          name: 'Action',
          questions: [
            'Quelle est votre première étape ?',
            'Quand allez-vous commencer ?',
          ],
        },
      ],
    },
    tags: ['communication', 'questionnement', 'leadership'],
    relatedLessons: ['communication-non-violente', 'negociation-avancee'],
    difficulty: 'intermédiaire',
  },
  {
    id: 5,
    title: "Fiche d'Objectifs SMART",
    category: 'Modèle',
    description:
      'Modèle pour créer des objectifs Spécifiques, Mesurables, Atteignables, Pertinents et Temporellement définis.',
    icon: React.createElement(Icons.FileText, { className: "h-5 w-5" }),
    content: {
      sections: [
        {
          title: 'Spécifique',
          prompt: 'Que voulez-vous accomplir exactement ?',
        },
        {
          title: 'Mesurable',
          prompt: "Comment saurez-vous que vous l'avez atteint ?",
        },
        {
          title: 'Atteignable',
          prompt: 'Est-ce réaliste avec vos ressources actuelles ?',
        },
        {
          title: 'Pertinent',
          prompt: 'Pourquoi cet objectif est-il important pour vous ?',
        },
        {
          title: 'Temporellement défini',
          prompt: 'Quand voulez-vous atteindre cet objectif ?',
        },
      ],
    },
    tags: ['objectifs', 'planification', 'stratégie'],
    relatedLessons: ['prise-decision'],
    difficulty: 'intermédiaire',
  },
];

export function useTools(): ToolsState {
  const { user } = useAuth();
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Charger les outils depuis l'API ou la base de données
  useEffect(() => {
    const loadTools = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Dans un environnement de production, nous utiliserions fetchData de Supabase
        // const data = await fetchData('tools');
        // setTools(data);

        // Pour le moment, utilisons des données simulées
        setTimeout(() => {
          setTools(toolsData);
          setIsLoading(false);
        }, 500); // Simuler un délai de chargement
      } catch (err) {
        console.error('Erreur lors du chargement des outils', err);
        setError('Impossible de charger les outils. Veuillez réessayer plus tard.');
        setIsLoading(false);
      }
    };

    loadTools();
  }, [user]);

  // Filtrer les outils en fonction des critères de recherche et de catégorie
  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    // Map the UI category to the actual data category
    const categoryMapping: Record<string, string> = {
      all: 'all',
      framework: 'Cadre',
      template: 'Modèle',
      exercise: 'Exercice',
      resource: 'Ressource',
    };

    const mappedCategory = categoryMapping[activeCategory] || activeCategory;
    
    const matchesCategory =
      mappedCategory === 'all' ||
      tool.category.toLowerCase() === mappedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  // Obtenir les outils par catégorie
  const getToolsByCategory = (category: string) => {
    return tools.filter(tool => tool.category.toLowerCase() === category.toLowerCase());
  };

  // Obtenir les outils par tag
  const getToolsByTag = (tag: string) => {
    return tools.filter(tool => 
      tool.tags && tool.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  };

  // Obtenir les outils liés à une leçon spécifique
  const getRelatedTools = (lessonId: string) => {
    return tools.filter(tool => 
      tool.relatedLessons && tool.relatedLessons.includes(lessonId)
    );
  };

  // Obtenir les outils recommandés pour une leçon basée sur ses tags
  const getToolsForLesson = (lessonId: string) => {
    // Cette fonction serait plus sophistiquée dans une implémentation réelle
    // Elle pourrait utiliser les tags de la leçon pour trouver des outils pertinents
    // Pour l'instant, nous retournons simplement les outils liés directement
    return getRelatedTools(lessonId);
  };

  return {
    tools,
    isLoading,
    error,
    filteredTools,
    searchTerm,
    activeCategory,
    setSearchTerm,
    setActiveCategory,
    getToolsByCategory,
    getToolsByTag,
    getRelatedTools,
    getToolsForLesson,
  };
}