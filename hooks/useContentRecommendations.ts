import { useMemo } from 'react';
import { useLessons, Lesson } from '@/features/lessons/hooks/useLessons';
import { useTools, Tool } from '@/features/tools/hooks/useTools';

type RecommendationSource = 'lesson' | 'tool';
type RecommendationTarget = 'lesson' | 'tool';
type RecommendationStrength = 'strong' | 'medium' | 'weak';

interface RecommendationItem {
  id: string;
  title: string;
  type: 'lesson' | 'tool';
  strength: RecommendationStrength;
  matchReason: 'direct' | 'tag' | 'category' | 'module';
}

interface UseContentRecommendationsProps {
  sourceType: RecommendationSource;
  sourceId: string;
  targetType: RecommendationTarget;
  maxItems?: number;
  includeWeakMatches?: boolean;
}

/**
 * Hook personnalisé pour obtenir des recommandations de contenu (leçons ou outils)
 * basées sur différents critères comme les relations directes, les tags communs,
 * les catégories ou les modules.
 */
export function useContentRecommendations({
  sourceType,
  sourceId,
  targetType,
  maxItems = 3,
  includeWeakMatches = true,
}: UseContentRecommendationsProps) {
  const { lessons, isLoading: lessonsLoading } = useLessons();
  const { tools, isLoading: toolsLoading } = useTools();

  const isLoading = lessonsLoading || toolsLoading;

  // Calculer les recommandations en fonction du type source et cible
  const recommendations = useMemo(() => {
    if (isLoading) return [];

    // Trouver l'élément source
    let sourceItem: Lesson | Tool | undefined;
    if (sourceType === 'lesson') {
      sourceItem = lessons.find(lesson => lesson.id === sourceId);
    } else {
      sourceItem = tools.find(tool => tool.id.toString() === sourceId);
    }

    if (!sourceItem) return [];

    // Tableau pour stocker les recommandations avec leur force
    const recommendationItems: RecommendationItem[] = [];

    // Cas 1: Recommandation de leçon à outil
    if (sourceType === 'lesson' && targetType === 'tool') {
      const lesson = sourceItem as Lesson;

      // 1. Relations directes (forte recommandation)
      tools.forEach(tool => {
        if (tool.relatedLessons && tool.relatedLessons.includes(lesson.id)) {
          recommendationItems.push({
            id: tool.id.toString(),
            title: tool.title,
            type: 'tool',
            strength: 'strong',
            matchReason: 'direct'
          });
        }
      });

      // 2. Correspondance de tags (recommandation moyenne)
      if (lesson.tags && lesson.tags.length > 0) {
        tools.forEach(tool => {
          // Ignorer les outils déjà ajoutés
          if (recommendationItems.some(item => item.id === tool.id.toString())) return;

          // Vérifier les tags communs
          if (tool.tags && tool.tags.some(tag => lesson.tags?.includes(tag))) {
            recommendationItems.push({
              id: tool.id.toString(),
              title: tool.title,
              type: 'tool',
              strength: 'medium',
              matchReason: 'tag'
            });
          }
        });
      }

      // 3. Correspondance de catégorie (recommandation faible)
      if (includeWeakMatches) {
        tools.forEach(tool => {
          // Ignorer les outils déjà ajoutés
          if (recommendationItems.some(item => item.id === tool.id.toString())) return;

          // Vérifier la catégorie
          if (tool.category.toLowerCase() === lesson.category.toLowerCase()) {
            recommendationItems.push({
              id: tool.id.toString(),
              title: tool.title,
              type: 'tool',
              strength: 'weak',
              matchReason: 'category'
            });
          }
        });
      }
    }

    // Cas 2: Recommandation d'outil à leçon
    else if (sourceType === 'tool' && targetType === 'lesson') {
      const tool = sourceItem as Tool;

      // 1. Relations directes (forte recommandation)
      if (tool.relatedLessons && tool.relatedLessons.length > 0) {
        lessons.forEach(lesson => {
          if (tool.relatedLessons?.includes(lesson.id)) {
            recommendationItems.push({
              id: lesson.id,
              title: lesson.title,
              type: 'lesson',
              strength: 'strong',
              matchReason: 'direct'
            });
          }
        });
      }

      // 2. Correspondance de tags (recommandation moyenne)
      if (tool.tags && tool.tags.length > 0) {
        lessons.forEach(lesson => {
          // Ignorer les leçons déjà ajoutées
          if (recommendationItems.some(item => item.id === lesson.id)) return;

          // Vérifier les tags communs
          if (lesson.tags && lesson.tags.some(tag => tool.tags?.includes(tag))) {
            recommendationItems.push({
              id: lesson.id,
              title: lesson.title,
              type: 'lesson',
              strength: 'medium',
              matchReason: 'tag'
            });
          }
        });
      }

      // 3. Correspondance de catégorie (recommandation faible)
      if (includeWeakMatches) {
        lessons.forEach(lesson => {
          // Ignorer les leçons déjà ajoutées
          if (recommendationItems.some(item => item.id === lesson.id)) return;

          // Vérifier la catégorie
          if (lesson.category.toLowerCase() === tool.category.toLowerCase()) {
            recommendationItems.push({
              id: lesson.id,
              title: lesson.title,
              type: 'lesson',
              strength: 'weak',
              matchReason: 'category'
            });
          }
        });
      }
    }

    // Cas 3: Recommandation de leçon à leçon
    else if (sourceType === 'lesson' && targetType === 'lesson') {
      const lesson = sourceItem as Lesson;

      // 1. Leçons du même module (forte recommandation)
      lessons.forEach(otherLesson => {
        // Ignorer la leçon source
        if (otherLesson.id === lesson.id) return;

        // Vérifier le module
        if (otherLesson.module === lesson.module) {
          recommendationItems.push({
            id: otherLesson.id,
            title: otherLesson.title,
            type: 'lesson',
            strength: 'strong',
            matchReason: 'module'
          });
        }
      });

      // 2. Correspondance de tags (recommandation moyenne)
      if (lesson.tags && lesson.tags.length > 0) {
        lessons.forEach(otherLesson => {
          // Ignorer la leçon source et les leçons déjà ajoutées
          if (otherLesson.id === lesson.id || 
              recommendationItems.some(item => item.id === otherLesson.id)) return;

          // Vérifier les tags communs
          if (otherLesson.tags && otherLesson.tags.some(tag => lesson.tags?.includes(tag))) {
            recommendationItems.push({
              id: otherLesson.id,
              title: otherLesson.title,
              type: 'lesson',
              strength: 'medium',
              matchReason: 'tag'
            });
          }
        });
      }

      // 3. Correspondance de catégorie (recommandation faible)
      if (includeWeakMatches) {
        lessons.forEach(otherLesson => {
          // Ignorer la leçon source et les leçons déjà ajoutées
          if (otherLesson.id === lesson.id || 
              recommendationItems.some(item => item.id === otherLesson.id)) return;

          // Vérifier la catégorie
          if (otherLesson.category === lesson.category) {
            recommendationItems.push({
              id: otherLesson.id,
              title: otherLesson.title,
              type: 'lesson',
              strength: 'weak',
              matchReason: 'category'
            });
          }
        });
      }
    }

    // Trier les recommandations par force (strong > medium > weak)
    const sortedRecommendations = recommendationItems.sort((a, b) => {
      const strengthOrder = { strong: 0, medium: 1, weak: 2 };
      return strengthOrder[a.strength] - strengthOrder[b.strength];
    });

    // Limiter le nombre de recommandations
    return sortedRecommendations.slice(0, maxItems);
  }, [sourceType, sourceId, targetType, lessons, tools, isLoading, maxItems, includeWeakMatches]);

  return {
    recommendations,
    isLoading,
    sourceType,
    targetType,
  };
}