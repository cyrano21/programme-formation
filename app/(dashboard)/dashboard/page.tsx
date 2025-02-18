'use client'

import { Icons } from '@/utils/icons'
import { getOwnerInfo } from '@/types/global'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter();
  const { user } = useFirebaseAuth();
  const { name } = getOwnerInfo();

  const navigateToModules = () => {
    router.push('/modules');
  };

  const navigateToLessons = () => {
    router.push('/lessons');
  };

  const navigateToTools = () => {
    router.push('/tools');
  };

  const navigateToAssessments = () => {
    router.push('/assessments');
  };

  const dashboardStats = [
    { 
      icon: <Icons.BookOpen />, 
      title: 'Modules Disponibles', 
      value: '12',
      progress: 75
    },
    { 
      icon: <Icons.TrendingUp />, 
      title: 'Progression Moyenne', 
      value: '65%',
      progress: 65
    },
    { 
      icon: <Icons.Users />, 
      title: 'Coaches Actifs', 
      value: '5',
      progress: 90
    },
    { 
      icon: <Icons.Calendar />, 
      title: 'Prochaines Sessions', 
      value: '3',
      progress: 40
    }
  ];

  const recentActivities = [
    {
      icon: <Icons.BookOpen />,
      title: 'Module de Communication',
      description: 'Leçon 3 terminée',
      date: '2 heures',
      progress: 80
    },
    {
      icon: <Icons.TrendingUp />,
      title: 'Développement Personnel',
      description: 'Quiz complété',
      date: '1 jour',
      progress: 60
    },
    {
      icon: <Icons.Users />,
      title: 'Coaching Individuel',
      description: 'Prochaine session',
      date: '3 jours',
      progress: 30
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-primary">CoachVerse</span>
            <nav className="hidden md:flex gap-6 ml-8">
              <Link 
                href="/dashboard" 
                className="text-sm font-medium text-primary border-b-2 border-primary"
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
                className="text-sm font-medium hover:text-primary transition-colors"
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
          <h1 className="text-3xl font-bold mb-4">Tableau de Bord</h1>
          <p className="text-muted-foreground">
            Bienvenue, {name || user?.displayName || 'Utilisateur'} !
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="grid gap-8">
          {/* Statistiques */}
          <section className="dashboard-stats grid md:grid-cols-4 gap-4">
            {dashboardStats.map((stat, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  {stat.icon}
                  <Badge variant="secondary">In Progress</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <Progress value={stat.progress} className="mt-2" />
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Activités Récentes */}
          <section className="recent-activities space-y-6">
            <h2 className="text-2xl font-bold">Activités Récentes</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {recentActivities.map((activity, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{activity.title}</CardTitle>
                    {activity.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">{activity.description}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">{activity.date}</span>
                      <Progress value={activity.progress} className="w-1/2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Actions Rapides */}
          <section className="quick-actions space-y-6">
            <h2 className="text-2xl font-bold">Actions Rapides</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Modules</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Continuez votre parcours de formation
                  </p>
                  <Button onClick={navigateToModules} className="w-full">Voir les Modules</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Leçons</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Explorez vos leçons en cours
                  </p>
                  <Button onClick={navigateToLessons} className="w-full">Mes Leçons</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Outils</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Découvrez nos outils de développement
                  </p>
                  <Button onClick={navigateToTools} className="w-full">Voir les Outils</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Assessments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Voir vos évaluations
                  </p>
                  <Button onClick={navigateToAssessments} className="w-full">Voir les Assessments</Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
