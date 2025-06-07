import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg transition-colors z-50"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-gray-800 dark:text-white animate-pulse" />
      ) : (
        <Sun size={20} className="text-gray-800 dark:text-white animate-pulse" />
      )}
    </button>
  );
};

export default ThemeToggle;