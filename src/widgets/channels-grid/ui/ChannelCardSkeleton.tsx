import styled from 'styled-components';
import { Skeleton } from '@/shared/ui';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(4)};
  padding: ${({ theme }) => theme.space(5)};
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
`;

const Counters = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space(2)};
`;

export const ChannelCardSkeleton = () => (
  <Card>
    <Row>
      <Skeleton width="44px" height="44px" radius="10px" />
      <Skeleton width="55%" height="18px" />
    </Row>
    <Skeleton width="110px" height="22px" radius="999px" />
    <Counters>
      <Skeleton height="56px" radius="10px" />
      <Skeleton height="56px" radius="10px" />
      <Skeleton height="56px" radius="10px" />
    </Counters>
  </Card>
);
