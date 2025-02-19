'use client'

import React, { useState, useMemo } from "react";
import dynamic from 'next/dynamic';

// Dynamically import components
const Card = dynamic(() => import("@/components/ui/card").then(mod => ({ default: mod.Card })), { ssr: false });
const CardContent = dynamic(() => import("@/components/ui/card").then(mod => ({ default: mod.CardContent })), { ssr: false });
const CardHeader = dynamic(() => import("@/components/ui/card").then(mod => ({ default: mod.CardHeader })), { ssr: false });
const CardTitle = dynamic(() => import("@/components/ui/card").then(mod => ({ default: mod.CardTitle })), { ssr: false });
const Progress = dynamic(() => import("@/components/ui/progress").then(mod => ({ default: mod.Progress })), { ssr: false });
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/utils/icons";
import { programData } from "@/utils/modules-data";

export default function LessonView() {
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const moduleId = searchParams.get("moduleId");
  const lessonId = searchParams.get("lessonId");

  // Memoize module and lesson data
  const module = useMemo(() => {
    return programData
      .flatMap((phase) => phase.modules)
      .find((m) => m.id === moduleId);
  }, [moduleId]);

  const lesson = useMemo(() => {
    return module?.lessons?.find(l => l.id === lessonId);
  }, [module, lessonId]);

  if (!module || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Icons.AlertCircle className="mx-auto mb-4 text-muted-foreground" size={64} />
          <h1 className="text-2xl font-bold mb-4">Leçon non trouvée</h1>
          <Link href="/modules">
            <Button>Retour aux modules</Button>
          </Link>
        </div>
      </div>
    );
  }

  const [lessonProgress, setLessonProgress] = useState(lesson.progress || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background/95">
      {/* Top Navigation */}
      <header className="bg-white/95 shadow-sm border-b backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-primary">CoachVerse</span>
            <nav className="hidden md:flex gap-6 ml-8">
              <Link 
                href="/dashboard" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                href="/modules" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Modules
              </Link>
              <Link 
                href="/tools" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Tools
              </Link>
              <Link 
                href="/lessons" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Lessons
              </Link>
              <Link 
                href="/assessments" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Progress
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link href={`/module-detail?id=${moduleId}`}>
            <Button variant="outline" className="mb-4">
              <Icons.ChevronStart className="mr-2" /> Retour au module
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          <div className="bg-white/95 shadow-md hover:shadow-xl rounded-lg p-6 transition-all duration-300 border border-primary/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-primary">{lesson.title}</h1>
                <p className="text-muted-foreground mt-2">{lesson.description}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                Durée: {lesson.duration}
              </div>
            </div>

            <div className="mt-6">
              <Progress value={lessonProgress} className="w-full" />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Progression</span>
                <span>{lessonProgress}%</span>
              </div>
            </div>
          </div>

          {lesson.content && (
            <Card>
              <CardHeader>
                <CardTitle>Contenu de la Leçon</CardTitle>
              </CardHeader>
              <CardContent>
                {lesson.content.map((section, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                    <p className="text-muted-foreground">{section.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {lesson.exercises && (
            <Card>
              <CardHeader>
                <CardTitle>Exercices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lesson.exercises.map((exercise, index) => (
                    <div 
                      key={index} 
                      className="p-4 bg-slate-50 rounded-lg hover:bg-primary/5 transition-all duration-300 hover:shadow-md"
                    >
                      <h4 className="font-medium mb-2">{exercise.title}</h4>
                      <p className="text-sm text-muted-foreground">{exercise.description}</p>
                      <Button 
                        size="sm" 
                        className="mt-3"
                        onClick={() => {
                          // Logique pour démarrer l'exercice
                          console.log(`Démarrer l'exercice: ${exercise.title}`);
                        }}
                      >
                        Démarrer
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-4 mt-8">
            <Button 
              variant="outline" 
              className="hover:bg-primary/10 transition-all duration-300 hover:scale-105"
              onClick={() => {
                // Logique pour marquer la leçon comme terminée
                setLessonProgress(100);
              }}
            >
              Marquer comme terminé
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => {
                // Logique pour passer à la leçon suivante
                console.log('Passer à la leçon suivante');
              }}
            >
              Leçon suivante
              <Icons.ArrowEnd className="ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
