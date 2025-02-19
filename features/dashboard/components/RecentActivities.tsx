'use client';

import React from 'react';
import { Icons } from '@/utils/icons';
import { Progress } from '@/components/ui/progress';

type Activity = {
  title: string;
  type: string;
  icon: keyof typeof Icons;
  description: string;
  timeAgo: string;
  progress: number;
};

const activities: Activity[] = [
  {
    title: 'Module de Communication',
    type: 'module',
    icon: 'BookOpen',
    description: 'Leçon 3 terminée',
    timeAgo: '2 heures',
    progress: 80
  },
  {
    title: 'Développement Personnel',
    type: 'quiz',
    icon: 'TrendingUp',
    description: 'Quiz complété',
    timeAgo: '1 jour',
    progress: 60
  },
  {
    title: 'Coaching Individuel',
    type: 'coaching',
    icon: 'Users',
    description: 'Prochaine session',
    timeAgo: '3 jours',
    progress: 30
  }
];

export function RecentActivities() {
  return (
    <section className="recent-activities space-y-6">
      <h2 className="text-2xl font-bold">Activités Récentes</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {activities.map((activity, index) => {
          const IconComponent = Icons[activity.icon];
          return (
            <div key={index} className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">{activity.title}</h3>
                {IconComponent && <IconComponent />}
              </div>
              <div className="p-6 pt-0">
                <div className="text-sm text-muted-foreground">{activity.description}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{activity.timeAgo}</span>
                  <div className="relative h-4 overflow-hidden rounded-full bg-secondary w-1/2">
                    <Progress value={activity.progress} className="h-full" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}