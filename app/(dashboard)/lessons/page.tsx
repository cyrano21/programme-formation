'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Icons } from "@/utils/icons";

type Lesson = {
  id: string;
  title: string;
  description: string;
  module: string;
  duration: string;
  progress: number;
  icon: React.ReactNode;
  category: string;
}

export default function Lessons() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const lessons: Lesson[] = [
    {
      id: 'communication-non-violente',
      title: 'Communication Non-Violente',
      description: 'Apprenez à communiquer de manière empathique',
      module: 'Leadership Avancé',
      duration: '45 min',
      progress: 75,
      icon: <Icons.MessageCircle />,
      category: 'Leadership'
    },
    {
      id: 'gestion-stress',
      title: 'Techniques de Gestion du Stress',
      description: 'Stratégies pour gérer le stress professionnel',
      module: 'Bien-être Professionnel',
      duration: '60 min',
      progress: 45,
      icon: <Icons.Activity />,
      category: 'Bien-être'
    },
    {
      id: 'prise-decision',
      title: 'Prise de Décision Stratégique',
      description: 'Développez votre capacité de décision',
      module: 'Leadership Avancé',
      duration: '30 min',
      progress: 60,
      icon: <Icons.BookOpen />,
      category: 'Leadership'
    },
    {
      id: 'intelligence-emotionnelle',
      title: 'Intelligence Émotionnelle',
      description: 'Comprendre et gérer vos émotions',
      module: 'Développement Personnel',
      duration: '50 min',
      progress: 85,
      icon: <Icons.Users />,
      category: 'Développement Personnel'
    },
    {
      id: 'negociation-avancee',
      title: 'Négociation Avancée',
      description: 'Techniques de négociation professionnelle',
      module: 'Leadership Avancé',
      duration: '40 min',
      progress: 55,
      icon: <Icons.TrendingUp />,
      category: 'Leadership'
    }
  ];

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || lesson.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background/95">
      {/* Top Navigation */}
      <header className="bg-white/95 shadow-sm border-b backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-primary">CoachVerse</span>
            <nav className="hidden md:flex gap-6 ml-8">
              <a href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</a>
              <a href="/modules" className="text-sm font-medium hover:text-primary transition-colors">Modules</a>
              <a href="/tools" className="text-sm font-medium hover:text-primary transition-colors">Tools</a>
              <a href="/lessons" className="text-sm font-medium text-primary border-b-2 border-primary">Lessons</a>
              <a href="/assessments" className="text-sm font-medium hover:text-primary transition-colors">Progress</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
            Coaching Lessons
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Développez vos compétences avec nos leçons de coaching interactives
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <div className="max-w-xl mx-auto relative">
            <Input
              type="search"
              placeholder="Recherchez des leçons par titre ou description..."
              className="pl-10 py-2 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
          
          <div className="flex justify-center gap-3 flex-wrap">
            {["all", "Leadership", "Bien-être", "Développement Personnel"].map((category) => (
              <Button 
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <Card 
              key={lesson.id} 
              className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/20"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      {lesson.icon}
                    </div>
                    <CardTitle className="text-lg font-semibold">{lesson.title}</CardTitle>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {lesson.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 min-h-[3rem]">
                  {lesson.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-muted-foreground">
                    {lesson.module} • {lesson.duration}
                  </span>
                  <span className="text-xs font-semibold text-primary">
                    {lesson.progress}% Complété
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Commencer la Leçon
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <Icons.AlertCircle className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="text-xl text-muted-foreground">
              Aucune leçon trouvée correspondant à votre recherche
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
