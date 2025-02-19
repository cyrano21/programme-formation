import * as React from 'react';
import * as LucideIcons from 'lucide-react';

// Explicitly define the type of LucideIcons
type LucideIconComponent = React.ComponentType<{
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}>;

// Create a type that allows any string key
type IconName = string & keyof typeof LucideIcons;

// Interface for icon props
interface IconProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

// Utility function to create icon components with type assertion
const createIconComponent = (name: string) => {
  // Type assertion to bypass strict type checking
  const IconComponent = LucideIcons[name as IconName] as LucideIconComponent;

  return (props?: IconProps) => {
    if (!IconComponent) {
      console.warn(`Icon ${name} not found`);
      return null;
    }

    return React.createElement(IconComponent, props as any);
  };
};

// Export commonly used icons
export const Icons = {
  BookOpen: createIconComponent('BookOpen'),
  Book: createIconComponent('Book'),
  Layers: createIconComponent('Layers'),
  Award: createIconComponent('Award'),
  TrendingUp: createIconComponent('TrendingUp'),
  Users: createIconComponent('Users'),
  Calendar: createIconComponent('Calendar'),
  Menu: createIconComponent('Menu'),
  Home: createIconComponent('Home'),
  User: createIconComponent('User'),
  Settings: createIconComponent('Settings'),
  HelpCircle: createIconComponent('HelpCircle'),
  LogOut: createIconComponent('LogOut'),
  FileText: createIconComponent('FileText'),
  Video: createIconComponent('Video'),
  Download: createIconComponent('Download'),
  ChevronStart: createIconComponent('ChevronLeft'),
  ChevronEnd: createIconComponent('ChevronRight'),
  AlertTriangle: createIconComponent('AlertTriangle'),
  RefreshCw: createIconComponent('RefreshCw'),
  MessageCircle: createIconComponent('MessageCircle'),
  Loader: createIconComponent('Loader'),
  Activity: createIconComponent('Activity'),
  ArrowEnd: createIconComponent('ArrowRight'),
  Plus: createIconComponent('Plus'),
  Lock: createIconComponent('Lock'),
  CheckCircle: createIconComponent('CheckCircle'),
  Search: createIconComponent('Search'),
  AlertCircle: createIconComponent('AlertCircle'),
  Save: createIconComponent('Save'),
  Mail: createIconComponent('Mail'),
  AlertOctagon: createIconComponent('AlertOctagon'),
  LogIn: createIconComponent('LogIn'),
  UserPlus: createIconComponent('UserPlus'),
  Clock: createIconComponent('Clock'),
  Star: createIconComponent('Star'),
  ChevronDown: createIconComponent('ChevronDown'),
  X: createIconComponent('X'),
  Check: createIconComponent('Check'),
  Phone: createIconComponent('Phone'),
  Moon: createIconComponent('Moon'),
  Sun: createIconComponent('Sun'),
  Palette: createIconComponent('Palette'),
  Contrast: createIconComponent('Contrast'),
  BarChart2: createIconComponent('BarChart2'),
  Play: createIconComponent('Play'),
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
