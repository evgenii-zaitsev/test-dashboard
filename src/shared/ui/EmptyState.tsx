import type { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  icon?: ReactNode;
  title: string;
  description?: string;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space(2)};
  padding: ${({ theme }) => theme.space(10)} ${({ theme }) => theme.space(4)};
  text-align: center;
  color: ${({ theme }) => theme.color.textMuted};
`;

const IconCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  font-size: 24px;
  background: ${({ theme }) => theme.color.surfaceHover};
`;

const Title = styled.p`
  font-weight: 600;
  font-size: ${({ theme }) => theme.font.size.lg};
  color: ${({ theme }) => theme.color.text};
`;

const Description = styled.p`
  max-width: 320px;
  font-size: ${({ theme }) => theme.font.size.md};
`;

export const EmptyState = ({ icon = '📭', title, description }: Props) => (
  <Wrapper>
    <IconCircle>{icon}</IconCircle>
    <Title>{title}</Title>
    {description && <Description>{description}</Description>}
  </Wrapper>
);
