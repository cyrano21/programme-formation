'use client';
/* eslint-disable */
/* @typescript-eslint-disable */
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Icons } from '@/utils/icons';
import { useAssessments } from '@/features/assessments/hooks/useAssessments';
import {
  Assessment,
  SkillData,
  ProgressData,
} from '@/features/assessments/types';

// Fallback Chart Component
const FallbackChart = () => (
  <div className="w-full h-[300px] flex items-center justify-center bg-slate-50 rounded-lg">
    <div className="text-center">
      <Icons.AlertCircle
        className="mx-auto mb-4 text-muted-foreground"
        size={48}
      />
      <p className="text-muted-foreground">Graphique non disponible</p>
    </div>
  </div>
);

// Conditional import of recharts
let BarChart: any = FallbackChart;
let RadarChart: any = FallbackChart;
let ResponsiveContainer: any = React.Fragment;
let XAxis: any = 'div';
let YAxis: any = 'div';
let CartesianGrid: any = 'div';
let Tooltip: any = 'div';
let Bar: any = 'div';
let PolarGrid: any = 'div';
let PolarAngleAxis: any = 'div';
let PolarRadiusAxis: any = 'div';
let Radar: any = 'div';

try {
  const Recharts = require('recharts');
  BarChart = Recharts.BarChart;
  RadarChart = Recharts.RadarChart;
  ResponsiveContainer = Recharts.ResponsiveContainer;
  XAxis = Recharts.XAxis;
  YAxis = Recharts.YAxis;
  CartesianGrid = Recharts.CartesianGrid;
  Tooltip = Recharts.Tooltip;
  Bar = Recharts.Bar;
  PolarGrid = Recharts.PolarGrid;
  PolarAngleAxis = Recharts.PolarAngleAxis;
  PolarRadiusAxis = Recharts.PolarRadiusAxis;
  Radar = Recharts.Radar;
} catch (error) {
  console.warn('Recharts library not available, using fallback charts');
}

