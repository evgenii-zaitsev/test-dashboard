import styled from 'styled-components';
import { Skeleton } from '@/shared/ui';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(2)};
  padding: ${({ theme }) => theme.space(4)};
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
`;

export const PostListSkeleton = ({ count = 4 }: { count?: number }) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <Card key={i}>
        <Skeleton width="70%" height="16px" />
        <Skeleton height="12px" />
        <Skeleton height="12px" />
        <Skeleton width="40%" height="12px" />
      </Card>
    ))}
  </>
);
