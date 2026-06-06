import type { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { GlobalStyle } from '@/app/styles/GlobalStyle';
import { themes } from '@/shared/theme';
import { selectTheme, useThemeStore } from '@/store/theme';

type Props = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const themeName = useThemeStore(selectTheme);

  return (
    <StyledThemeProvider theme={themes[themeName]}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};
