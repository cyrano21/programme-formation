/**
 * LessonDurationManager Component
 *
 * This component helps visualize and manage the distribution of time
 * between lesson content sections and exercises based on the total lesson duration.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Lesson } from '@/utils/modules-data';
import {
  parseDuration,
  formatDuration,
  calculateContentAndExerciseDurations,
  getDurationConfigForLessonType,
  suggestLessonDurations,
} from '@/utils/lesson-duration';
import styles from './LessonDurationManager.module.css';

// Using Record type to avoid ESLint unused variable warnings
type DurationCalculationResult = {
  contentDurations: string[];
  exerciseDurations: string[];
  contentTotalDuration: string;
  exercisesTotalDuration: string;
};

interface LessonDurationManagerProps {
  lesson?: Lesson;
  totalDuration?: string;
  contentSections?: number;
  exercisesCount?: number;
  lessonType?: 'theoretical' | 'practical' | 'workshop' | 'mixed';
  onDurationsCalculated?: (result: DurationCalculationResult) => void;
}

export default function LessonDurationManager({
  lesson,
  totalDuration = '2h',
  contentSections = 3,
  exercisesCount = 2,
  lessonType = 'mixed',
  onDurationsCalculated,
}: LessonDurationManagerProps) {
  const [durations, setDurations] = useState<{
    contentDurations: string[];
    exerciseDurations: string[];
    contentTotalDuration: string;
    exercisesTotalDuration: string;
    totalMinutes: number;
  }>({
    contentDurations: [],
    exerciseDurations: [],
    contentTotalDuration: '',
    exercisesTotalDuration: '',
    totalMinutes: 0,
  });

  const [selectedLessonType, setSelectedLessonType] = useState<
    'theoretical' | 'practical' | 'workshop' | 'mixed'
  >(lessonType);
  const [duration, setDuration] = useState<string>(totalDuration);
  const [sections, setSections] = useState<number>(contentSections);
  const [exercises, setExercises] = useState<number>(exercisesCount);

  // Calculate durations when inputs change
  useEffect(() => {
    if (lesson) {
      // If a lesson is provided, calculate based on its content and exercises
      const { contentDurations, exerciseDurations } =
        calculateContentAndExerciseDurations(
          lesson,
          getDurationConfigForLessonType(selectedLessonType)
        );

      const totalMinutes = parseDuration(lesson.duration);
      const config = getDurationConfigForLessonType(selectedLessonType);
      const contentTotalMinutes = Math.round(
        totalMinutes * (config.contentPercentage / 100)
      );
      const exercisesTotalMinutes = Math.round(
        totalMinutes * (config.exercisesPercentage / 100)
      );

      setDurations({
        contentDurations,
        exerciseDurations,
        contentTotalDuration: formatDuration(contentTotalMinutes),
        exercisesTotalDuration: formatDuration(exercisesTotalMinutes),
        totalMinutes,
      });

      if (onDurationsCalculated) {
        onDurationsCalculated({
          contentDurations,
          exerciseDurations,
          contentTotalDuration: formatDuration(contentTotalMinutes),
          exercisesTotalDuration: formatDuration(exercisesTotalMinutes),
        });
      }
    } else {
      // Otherwise, suggest durations based on inputs
      const result = suggestLessonDurations(
        duration,
        sections,
        exercises,
        selectedLessonType
      );

      setDurations({
        contentDurations: result.contentSectionDurations,
        exerciseDurations: result.exerciseDurations,
        contentTotalDuration: result.contentTotalDuration,
        exercisesTotalDuration: result.exercisesTotalDuration,
        totalMinutes: result.totalMinutes,
      });

      if (onDurationsCalculated) {
        onDurationsCalculated({
          contentDurations: result.contentSectionDurations,
          exerciseDurations: result.exerciseDurations,
          contentTotalDuration: result.contentTotalDuration,
          exercisesTotalDuration: result.exercisesTotalDuration,
        });
      }
    }
  }, [
    lesson,
    duration,
    sections,
    exercises,
    selectedLessonType,
    onDurationsCalculated,
  ]);

  return (
    <div className="bg-white/95 shadow-md rounded-lg p-6 border border-primary/10">
      <h2 className="text-xl font-bold mb-4 text-primary">
        Gestion des Durées
      </h2>

      {!lesson && (
        <div className="space-y-4 mb-6">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              id="lesson-type-label"
            >
              Type de Leçon
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedLessonType}
              onChange={(e) =>
                setSelectedLessonType(
                  e.target.value as
                    | 'theoretical'
                    | 'practical'
                    | 'workshop'
                    | 'mixed'
                )
              }
              aria-labelledby="lesson-type-label"
            >
              <option value="mixed">Mixte (60% contenu, 40% exercices)</option>
              <option value="theoretical">
                Théorique (80% contenu, 20% exercices)
              </option>
              <option value="practical">
                Pratique (30% contenu, 70% exercices)
              </option>
              <option value="workshop">
                Atelier (20% contenu, 80% exercices)
              </option>
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              id="duration-label"
            >
              Durée Totale
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="ex: 2h30, 45m"
              aria-labelledby="duration-label"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Format: 2h30, 45m, 1h, etc.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label
                className="block text-sm font-medium mb-1"
                id="content-sections-label"
              >
                Sections de Contenu
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={sections}
                onChange={(e) => setSections(parseInt(e.target.value) || 0)}
                min="0"
                aria-labelledby="content-sections-label"
              />
            </div>

            <div className="flex-1">
              <label
                className="block text-sm font-medium mb-1"
                id="exercises-label"
              >
                Exercices
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={exercises}
                onChange={(e) => setExercises(parseInt(e.target.value) || 0)}
                min="0"
                aria-labelledby="exercises-label"
              />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Répartition du Temps</h3>
          <div className={styles.progressBar}>
            <div
              className={`${styles.contentBar} ${styles.contentBarWidth}`}
              data-width={`${
                durations.totalMinutes
                  ? (parseDuration(durations.contentTotalDuration) /
                      durations.totalMinutes) *
                    100
                  : 0
              }%`}
              aria-label={`Contenu: ${durations.contentTotalDuration}`}
            >
              {durations.contentTotalDuration}
            </div>
            <div
              className={`${styles.exerciseBar} ${styles.exerciseBarWidth}`}
              data-width={`${
                durations.totalMinutes
                  ? (parseDuration(durations.exercisesTotalDuration) /
                      durations.totalMinutes) *
                    100
                  : 0
              }%`}
              aria-label={`Exercices: ${durations.exercisesTotalDuration}`}
            >
              {durations.exercisesTotalDuration}
            </div>
          </div>
          <div className="flex text-xs">
            <div className="flex-1">
              Contenu: {durations.contentTotalDuration}
            </div>
            <div className="flex-1 text-right">
              Exercices: {durations.exercisesTotalDuration}
            </div>
          </div>
        </div>

        {durations.contentDurations.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Durées des Sections de Contenu</h3>
            <ul className="space-y-2">
              {durations.contentDurations.map((duration, index) => (
                <li
                  key={`content-${index}`}
                  className="flex justify-between items-center p-2 bg-primary/5 rounded-md"
                >
                  <span>Section {index + 1}</span>
                  <span className="font-medium">{duration}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {durations.exerciseDurations.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Durées des Exercices</h3>
            <ul className="space-y-2">
              {durations.exerciseDurations.map((duration, index) => (
                <li
                  key={`exercise-${index}`}
                  className="flex justify-between items-center p-2 bg-accent/5 rounded-md"
                >
                  <span>Exercice {index + 1}</span>
                  <span className="font-medium">{duration}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
