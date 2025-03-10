'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useContentRecommendations } from '@/hooks/useContentRecommendations';
import { Icons } from '@/utils/icons';

type ContentType = 'lesson' | 'tool';
// Removed unused ContentItem type

interface RecommendedContentProps {
  contentType: ContentType;
  contentId: string;
  maxItems?: number;
  title?: string;
  description?: string;
  showAllLink?: boolean;
}

/**
 * RecommendedContent - Un composant réutilisable pour afficher du contenu recommandé
 * basé sur les relations entre les leçons et les outils.
 *
 * Ce composant peut être utilisé pour afficher:
 * - Des outils recommandés pour une leçon spécifique
 * - Des leçons recommandées pour un outil spécifique
 * - Des recommandations basées sur les tags communs
 */
export default function RecommendedContent({
  contentType,
  contentId,
  maxItems = 3,
  title,
  description,
  showAllLink = true,
}: RecommendedContentProps) {
  // Utiliser notre hook personnalisé pour obtenir les recommandations
  const targetType = contentType === 'lesson' ? 'tool' : 'lesson';
  const { recommendations, isLoading } = useContentRecommendations({
    sourceType: contentType,
    sourceId: contentId,
    targetType,
    maxItems,
    includeWeakMatches: true,
  });

  // Convertir les recommandations en éléments de contenu
  const recommendedItems = React.useMemo(() => {
    if (isLoading || recommendations.length === 0) return [];

    // Pour chaque recommandation, récupérer l'élément complet (leçon ou outil)
    return recommendations.map((rec) => {
      // L'élément est soit une leçon, soit un outil
      return {
        id: rec.id,
        title: rec.title,
        type: rec.type,
        strength: rec.strength,
        matchReason: rec.matchReason,
      };
    });
  }, [recommendations, isLoading]);

  // Déterminer le titre et la description par défaut
  const defaultTitle =
    contentType === 'lesson'
      ? 'Outils recommandés pour cette leçon'
      : 'Leçons recommandées pour cet outil';

  const defaultDescription =
    contentType === 'lesson'
      ? 'Ces outils de coaching vous aideront à mettre en pratique les concepts de cette leçon.'
      : "Ces leçons vous aideront à maîtriser l'utilisation de cet outil de coaching.";

  const displayTitle = title || defaultTitle;
  const displayDescription = description || defaultDescription;

  // Déterminer l'icône et le lien "voir tous"
  const headerIcon =
    contentType === 'lesson' ? (
      <Icons.Tool className="h-5 w-5 text-primary" />
    ) : (
      <Icons.BookOpen className="h-5 w-5 text-primary" />
    );
  const allItemsLink = contentType === 'lesson' ? '/tools' : '/lessons';

  if (isLoading) {
    return (
      <Card className="mt-8 animate-pulse">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {displayTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-16 bg-muted/30 rounded-md"></div>
            <div className="h-16 bg-muted/30 rounded-md"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (recommendedItems.length === 0) {
    return null; // Ne rien afficher s'il n'y a pas d'éléments recommandés
  }

  return (
    <Card className="mt-8 border-primary/20 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          {headerIcon}
          {displayTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {displayDescription}
        </p>
        <div className="space-y-3">
          {recommendedItems.map((item) => {
            // Déterminer les propriétés spécifiques en fonction du type d'élément
            const itemId = item.id;
            const itemTitle = item.title;

            // Ajouter une indication visuelle de la force de la recommandation
            // Using the strength indicator directly in the UI instead of storing in a variable
            const strengthBadge =
              item.strength === 'strong' ? (
                <span className="text-xs text-amber-500">⭐⭐⭐</span>
              ) : item.strength === 'medium' ? (
                <span className="text-xs text-amber-500">⭐⭐</span>
              ) : (
                <span className="text-xs text-amber-500">⭐</span>
              );

            // Icône par défaut basée sur le type
            const itemIcon =
              item.type === 'lesson' ? (
                <Icons.BookOpen className="text-primary h-5 w-5" />
              ) : (
                <Icons.Tool className="text-primary h-5 w-5" />
              );

            // Lien vers l'élément
            const itemLink =
              item.type === 'lesson'
                ? `/lesson-view/${itemId}`
                : `/tools?tool=${itemId}`;

            // Catégorie et durée (pour les leçons)
            const itemCategory = item.type === 'lesson' ? 'Leçon' : 'Outil';
            const itemDuration = undefined;

            return (
              <div
                key={itemId}
                className="p-3 rounded-lg border border-border/50 hover:border-primary/30 flex justify-between items-center group hover:bg-primary/5 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    {itemIcon}
                  </div>
                  <div>
                    <h4 className="font-medium group-hover:text-primary transition-colors flex items-center gap-2">
                      {itemTitle}
                      {strengthBadge}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{itemCategory}</span>
                      {itemDuration && (
                        <>
                          <span>•</span>
                          <span className="flex items-center">
                            <Icons.Clock className="h-3 w-3 mr-1" />
                            {itemDuration}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs group-hover:bg-primary group-hover:text-white transition-all duration-300"
                  onClick={() => (window.location.href = itemLink)}
                >
                  <Icons.ExternalLink className="h-3 w-3 mr-1" />
                  Voir
                </Button>
              </div>
            );
          })}
        </div>
        {showAllLink && (
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              size="sm"
              className="text-xs hover:bg-primary hover:text-white transition-all duration-300"
              onClick={() => (window.location.href = allItemsLink)}
            >
              <Icons.Search className="h-3 w-3 mr-1" />
              {contentType === 'lesson'
                ? 'Explorer tous les outils'
                : 'Explorer toutes les leçons'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
