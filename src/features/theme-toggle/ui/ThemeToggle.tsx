import styled from 'styled-components';
import { useThemeMode } from '../model/useThemeMode';

const Toggle = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.color.surface};
  color: ${({ theme }) => theme.color.text};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: 600;

  &:hover {
    background: ${({ theme }) => theme.color.surfaceHover};
  }
`;

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useThemeMode();

  return (
    <Toggle type="button" onClick={toggleTheme} aria-label="Toggle color theme">
      {isDark ? '🌙' : '☀️'} {isDark ? 'Dark' : 'Light'}
    </Toggle>
  );
};
