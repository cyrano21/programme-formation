'use client'

import { useDashboard } from '../hooks/useDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Icons } from '@/utils/icons';

export function DashboardStats() {
  const { stats, userProgress } = useDashboard();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-dark" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">Modules Complétés</CardTitle>
          <div className="p-2 bg-primary/10 rounded-full shadow-sm">
            <Icons.BookOpen className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {stats.completedModules} <span className="text-sm text-muted-foreground font-normal">/ {stats.totalModules}</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Progress 
              value={(stats.completedModules / stats.totalModules) * 100} 
              className="h-2 flex-1 bg-primary/10" 
            />
            <span className="text-xs font-medium text-muted-foreground">
              {Math.round((stats.completedModules / stats.totalModules) * 100)}%
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-dark" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">Leçons Terminées</CardTitle>
          <div className="p-2 bg-primary/10 rounded-full shadow-sm">
            <Icons.FileText className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {stats.completedLessons} <span className="text-sm text-muted-foreground font-normal">/ {stats.totalLessons}</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Progress 
              value={(stats.completedLessons / stats.totalLessons) * 100} 
              className="h-2 flex-1 bg-primary/10" 
            />
            <span className="text-xs font-medium text-muted-foreground">
              {Math.round((stats.completedLessons / stats.totalLessons) * 100)}%
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-dark" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">Progression Globale</CardTitle>
          <div className="p-2 bg-primary/10 rounded-full shadow-sm">
            <Icons.BarChart2 className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {userProgress.overallProgress}<span className="text-sm text-muted-foreground font-normal">%</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Progress 
              value={userProgress.overallProgress} 
              className="h-2 flex-1 bg-primary/10" 
            />
            <span className="text-xs font-medium text-muted-foreground">
              {userProgress.weeklyStudyTime}h cette semaine
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
