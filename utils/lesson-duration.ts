/**
 * Utility functions for calculating and managing lesson durations
 */

import { Lesson } from './modules-data';

/**
 * Configuration for duration allocation
 * These percentages determine how much of the total lesson time should be allocated to content vs exercises
 */
interface DurationConfig {
  contentPercentage: number;  // Percentage of time for theoretical content
  exercisesPercentage: number; // Percentage of time for exercises
}

// Default configuration allocates 60% to content and 40% to exercises
const DEFAULT_DURATION_CONFIG: DurationConfig = {
  contentPercentage: 60,
  exercisesPercentage: 40
};

/**
 * Parses a duration string (like "2h30") into minutes
 * @param durationStr Duration string in format like "2h30", "45m", "1h", etc.
 * @returns Total minutes
 */
export function parseDuration(durationStr: string): number {
  // Handle empty or invalid input
  if (!durationStr) return 0;
  
  let totalMinutes = 0;
  
  // Extract hours
  const hoursMatch = durationStr.match(/(\d+)h/);
  if (hoursMatch && hoursMatch[1]) {
    totalMinutes += parseInt(hoursMatch[1], 10) * 60;
  }
  
  // Extract minutes
  const minutesMatch = durationStr.match(/(\d+)m/) || durationStr.match(/h(\d+)/);
  if (minutesMatch && minutesMatch[1]) {
    totalMinutes += parseInt(minutesMatch[1], 10);
  }
  
  return totalMinutes;
}

/**
 * Formats minutes into a human-readable duration string
 * @param minutes Number of minutes
 * @returns Formatted string like "2h30" or "45m"
 */
export function formatDuration(minutes: number): string {
  if (minutes <= 0) return "0m";
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) return `${remainingMinutes}m`;
  if (remainingMinutes === 0) return `${hours}h`;
  
  return `${hours}h${remainingMinutes}`;
}

/**
 * Calculates appropriate durations for lesson content and exercises
 * @param lesson The lesson object containing content and exercises
 * @param config Optional configuration for duration allocation
 * @returns Object with calculated durations for content and exercises
 */
export function calculateContentAndExerciseDurations(
  lesson: Lesson,
  config: DurationConfig = DEFAULT_DURATION_CONFIG
): { contentDurations: string[], exerciseDurations: string[] } {
  // Parse the total lesson duration
  const totalMinutes = parseDuration(lesson.duration);
  
  // Calculate total minutes for content and exercises based on percentages
  const contentTotalMinutes = Math.round(totalMinutes * (config.contentPercentage / 100));
  const exercisesTotalMinutes = Math.round(totalMinutes * (config.exercisesPercentage / 100));
  
  // Initialize result arrays
  const contentDurations: string[] = [];
  const exerciseDurations: string[] = [];
  
  // If there's no content or exercises, return empty arrays
  if (!lesson.content?.length && !lesson.exercises?.length) {
    return { contentDurations, exerciseDurations };
  }
  
  // Calculate durations for content sections
  if (lesson.content && lesson.content.length > 0) {
    // Allocate time based on complexity (using description length as a proxy for complexity)
    const totalComplexity = lesson.content.reduce(
      (sum, section) => sum + section.description.length, 0
    );
    
    // Calculate minutes for each content section
    lesson.content.forEach(section => {
      const complexity = section.description.length / totalComplexity;
      const sectionMinutes = Math.round(contentTotalMinutes * complexity);
      contentDurations.push(formatDuration(sectionMinutes));
    });
  }
  
  // Calculate durations for exercises
  if (lesson.exercises && lesson.exercises.length > 0) {
    // For exercises, we'll distribute time more evenly, but still consider complexity
    const totalComplexity = lesson.exercises.reduce(
      (sum, exercise) => sum + exercise.description.length, 0
    );
    
    // Calculate minutes for each exercise
    lesson.exercises.forEach(exercise => {
      const complexity = exercise.description.length / totalComplexity;
      const exerciseMinutes = Math.round(exercisesTotalMinutes * complexity);
      exerciseDurations.push(formatDuration(exerciseMinutes));
    });
  }
  
  return { contentDurations, exerciseDurations };
}

