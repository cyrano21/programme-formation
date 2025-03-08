'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { programData } from '@/utils/modules-data';
import { Module } from '@/utils/modules-data';
import { Icons } from '@/utils/icons';
import styles from './module-detail.module.css';

export default function ModuleDetail() {
  const searchParams = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );
  const moduleId = searchParams.get('id');

  // Trouver le module dans toutes les phases
  let foundModule: Module | null = null;

  for (const phase of programData) {
    const moduleData = phase.modules.find((m) => m.id === moduleId);
    if (moduleData) {
      foundModule = moduleData;
      break;
    }
  }

  if (!foundModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center animate-fade-in">
        <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-border/30 animate-slide-up">
          <Icons.AlertCircle
            className="mx-auto mb-4 text-muted-foreground animate-pulse"
            size={64}
          />
          <h1 className="text-2xl font-bold mb-4 text-primary">
            Module non trouvé
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

  // Valeur de progression par défaut si non définie
  const moduleProgress = foundModule.progress ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 animate-gradient-x">
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
                className="text-sm font-medium text-primary border-b-2 border-primary hover:scale-105 transition-all duration-300 px-3 py-1.5 rounded-full bg-primary/5"
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
                className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105 px-3 py-1.5 rounded-full"
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
          <Link href="/modules">
            <Button
              variant="outline"
              className="mb-4 hover:bg-primary/5 transition-all duration-300 hover:scale-105 hover:shadow-sm group"
            >
              <Icons.ChevronStart className="mr-2 group-hover:animate-pulse" />{' '}
              Retour aux modules
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          <div className="bg-white/95 shadow-md hover:shadow-xl rounded-lg p-6 transition-all duration-300 border border-primary/10 backdrop-blur-sm animate-slide-up ${styles.moduleOverview}">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {foundModule.title}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {foundModule.description}
                </p>
              </div>
              <Badge
                variant="secondary"
                className="shadow-sm hover:shadow-md transition-all duration-300 px-3 py-1.5 bg-primary/10 text-primary"
              >
                {foundModule.duration}
              </Badge>
            </div>

            <div className="mt-6">
              <Progress
                value={moduleProgress}
                className="w-full h-2 bg-primary/10"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Progression</span>
                <span className="font-medium text-primary">
                  {moduleProgress}%
                </span>
              </div>
            </div>
          </div>

          <Tabs
            defaultValue="overview"
            className="w-full animate-fade-in ${styles.tabsContainer}"
          >
            <TabsList className="grid w-full grid-cols-3 p-1 bg-muted/30 backdrop-blur-sm rounded-xl">
              <TabsTrigger
                value="overview"
                className="rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-300 hover:bg-primary/5"
              >
                Vue d&apos;ensemble
              </TabsTrigger>
              <TabsTrigger
                value="themes"
                className="rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-300 hover:bg-primary/5"
              >
                Thèmes
              </TabsTrigger>
              <TabsTrigger
                value="competencies"
                className="rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all duration-300 hover:bg-primary/5"
              >
                Compétences
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="overview"
              className="animate-slide-up ${styles.overviewTab}"
            >
              <Card className="bg-white/95 shadow-md hover:shadow-xl rounded-lg overflow-hidden transition-all duration-300 border border-primary/10 backdrop-blur-sm">
                <CardHeader className="bg-primary/10 py-4 px-6 border-b border-primary/20">
                  <CardTitle className="text-xl font-bold text-primary flex items-center">
                    <Icons.Book className="inline-block mr-3 text-primary" />
                    Objectifs du Module
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {foundModule.description}
                    </p>
                    <div className="border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r-lg shadow-sm hover:shadow transition-all duration-300 hover:bg-primary/10">
                      <p className="text-sm font-semibold text-primary">
                        Durée estimée : {foundModule.duration}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent
              value="themes"
              className="animate-slide-up ${styles.themesTab}"
            >
              <Card className="bg-white/95 shadow-md hover:shadow-xl rounded-lg overflow-hidden transition-all duration-300 border border-primary/10 backdrop-blur-sm">
                <CardHeader className="bg-primary/10 py-4 px-6 border-b border-primary/20">
                  <CardTitle className="text-xl font-bold text-primary flex items-center">
                    <Icons.Layers className="inline-block mr-3 text-primary" />
                    Thèmes du Module
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {foundModule.themes.map((theme, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100 hover:shadow-md transition-all duration-300 hover:bg-primary/5 hover:border-primary/20 group ${
                          styles[`themeItem-${index}`]
                        }`}
                      >
                        <span className="text-3xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 text-primary">
                          {theme.icon}
                        </span>
                        <div>
                          <h3 className="font-semibold text-primary mb-2 group-hover:text-primary/90 transition-colors">
                            {theme.title}
                          </h3>
                          <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                            {theme.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent
              value="competencies"
              className="animate-slide-up ${styles.competenciesTab}"
            >
              <Card className="bg-white/95 shadow-md hover:shadow-xl rounded-lg overflow-hidden transition-all duration-300 border border-primary/10 backdrop-blur-sm">
                <CardHeader className="bg-primary/10 py-4 px-6 border-b border-primary/20">
                  <CardTitle className="text-xl font-bold text-primary flex items-center">
                    <Icons.Award className="inline-block mr-3 text-primary" />
                    Compétences Développées
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {foundModule.competencies.map((competency, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:shadow-md transition-all duration-300 hover:bg-primary/5 hover:border-primary/20 hover:scale-105 group ${
                          styles[`competencyItem-${index}`]
                        }`}
                      >
                        <span className="text-2xl opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-6 text-primary">
                          {competency.icon}
                        </span>
                        <span className="text-sm font-medium text-primary group-hover:text-primary/90 transition-colors">
                          {competency.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Boutons de fin de module */}
          <div className="flex justify-end gap-4 mt-8 animate-slide-up ${styles.actionButtons}">
            <Button
              variant="outline"
              className="hover:bg-slate-100 transition-all duration-300 hover:shadow-md hover:scale-105 border-primary/20 hover:border-primary/40"
            >
              <Icons.CheckCircle className="mr-2 h-4 w-4" />
              Marquer comme terminé
            </Button>
            <Link
              href={`/lesson-view?moduleId=${moduleId}&lessonId=${foundModule.lessons?.[0]?.id}`}
            >
              <Button className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:shadow-lg hover:scale-105 group">
                Commencer la première leçon
                <Icons.ArrowEnd className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
