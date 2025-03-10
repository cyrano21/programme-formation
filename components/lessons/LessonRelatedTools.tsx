'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTools } from '@/features/tools/hooks/useTools';
import { Lesson } from '@/features/lessons/hooks/useLessons';
import { Icons } from '@/utils/icons';

interface LessonRelatedToolsProps {
  lesson: Lesson;
  maxTools?: number;
}

export default function LessonRelatedTools({
  lesson,
  maxTools = 3,
}: LessonRelatedToolsProps) {
  const { tools, isLoading, error } = useTools();

  // Get tools related to this specific lesson
  const relatedTools = React.useMemo(() => {
    if (!lesson || isLoading) return [];

    // First, get directly related tools (via relatedLessons property)
    const directlyRelated = tools.filter(
      (tool) => tool.relatedLessons && tool.relatedLessons.includes(lesson.id)
    );

    // If we don't have enough directly related tools, find tools with matching tags
    if (
      directlyRelated.length < maxTools &&
      lesson.tags &&
      lesson.tags.length > 0
    ) {
      const tagRelated = tools.filter((tool) => {
        // Skip tools that are already in directlyRelated
        if (directlyRelated.some((rt) => rt.id === tool.id)) return false;

        // Check if tool has any tags that match the lesson's tags
        return tool.tags && tool.tags.some((tag) => lesson.tags?.includes(tag));
      });

      // Combine and limit to maxTools
      return [...directlyRelated, ...tagRelated].slice(0, maxTools);
    }

    return directlyRelated.slice(0, maxTools);
  }, [lesson, tools, isLoading, maxTools]);

  if (isLoading) {
    return (
      <Card className="mt-8 animate-pulse">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Outils recommandés
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

  if (error) {
    return null; // Don't show anything if there's an error
  }

  if (relatedTools.length === 0) {
    return null; // Don't show the component if there are no related tools
  }

  return (
    <Card className="mt-8 border-primary/20 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Icons.Tool className="h-5 w-5 text-primary" />
          Outils recommandés pour cette leçon
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Ces outils de coaching vous aideront à mettre en pratique les concepts
          de cette leçon.
        </p>
        <div className="space-y-3">
          {relatedTools.map((tool) => (
            <div
              key={tool.id}
              className="p-3 rounded-lg border border-border/50 hover:border-primary/30 flex justify-between items-center group hover:bg-primary/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  {tool.icon}
                </div>
                <div>
                  <h4 className="font-medium group-hover:text-primary transition-colors">
                    {tool.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {tool.category}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs group-hover:bg-primary group-hover:text-white transition-all duration-300"
                onClick={() =>
                  (window.location.href = `/tools?tool=${tool.id}`)
                }
              >
                <Icons.ExternalLink className="h-3 w-3 mr-1" />
                Voir
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            size="sm"
            className="text-xs hover:bg-primary hover:text-white transition-all duration-300"
            onClick={() => (window.location.href = '/tools')}
          >
            <Icons.Search className="h-3 w-3 mr-1" />
            Explorer tous les outils
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
