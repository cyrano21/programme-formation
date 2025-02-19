'use client'

import { useDashboard } from '../hooks/useDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Icons } from '@/utils/icons';

console.log('DashboardStats component loaded'); // Add this line for debugging

export function DashboardStats() {
  const { stats, userProgress } = useDashboard();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Modules Complétés</CardTitle>
          <Icons.BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.completedModules} / {stats.totalModules}
          </div>
          <Progress 
            value={(stats.completedModules / stats.totalModules) * 100} 
            className="mt-2" 
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Leçons Terminées</CardTitle>
          <Icons.FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.completedLessons} / {stats.totalLessons}
          </div>
          <Progress 
            value={(stats.completedLessons / stats.totalLessons) * 100} 
            className="mt-2" 
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Progression Globale</CardTitle>
          <Icons.BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {userProgress.overallProgress}%
          </div>
          <Progress 
            value={userProgress.overallProgress} 
            className="mt-2" 
          />
        </CardContent>
      </Card>
    </div>
  );
}
