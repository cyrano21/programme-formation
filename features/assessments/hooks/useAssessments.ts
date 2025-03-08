import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/hooks/useSupabase';
import { SupabaseClient } from '@supabase/supabase-js';

// Type the supabase client to fix TypeScript errors
const typedSupabase = supabase as SupabaseClient;

type AssessmentOption = {
  value: string;
  label: string;
};

type AssessmentQuestion = {
  id: number;
  text: string;
  options: AssessmentOption[];
};

type Assessment = {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon: JSX.Element;
  questions: AssessmentQuestion[];
};

type SkillData = {
  skill: string;
  score: number;
  fullMark: number;
};

type ProgressData = {
  month: string;
  score: number;
};

export function useAssessments() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [results, setResults] = useState<SkillData[]>([]);
  const [progress, setProgress] = useState<ProgressData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssessments = useCallback(async () => {
    try {
      const { data, error } = await typedSupabase
        .from('assessments')
        .select('*');

      if (error) throw error;

      setAssessments(data || []);
    } catch (err) {
      setError('Erreur lors du chargement des évaluations');
      console.error('Error fetching assessments:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchResults = useCallback(async () => {
    try {
      const { data, error } = await typedSupabase
        .from('assessment_results')
        .select('*');

      if (error) throw error;

      setResults(data || []);
    } catch (err) {
      console.error('Error fetching results:', err);
    }
  }, []);

  const fetchProgress = useCallback(async () => {
    try {
      const { data, error } = await typedSupabase
        .from('assessment_progress')
        .select('*');

      if (error) throw error;

      setProgress(data || []);
    } catch (err) {
      console.error('Error fetching progress:', err);
    }
  }, []);

  useEffect(() => {
    fetchAssessments();
    fetchResults();
    fetchProgress();
  }, [fetchAssessments, fetchResults, fetchProgress]);



  const submitAssessment = async (assessmentId: number, answers: Record<number, string>) => {
    try {
      const { error } = await typedSupabase
        .from('assessment_submissions')
        .insert({
          assessment_id: assessmentId,
          answers,
          submitted_at: new Date().toISOString(),
        });

      if (error) throw error;

      // Rafraîchir les résultats après la soumission
      await fetchResults();
      await fetchProgress();

      return { success: true };
    } catch (err) {
      console.error('Error submitting assessment:', err);
      return { success: false, error: 'Erreur lors de la soumission de l\'évaluation' };
    }
  };

  return {
    assessments,
    results,
    progress,
    loading,
    error,
    submitAssessment,
  };
}