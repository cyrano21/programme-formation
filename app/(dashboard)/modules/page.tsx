'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { programData } from '@/utils/modules-data';
import { Icons } from '@/utils/icons';

import styles from './modules.module.css';

export default function Modules() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background/95 via-background to-background/90 animate-fade-in">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-background/80 shadow-md border-b backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent flex items-center">
              <Icons.Book
                className="mr-2 text-primary animate-pulse-subtle"
                size={28}
              />
              <span className="font-heading">CoachVerse</span>
            </span>
            <nav className="hidden md:flex gap-2 ml-8">
              <Button
                onClick={() => router.push('/dashboard')}
                variant="ghost"
                className="rounded-full px-4 py-2 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105"
              >
                Dashboard
              </Button>
              <Button
                onClick={() => router.push('/modules')}
                variant="ghost"
                className="rounded-full px-4 py-2 text-sm font-medium bg-primary/10 text-primary border border-primary/20 shadow-sm hover:scale-105 transition-all duration-300"
              >
                Modules
              </Button>
              <Button
                onClick={() => router.push('/tools')}
                variant="ghost"
                className="rounded-full px-4 py-2 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105"
              >
                Outils
              </Button>
              <Button
                onClick={() => router.push('/assessments')}
                variant="ghost"
                className="rounded-full px-4 py-2 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105"
              >
                Progression
              </Button>
            </nav>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:bg-primary/10 transition-all duration-300 rounded-full"
            >
              <Icons.Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-12">
        <div className="mb-10 md:mb-16 text-center animate-slide-in">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-accent animate-gradient-x">
            Programme Holistique de Transformation
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4 font-light leading-relaxed text-balance animate-fade-in" style={{animationDelay: '200ms'}}>
            Un parcours immersif de 12 mois conçu pour catalyser votre évolution
            personnelle et professionnelle à travers une approche intégrative et
            transformationnelle
          </p>
        </div>

        {/* Program Overview */}
        <div className="space-y-20">
          {programData.map((phase, phaseIndex) => (
            <div
              key={phase.id}
              className={`space-y-10 animate-fade-in ${
                styles[`delay-phase-${phaseIndex}`]
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 animate-slide-up" style={{animationDelay: `${phaseIndex * 100}ms`}}>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3 md:mb-4 text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    {phase.title}
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground max-w-3xl text-pretty">
                    {phase.description}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="shadow-md mt-2 md:mt-0 px-4 py-1.5 text-sm font-medium backdrop-blur-sm bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300"
                >
                  {phase.duration}
                </Badge>
              </div>

              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {phase.modules.map((module, moduleIndex) => (
                  <Card
                    key={module.id}
                    className={`${
                      styles.moduleCard
                    } card-hover-effect relative overflow-hidden hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/30 group ${
                      styles[`delay-phase-module-${phaseIndex}-${moduleIndex}`]
                    } animate-slide-up backdrop-blur-sm`}
                    style={{animationDelay: `${(phaseIndex * 200) + (moduleIndex * 100)}ms`}}
                  >
                    {/* Progress indicator */}
                    <div className={styles.progressBar}>
                      <div
                        className={`${styles.progressBarFill} ${
                          styles[
                            `progress${
                              Math.round(
                                (module.progress || Math.random() * 100) / 10
                              ) * 10
                            }`
                          ]
                        }`}
                      />
                    </div>

                    <CardHeader className={styles.cardHeader}>
                      <div className={styles.headerOverlay}></div>
                      <div className="relative z-20">
                        <CardTitle className="text-xl md:text-2xl font-heading text-primary text-center mb-3 group-hover:text-accent transition-colors duration-300">
                          {module.title}
                        </CardTitle>
                        <CardDescription className="text-center text-base group-hover:text-foreground/90 transition-colors duration-300">
                          {module.description}
                        </CardDescription>
                        <div className="flex justify-center mt-3">
                          <Badge
                            variant="outline"
                            className="group-hover:bg-primary/10 transition-colors px-3 py-1 shadow-sm group-hover:shadow-md"
                          >
                            {module.duration}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-8 p-6 bg-card/95 backdrop-blur-sm">
                      {/* Themes */}
                      <div className="space-y-5 border-b pb-5 border-border/30">
                        <h4 className="font-heading font-semibold text-primary text-center relative inline-flex items-center justify-center w-full">
                          <span className="relative z-10 px-5 py-1.5 rounded-full bg-primary/10 group-hover:bg-primary/15 transition-all duration-300">
                            Thèmes Explorés
                          </span>
                          <span className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></span>
                        </h4>
                        <div className="space-y-3">
                          {module.themes.map((theme, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-4 p-3.5 rounded-lg hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20 hover:shadow-sm group/theme"
                            >
                              <span className="text-2xl group-hover/theme:scale-110 transition-transform duration-300 text-primary/80 group-hover/theme:text-primary">
                                {theme.icon}
                              </span>
                              <div>
                                <h5 className="font-medium font-heading text-primary group-hover/theme:text-primary/90 transition-colors">
                                  {theme.title}
                                </h5>
                                <p className="text-sm text-muted-foreground group-hover/theme:text-foreground/80 transition-colors text-pretty">
                                  {theme.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Competencies */}
                      <div className="space-y-5">
                        <h4 className="font-heading font-semibold text-accent text-center relative inline-flex items-center justify-center w-full">
                          <span className="relative z-10 px-5 py-1.5 rounded-full bg-accent/10 group-hover:bg-accent/15 transition-all duration-300">
                            Compétences Développées
                          </span>
                          <span className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent"></span>
                        </h4>
                        <div className="flex flex-wrap gap-2.5 justify-center">
                          {module.competencies.map((competency, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-sm hover:bg-accent/20 transition-all duration-300 py-2 px-3.5 hover:shadow-sm hover:scale-105 cursor-pointer backdrop-blur-sm"
                            >
                              <span className="mr-2 text-xl inline-block transform group-hover:rotate-12 transition-transform">
                                {competency.icon}
                              </span>
                              {competency.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        variant="default"
                        className={`w-full mt-6 bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] text-white font-medium py-3 rounded-lg ${styles['button-modern']}`}
                        onClick={() =>
                          router.push(`/module-detail?id=${module.id}`)
                        }
                      >
                        <Icons.BookOpen className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                        Commencer le Module
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
