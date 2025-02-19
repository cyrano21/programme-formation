'use client'

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { programData } from "@/utils/modules-data";
import { Module } from "@/utils/modules-data";
import { Icons } from "@/utils/icons";

export default function ModuleDetail() {
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const moduleId = searchParams.get("id");

  // Trouver le module dans toutes les phases
  let foundModule: Module | null = null;
  
  for (const phase of programData) {
    const module = phase.modules.find(m => m.id === moduleId);
    if (module) {
      foundModule = module;
      break;
    }
  }

  if (!foundModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Icons.AlertCircle className="mx-auto mb-4 text-muted-foreground" size={64} />
          <h1 className="text-2xl font-bold mb-4">Module non trouvé</h1>
          <Link href="/modules">
            <Button>Retour aux modules</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Valeur de progression par défaut si non définie
  const moduleProgress = foundModule.progress ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b">
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
                className="text-sm font-medium text-primary border-b-2 border-primary"
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
          <Link href="/modules">
            <Button variant="outline" className="mb-4">
              <Icons.ChevronStart className="mr-2" /> Retour aux modules
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-primary">{foundModule.title}</h1>
                <p className="text-muted-foreground mt-2">{foundModule.description}</p>
              </div>
              <Badge variant="secondary">{foundModule.duration}</Badge>
            </div>

            <div className="mt-6">
              <Progress value={moduleProgress} className="w-full" />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Progression</span>
                <span>{moduleProgress}%</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="themes">Thèmes</TabsTrigger>
              <TabsTrigger value="competencies">Compétences</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardHeader className="bg-primary/10 py-4 px-6 border-b border-primary/20">
                  <CardTitle className="text-xl font-bold text-primary">
                    <Icons.Book className="inline-block mr-3 text-primary" />
                    Objectifs du Module
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {foundModule.description}
                    </p>
                    <div className="border-l-4 border-primary pl-4 py-2 bg-primary/5">
                      <p className="text-sm font-semibold text-primary">
                        Durée estimée : {foundModule.duration}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="themes">
              <Card className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardHeader className="bg-primary/10 py-4 px-6 border-b border-primary/20">
                  <CardTitle className="text-xl font-bold text-primary">
                    <Icons.Layers className="inline-block mr-3 text-primary" />
                    Thèmes du Module
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {foundModule.themes.map((theme, index) => (
                      <div 
                        key={index} 
                        className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100 hover:shadow-sm transition-all"
                      >
                        <span className="text-3xl opacity-70">{theme.icon}</span>
                        <div>
                          <h3 className="font-semibold text-primary mb-2">{theme.title}</h3>
                          <p className="text-sm text-muted-foreground">{theme.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="competencies">
              <Card className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardHeader className="bg-primary/10 py-4 px-6 border-b border-primary/20">
                  <CardTitle className="text-xl font-bold text-primary">
                    <Icons.Award className="inline-block mr-3 text-primary" />
                    Compétences Développées
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {foundModule.competencies.map((competency, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:shadow-sm transition-all"
                      >
                        <span className="text-2xl opacity-70">{competency.icon}</span>
                        <span className="text-sm font-medium text-primary">{competency.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Boutons de fin de module */}
          <div className="flex justify-end gap-4 mt-8">
            <Button 
              variant="outline" 
              className="hover:bg-slate-100"
            >
              Marquer comme terminé
            </Button>
            <Link href={`/lesson-view?moduleId=${moduleId}&lessonId=${foundModule.id}-1`}>
              <Button 
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Commencer la première leçon
                <Icons.ArrowEnd className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
