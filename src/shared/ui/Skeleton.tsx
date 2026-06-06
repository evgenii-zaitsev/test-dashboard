import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

type SkeletonProps = {
  width?: string;
  height?: string;
  radius?: string;
};

export const Skeleton = styled.div<SkeletonProps>`
  width: ${({ width = '100%' }) => width};
  height: ${({ height = '14px' }) => height};
  border-radius: ${({ theme, radius }) => radius ?? theme.radius.sm};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.color.skeleton} 0px,
    ${({ theme }) => theme.color.skeletonHighlight} 40px,
    ${({ theme }) => theme.color.skeleton} 80px
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
`;
