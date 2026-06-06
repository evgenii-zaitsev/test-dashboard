import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeName } from '@/shared/theme';

export interface ThemeState {
  theme: ThemeName;
  toggleTheme: () => void;
  setTheme: (theme: ThemeName) => void;
}

/** Separate UI domain from the dashboard store; persisted across reloads. */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'dashboard-theme' },
  ),
);
