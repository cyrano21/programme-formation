'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useLessons, Lesson } from '@/features/lessons/hooks/useLessons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/utils/icons';
import { Progress } from '@/components/ui/progress';
import RecommendedContent from '@/components/shared/RecommendedContent';

export default function LessonView() {
  const params = useParams();
  const lessonId = params.id as string;
  const { lessons, isLoading, error } = useLessons();
  const [lesson, setLesson] = React.useState<Lesson | null>(null);

  // Find the lesson with the matching ID
  React.useEffect(() => {
    if (!isLoading && lessons.length > 0) {
      const foundLesson = lessons.find((l) => l.id === lessonId);
      setLesson(foundLesson || null);
    }
  }, [lessonId, lessons, isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="bg-destructive/10 text-destructive p-8 rounded-xl shadow-sm max-w-md mx-auto border border-destructive/30">
          <Icons.AlertTriangle
            className="mx-auto mb-4 text-destructive animate-pulse"
            size={48}
          />
          <p className="text-xl font-medium mb-2">Erreur</p>
          <p className="text-muted-foreground">{error}</p>
          <Button
            variant="outline"
            className="mt-6 border-destructive/30 hover:bg-destructive/10 transition-all duration-300"
            onClick={() => window.location.reload()}
          >
            <Icons.RefreshCw className="mr-2 h-4 w-4" />
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="bg-muted p-8 rounded-xl shadow-sm max-w-md mx-auto border border-border/30">
          <Icons.Search
            className="mx-auto mb-4 text-muted-foreground"
            size={48}
          />
          <p className="text-xl font-medium mb-2">Leçon introuvable</p>
          <p className="text-muted-foreground">
            La leçon que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => (window.location.href = '/lessons')}
          >
            <Icons.ArrowStart className="mr-2 h-4 w-4" />
            Retour aux leçons
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Lesson Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto hover:bg-transparent hover:text-primary"
              onClick={() => (window.location.href = '/lessons')}
            >
              <Icons.ArrowStart className="h-4 w-4 mr-1" />
              Retour aux leçons
            </Button>
            <span>•</span>
            <span>{lesson.category}</span>
            <span>•</span>
            <span>{lesson.module}</span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/10 p-4 rounded-full">
              {typeof lesson.icon === 'string' &&
                React.createElement(Icons[lesson.icon as keyof typeof Icons], {
                  size: 32,
                  className: 'text-primary',
                })}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{lesson.title}</h1>
              <p className="text-muted-foreground">{lesson.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Icons.Clock className="h-4 w-4 text-muted-foreground" />
                <span>{lesson.duration}</span>
              </div>

              {lesson.difficulty && (
                <div className="px-3 py-1 bg-muted rounded-full text-xs">
                  {lesson.difficulty}
                </div>
              )}

              {lesson.tags &&
                lesson.tags.map((tag) => (
                  <div
                    key={tag}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs"
                  >
                    {tag}
                  </div>
                ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Progression: {lesson.progress}%
              </span>
              <Progress value={lesson.progress} className="w-32" />
            </div>
          </div>
        </div>

        {/* Lesson Content - Placeholder */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Contenu de la leçon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Cette section contiendrait le contenu complet de la leçon.
            </p>
            <div className="space-y-4">
              {lesson.content ? (
                lesson.content.map(
                  (
                    section: {
                      title: string;
                      description: string;
                      duration?: string;
                    },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="border-l-2 border-primary/30 pl-4 py-2"
                    >
                      <h3 className="font-medium text-lg">{section.title}</h3>
                      <p>{section.description}</p>
                      {section.duration && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Durée estimée: {section.duration}
                        </div>
                      )}
                    </div>
                  )
                )
              ) : (
                <div className="p-4 bg-muted/30 rounded-md text-center">
                  <p>Contenu en cours de développement</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Exercises - Placeholder */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Exercices pratiques</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Mettez en pratique les concepts de cette leçon avec ces exercices.
            </p>
            <div className="space-y-4">
              {lesson.exercises ? (
                lesson.exercises.map(
                  (
                    exercise: {
                      title: string;
                      description: string;
                      duration?: string;
                    },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="border p-4 rounded-md hover:border-primary/30 transition-colors"
                    >
                      <h3 className="font-medium">{exercise.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {exercise.description}
                      </p>
                      {exercise.duration && (
                        <div className="text-xs text-primary mt-2">
                          Durée estimée: {exercise.duration}
                        </div>
                      )}
                      <Button className="mt-3" size="sm">
                        <Icons.Play className="h-3 w-3 mr-1" />
                        Commencer
                      </Button>
                    </div>
                  )
                )
              ) : (
                <div className="p-4 bg-muted/30 rounded-md text-center">
                  <p>Exercices en cours de développement</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Related Tools Component */}
        <RecommendedContent
          contentType="lesson"
          contentId={lesson.id}
          maxItems={3}
        />

        {/* Next Steps */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Prochaines étapes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Continuez votre parcours d`&apos;apprentissage avec ces leçons
              recommandées.
            </p>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {lesson.prerequisites ? (
                <Button variant="outline" className="flex-shrink-0">
                  <Icons.ArrowEnd className="h-4 w-4 mr-2" />
                  Leçon suivante
                </Button>
              ) : (
                <div className="p-4 bg-muted/30 rounded-md text-center w-full">
                  <p>Aucune leçon suivante recommandée pour le moment</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