/**
 * Adjusts durations for a specific lesson type or topic
 * @param lesson The lesson object
 * @param lessonType The type of lesson (e.g., "theoretical", "practical", "workshop")
 * @returns Updated duration configuration
 */
export function getDurationConfigForLessonType(lessonType: string): DurationConfig {
  switch (lessonType.toLowerCase()) {
    case 'theoretical':
      return { contentPercentage: 80, exercisesPercentage: 20 };
    case 'practical':
      return { contentPercentage: 30, exercisesPercentage: 70 };
    case 'workshop':
      return { contentPercentage: 20, exercisesPercentage: 80 };
    case 'mixed':
    default:
      return DEFAULT_DURATION_CONFIG;
  }
}

/**
 * Suggests a balanced duration distribution for a lesson based on its total duration
 * @param totalDuration Total lesson duration string (e.g., "2h30")
 * @param contentSections Number of content sections
 * @param exercises Number of exercises
 * @param lessonType Optional lesson type for specialized allocation
 * @returns Object with suggested durations
 */
export function suggestLessonDurations(
  totalDuration: string,
  contentSections: number,
  exercises: number,
  lessonType: string = 'mixed'
): {
  totalMinutes: number,
  contentTotalDuration: string,
  exercisesTotalDuration: string,
  contentSectionDurations: string[],
  exerciseDurations: string[]
} {
  // Get appropriate configuration based on lesson type
  const config = getDurationConfigForLessonType(lessonType);
  
  // Parse total duration
  const totalMinutes = parseDuration(totalDuration);
  
  // Calculate minutes for content and exercises
  const contentTotalMinutes = Math.round(totalMinutes * (config.contentPercentage / 100));
  const exercisesTotalMinutes = Math.round(totalMinutes * (config.exercisesPercentage / 100));
  
  // Initialize result arrays
  const contentSectionDurations: string[] = [];
  const exerciseDurations: string[] = [];
  
  // Distribute content time
  if (contentSections > 0) {
    const baseContentMinutes = Math.floor(contentTotalMinutes / contentSections);
    let remainingContentMinutes = contentTotalMinutes - (baseContentMinutes * contentSections);
    
    for (let i = 0; i < contentSections; i++) {
      let sectionMinutes = baseContentMinutes;
      
      // Distribute remaining minutes to earlier sections (typically more important)
      if (remainingContentMinutes > 0) {
        const extra = Math.min(5, remainingContentMinutes);
        sectionMinutes += extra;
        remainingContentMinutes -= extra;
      }
      
      contentSectionDurations.push(formatDuration(sectionMinutes));
    }
  }
  
  // Distribute exercise time
  if (exercises > 0) {
    const baseExerciseMinutes = Math.floor(exercisesTotalMinutes / exercises);
    let remainingExerciseMinutes = exercisesTotalMinutes - (baseExerciseMinutes * exercises);
    
    for (let i = 0; i < exercises; i++) {
      let exerciseMinutes = baseExerciseMinutes;
      
      // For exercises, allocate more time to later exercises (typically more complex)
      if (remainingExerciseMinutes > 0 && i >= Math.floor(exercises / 2)) {
        const extra = Math.min(10, remainingExerciseMinutes);
        exerciseMinutes += extra;
        remainingExerciseMinutes -= extra;
      }
      
      exerciseDurations.push(formatDuration(exerciseMinutes));
    }
  }
  
  return {
    totalMinutes,
    contentTotalDuration: formatDuration(contentTotalMinutes),
    exercisesTotalDuration: formatDuration(exercisesTotalMinutes),
    contentSectionDurations,
    exerciseDurations
  };
}