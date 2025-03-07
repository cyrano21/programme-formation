'use client';

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { Icons } from '@/utils/icons';
import styles from './theme-context.module.css';

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
    rose: '#e11d48',
  };

  const darkTheme = {
    '--background': '#0f172a',
    '--foreground': '#f8fafc',
    '--muted': '#334155',
    '--muted-foreground': '#94a3b8',
    '--card':
      color === 'indigo'
        ? '#3730a3'
        : color === 'emerald'
        ? '#065f46'
        : color === 'violet'
        ? '#5b21b6'
        : '#9f1239',
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
    '--bg-primary':
      color === 'indigo'
        ? '#4338ca'
        : color === 'emerald'
        ? '#047857'
        : color === 'violet'
        ? '#6d28d9'
        : '#be123c',
    '--bg-secondary':
      color === 'indigo'
        ? '#3730a3'
        : color === 'emerald'
        ? '#065f46'
        : color === 'violet'
        ? '#5b21b6'
        : '#9f1239',
    '--shadow': 'rgba(0, 0, 0, 0.25)',
    '--destructive': '#b91c1c',
    '--destructive-foreground': '#fecaca',
    '--accent':
      color === 'indigo'
        ? '#6366f1'
        : color === 'emerald'
        ? '#10b981'
        : color === 'violet'
        ? '#8b5cf6'
        : '#f43f5e',
    '--accent-foreground': '#f8fafc',
    '--glass': 'rgba(15, 23, 42, 0.8)',
    '--glass-border': 'rgba(255, 255, 255, 0.08)',
    '--glass-shadow': '0 8px 32px rgba(0, 0, 0, 0.3)',
  };

  const lightTheme = {
    '--background':
      color === 'indigo'
        ? '#eef2ff'
        : color === 'emerald'
        ? '#ecfdf5'
        : color === 'violet'
        ? '#f5f3ff'
        : '#fff1f2',
    '--foreground': '#0f172a',
    '--muted': '#64748b',
    '--muted-foreground': '#334155',
    '--card':
      color === 'indigo'
        ? '#e0e7ff'
        : color === 'emerald'
        ? '#d1fae5'
        : color === 'violet'
        ? '#ede9fe'
        : '#ffe4e6',
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
    '--bg-primary':
      color === 'indigo'
        ? '#e0e7ff'
        : color === 'emerald'
        ? '#d1fae5'
        : color === 'violet'
        ? '#ede9fe'
        : color === 'rose'
        ? '#ffe4e6'
        : '#f8fafc',
    '--bg-secondary':
      color === 'indigo'
        ? '#c7d2fe'
        : color === 'emerald'
        ? '#a7f3d0'
        : color === 'violet'
        ? '#ddd6fe'
        : color === 'rose'
        ? '#fecdd3'
        : '#f1f5f9',
    '--shadow': 'rgba(0, 0, 0, 0.08)',
    '--destructive': '#dc2626',
    '--destructive-foreground': '#fef2f2',
    '--accent':
      color === 'indigo'
        ? '#818cf8'
        : color === 'emerald'
        ? '#34d399'
        : color === 'violet'
        ? '#a78bfa'
        : color === 'rose'
        ? '#fb7185'
        : '#f1f5f9',
    '--accent-foreground': '#0f172a',
    '--glass': 'rgba(255, 255, 255, 0.8)',
    '--glass-border': 'rgba(0, 0, 0, 0.08)',
    '--glass-shadow': '0 8px 32px rgba(0, 0, 0, 0.1)',
  };

  return theme === 'dark' ? darkTheme : lightTheme;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Add a hidden div with the themeVariables class to apply CSS variables globally
  // Initialize theme from localStorage only once
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        return savedTheme as Theme;
      }
    }
    return 'light';
  });

  // Initialize color from localStorage only once
  const [color, setColor] = useState<Color>(() => {
    if (typeof window !== 'undefined') {
      const savedColor = localStorage.getItem('color');
      if (
        savedColor &&
        ['indigo', 'emerald', 'violet', 'rose'].includes(savedColor)
      ) {
        return savedColor as Color;
      }
    }
    return 'indigo';
  });

  // Memoize the toggleTheme function
  const toggleTheme = useCallback(() => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  }, [theme]);

  // Memoize the setColor function
  const handleSetColor = useCallback((newColor: Color) => {
    setColor(newColor);
    if (typeof window !== 'undefined') {
      localStorage.setItem('color', newColor);
    }
  }, []);

  // Memoize theme variables
  const themeVariables = useMemo(
    () => getThemeVariables(theme, color),
    [theme, color]
  );

  // Apply theme-specific styles
  useEffect(() => {
    const root = document.documentElement;

    // Apply CSS variables
    Object.entries(themeVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Update data-theme attribute
    root.setAttribute('data-theme', theme);

    // Update theme classes
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);

    // Update color classes
    document.documentElement.classList.remove(
      'theme-indigo',
      'theme-emerald',
      'theme-violet',
      'theme-rose'
    );
    document.documentElement.classList.add(`theme-${color}`);
  }, [theme, color, themeVariables]);

  // Memoize context value
  const contextValue = useMemo(
    () => ({
      theme,
      color,
      toggleTheme,
      setColor: handleSetColor,
    }),
    [theme, color, toggleTheme, handleSetColor]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <div
        className={`${styles.themeVariables}`}
        data-testid="theme-variables"
      />
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
    <div className={`theme-controls flex items-center space-x-2 ${styles.themeVariables}`}>
      <div className="theme-toggle">
        <button
          type="button"
          onClick={toggleTheme}
          className={`
            p-2.5 rounded-full transition-all duration-300 backdrop-blur-sm
            shadow-lg hover:shadow-xl active:scale-95
            ${
              theme === 'light'
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

      <div className="color-palette flex items-center space-x-4">
        {colorOptions.map((colorOption) => {
          return (
            <button
              key={colorOption}
              className={`
                p-2 rounded-full transition-all duration-300
                backdrop-blur-sm shadow-md hover:shadow-lg active:scale-95
                ${styles.colorButtonBackground}
                ${
                  styles[
                    `colorButton-${colorOption}${
                      color === colorOption ? '-active' : ''
                    }`
                  ]
                }
                ${
                  color === colorOption
                    ? 'ring-2 scale-110 hover:ring-offset-2'
                    : 'hover:scale-105 hover:ring-2'
                }
                transform hover:rotate-45
              `}
              onClick={() => setColor(colorOption)}
              aria-label={`${colorOption} theme`}
            >
              <span
                className={`block w-3 h-3 rounded-full ${
                  styles.colorIndicator
                } ${styles[`colorDot-${colorOption}`]}`}
              ></span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
