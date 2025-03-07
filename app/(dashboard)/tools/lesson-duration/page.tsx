/**
 * Lesson Duration Management Tool Page
 *
 * This page demonstrates how to establish appropriate durations for lesson content
 * and exercises based on the total lesson duration.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/utils/icons';
import LessonDurationExample from '@/components/lessons/LessonDurationExample';

export default function LessonDurationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background/95 animate-gradient-x">
      {/* Header */}
      <header className="bg-white/95 shadow-md border-b backdrop-blur-xl transition-all duration-300 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">
            Gestion des Durées de Leçon
          </h1>
          <Link href="/tools">
            <Button
              variant="outline"
              className="hover:bg-primary/5 transition-all duration-300"
            >
              <Icons.ChevronStart className="mr-2" /> Retour aux outils
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-8 bg-white/90 shadow-md rounded-lg p-6 border border-primary/10">
          <h2 className="text-xl font-semibold mb-4">À propos de cet outil</h2>
          <p className="mb-4 text-muted-foreground">
            Cet outil vous permet d&apos;établir convenablement les durées des
            sections de contenu et des exercices d&apos;une leçon en fonction de
            sa durée totale. Il prend en compte le type de leçon (théorique,
            pratique, atelier) pour proposer une répartition équilibrée du
            temps.
          </p>
          <div className="bg-primary/5 p-4 rounded-md border border-primary/10">
            <h3 className="font-medium mb-2 text-primary">
              Comment utiliser cet outil :
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Définissez la durée totale de votre leçon (ex: 2h30, 45m)</li>
              <li>
                Sélectionnez le type de leçon pour ajuster la répartition entre
                contenu et exercices
              </li>
              <li>
                Spécifiez le nombre de sections de contenu et d&apos;exercices
              </li>
              <li>Visualisez la répartition du temps proposée</li>
              <li>Appliquez les durées à votre leçon</li>
            </ol>
          </div>
        </div>

        {/* Lesson Duration Example Component */}
        <LessonDurationExample />

        {/* Additional Information */}
        <div className="mt-12 bg-white/90 shadow-md rounded-lg p-6 border border-primary/10">
          <h2 className="text-xl font-semibold mb-4">
            Recommandations pour la gestion du temps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary/5 p-4 rounded-md border border-primary/10">
              <h3 className="font-medium mb-2 text-primary">Types de leçons</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="font-medium">Théorique (80/20)</span> - Axée
                  sur l&apos;acquisition de connaissances, avec peu
                  d&apos;exercices pratiques
                </li>
                <li>
                  <span className="font-medium">Mixte (60/40)</span> - Équilibre
                  entre théorie et pratique, format standard
                </li>
                <li>
                  <span className="font-medium">Pratique (30/70)</span> - Accent
                  mis sur les exercices d&apos;application après une courte
                  introduction théorique
                </li>
                <li>
                  <span className="font-medium">Atelier (20/80)</span> - Presque
                  entièrement consacré à la pratique et aux projets
                </li>
              </ul>
            </div>

            <div className="bg-primary/5 p-4 rounded-md border border-primary/10">
              <h3 className="font-medium mb-2 text-primary">
                Bonnes pratiques
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  Limitez les sections de contenu à 3-5 pour maintenir
                  l&apos;attention
                </li>
                <li>
                  Prévoyez des pauses de 5-10 minutes toutes les 45-60 minutes
                </li>
                <li>
                  Alternez entre théorie et pratique pour maintenir
                  l&apos;engagement
                </li>
                <li>
                  Réservez plus de temps aux concepts complexes et aux exercices
                  avancés
                </li>
                <li>
                  Gardez 5-10% du temps total comme tampon pour les questions et
                  discussions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
