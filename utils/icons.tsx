import * as React from 'react';
import dynamic from 'next/dynamic';

// Interface for icon props
interface IconProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

// Dynamic import function for Lucide icons
const createDynamicIconComponent = (iconName: string) => {
  return dynamic<IconProps>(
    () =>
      import('lucide-react').then((mod) => {
        const Icon = mod[iconName as keyof typeof mod];
        if (!Icon) {
          console.warn(`Icon ${iconName} not found`);
          // Return a component that renders null
          return React.memo(() => null) as React.ComponentType<IconProps>;
        }
        return Icon as React.ComponentType<IconProps>;
      }),
    {
      ssr: false,
      loading: () => <span className="icon-loading w-4 h-4"></span>,
    }
  );
};

// Export commonly used icons with lazy loading
export const Icons = {
  BookOpen: createDynamicIconComponent('BookOpen'),
  Book: createDynamicIconComponent('Book'),
  Layers: createDynamicIconComponent('Layers'),
  Award: createDynamicIconComponent('Award'),
  TrendingUp: createDynamicIconComponent('TrendingUp'),
  Users: createDynamicIconComponent('Users'),
  Calendar: createDynamicIconComponent('Calendar'),
  Menu: createDynamicIconComponent('Menu'),
  Home: createDynamicIconComponent('Home'),
  User: createDynamicIconComponent('User'),
  Settings: createDynamicIconComponent('Settings'),
  HelpCircle: createDynamicIconComponent('HelpCircle'),
  LogOut: createDynamicIconComponent('LogOut'),
  FileText: createDynamicIconComponent('FileText'),
  Video: createDynamicIconComponent('Video'),
  Download: createDynamicIconComponent('Download'),
  ChevronStart: createDynamicIconComponent('ChevronLeft'),
  ChevronEnd: createDynamicIconComponent('ChevronRight'),
  AlertTriangle: createDynamicIconComponent('AlertTriangle'),
  RefreshCw: createDynamicIconComponent('RefreshCw'),
  MessageCircle: createDynamicIconComponent('MessageCircle'),
  Loader: createDynamicIconComponent('Loader'),
  Activity: createDynamicIconComponent('Activity'),
  ArrowEnd: createDynamicIconComponent('ArrowRight'),
  ArrowStart: createDynamicIconComponent('ArrowLeft'),
  Plus: createDynamicIconComponent('Plus'),
  Lock: createDynamicIconComponent('Lock'),
  CheckCircle: createDynamicIconComponent('CheckCircle'),
  Search: createDynamicIconComponent('Search'),
  AlertCircle: createDynamicIconComponent('AlertCircle'),
  Save: createDynamicIconComponent('Save'),
  Mail: createDynamicIconComponent('Mail'),
  AlertOctagon: createDynamicIconComponent('AlertOctagon'),
  LogIn: createDynamicIconComponent('LogIn'),
  UserPlus: createDynamicIconComponent('UserPlus'),
  Clock: createDynamicIconComponent('Clock'),
  Star: createDynamicIconComponent('Star'),
  ChevronDown: createDynamicIconComponent('ChevronDown'),
  X: createDynamicIconComponent('X'),
  Check: createDynamicIconComponent('Check'),
  Phone: createDynamicIconComponent('Phone'),
  Moon: createDynamicIconComponent('Moon'),
  Sun: createDynamicIconComponent('Sun'),
  Palette: createDynamicIconComponent('Palette'),
  Contrast: createDynamicIconComponent('Contrast'),
  BarChart2: createDynamicIconComponent('BarChart2'),
  Play: createDynamicIconComponent('Play'),
  Zap: createDynamicIconComponent('Zap'),
  Bell: createDynamicIconComponent('Bell'),
  Tool: createDynamicIconComponent('Tool'),
  Eye: createDynamicIconComponent('Eye'),
  Google: (props?: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={props?.className || 'w-5 h-5'}
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-1 7.28-2.69l-3.57-2.77c-.99.69-2.26 1.1-3.71 1.1-2.87 0-5.3-1.94-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#EA4335"
        d="M5.57 14.5c-.26-.78-.4-1.61-.4-2.5s.14-1.72.4-2.5V6.66H2.18C1.43 8.22 1 10.06 1 12s.43 3.78 1.18 5.34l3.39-2.84z"
      />
      <path
        fill="#FBBC05"
        d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.18 14.97 0 12 0 7.7 0 3.99 2.47 2.18 6.66l3.39 2.84c.86-2.59 3.29-4.5 6.43-4.5z"
      />
    </svg>
  ),
};
