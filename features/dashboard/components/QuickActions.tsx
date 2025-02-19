'use client'

import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { Icons } from '@/utils/icons';
import Link from 'next/link';

const QuickActions: React.FC = () => {
  const { quickActions } = useDashboard();

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Actions Rapides</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action) => {
          const ActionIcon = Icons[action.icon as keyof typeof Icons];
          return (
            <Link 
              key={action.id} 
              href={action.route} 
              className="group"
            >
              <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="bg-primary/10 p-3 rounded-full">
                  <ActionIcon className="h-6 w-6 text-primary group-hover:text-primary-dark" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 group-hover:text-primary">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
