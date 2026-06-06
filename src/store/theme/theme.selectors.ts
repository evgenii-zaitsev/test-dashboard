import type { ThemeState } from './theme.store';

export const selectTheme = (s: ThemeState) => s.theme;
export const selectToggleTheme = (s: ThemeState) => s.toggleTheme;
export const selectSetTheme = (s: ThemeState) => s.setTheme;
