import React, { createContext, useContext, useState, useCallback } from 'react';

import dark from '../styles/themes/dark';
import light from '../styles/themes/light';

interface ITheme {
  title: string;

  colors: {
    primary: string;
    secondary: string;
    tertiary: string;

    white: string;
    back: string;
    gray: string;

    success: string;
    info: string;
    warning: string;
  };
}

interface IThemeContext {
  toggleTheme(): void;
  theme: ITheme;
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<ITheme>(() => {
    const themeSaved = localStorage.getItem('@minha-carteira:theme');
    if (themeSaved) {
      return JSON.parse(themeSaved);
    }

    return dark;
  });

  const toggleTheme = useCallback(() => {
    if (theme.title === 'dark') {
      setTheme(light);
      localStorage.setItem('@minha-carteira:theme', JSON.stringify(light));
    } else {
      setTheme(dark);
      localStorage.setItem('@minha-carteira:theme', JSON.stringify(dark));
    }
  }, [theme.title]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme(): IThemeContext {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within an ThemeProvider');
  }

  return context;
}

export { ThemeProvider, useTheme };
