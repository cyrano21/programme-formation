'use client'

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Icons } from "@/utils/icons";

// Fallback Chart Component
const FallbackChart = () => (
  <div className="w-full h-[300px] flex items-center justify-center bg-slate-50 rounded-lg">
    <div className="text-center">
      <Icons.AlertCircle className="mx-auto mb-4 text-muted-foreground" size={48} />
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

// Placeholder data - will be replaced with Supabase data
const assessmentsData = [
  {
    id: 1,
    title: "Core Coaching Competencies",
    description: "Evaluate your mastery of essential coaching skills and competencies.",
    duration: "15-20 minutes",
    icon: <Icons.TrendingUp />,
    questions: [
      {
        id: 1,
        text: "How effectively do you establish and maintain coaching agreements?",
        options: [
          { value: "1", label: "Novice - Basic understanding" },
          { value: "2", label: "Advanced Beginner - Growing competence" },
          { value: "3", label: "Competent - Consistent application" },
          { value: "4", label: "Proficient - Deep understanding" },
          { value: "5", label: "Expert - Mastery level" }
        ]
      },
      {
        id: 2,
        text: "How well do you demonstrate active listening skills?",
        options: [
          { value: "1", label: "Novice - Basic understanding" },
          { value: "2", label: "Advanced Beginner - Growing competence" },
          { value: "3", label: "Competent - Consistent application" },
          { value: "4", label: "Proficient - Deep understanding" },
          { value: "5", label: "Expert - Mastery level" }
        ]
      },
      {
        id: 3,
        text: "How effectively do you ask powerful questions?",
        options: [
          { value: "1", label: "Novice - Basic understanding" },
          { value: "2", label: "Advanced Beginner - Growing competence" },
          { value: "3", label: "Competent - Consistent application" },
          { value: "4", label: "Proficient - Deep understanding" },
          { value: "5", label: "Expert - Mastery level" }
        ]
      },
      {
        id: 4,
        text: "How well do you facilitate client growth and accountability?",
        options: [
          { value: "1", label: "Novice - Basic understanding" },
          { value: "2", label: "Advanced Beginner - Growing competence" },
          { value: "3", label: "Competent - Consistent application" },
          { value: "4", label: "Proficient - Deep understanding" },
          { value: "5", label: "Expert - Mastery level" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Emotional Intelligence Assessment",
    description: "Assess your emotional intelligence capabilities in coaching contexts.",
    duration: "10-15 minutes",
    icon: <Icons.Users />,
    questions: [
      {
        id: 1,
        text: "How well do you recognize and understand your own emotions?",
        options: [
          { value: "1", label: "Developing" },
          { value: "2", label: "Emerging" },
          { value: "3", label: "Established" },
          { value: "4", label: "Advanced" },
          { value: "5", label: "Expert" }
        ]
      },
      // Add more questions...
    ]
  }
];

// Placeholder results data
const resultsData = [
  { skill: "Establishing Agreements", score: 4, fullMark: 5 },
  { skill: "Active Listening", score: 3, fullMark: 5 },
  { skill: "Powerful Questions", score: 5, fullMark: 5 },
  { skill: "Direct Communication", score: 4, fullMark: 5 },
  { skill: "Creating Awareness", score: 3, fullMark: 5 },
  { skill: "Planning & Goal Setting", score: 4, fullMark: 5 },
];

const progressData = [
  { month: "Jan", score: 3.2 },
  { month: "Feb", score: 3.5 },
  { month: "Mar", score: 3.8 },
  { month: "Apr", score: 4.0 },
  { month: "May", score: 4.2 },
];

// Assessment Taking Component
function AssessmentQuestionnaire({ assessment, onClose }: { assessment: typeof assessmentsData[0]; onClose: () => void }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / assessment.questions.length) * 100;

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

  const handleSubmit = () => {
    // Here we would submit to Supabase
    console.log("Submitted answers:", answers);
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{assessment.title}</h2>
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentQuestionIndex + 1} of {assessment.questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
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
              <RadioGroupItem value={option.value} id={`option-${option.value}`} />
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
          Previous
        </Button>
        {currentQuestionIndex === assessment.questions.length - 1 ? (
          <Button onClick={handleSubmit} disabled={!answers[currentQuestion.id]}>
            Submit
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={!answers[currentQuestion.id]}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

// Results Visualization Component
function ResultsView() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Competency Profile</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={resultsData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={30} domain={[0, 5]} />
              <Radar
                name="Skills"
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
        <h2 className="text-2xl font-bold mb-4">Progress Over Time</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={progressData}>
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
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4">Skills Assessment</h2>
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
  const [selectedAssessment, setSelectedAssessment] = useState<typeof assessmentsData[0] | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [activeView, setActiveView] = useState<'progress' | 'skills'>('progress');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-primary">CoachVerse</span>
            <nav className="hidden md:flex gap-6 ml-8">
              <Link 
                href="/dashboard" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                href="/modules" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Modules
              </Link>
              <Link 
                href="/tools" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Tools
              </Link>
              <Link 
                href="/lessons" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Lessons
              </Link>
              <Link 
                href="/assessments" 
                className="text-sm font-medium text-primary border-b-2 border-primary"
              >
                Progress
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                Skills Assessment
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Evaluate your coaching competencies and track your progress
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={() => setShowResults(!showResults)}
            >
              {showResults ? "View Assessments" : "View Results"}
            </Button>
          </div>
        </div>

        {showResults ? (
          <ResultsView />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessmentsData.map((assessment) => (
              <Dialog key={assessment.id}>
                <DialogTrigger asChild>
                  <Card 
                    key={assessment.id} 
                    className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/20 cursor-pointer"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            {assessment.icon}
                          </div>
                          <CardTitle className="text-lg font-semibold">{assessment.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 min-h-[3rem]">
                        {assessment.description}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        Duration: {assessment.duration}
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Assessment</DialogTitle>
                  </DialogHeader>
                  <AssessmentQuestionnaire
                    assessment={assessment}
                    onClose={() => setSelectedAssessment(null)}
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}
        <div className="flex justify-center mb-8 space-x-4">
          <Button 
            variant={activeView === 'progress' ? 'default' : 'outline'}
            onClick={() => setActiveView('progress')}
          >
            Progression
          </Button>
          <Button 
            variant={activeView === 'skills' ? 'default' : 'outline'}
            onClick={() => setActiveView('skills')}
          >
            Skills Assessment
          </Button>
        </div>
        {activeView === 'progress' ? (
          <ResultsView />
        ) : (
          <SkillsAssessment />
        )}
      </main>
    </div>
  );
}
