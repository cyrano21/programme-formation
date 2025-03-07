/**
 * LessonDurationExample Component
 *
 * This component demonstrates how to use the LessonDurationManager
 * in a lesson creation or editing context.
 */

'use client';

import React, { useState } from 'react';
import { Lesson } from '@/utils/modules-data';
import LessonDurationManager from './LessonDurationManager';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LessonDurationExample() {
  // Sample lesson data
  const [lesson, setLesson] = useState<Lesson>({
    id: 'example-lesson',
    title: 'Exemple de Leçon',
    description: 'Une leçon pour démontrer la gestion des durées',
    duration: '2h30',
    content: [
      {
        title: 'Introduction au Sujet',
        description:
          "Présentation générale du sujet et des objectifs d'apprentissage.",
      },
      {
        title: 'Concepts Fondamentaux',
        description:
          'Explication détaillée des concepts clés nécessaires à la compréhension du sujet.',
      },
      {
        title: 'Applications Pratiques',
        description:
          'Comment appliquer ces concepts dans des situations réelles et professionnelles.',
      },
    ],
    exercises: [
      {
        title: 'Exercice de Compréhension',
        description:
          'Questions pour vérifier la compréhension des concepts fondamentaux.',
      },
      {
        title: 'Mise en Pratique',
        description:
          'Application des concepts dans un scénario pratique guidé.',
      },
      {
        title: 'Projet Autonome',
        description:
          "Réalisation d'un mini-projet pour démontrer la maîtrise des compétences acquises.",
      },
    ],
  });

  // State for storing calculated durations
  const [calculatedDurations, setCalculatedDurations] = useState<{
    contentDurations: string[];
    exerciseDurations: string[];
    contentTotalDuration: string;
    exercisesTotalDuration: string;
  }>({
    contentDurations: [],
    exerciseDurations: [],
    contentTotalDuration: '',
    exercisesTotalDuration: '',
  });

  // State for manual mode
  const [useManualMode, setUseManualMode] = useState(false);
  const [manualSettings, setManualSettings] = useState({
    totalDuration: '2h30',
    contentSections: 3,
    exercisesCount: 3,
    lessonType: 'mixed' as 'theoretical' | 'practical' | 'workshop' | 'mixed',
  });

  // Handle duration calculation results
  const handleDurationsCalculated = (result: {
    contentDurations: string[];
    exerciseDurations: string[];
    contentTotalDuration: string;
    exercisesTotalDuration: string;
  }) => {
    setCalculatedDurations(result);
  };

  // Apply calculated durations to the lesson
  const applyDurationsToLesson = () => {
    // Create a copy of the lesson
    const updatedLesson = { ...lesson };

    // Update content sections with durations
    if (
      updatedLesson.content &&
      calculatedDurations.contentDurations.length > 0
    ) {
      updatedLesson.content = updatedLesson.content.map((section, index) => ({
        ...section,
        duration: calculatedDurations.contentDurations[index] || '',
      }));
    }

    // Update exercises with durations
    if (
      updatedLesson.exercises &&
      calculatedDurations.exerciseDurations.length > 0
    ) {
      updatedLesson.exercises = updatedLesson.exercises.map(
        (exercise, index) => ({
          ...exercise,
          duration: calculatedDurations.exerciseDurations[index] || '',
        })
      );
    }

    // Update the lesson state
    setLesson(updatedLesson);

    // In a real application, you would save this to your backend
    console.log('Lesson updated with durations:', updatedLesson);
  };

  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Exemple de Gestion des Durées de Leçon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{lesson.title}</h2>
            <p className="text-muted-foreground">{lesson.description}</p>
            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Durée totale: {lesson.duration}
            </div>
          </div>

          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              onClick={() => setUseManualMode(!useManualMode)}
              className="text-sm"
            >
              {useManualMode ? 'Utiliser la leçon existante' : 'Mode manuel'}
            </Button>
          </div>

          {useManualMode ? (
            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Durée Totale
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={manualSettings.totalDuration}
                  onChange={(e) =>
                    setManualSettings({
                      ...manualSettings,
                      totalDuration: e.target.value,
                    })
                  }
                  placeholder="ex: 2h30, 45m"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Sections de Contenu
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-md"
                    value={manualSettings.contentSections}
                    onChange={(e) =>
                      setManualSettings({
                        ...manualSettings,
                        contentSections: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                    aria-label="Nombre de sections de contenu"
                    id="content-sections-input"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Exercices
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-md"
                    value={manualSettings.exercisesCount}
                    onChange={(e) =>
                      setManualSettings({
                        ...manualSettings,
                        exercisesCount: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                    aria-label="Nombre d'exercices"
                    id="exercises-count-input"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Type de Leçon
                  </label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={manualSettings.lessonType}
                    onChange={(e) =>
                      setManualSettings({
                        ...manualSettings,
                        lessonType: e.target.value as
                          | 'theoretical'
                          | 'practical'
                          | 'workshop'
                          | 'mixed',
                      })
                    }
                    aria-label="Type de leçon"
                    id="lesson-type-select"
                  >
                    <option value="mixed">Mixte</option>
                    <option value="theoretical">Théorique</option>
                    <option value="practical">Pratique</option>
                    <option value="workshop">Atelier</option>
                  </select>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mb-8">
            <LessonDurationManager
              lesson={!useManualMode ? lesson : undefined}
              totalDuration={
                useManualMode ? manualSettings.totalDuration : undefined
              }
              contentSections={
                useManualMode ? manualSettings.contentSections : undefined
              }
              exercisesCount={
                useManualMode ? manualSettings.exercisesCount : undefined
              }
              lessonType={useManualMode ? manualSettings.lessonType : undefined}
              onDurationsCalculated={handleDurationsCalculated}
            />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={applyDurationsToLesson}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Appliquer les durées à la leçon
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview of the lesson with applied durations */}
      {calculatedDurations.contentDurations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Aperçu de la Leçon avec Durées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Contenu de la Leçon
                </h3>
                <ul className="space-y-2">
                  {lesson.content?.map((section, index) => (
                    <li
                      key={`section-${index}`}
                      className="p-3 bg-primary/5 rounded-md"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{section.title}</span>
                        <span className="text-sm bg-primary/10 px-2 py-0.5 rounded-full">
                          {calculatedDurations.contentDurations[index] || '?'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {section.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Exercices</h3>
                <ul className="space-y-2">
                  {lesson.exercises?.map((exercise, index) => (
                    <li
                      key={`exercise-${index}`}
                      className="p-3 bg-accent/5 rounded-md"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{exercise.title}</span>
                        <span className="text-sm bg-accent/10 px-2 py-0.5 rounded-full">
                          {calculatedDurations.exerciseDurations[index] || '?'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {exercise.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
