'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Icons } from '@/utils/icons';
import styles from './tools.module.css';

// Données de placeholder - seront remplacées par les données de Supabase
const toolsData = [
  {
    id: 1,
    title: 'Modèle GROW',
    category: 'Cadre',
    description:
      'Goal, Reality, Options, Way Forward - Une approche structurée pour définir des objectifs et résoudre des problèmes.',
    icon: <Icons.TrendingUp />,
    content: {
      steps: [
        { title: 'Objectif', description: 'Que voulez-vous atteindre ?' },
        {
          title: 'Réalité',
          description:
            "Où en êtes-vous maintenant ? Qu'est-ce qui fonctionne/ne fonctionne pas ?",
        },
        {
          title: 'Options',
          description:
            'Que pourriez-vous faire ? Quelles sont vos possibilités ?',
        },
        {
          title: "Plan d'action",
          description: 'Que ferez-vous ? Quand le ferez-vous ?',
        },
      ],
    },
  },
  {
    id: 2,
    title: "Exercice d'Évaluation des Valeurs",
    category: 'Exercice',
    description:
      'Aidez les clients à identifier et prioriser leurs valeurs fondamentales pour une meilleure prise de décision.',
    icon: <Icons.BookOpen />,
    content: {
      steps: [
        'Présenter la liste des valeurs communes',
        'Demander au client de sélectionner ses 10 valeurs principales',
        'Réduire à 5 valeurs principales par comparaison',
        'Explorer ce que chaque valeur signifie personnellement',
      ],
    },
  },
  {
    id: 3,
    title: 'Roue de la Vie',
    category: 'Modèle',
    description:
      'Outil visuel pour évaluer la satisfaction dans différents domaines de la vie.',
    icon: <Icons.Users />,
    content: {
      areas: [
        'Carrière',
        'Finances',
        'Santé',
        'Famille',
        'Relations',
        'Développement Personnel',
        'Loisirs',
        'Environnement Physique',
      ],
    },
  },
  {
    id: 4,
    title: 'Banque de Questions Puissantes',
    category: 'Ressource',
    description:
      'Collection de questions stimulantes pour différents scénarios de coaching.',
    icon: <Icons.MessageCircle />,
    content: {
      categories: [
        {
          name: "Définition d'Objectifs",
          questions: [
            'À quoi ressemblerait le succès ?',
            "Qu'est-ce qui vous freine ?",
          ],
        },
        {
          name: 'Exploration',
          questions: ["Quoi d'autre ?", "Qu'y a-t-il sous la surface ?"],
        },
        {
          name: 'Action',
          questions: [
            'Quelle est votre première étape ?',
            'Quand allez-vous commencer ?',
          ],
        },
      ],
    },
  },
  {
    id: 5,
    title: "Fiche d'Objectifs SMART",
    category: 'Modèle',
    description:
      'Modèle pour créer des objectifs Spécifiques, Mesurables, Atteignables, Pertinents et Temporellement définis.',
    icon: <Icons.FileText />,
    content: {
      sections: [
        {
          title: 'Spécifique',
          prompt: 'Que voulez-vous accomplir exactement ?',
        },
        {
          title: 'Mesurable',
          prompt: "Comment saurez-vous que vous l'avez atteint ?",
        },
        {
          title: 'Atteignable',
          prompt: 'Est-ce réaliste avec vos ressources actuelles ?',
        },
        {
          title: 'Pertinent',
          prompt: 'Pourquoi cet objectif est-il important pour vous ?',
        },
        {
          title: 'Temporellement défini',
          prompt: 'Quand voulez-vous atteindre cet objectif ?',
        },
      ],
    },
  },
];

export default function Tools() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTools = toolsData.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === 'tous' ||
      tool.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

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
                Dashboard
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
                Tools
              </a>
              <a
                href="/lessons"
                className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105 px-3 py-1.5 rounded-full"
              >
                Lessons
              </a>
              <a
                href="/assessments"
                className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105 px-3 py-1.5 rounded-full"
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
        <div className="mb-8 text-center animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-gradient-x">
            Coaching Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Unlock your potential with our curated collection of professional
            coaching tools
          </p>
        </div>

        {/* Search and Filters */}
        <div
          className={`mb-8 space-y-6 animate-slide-up ${styles.searchFiltersContainer}`}
        >
          <div className="max-w-xl mx-auto relative group">
            <Input
              type="search"
              placeholder="Search tools by name or description..."
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
                  {category === 'all' ? 'Tous' : category}
                </Button>
              )
            )}
          </div>
        </div>

        {/* Tools Grid */}
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in ${styles.toolsGrid}`}
        >
          {filteredTools.map((tool, index) => (
            <Card
              key={tool.id}
              className={`group hover:shadow-xl transition-all duration-500 border border-border/50 hover:border-primary/30 rounded-xl overflow-hidden backdrop-blur-sm animate-slide-up ${styles.toolCard} ${styles[`toolCard${index}`] || ''}`}
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
                >
                  <Icons.Eye className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="bg-card/30 backdrop-blur-sm p-8 rounded-xl shadow-sm max-w-md mx-auto border border-border/50">
              <Icons.AlertCircle
                className="mx-auto mb-4 text-muted-foreground animate-pulse"
                size={48}
              />
              <p className="text-xl text-muted-foreground font-light">
                No tools found matching your search
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
                Reset filters
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
