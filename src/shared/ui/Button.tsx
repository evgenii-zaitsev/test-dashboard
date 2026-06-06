import type { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Size = 'sm' | 'md';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.primaryText};
    border-color: transparent;
    &:hover:not(:disabled) {
      filter: brightness(1.07);
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.color.surface};
    color: ${({ theme }) => theme.color.text};
    border-color: ${({ theme }) => theme.color.border};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.color.surfaceHover};
    }
  `,
  danger: css`
    background: ${({ theme }) => theme.color.danger};
    color: ${({ theme }) => theme.color.dangerText};
    border-color: transparent;
    &:hover:not(:disabled) {
      filter: brightness(1.07);
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.color.textMuted};
    border-color: transparent;
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.color.surfaceHover};
      color: ${({ theme }) => theme.color.text};
    }
  `,
} as const;

const sizeStyles = {
  sm: css`
    padding: 6px 10px;
    font-size: ${({ theme }) => theme.font.size.sm};
  `,
  md: css`
    padding: 9px 16px;
    font-size: ${({ theme }) => theme.font.size.md};
  `,
} as const;

export const Button = styled.button<Props>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 500;
  transition: background ${({ theme }) => theme.transition.base},
    filter ${({ theme }) => theme.transition.base};

  ${({ variant = 'primary' }) => variantStyles[variant]}
  ${({ size = 'md' }) => sizeStyles[size]}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;
