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
    <section className="bg-card/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-border/50 hover:shadow-xl transition-all duration-300">
      <h2 className="text-xl font-bold text-foreground mb-6 flex items-center">
        <Icons.Clock className="h-5 w-5 mr-2 text-primary" />
        Activités Récentes
      </h2>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const IconComponent = Icons[activity.icon];
          
          // Determine color based on activity type
          const getTypeColor = (type: string) => {
            switch(type) {
              case 'module': return 'bg-primary/10 text-primary';
              case 'quiz': return 'bg-primary/10 text-primary';
              case 'coaching': return 'bg-primary/10 text-primary';
              default: return 'bg-primary/5 text-primary/80';
            }
          };
          
          const typeColorClass = getTypeColor(activity.type);
          
          return (
            <div key={index} className="p-4 rounded-lg border border-border hover:border-border/80 hover:bg-accent/50 hover:shadow-md transition-all duration-300">
              <div className="flex items-start">
                <div className={`p-3 rounded-full ${typeColorClass.split(' ')[0]} shadow-sm`}>
                  {IconComponent && <IconComponent className={`h-5 w-5 ${typeColorClass.split(' ')[1]}`} />}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-foreground">{activity.title}</h3>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full font-medium">{activity.timeAgo}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={activity.progress} 
                        className="h-2 flex-1 bg-primary/10" 
                      />
                      <span className="text-xs font-medium text-muted-foreground">{activity.progress}%</span>
                    </div>
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