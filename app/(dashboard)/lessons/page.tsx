'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Icons } from '@/utils/icons';
import { Progress } from '@/components/ui/progress';
import styles from './lessons.module.css';
import { useLessons } from '@/features/lessons/hooks/useLessons';

// Using the useLessons hook for lesson data

export default function Lessons() {
  // Utiliser le hook useLessons pour charger les leçons dynamiquement
  const {
    filteredLessons,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
  } = useLessons();

  // Obtenir les catégories uniques à partir des leçons
  const categories = [
    'all',
    ...new Set(filteredLessons.map((lesson) => lesson.category)),
  ];

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
                className="text-sm font-medium hover:text-primary hover:scale-105 transition-all duration-200"
              >
                Tableau de bord
              </a>
              <a
                href="/modules"
                className="text-sm font-medium hover:text-primary hover:scale-105 transition-all duration-200"
              >
                Modules
              </a>
              <a
                href="/tools"
                className="text-sm font-medium hover:text-primary hover:scale-105 transition-all duration-200"
              >
                Outils
              </a>
              <a
                href="/lessons"
                className="text-sm font-medium text-primary border-b-2 border-primary hover:scale-105 transition-all duration-200"
              >
                Leçons
              </a>
              <a
                href="/assessments"
                className="text-sm font-medium hover:text-primary hover:scale-105 transition-all duration-200"
              >
                Progression
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
            Leçons de Coaching
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Développez vos compétences avec nos leçons de coaching interactives
          </p>
        </div>

        {/* Search and Filters */}
        <div
          className={`mb-12 space-y-8 animate-slide-up ${styles.searchFiltersContainer}`}
        >
          <div className="max-w-xl mx-auto relative group">
            <Input
              type="search"
              placeholder="Recherchez des leçons par titre, description ou tags..."
              className="pl-10 py-2.5 text-base border-2 border-border/50 focus:border-primary/50 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
          </div>

          <div className="flex justify-center gap-3 flex-wrap">
            {categories.map((category) => (
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
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
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
        )}

        {/* Lessons Grid */}
        {!isLoading && !error && (
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in ${styles['delay-200ms']}`}
          >
            {filteredLessons.map((lesson, index) => {
              // Ensure we use all CSS classes by cycling through them
              const cardIndex = index % 5; // Use modulo to cycle through 0-4 indexes
              return (
                <Card
                  key={lesson.id}
                  className={`group hover:shadow-xl transition-all duration-500 border border-border/50 hover:border-primary/30 rounded-xl overflow-hidden backdrop-blur-sm animate-slide-up ${
                    styles[`lessonCard-${cardIndex}`] || ''
                  }`}
                >
                  <CardHeader className="pb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex justify-between items-center relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3.5 rounded-full shadow-sm group-hover:shadow-md group-hover:bg-primary/15 transition-all duration-300 group-hover:scale-110">
                          <div className="text-primary group-hover:text-primary/90 transition-colors duration-300 transform group-hover:rotate-6">
                            {typeof lesson.icon === 'string' &&
                              React.createElement(
                                Icons[lesson.icon as keyof typeof Icons]
                              )}
                          </div>
                        </div>
                        <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                          {lesson.title}
                        </CardTitle>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium shadow-sm group-hover:shadow group-hover:bg-primary/15 transition-all duration-300">
                          {lesson.category}
                        </span>
                        {lesson.difficulty && (
                          <span className="text-xs bg-muted/50 text-muted-foreground px-2 py-1 rounded-full">
                            {lesson.difficulty}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-muted-foreground mb-6 min-h-[3rem] group-hover:text-foreground/80 transition-colors duration-300">
                      {lesson.description}
                    </p>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full">
                          {lesson.module}• {lesson.duration}
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
                        onClick={() =>
                          (window.location.href = `/lesson-view?lessonId=${lesson.id}`)
                        }
                      >
                        {lesson.progress > 0 ? (
                          <>
                            <Icons.ArrowEnd className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                            Continuer la Leçon
                          </>
                        ) : (
                          <>
                            <Icons.Play className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                            Commencer la Leçon
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {!isLoading && !error && filteredLessons.length === 0 && (
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
