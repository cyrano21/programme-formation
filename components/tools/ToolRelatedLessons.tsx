'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLessons } from '@/features/lessons/hooks/useLessons';
import { Tool } from '@/features/tools/hooks/useTools';
import { Icons } from '@/utils/icons';

interface ToolRelatedLessonsProps {
  tool: Tool;
  maxLessons?: number;
}

export default function ToolRelatedLessons({
  tool,
  maxLessons = 3,
}: ToolRelatedLessonsProps) {
  const { lessons, isLoading, error } = useLessons();

  // Get lessons related to this specific tool
  const relatedLessons = React.useMemo(() => {
    if (!tool || isLoading) return [];

    // First, get directly related lessons (via relatedLessons property in tool)
    const directlyRelated = lessons.filter(
      (lesson) => tool.relatedLessons && tool.relatedLessons.includes(lesson.id)
    );

    // If we don't have enough directly related lessons, find lessons with matching tags
    if (
      directlyRelated.length < maxLessons &&
      tool.tags &&
      tool.tags.length > 0
    ) {
      const tagRelated = lessons.filter((lesson) => {
        // Skip lessons that are already in directlyRelated
        if (directlyRelated.some((rl) => rl.id === lesson.id)) return false;

        // Check if lesson has any tags that match the tool's tags
        return (
          lesson.tags && lesson.tags.some((tag) => tool.tags?.includes(tag))
        );
      });

      // Combine and limit to maxLessons
      return [...directlyRelated, ...tagRelated].slice(0, maxLessons);
    }

    return directlyRelated.slice(0, maxLessons);
  }, [tool, lessons, isLoading, maxLessons]);

  if (isLoading) {
    return (
      <Card className="mt-8 animate-pulse">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Leçons recommandées
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

  if (relatedLessons.length === 0) {
    return null; // Don't show the component if there are no related lessons
  }

  return (
    <Card className="mt-8 border-primary/20 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Icons.BookOpen className="h-5 w-5 text-primary" />
          Leçons recommandées pour cet outil
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Ces leçons vous aideront à maîtriser l&apos;utilisation de cet outil
          de coaching.
        </p>
        <div className="space-y-3">
          {relatedLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="p-3 rounded-lg border border-border/50 hover:border-primary/30 flex justify-between items-center group hover:bg-primary/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  {typeof lesson.icon === 'string' &&
                    React.createElement(
                      Icons[lesson.icon as keyof typeof Icons],
                      { className: 'text-primary h-5 w-5' }
                    )}
                </div>
                <div>
                  <h4 className="font-medium group-hover:text-primary transition-colors">
                    {lesson.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{lesson.category}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Icons.Clock className="h-3 w-3 mr-1" />
                      {lesson.duration}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs group-hover:bg-primary group-hover:text-white transition-all duration-300"
                onClick={() =>
                  (window.location.href = `/lesson-view/${lesson.id}`)
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
            onClick={() => (window.location.href = '/lessons')}
          >
            <Icons.Search className="h-3 w-3 mr-1" />
            Explorer toutes les leçons
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
