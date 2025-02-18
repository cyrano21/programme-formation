"use client";

import React, { 
  createContext, 
  useState, 
  useContext, 
  useEffect 
} from 'react';
import { Icons } from '@/utils/icons';

type Theme = 'light' | 'dark' | 'system';
type Color = 'blue' | 'green' | 'purple' | 'orange';

interface ThemeContextType {
  theme: Theme;
  color: Color;
  toggleTheme: () => void;
  setColor: (color: Color) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  color: 'blue',
  toggleTheme: () => {},
  setColor: () => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      return savedTheme || 'light';
    }
    return 'light';
  });

  const [color, setColor] = useState<Color>(() => {
    if (typeof window !== 'undefined') {
      const savedColor = localStorage.getItem('color') as Color;
      return savedColor || 'blue';
    }
    return 'blue';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('color', color);
    }
    document.documentElement.classList.remove('theme-blue', 'theme-green', 'theme-purple', 'theme-orange');
    document.documentElement.classList.add(`theme-${color}`);
  }, [color]);

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      color, 
      toggleTheme, 
      setColor 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, color, setColor } = useTheme();

  const colorOptions: Color[] = ['blue', 'green', 'purple', 'orange'];

  return (
    <div className="theme-controls flex items-center space-x-2">
      <div className="theme-toggle">
        <button 
          onClick={toggleTheme} 
          className={`
            p-2 rounded-full transition-all duration-300 
            ${theme === 'light' 
              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
              : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }
            flex items-center justify-center
          `}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Icons.Moon className="w-5 h-5" />
          ) : (
            <Icons.Sun className="w-5 h-5" />
          )}
        </button>
      </div>
      
      <div className="color-palette flex items-center space-x-1">
        {colorOptions.map(colorOption => (
          <button
            key={colorOption}
            className={`
              p-1.5 rounded-full transition-all duration-300
              ${color === colorOption 
                ? `ring-2 ring-${colorOption}-500 scale-110` 
                : 'hover:scale-110'
              }
              bg-${colorOption}-500 hover:brightness-110
            `}
            onClick={() => setColor(colorOption)}
            aria-label={`${colorOption} theme`}
          >
            <span className="block w-3 h-3 rounded-full"></span>
          </button>
        ))}
      </div>
    </div>
  );
};
