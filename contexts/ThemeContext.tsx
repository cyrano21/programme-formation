'use client';

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { Icons } from '@/utils/icons';

type Theme = 'light' | 'dark' | 'system';
type Color = 'indigo' | 'emerald' | 'violet' | 'rose';

interface ThemeContextType {
  theme: Theme;
  color: Color;
  toggleTheme: () => void;
  setColor: (color: Color) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  color: 'indigo',
  toggleTheme: () => {},
  setColor: () => {},
});

// Memoize theme variables to prevent unnecessary recalculations
const getThemeVariables = (theme: Theme, color: Color) => {
  const colorMap = {
    indigo: '#4f46e5',
    emerald: '#059669',
    violet: '#7c3aed',
    rose: '#e11d48'
  };

  const darkTheme = {
    '--background': '#0f172a',
    '--foreground': '#f8fafc',
    '--muted': '#475569',
    '--muted-foreground': '#cbd5e1',
    '--card': '#1e293b',
    '--card-foreground': '#f8fafc',
    '--popover': '#1e293b',
    '--popover-foreground': '#f8fafc',
    '--border': '#334155',
    '--input': '#334155',
    '--primary': colorMap[color],
    '--primary-foreground': '#ffffff',
    '--ring': '#334155',
    '--ring-foreground': '#f8fafc',
    '--text-primary': '#f8fafc',
    '--text-secondary': '#cbd5e1',
    '--bg-primary': '#1e293b',
    '--bg-secondary': '#334155',
    '--shadow': 'rgba(0, 0, 0, 0.5)',
    '--destructive': '#b91c1c',
    '--destructive-foreground': '#fecaca',
    '--accent': '#334155',
    '--accent-foreground': '#f8fafc'
  };

  const lightTheme = {
    '--background': '#ffffff',
    '--foreground': '#0f172a',
    '--muted': '#64748b',
    '--muted-foreground': '#334155',
    '--card': '#f8fafc',
    '--card-foreground': '#0f172a',
    '--popover': '#f8fafc',
    '--popover-foreground': '#0f172a',
    '--border': '#e2e8f0',
    '--input': '#e2e8f0',
    '--primary': colorMap[color],
    '--primary-foreground': '#ffffff',
    '--ring': '#e2e8f0',
    '--ring-foreground': '#0f172a',
    '--text-primary': '#0f172a',
    '--text-secondary': '#334155',
    '--bg-primary': '#f8fafc',
    '--bg-secondary': '#f1f5f9',
    '--shadow': 'rgba(0, 0, 0, 0.1)',
    '--destructive': '#dc2626',
    '--destructive-foreground': '#fef2f2',
    '--accent': '#f1f5f9',
    '--accent-foreground': '#0f172a'
  };

  return theme === 'dark' ? darkTheme : lightTheme;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        return savedTheme as Theme;
      }
    }
    return 'light';
  });

  const [color, setColor] = useState<Color>(() => {
    if (typeof window !== 'undefined') {
      const savedColor = localStorage.getItem('color');
      if (savedColor && ['indigo', 'emerald', 'violet', 'rose'].includes(savedColor)) {
        return savedColor as Color;
      }
    }
    return 'indigo';
  });

  const toggleTheme = useCallback(() => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  }, [theme]);

  // Apply theme-specific styles
  useEffect(() => {
    const root = document.documentElement;
    const variables = getThemeVariables(theme, color);
    
    Object.entries(variables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Update data-theme attribute
    root.setAttribute('data-theme', theme);
    // Force a repaint to ensure styles are applied
    document.body.style.display = 'none';
    document.body.offsetHeight;
    document.body.style.display = '';
  }, [theme, color]);

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
    document.documentElement.classList.remove(
      'theme-indigo',
      'theme-emerald',
      'theme-violet',
      'theme-rose'
    );
    document.documentElement.classList.add(`theme-${color}`);
  }, [color]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        color,
        toggleTheme,
        setColor,
      }}
    >
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

  const colorOptions: Color[] = ['indigo', 'emerald', 'violet', 'rose'];

  return (
    <div className="theme-controls flex items-center space-x-2">
      <div className="theme-toggle">
        <button
          type="button"
          onClick={toggleTheme}
          className={`
            p-2.5 rounded-full transition-all duration-300 backdrop-blur-sm
            shadow-lg hover:shadow-xl active:scale-95
            ${theme === 'light'
                ? 'bg-primary text-white hover:bg-primary/90 hover:ring-2 hover:ring-primary/20'
                : 'bg-gray-800 text-white hover:bg-gray-700 hover:ring-2 hover:ring-gray-600'
            }
            flex items-center justify-center
            hover:rotate-12 transform
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
        {colorOptions.map((colorOption) => (
          <button
            key={colorOption}
            className={`
              p-2 rounded-full transition-all duration-300
              backdrop-blur-sm shadow-md hover:shadow-lg active:scale-95
              ${color === colorOption
                ? `ring-2 ring-${colorOption}-400 scale-110 bg-${colorOption}-500 text-white hover:ring-offset-2`
                : `hover:scale-105 bg-${colorOption}-100 text-${colorOption}-700 hover:bg-${colorOption}-200 hover:ring-2 hover:ring-${colorOption}-400/50`
              }
              transform hover:rotate-45
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
