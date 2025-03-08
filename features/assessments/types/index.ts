export type AssessmentOption = {
  value: string;
  label: string;
};

export type AssessmentQuestion = {
  id: number;
  text: string;
  options: AssessmentOption[];
};

export type Assessment = {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon: JSX.Element;
  questions: AssessmentQuestion[];
};

export type SkillData = {
  skill: string;
  score: number;
  fullMark: number;
};

export type ProgressData = {
  month: string;
  score: number;
};

export type AssessmentSubmission = {
  assessment_id: number;
  answers: Record<number, string>;
  submitted_at: string;
};