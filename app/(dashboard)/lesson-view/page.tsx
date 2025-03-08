'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Icons } from '@/utils/icons';
import { programData } from '@/utils/modules-data';

// Import components directly instead of using dynamic imports
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import styles from './lesson-view.module.css';

export default function LessonView() {
  const router = useRouter();
  const searchParams = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );
  
  const moduleId = searchParams.get('moduleId');
  const lessonId = searchParams.get('lessonId');
  
  // Add debugging to track URL parameter extraction
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Current URL:', window.location.href);
      console.log('Search params:', window.location.search);
      console.log('Extracted moduleId:', moduleId);
      console.log('Extracted lessonId:', lessonId);
    }
  }, [moduleId, lessonId]);

  // Initialize state at the top level, before any conditional returns
  // Initialize state at the top level, before any conditional returns
  const [lessonProgress, setLessonProgress] = useState(0);

  // Memoize module and lesson data
  const moduleData = useMemo(() => {
    return programData
      .flatMap((phase) => phase.modules)
      .find((m) => m.id === moduleId);
  }, [moduleId]);

  const lesson = useMemo(() => {
    return moduleData?.lessons?.find((l) => l.id === lessonId);
  }, [moduleData, lessonId]);

  // Find the index of the current lesson in the module's lessons array
  const currentLessonIndex = useMemo(() => {
    if (!moduleData?.lessons || !lessonId) return -1;
    return moduleData.lessons.findIndex((l) => l.id === lessonId);
  }, [moduleData, lessonId]);

  // Calculate total number of lessons in the module
  const totalLessons = useMemo(() => {
    return moduleData?.lessons?.length || 0;
  }, [moduleData]);

  // Calculate current lesson number (1-based index)
  const currentLessonNumber = useMemo(() => {
    return currentLessonIndex >= 0 ? currentLessonIndex + 1 : 0;
  }, [currentLessonIndex]);

  // Determine if there is a next lesson
  const hasNextLesson = useMemo(() => {
    if (!moduleData?.lessons) return false;
    return currentLessonIndex < moduleData.lessons.length - 1;
  }, [moduleData, currentLessonIndex]);

  // Get the next lesson if it exists
  const nextLesson = useMemo(() => {
    if (!hasNextLesson || !moduleData?.lessons) return null;
    return moduleData.lessons[currentLessonIndex + 1];
  }, [hasNextLesson, moduleData, currentLessonIndex]);

  // Function to navigate to the next lesson
  const goToNextLesson = useCallback(() => {
    if (nextLesson && moduleId) {
      // Use direct window location navigation instead of router.push
      // This can help bypass potential issues with the Next.js router
      window.location.href = `/lesson-view?moduleId=${moduleId}&lessonId=${nextLesson.id}`;
      
      // Log the navigation attempt
      console.log('Navigating to next lesson:', nextLesson.id);
    } else {
      console.log('Cannot navigate: nextLesson or moduleId is missing', { nextLesson, moduleId });
    }
  }, [nextLesson, moduleId]);

  // Determine if there is a previous lesson
  const hasPreviousLesson = useMemo(() => {
    if (!moduleData?.lessons) return false;
    return currentLessonIndex > 0;
  }, [moduleData, currentLessonIndex]);

  // Get the previous lesson if it exists
  const previousLesson = useMemo(() => {
    if (!hasPreviousLesson || !moduleData?.lessons) return null;
    return moduleData.lessons[currentLessonIndex - 1];
  }, [hasPreviousLesson, moduleData, currentLessonIndex]);

  // Function to navigate to the previous lesson
  const goToPreviousLesson = useCallback(() => {
    if (previousLesson && moduleId) {
      router.push(
        `/lesson-view?moduleId=${moduleId}&lessonId=${previousLesson.id}`
      );
    }
  }, [previousLesson, moduleId, router]);

  // Update lesson progress when lesson changes
  React.useEffect(() => {
    if (lesson && lesson.progress !== undefined) {
      setLessonProgress(lesson.progress);
    }
  }, [lesson]);

  if (!moduleData || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center animate-fade-in">
        <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-border/30 animate-slide-up">
          <Icons.AlertCircle
            className="mx-auto mb-4 text-muted-foreground animate-pulse"
            size={64}
          />
          <h1 className="text-2xl font-bold mb-4 text-primary">
            Leçon non trouvée
          </h1>
          <Link href="/modules">
            <Button className="mt-2 transition-all duration-300 hover:shadow-md hover:scale-105">
              <Icons.ChevronStart className="mr-2 h-4 w-4" />
              Retour aux modules
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Removed duplicate useEffect hook - this was causing the React Hook conditional usage error

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background/95 animate-gradient-x">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 shadow-md border-b backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent animate-pulse-subtle">
              CoachVerse
            </span>
            <nav className="hidden md:flex gap-2 ml-8">
              <Link
                href="/dashboard"
                className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105 px-3 py-1.5 rounded-full"
              >
                Dashboard
              </Link>
              <Link
                href="/modules"
                className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105 px-3 py-1.5 rounded-full"
              >
                Modules
              </Link>
              <Link
                href="/tools"
                className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105 px-3 py-1.5 rounded-full"
              >
                Tools
              </Link>
              <Link
                href="/lessons"
                className="text-sm font-medium text-primary border-b-2 border-primary hover:scale-105 transition-all duration-300 px-3 py-1.5 rounded-full bg-primary/5"
              >
                Lessons
              </Link>
              <Link
                href="/assessments"
                className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105 px-3 py-1.5 rounded-full"
              >
                Progress
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10 transition-colors"
            >
              <Icons.Bell className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10 transition-colors"
            >
              <Icons.User className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="flex items-center justify-between mb-8 animate-slide-up">
          <Button
            variant="outline"
            className="mb-4 hover:bg-primary/5 transition-all duration-300 hover:scale-105 hover:shadow-sm group"
            onClick={() => router.push(`/module-detail?id=${moduleId}`)}
          >
            <Icons.ChevronStart className="mr-2 group-hover:animate-pulse" />{' '}
            Retour au module
          </Button>
        </div>

        <div className="space-y-8">
          <div
            className={`bg-white/95 shadow-md hover:shadow-xl rounded-lg p-6 transition-all duration-300 border border-primary/10 backdrop-blur-sm animate-slide-up ${styles.lessonCard}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {lesson.title}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {lesson.description}
                </p>
              </div>
              <div className="text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium shadow-sm hover:shadow transition-all duration-300">
                Durée: {lesson.duration}
              </div>
            </div>

            <div className="mt-6">
              <Progress
                value={lessonProgress}
                className="w-full h-2 bg-primary/10"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Progression</span>
                <span className="font-medium text-primary">
                  {lessonProgress}%
                </span>
              </div>
            </div>
          </div>

          {lesson.content && (
            <Card
              className={`bg-white/95 shadow-md hover:shadow-xl rounded-lg overflow-hidden transition-all duration-300 border border-primary/10 backdrop-blur-sm animate-slide-up ${styles.contentCard}`}
            >
              <CardHeader className="bg-primary/10 py-4 px-6 border-b border-primary/20">
                <CardTitle className="text-xl font-bold text-primary flex items-center">
                  <Icons.BookOpen className="inline-block mr-3 text-primary" />
                  Contenu de la Leçon
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {lesson.content.map((section, index) => (
                  <div
                    key={index}
                    className={`mb-6 p-4 rounded-lg hover:bg-primary/5 transition-all duration-300 hover:shadow-sm animate-slide-up ${styles.sectionItem}`}
                  >
                    <h3 className="text-lg font-semibold mb-2 text-primary/90">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {lesson.exercises && (
            <Card
              className={`bg-white/95 shadow-md hover:shadow-xl rounded-lg overflow-hidden transition-all duration-300 border border-primary/10 backdrop-blur-sm animate-slide-up ${styles.exercisesCard}`}
            >
              <CardHeader className="bg-primary/10 py-4 px-6 border-b border-primary/20">
                <CardTitle className="text-xl font-bold text-primary flex items-center">
                  <Icons.Activity className="inline-block mr-3 text-primary" />
                  Exercices
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {lesson.exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className={`p-4 bg-slate-50 rounded-lg hover:bg-primary/5 transition-all duration-300 hover:shadow-md border border-transparent hover:border-primary/20 group animate-slide-up ${
                        styles.exerciseItem
                      } ${styles[`index-${index}`]}`}
                    >
                      <h4 className="font-medium mb-2 group-hover:text-primary transition-colors">
                        {exercise.title}
                      </h4>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                        {exercise.description}
                      </p>
                      <Button
                        size="sm"
                        className="mt-3 hover:scale-105 transition-transform duration-300 hover:shadow-sm"
                        onClick={() => {
                          // Logique pour démarrer l'exercice
                          console.log(`Démarrer l'exercice: ${exercise.title}`);
                        }}
                      >
                        <Icons.Play className="mr-2 h-3 w-3" />
                        Démarrer
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div
            className={`flex justify-between items-center gap-4 mt-8 animate-slide-up ${styles.actionButtons}`}
          >
            {/* Previous Lesson Button */}
            <Button
              className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              onClick={goToPreviousLesson}
              disabled={!hasPreviousLesson}
              title={
                !hasPreviousLesson
                  ? 'Première leçon du module'
                  : previousLesson?.title
              }
            >
              <Icons.ArrowStart className="mr-2 group-hover:-translate-x-1 transition-transform" />
              {hasPreviousLesson ? (
                <>
                  <span className="mr-2">{previousLesson?.title}</span>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    {currentLessonNumber - 1}/{totalLessons}
                  </span>
                </>
              ) : (
                'Leçon précédente'
              )}
            </Button>

            {/* Current Lesson Display (Middle) */}
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <div className="bg-primary/10 px-6 py-3 rounded-lg shadow-sm text-center">
                <h3 className="text-lg font-semibold text-primary">
                  {lesson.title}
                </h3>
                <div className="text-xs text-muted-foreground mt-1">
                  Leçon {currentLessonNumber} sur {totalLessons}
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-2 hover:bg-primary/10 transition-all duration-300 hover:scale-105 border-primary/20 hover:border-primary/40 hover:shadow-md"
                onClick={() => {
                  // Logique pour marquer la leçon comme terminée
                  setLessonProgress(100);
                }}
              >
                <Icons.CheckCircle className="mr-2 h-4 w-4" />
                Marquer comme terminé
              </Button>
            </div>

            {/* Next Lesson Button */}
            <Button
              className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              onClick={goToNextLesson}
              disabled={!hasNextLesson}
              title={
                !hasNextLesson ? 'Dernière leçon du module' : nextLesson?.title
              }
            >
              {hasNextLesson ? (
                <>
                  <span className="mr-2">{nextLesson?.title}</span>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    {currentLessonNumber + 1}/{totalLessons}
                  </span>
                </>
              ) : (
                'Leçon suivante'
              )}
              <Icons.ArrowEnd className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
