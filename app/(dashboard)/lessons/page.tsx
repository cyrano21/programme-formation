'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Icons } from '@/utils/icons';
import { Progress } from '@/components/ui/progress';

type Lesson = {
  id: string;
  title: string;
  description: string;
  module: string;
  duration: string;
  progress: number;
  icon: React.ReactNode;
  category: string;
};

export default function Lessons() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const lessons: Lesson[] = [
    {
      id: 'communication-non-violente',
      title: 'Communication Non-Violente',
      description: 'Apprenez à communiquer de manière empathique',
      module: 'Leadership Avancé',
      duration: '45 min',
      progress: 75,
      icon: <Icons.MessageCircle />,
      category: 'Leadership',
    },
    {
      id: 'gestion-stress',
      title: 'Techniques de Gestion du Stress',
      description: 'Stratégies pour gérer le stress professionnel',
      module: 'Bien-être Professionnel',
      duration: '60 min',
      progress: 45,
      icon: <Icons.Activity />,
      category: 'Bien-être',
    },
    {
      id: 'prise-decision',
      title: 'Prise de Décision Stratégique',
      description: 'Développez votre capacité de décision',
      module: 'Leadership Avancé',
      duration: '30 min',
      progress: 60,
      icon: <Icons.BookOpen />,
      category: 'Leadership',
    },
    {
      id: 'intelligence-emotionnelle',
      title: 'Intelligence Émotionnelle',
      description: 'Comprendre et gérer vos émotions',
      module: 'Développement Personnel',
      duration: '50 min',
      progress: 85,
      icon: <Icons.Users />,
      category: 'Développement Personnel',
    },
    {
      id: 'negociation-avancee',
      title: 'Négociation Avancée',
      description: 'Techniques de négociation professionnelle',
      module: 'Leadership Avancé',
      duration: '40 min',
      progress: 55,
      icon: <Icons.TrendingUp />,
      category: 'Leadership',
    },
  ];

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === 'all' ||
      lesson.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background/95 animate-gradient-x">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 shadow-md border-b backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 animate-pulse-subtle">
              CoachVerse
            </span>
            <nav className="hidden md:flex gap-6 ml-8">
              <a
                href="/dashboard"
                className="text-sm font-medium hover:text-primary transition-colors hover:scale-105 transition-transform duration-200"
              >
                Dashboard
              </a>
              <a
                href="/modules"
                className="text-sm font-medium hover:text-primary transition-colors hover:scale-105 transition-transform duration-200"
              >
                Modules
              </a>
              <a
                href="/tools"
                className="text-sm font-medium hover:text-primary transition-colors hover:scale-105 transition-transform duration-200"
              >
                Tools
              </a>
              <a
                href="/lessons"
                className="text-sm font-medium text-primary border-b-2 border-primary hover:scale-105 transition-transform duration-200"
              >
                Lessons
              </a>
              <a
                href="/assessments"
                className="text-sm font-medium hover:text-primary transition-colors hover:scale-105 transition-transform duration-200"
              >
                Progress
              </a>
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-12 text-center animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
            Coaching Lessons
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Développez vos compétences avec nos leçons de coaching interactives
          </p>
        </div>

        {/* Search and Filters */}
        <div
          className="mb-12 space-y-8 animate-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <div className="max-w-xl mx-auto relative group">
            <Input
              type="search"
              placeholder="Recherchez des leçons par titre ou description..."
              className="pl-10 py-2.5 text-base border-2 border-border/50 focus:border-primary/50 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
          </div>

          <div className="flex justify-center gap-3 flex-wrap">
            {['all', 'Leadership', 'Bien-être', 'Développement Personnel'].map(
              (category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'default' : 'outline'}
                  onClick={() => setActiveCategory(category)}
                  className={`capitalize rounded-full px-6 py-2 transition-all duration-300 ${
                    activeCategory === category
                      ? 'shadow-md hover:shadow-lg'
                      : 'hover:border-primary/50'
                  } hover:scale-105`}
                >
                  {category === 'all' ? 'Tous' : category}
                </Button>
              )
            )}
          </div>
        </div>

        {/* Lessons Grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in"
          style={{ animationDelay: '200ms' }}
        >
          {filteredLessons.map((lesson, index) => (
            <Card
              key={lesson.id}
              className={`group hover:shadow-xl transition-all duration-500 border border-border/50 hover:border-primary/30 rounded-xl overflow-hidden backdrop-blur-sm animate-slide-up`}
              style={{ animationDelay: `${150 + index * 50}ms` }}
            >
              <CardHeader className="pb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3.5 rounded-full shadow-sm group-hover:shadow-md group-hover:bg-primary/15 transition-all duration-300 group-hover:scale-110">
                      <div className="text-primary group-hover:text-primary/90 transition-colors duration-300 transform group-hover:rotate-6">
                        {lesson.icon}
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                      {lesson.title}
                    </CardTitle>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium shadow-sm group-hover:shadow group-hover:bg-primary/15 transition-all duration-300">
                    {lesson.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-sm text-muted-foreground mb-6 min-h-[3rem] group-hover:text-foreground/80 transition-colors duration-300">
                  {lesson.description}
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full">
                      {lesson.module} • {lesson.duration}
                    </span>
                    <span className="text-xs font-semibold text-primary">
                      {lesson.progress}% Complété
                    </span>
                  </div>
                  <Progress
                    value={lesson.progress}
                    className="h-1.5 bg-primary/10"
                  />
                  <Button
                    variant="outline"
                    className="w-full mt-4 group-hover:bg-primary group-hover:text-white transition-all duration-500 hover:scale-105 hover:shadow-lg rounded-lg border-primary/20 hover:border-primary/50"
                  >
                    <Icons.Play className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                    Commencer la Leçon
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="bg-card/30 backdrop-blur-sm p-8 rounded-xl shadow-sm max-w-md mx-auto border border-border/50">
              <Icons.AlertCircle
                className="mx-auto mb-4 text-muted-foreground animate-pulse"
                size={48}
              />
              <p className="text-xl text-muted-foreground font-light">
                Aucune leçon trouvée correspondant à votre recherche
              </p>
              <Button
                variant="outline"
                className="mt-6 hover:bg-primary/10 transition-all duration-300"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
              >
                <Icons.RefreshCw className="mr-2 h-4 w-4" />
                Réinitialiser les filtres
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
