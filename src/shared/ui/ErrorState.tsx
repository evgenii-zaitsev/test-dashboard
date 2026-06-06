import styled from 'styled-components';
import { Button } from './Button';

type Props = {
  title?: string;
  message?: string;
  onRetry: () => void;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space(3)};
  padding: ${({ theme }) => theme.space(10)} ${({ theme }) => theme.space(4)};
  text-align: center;
`;

const IconCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  font-size: 24px;
  background: ${({ theme }) => theme.status.draft.bg};
`;

const Title = styled.p`
  font-weight: 600;
  font-size: ${({ theme }) => theme.font.size.lg};
  color: ${({ theme }) => theme.color.text};
`;

const Message = styled.p`
  max-width: 340px;
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.color.textMuted};
`;

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'We couldn’t load the data. Please try again.',
  onRetry,
}: Props) => (
  <Wrapper role="alert">
    <IconCircle>⚠️</IconCircle>
    <Title>{title}</Title>
    <Message>{message}</Message>
    <Button variant="secondary" onClick={onRetry}>
      Retry
    </Button>
  </Wrapper>
);
