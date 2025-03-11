import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Icons } from '@/utils/icons';
import { fetchData } from '@/lib/supabase';

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

// Define the shape of tool data coming from the database
export interface ToolData {
  id: number | string;
  title: string;
  category: string;
  description: string;
  iconName: keyof typeof Icons;
  content: ToolContent;
  tags?: string[];
  relatedLessons?: string[];
  difficulty?: 'débutant' | 'intermédiaire' | 'avancé';
}

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
        // Utiliser fetchData de Supabase pour récupérer les données réelles
        const data = await fetchData('tools') as ToolData[];
        
        // Transformer les données pour correspondre à la structure Tool
        const formattedTools = data.map((tool: ToolData) => {
          // Vérifier si l'icône existe dans l'objet Icons avant de créer l'élément
          const iconExists = Object.prototype.hasOwnProperty.call(Icons, tool.iconName);
          
          return {
            ...tool,
            // Créer l'élément icon à partir du nom de l'icône stocké dans la base de données
            // Si l'icône n'existe pas, utiliser une icône par défaut (HelpCircle)
            icon: React.createElement(
              iconExists ? Icons[tool.iconName as keyof typeof Icons] : Icons.HelpCircle, 
              { className: "h-5 w-5" }
            )
          };
        });
        
        setTools(formattedTools);
        setIsLoading(false);
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