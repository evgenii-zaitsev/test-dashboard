import { selectTheme, selectToggleTheme, useThemeStore } from '@/store/theme';

export const useThemeMode = () => {
  const theme = useThemeStore(selectTheme);
  const toggleTheme = useThemeStore(selectToggleTheme);

  return { theme, isDark: theme === 'dark', toggleTheme };
};