// Données d'évaluation par défaut (utilisées uniquement si les données dynamiques ne sont pas disponibles)
const defaultAssessmentsData = [
  {
    id: 1,
    title: 'Compétences Fondamentales de Coaching',
    description:
      'Évaluez votre maîtrise des compétences et aptitudes essentielles de coaching.',
    duration: '15-20 minutes',
    icon: <Icons.TrendingUp />,
    questions: [
      {
        id: 1,
        text: 'À quel point établissez-vous et maintenez-vous efficacement des accords de coaching ?',
        options: [
          { value: '1', label: 'Novice - Compréhension basique' },
          { value: '2', label: 'Débutant avancé - Compétence croissante' },
          { value: '3', label: 'Compétent - Application constante' },
          { value: '4', label: 'Avancé - Compréhension approfondie' },
          { value: '5', label: 'Expert - Niveau de maîtrise' },
        ],
      },
      {
        id: 2,
        text: "Comment évaluez-vous vos compétences d'écoute active ?",
        options: [
          { value: '1', label: 'Novice - Compréhension basique' },
          { value: '2', label: 'Débutant avancé - Compétence croissante' },
          { value: '3', label: 'Compétent - Application constante' },
          { value: '4', label: 'Avancé - Compréhension approfondie' },
          { value: '5', label: 'Expert - Niveau de maîtrise' },
        ],
      },
      {
        id: 3,
        text: 'À quel point posez-vous efficacement des questions puissantes ?',
        options: [
          { value: '1', label: 'Novice - Compréhension basique' },
          { value: '2', label: 'Débutant avancé - Compétence croissante' },
          { value: '3', label: 'Compétent - Application constante' },
          { value: '4', label: 'Avancé - Compréhension approfondie' },
          { value: '5', label: 'Expert - Niveau de maîtrise' },
        ],
      },
      {
        id: 4,
        text: 'Comment facilitez-vous la croissance et la responsabilisation du client ?',
        options: [
          { value: '1', label: 'Novice - Compréhension basique' },
          { value: '2', label: 'Débutant avancé - Compétence croissante' },
          { value: '3', label: 'Compétent - Application constante' },
          { value: '4', label: 'Avancé - Compréhension approfondie' },
          { value: '5', label: 'Expert - Niveau de maîtrise' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Évaluation de l'Intelligence Émotionnelle",
    description:
      "Évaluez vos capacités d'intelligence émotionnelle dans les contextes de coaching.",
    duration: '10-15 minutes',
    icon: <Icons.Users />,
    questions: [
      {
        id: 1,
        text: 'À quel point reconnaissez-vous et comprenez-vous vos propres émotions ?',
        options: [
          { value: '1', label: 'En développement' },
          { value: '2', label: 'Émergent' },
          { value: '3', label: 'Établi' },
          { value: '4', label: 'Avancé' },
          { value: '5', label: 'Expert' },
        ],
      },
      // Ajouter plus de questions...
    ],
  },
];

// Données de résultats par défaut
const defaultResultsData = [
  { skill: "Établissement d'Accords", score: 4, fullMark: 5 },
  { skill: 'Écoute Active', score: 3, fullMark: 5 },
  { skill: 'Questions Puissantes', score: 5, fullMark: 5 },
  { skill: 'Communication Directe', score: 4, fullMark: 5 },
  { skill: 'Création de Conscience', score: 3, fullMark: 5 },
  { skill: "Planification & Définition d'Objectifs", score: 4, fullMark: 5 },
];

const defaultProgressData = [
  { month: 'Jan', score: 3.2 },
  { month: 'Fév', score: 3.5 },
  { month: 'Mar', score: 3.8 },
  { month: 'Avr', score: 4.0 },
  { month: 'Mai', score: 4.2 },
];

// Composant de questionnaire d'évaluation
function AssessmentQuestionnaire({
  assessment,
  onClose,
  onSubmit,
}: {
  assessment: Assessment;
  onClose: () => void;
  onSubmit: (assessmentId: number, answers: Record<number, string>) => void;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / assessment.questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(assessment.id, answers);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{assessment.title}</h2>
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>
            Question {currentQuestionIndex + 1} sur{' '}
            {assessment.questions.length}
          </span>
          <span>{Math.round(progress)}% Complété</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      <div className="p-6 bg-slate-50 rounded-lg">
        <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>
        <RadioGroup
          value={answers[currentQuestion.id]}
          onValueChange={handleAnswer}
          className="space-y-3"
        >
          {currentQuestion.options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value}
                id={`option-${option.value}`}
              />
              <Label htmlFor={`option-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Précédent
        </Button>
        {currentQuestionIndex === assessment.questions.length - 1 ? (
          <Button
            onClick={handleSubmit}
            disabled={!answers[currentQuestion.id] || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Icons.Loader className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              'Soumettre'
            )}
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={!answers[currentQuestion.id]}>
            Suivant
          </Button>
        )}
      </div>
    </div>
  );
}

// Composant de visualisation des résultats
function ResultsView({
  results,
  progress,
}: {
  results: SkillData[];
  progress: ProgressData[];
}) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-4">Votre Profil de Compétences</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={results}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={30} domain={[0, 5]} />
              <Radar
                name="Compétences"
                dataKey="score"
                stroke="#2563eb"
                fill="#2563eb"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Progression dans le Temps</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={progress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="score" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function SkillsAssessment() {
  return (
    <div className="text-center py-12 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Évaluation des Compétences</h2>
      <p className="text-muted-foreground mb-8">
        Évaluez vos compétences de coaching et suivez votre progression
      </p>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Compétences Essentielles en Coaching</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Communication</span>
                <Progress value={75} className="w-1/2" />
              </div>
              <div className="flex justify-between items-center">
                <span>Écoute Active</span>
                <Progress value={60} className="w-1/2" />
              </div>
              <div className="flex justify-between items-center">
                <span>Questionnement Puissant</span>
                <Progress value={85} className="w-1/2" />
              </div>
              <div className="flex justify-between items-center">
                <span>Facilitation</span>
                <Progress value={70} className="w-1/2" />
              </div>
            </div>
            <Button className="w-full mt-6">
              Démarrer l'Évaluation Complète
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Assessments() {
  // Utiliser le hook useAssessments pour charger les données dynamiquement
  const { assessments, results, progress, loading, error, submitAssessment } =
    useAssessments();
  const [showResults, setShowResults] = useState(false);
  const [activeView, setActiveView] = useState<'progress' | 'skills'>(
    'progress'
  );
  // Utiliser les données par défaut si les données dynamiques ne sont pas disponibles
  const displayAssessments =
    assessments.length > 0 ? assessments : defaultAssessmentsData;
  const displayResults = results.length > 0 ? results : defaultResultsData;
  const displayProgress = progress.length > 0 ? progress : defaultProgressData;

  const handleAssessmentSelect = (assessment: Assessment) => {
    // This function is called but doesn't need to set any state
    // It's only used as an onClick handler for the assessment cards
    console.log('Assessment selected:', assessment.title);
  };

  const handleSubmitAssessment = async (
    assessmentId: number,
    answers: Record<number, string>
  ) => {
    const result = await submitAssessment(assessmentId, answers);
    if (result.success) {
      setShowResults(true);
    }
    return result;
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background/95 animate-gradient-x">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 shadow-md border-b backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent animate-pulse-subtle">
              CoachVerse
            </span>
            <nav className="hidden md:flex gap-2 ml-8">
              <Link
                href="/dashboard"
                className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105 px-3 py-1.5 rounded-full"
              >
                Tableau de bord
              </Link>
              <Link
                href="/modules"
                className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105 px-3 py-1.5 rounded-full"
              >
                Modules
              </Link>
              <Link
                href="/tools"
                className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105 px-3 py-1.5 rounded-full"
              >
                Outils
              </Link>
              <Link
                href="/lessons"
                className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105 px-3 py-1.5 rounded-full"
              >
                Leçons
              </Link>
              <Link
                href="/assessments"
                className="text-sm font-medium text-primary border-b-2 border-primary hover:scale-105 transition-all duration-300 px-3 py-1.5 rounded-full bg-primary/5"
              >
                Évaluations
              </Link>
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
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                Évaluation des Compétences
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Évaluez vos compétences de coaching et suivez votre progression
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowResults(!showResults)}
              className="transition-all duration-300 hover:shadow-md hover:bg-primary/5"
            >
              {showResults ? 'Voir les Évaluations' : 'Voir les Résultats'}
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16 animate-fade-in">
            <div className="bg-destructive/10 text-destructive p-8 rounded-xl shadow-sm max-w-md mx-auto border border-destructive/30">
              <Icons.AlertTriangle
                className="mx-auto mb-4 text-destructive animate-pulse"
                size={48}
              />
              <p className="text-xl font-medium mb-2">Erreur</p>
              <p className="text-muted-foreground">{error}</p>
              <Button
                variant="outline"
                className="mt-6 border-destructive/30 hover:bg-destructive/10 transition-all duration-300"
                onClick={() => window.location.reload()}
              >
                <Icons.RefreshCw className="mr-2 h-4 w-4" />
                Réessayer
              </Button>
            </div>
          </div>
        )}

        {/* Content when data is loaded */}
        {!loading && !error && (
          <>
            {showResults ? (
              <ResultsView
                results={displayResults}
                progress={displayProgress}
              />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {displayAssessments.map((assessment) => (
                  <div
                    key={assessment.id}
                    onClick={() => handleAssessmentSelect(assessment)}
                    className="cursor-pointer"
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/20 cursor-pointer">
                          <CardHeader className="pb-4">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/15 transition-all duration-300 group-hover:scale-110">
                                  {assessment.icon}
                                </div>
                                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                                  {assessment.title}
                                </CardTitle>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4 min-h-[3rem] group-hover:text-foreground/80 transition-colors duration-300">
                              {assessment.description}
                            </p>
                            <div className="text-xs text-muted-foreground">
                              Durée: {assessment.duration}
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Évaluation</DialogTitle>
                        </DialogHeader>
                        <AssessmentQuestionnaire
                          assessment={assessment}
                          onClose={() => setSelectedAssessment(null)}
                          onSubmit={handleSubmitAssessment}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center my-12 space-x-4">
              <Button
                variant={activeView === 'progress' ? 'default' : 'outline'}
                onClick={() => setActiveView('progress')}
                className="transition-all duration-300 hover:shadow-md"
              >
                <Icons.BarChart2 className="mr-2 h-4 w-4" />
                Progression
              </Button>
              <Button
                variant={activeView === 'skills' ? 'default' : 'outline'}
                onClick={() => setActiveView('skills')}
                className="transition-all duration-300 hover:shadow-md"
              >
                <Icons.Award className="mr-2 h-4 w-4" />
                Évaluation des Compétences
              </Button>
            </div>

            {activeView === 'progress' ? (
              <ResultsView
                results={displayResults}
                progress={displayProgress}
              />
            ) : (
              <SkillsAssessment />
            )}
          </>
        )}
      </main>
    </div>
  );
}
