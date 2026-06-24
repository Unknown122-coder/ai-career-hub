import { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, [setTheme]);

  const setSpecificTheme = useCallback(
    (newTheme) => {
      setTheme(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    },
    [setTheme]
  );

  // Apply theme on mount
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme,
      setTheme: setSpecificTheme,
    }),
    [theme, toggleTheme, setSpecificTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
