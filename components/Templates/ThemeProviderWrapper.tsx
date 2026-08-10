'use client';

import { ThemeColor, ColorGroup } from '@/lib/themeColor';
import { createContext, useState, useEffect, useMemo } from 'react';
import { PaletteMode, Theme, createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeContext = {
  mode: PaletteMode,
  color: ThemeColor,
  colors: Color,
  theme: Theme,
  toggleMode: () => void,
  toggleColor: (newColor: ThemeColor) => void
};

export const ThemeContext = createContext<ThemeContext | undefined>(undefined);

export function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>('light');
  const [color, setColor] = useState<ThemeColor>(ThemeColor.blue);
  const [mounted, setMounted] = useState(false);
  const colors = ColorGroup[color];

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode === 'light' || savedMode === 'dark') setMode(savedMode);
    const savedColor = localStorage.getItem('themeColor');
    if (
      savedColor === ThemeColor.blue ||
      savedColor === ThemeColor.red ||
      savedColor === ThemeColor.yellow ||
      savedColor === ThemeColor.purple ||
      savedColor === ThemeColor.green ||
      savedColor === ThemeColor.orange ||
      savedColor === ThemeColor.brown ||
      savedColor === ThemeColor.pink ||
      savedColor === ThemeColor.grey
    ) setColor(savedColor);
    setMounted(true);
  }, []);

  const toggleMode = () => setMode(prev => {
    const newMode = prev === 'light' ? 'dark' : 'light';
    localStorage.setItem('themeMode', newMode);
    return newMode;
  });

  const toggleColor = (newColor: ThemeColor) => {
    if (newColor != color) {
      setColor(newColor);
      localStorage.setItem('themeColor', newColor);
    }
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: { main: colors.main, contrastText: '#000' },
                secondary: { main: colors.second, light: colors.light },
                background: { default: '#fff' }
              }
            : {
                primary: { main: colors.main, contrastText: '#fff' },
                secondary: { main: colors.second, light: colors.light },
                background: { default: grey[700] }
              }
          ),
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
              },
            },
          },
        },
      }),
    [mode, colors]
  );

  useEffect(() => {
    const root = document.documentElement;
    const primaryColor = theme.palette.primary.main;
    const primaryText = theme.palette.primary.contrastText;
    const secondaryColor = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;
    const background = theme.palette.background.default;
    root.style.setProperty('--color-primary', primaryColor);
    root.style.setProperty('--text-primary', primaryText);
    root.style.setProperty('--color-secondary', secondaryColor);
    root.style.setProperty('--light-secondary', secondaryLight);
    root.style.setProperty('--color-background', background);
  }, [theme]);

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{mode, color, colors, theme, toggleMode, toggleColor}}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
