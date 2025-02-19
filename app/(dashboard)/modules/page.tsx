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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-primary flex items-center">
              <Icons.Book className="mr-2 text-primary" size={24} />
              CoachVerse
            </span>
            <nav className="hidden md:flex gap-6 ml-8">
              <Button
                onClick={() => router.push('/dashboard')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Dashboard
              </Button>
              <Button
                onClick={() => router.push('/modules')}
                className="text-sm font-medium text-primary border-b-2 border-primary"
              >
                Modules
              </Button>
              <Button
                onClick={() => router.push('/tools')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Tools
              </Button>
              <Button
                onClick={() => router.push('/assessments')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Progress
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 md:py-8">
        <div className="mb-8 md:mb-16 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-purple-600">
            Programme Holistique de Transformation
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            Un parcours de 12 mois pour votre transformation personnelle et
            professionnelle
          </p>
        </div>

        {/* Program Overview */}
        <div className="space-y-16">
          {programData.map((phase) => (
            <div key={phase.id} className="space-y-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-emerald-600">
                    {phase.title}
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {phase.description}
                  </p>
                </div>
                <Badge variant="secondary" className="shadow-sm mt-2 md:mt-0">
                  {phase.duration}
                </Badge>
              </div>

              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {phase.modules.map((module) => (
                  <Card
                    key={module.id}
                    className={`${styles.moduleCard} relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-emerald-600/30 group`}
                  >
                    {/* Progress indicator */}
                    <div className={styles.progressBar}>
                      <div
                        className={`${styles.progressBarFill} progress-bar-fill`}
                        aria-hidden="true"
                        style={
                          {
                            '--progress-width': `${
                              module.progress || Math.random() * 100
                            }%`,
                          } as React.CSSProperties
                        }
                      />
                    </div>

                    <CardHeader className={styles.cardHeader}>
                      <div className={styles.headerOverlay}></div>
                      <div className="relative z-20">
                        <CardTitle className="text-primary text-center mb-2">
                          {module.title}
                        </CardTitle>
                        <CardDescription className="text-center">
                          {module.description}
                        </CardDescription>
                        <div className="flex justify-center mt-2">
                          <Badge
                            variant="outline"
                            className="group-hover:bg-emerald-100 transition-colors"
                          >
                            {module.duration}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6 p-6 bg-white">
                      {/* Themes */}
                      <div className="space-y-4 border-b pb-4 border-slate-100">
                        <h4 className="font-semibold text-emerald-600 text-center">
                          Thèmes
                        </h4>
                        <div className="space-y-3">
                          {module.themes.map((theme, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-2 rounded-lg hover:bg-emerald-50 transition-colors"
                            >
                              <span className="text-2xl">{theme.icon}</span>
                              <div>
                                <h5 className="font-medium text-emerald-600">
                                  {theme.title}
                                </h5>
                                <p className="text-sm text-muted-foreground">
                                  {theme.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Competencies */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-purple-600 text-center">
                          Compétences
                        </h4>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {module.competencies.map((competency, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-sm hover:bg-purple-100 transition-colors"
                            >
                              <span className="mr-1 text-xl">
                                {competency.icon}
                              </span>
                              {competency.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        variant="coachverse"
                        className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 transition-colors"
                        onClick={() =>
                          router.push(`/module-detail?id=${module.id}`)
                        }
                      >
                        Commencer le module
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
