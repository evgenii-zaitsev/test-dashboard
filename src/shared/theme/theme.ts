// Both themes implement the same `Theme` shape, so switching light <-> dark is a pure data swap.
export type ThemeName = 'light' | 'dark';

export interface Theme {
  name: ThemeName;
  color: {
    bg: string;
    surface: string;
    surfaceHover: string;
    border: string;
    text: string;
    textMuted: string;
    primary: string;
    primaryText: string;
    danger: string;
    dangerText: string;
    overlay: string;
    skeleton: string;
    skeletonHighlight: string;
  };
  status: {
    pending: { bg: string; fg: string };
    published: { bg: string; fg: string };
    draft: { bg: string; fg: string };
  };
  mode: {
    autoposting: { bg: string; fg: string };
    premoderation: { bg: string; fg: string };
  };
  radius: { sm: string; md: string; lg: string; full: string };
  space: (n: number) => string;
  shadow: { sm: string; md: string; lg: string };
  font: {
    family: string;
    size: { xs: string; sm: string; md: string; lg: string; xl: string };
  };
  drawerWidth: string;
  breakpoint: { mobile: string };
  transition: { base: string };
}

const space = (n: number) => `${n * 4}px`;

const shared = {
  space,
  radius: { sm: '6px', md: '10px', lg: '16px', full: '999px' },
  font: {
    family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    size: { xs: '12px', sm: '13px', md: '14px', lg: '16px', xl: '20px' },
  },
  drawerWidth: '480px',
  breakpoint: { mobile: '640px' },
  transition: { base: '180ms cubic-bezier(0.4, 0, 0.2, 1)' },
} as const;

export const lightTheme: Theme = {
  ...shared,
  name: 'light',
  color: {
    bg: '#f4f5f7',
    surface: '#ffffff',
    surfaceHover: '#f9fafb',
    border: '#e5e7eb',
    text: '#111827',
    textMuted: '#6b7280',
    primary: '#2563eb',
    primaryText: '#ffffff',
    danger: '#dc2626',
    dangerText: '#ffffff',
    overlay: 'rgba(17, 24, 39, 0.45)',
    skeleton: '#e9eaed',
    skeletonHighlight: '#f3f4f6',
  },
  status: {
    pending: { bg: '#fef3c7', fg: '#92400e' },
    published: { bg: '#d1fae5', fg: '#065f46' },
    draft: { bg: '#e5e7eb', fg: '#374151' },
  },
  mode: {
    autoposting: { bg: '#dbeafe', fg: '#1e40af' },
    premoderation: { bg: '#fae8ff', fg: '#86198f' },
  },
  shadow: {
    sm: '0 1px 2px rgba(16, 24, 40, 0.06)',
    md: '0 4px 12px rgba(16, 24, 40, 0.08)',
    lg: '-8px 0 32px rgba(16, 24, 40, 0.18)',
  },
};

export const darkTheme: Theme = {
  ...shared,
  name: 'dark',
  color: {
    bg: '#0f1115',
    surface: '#191c22',
    surfaceHover: '#21252d',
    border: '#2c313a',
    text: '#e6e8ec',
    textMuted: '#9aa1ac',
    primary: '#3b82f6',
    primaryText: '#ffffff',
    danger: '#ef4444',
    dangerText: '#ffffff',
    overlay: 'rgba(0, 0, 0, 0.6)',
    skeleton: '#23272f',
    skeletonHighlight: '#2d323b',
  },
  status: {
    pending: { bg: '#422006', fg: '#fcd34d' },
    published: { bg: '#052e1c', fg: '#6ee7b7' },
    draft: { bg: '#2c313a', fg: '#cbd1da' },
  },
  mode: {
    autoposting: { bg: '#172554', fg: '#93c5fd' },
    premoderation: { bg: '#4a044e', fg: '#f0abfc' },
  },
  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px rgba(0, 0, 0, 0.4)',
    lg: '-8px 0 32px rgba(0, 0, 0, 0.5)',
  },
};

export const themes: Record<ThemeName, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};
