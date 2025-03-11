'use client';
import React, { useState } from 'react';
import ToolDetail from '@/components/tools/ToolDetail';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Icons } from '@/utils/icons';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import styles from './tools.module.css';

// Define types for our tool data
type ToolStep =
  | {
      title: string;
      description: string;
    }
  | string;

type ToolCategory = {
  name: string;
  questions: string[];
};

type ToolSection = {
  title: string;
  prompt: string;
};

type ToolContent = {
  steps?: ToolStep[];
  areas?: string[];
  categories?: ToolCategory[];
  sections?: ToolSection[];
};

type Tool = {
  id: number | string;
  title: string;
  category: string;
  description: string;
  icon: JSX.Element;
  content: ToolContent;
  tags?: string[];
  relatedLessons?: string[];
  difficulty?: 'débutant' | 'intermédiaire' | 'avancé';
};

// Importer le hook useTools pour utiliser les données réelles
import { useTools } from '@/features/tools/hooks/useTools';

export default function Tools() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Utiliser le hook useTools pour récupérer les données réelles
  const {
    filteredTools,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    isLoading,
    error,
  } = useTools();

  const handleViewDetails = (tool: Tool) => {
    setSelectedTool(tool);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 animate-gradient-x">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 shadow-md border-b backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent flex items-center animate-pulse-subtle">
              <Icons.Tool className="mr-2 text-primary" size={24} />
              <span className="font-heading">CoachVerse</span>
            </span>
            <nav className="hidden md:flex gap-2 ml-8">
              <a
                href="/dashboard"
                className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105 px-3 py-1.5 rounded-full"
              >
                Tableau de bord
              </a>
              <a
                href="/modules"
                className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105 px-3 py-1.5 rounded-full"
              >
                Modules
              </a>
              <a
                href="/tools"
                className="text-sm font-medium text-primary border-b-2 border-primary hover:scale-105 transition-all duration-300 px-3 py-1.5 rounded-full bg-primary/5"
              >
                Outils
              </a>
              <a
                href="/lessons"
                className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105 px-3 py-1.5 rounded-full"
              >
                Leçons
              </a>
              <a
                href="/assessments"
                className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105 px-3 py-1.5 rounded-full"
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
        <div className="mb-8 text-center animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-gradient-x">
            Outils de Coaching
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Libérez votre potentiel avec notre collection d&apos;outils de
            coaching professionnels
          </p>
        </div>

        {/* Search and Filters */}
        <div
          className={`mb-8 space-y-6 animate-slide-up ${styles.searchFiltersContainer}`}
        >
          <div className="max-w-xl mx-auto relative group">
            <Input
              type="search"
              placeholder="Rechercher des outils par nom ou description..."
              className="pl-10 py-2.5 text-base border-2 border-border/50 focus:border-primary/50 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
          </div>

          <div className="flex justify-center gap-3 flex-wrap">
            {['all', 'framework', 'template', 'exercise', 'resource'].map(
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
                  {category === 'all'
                    ? 'Tous'
                    : category === 'framework'
                    ? 'Cadre'
                    : category === 'template'
                    ? 'Modèle'
                    : category === 'exercise'
                    ? 'Exercice'
                    : category === 'resource'
                    ? 'Ressource'
                    : category}
                </Button>
              )
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16 animate-fade-in">
            <div className="bg-card/30 backdrop-blur-sm p-8 rounded-xl shadow-sm max-w-md mx-auto border border-border/50">
              <Icons.Loader
                className="mx-auto mb-4 text-primary animate-spin"
                size={48}
              />
              <p className="text-xl text-muted-foreground font-light">
                Chargement des outils...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16 animate-fade-in">
            <div className="bg-card/30 backdrop-blur-sm p-8 rounded-xl shadow-sm max-w-md mx-auto border border-border/50">
              <Icons.AlertTriangle
                className="mx-auto mb-4 text-destructive"
                size={48}
              />
              <p className="text-xl text-muted-foreground font-light">
                {error}
              </p>
              <Button
                variant="outline"
                className="mt-6 hover:bg-primary/10 transition-all duration-300"
                onClick={() => window.location.reload()}
              >
                <Icons.RefreshCw className="mr-2 h-4 w-4" />
                Réessayer
              </Button>
            </div>
          </div>
        )}

        {/* Tools Grid */}
        {!isLoading && !error && (
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in ${styles.toolsGrid}`}
          >
            {filteredTools.map((tool, index) => (
              <Card
                key={tool.id}
                className={`group hover:shadow-xl transition-all duration-500 border border-border/50 hover:border-primary/30 rounded-xl overflow-hidden backdrop-blur-sm animate-slide-up ${
                  styles.toolCard
                } ${styles[`toolCard${index}`] || ''}`}
              >
                <CardHeader className="pb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3.5 rounded-full shadow-sm group-hover:shadow-md group-hover:bg-primary/15 transition-all duration-300 group-hover:scale-110">
                        <div className="text-primary group-hover:text-primary/90 transition-colors duration-300 transform group-hover:rotate-6">
                          {tool.icon}
                        </div>
                      </div>
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                        {tool.title}
                      </CardTitle>
                    </div>
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium shadow-sm group-hover:shadow group-hover:bg-primary/15 transition-all duration-300">
                      {tool.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-6 min-h-[3rem] group-hover:text-foreground/80 transition-colors duration-300">
                    {tool.description}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-500 hover:scale-105 hover:shadow-lg rounded-lg border-primary/20 hover:border-primary/50"
                    onClick={() => handleViewDetails(tool)}
                  >
                    <Icons.Eye className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                    Voir les détails
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Tool Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedTool && (
              <>
                <DialogHeader>
                  <DialogTitle className="sr-only">
                    {selectedTool.title}
                  </DialogTitle>
                </DialogHeader>
                <ToolDetail
                  tool={selectedTool}
                  onClose={() => setIsDialogOpen(false)}
                />
              </>
            )}
          </DialogContent>
        </Dialog>

        {!isLoading && !error && filteredTools.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="bg-card/30 backdrop-blur-sm p-8 rounded-xl shadow-sm max-w-md mx-auto border border-border/50">
              <Icons.AlertCircle
                className="mx-auto mb-4 text-muted-foreground animate-pulse"
                size={48}
              />
              <p className="text-xl text-muted-foreground font-light">
                Aucun outil trouvé correspondant à votre recherche
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
