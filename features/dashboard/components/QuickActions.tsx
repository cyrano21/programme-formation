'use client'

import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { Icons } from '@/utils/icons';
import Link from 'next/link';

const QuickActions: React.FC = () => {
  const { quickActions } = useDashboard();

  return (
    <div className="bg-card/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-border/50 hover:shadow-xl transition-all duration-300">
      <h2 className="text-xl font-bold text-foreground mb-6 flex items-center">
        <Icons.Zap className="h-5 w-5 mr-2 text-primary" />
        Actions Rapides
      </h2>
      <div className="space-y-3">
        {quickActions.map((action) => {
          const ActionIcon = Icons[action.icon as keyof typeof Icons];
          return (
            <Link 
              key={action.id} 
              href={action.route}
            >
              <div className="group flex items-center p-4 rounded-lg hover:bg-accent/50 transition-all duration-300 border border-border hover:border-primary/30 hover:shadow-md">
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-full bg-primary/5 group-hover:bg-primary/15 transition-colors shadow-sm group-hover:shadow">
                    <ActionIcon className="h-5 w-5 text-primary/90 group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary/90 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                    {action.description}
                  </p>
                </div>
                <Icons.ChevronEnd className="h-5 w-5 text-muted-foreground group-hover:text-primary/90 transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
