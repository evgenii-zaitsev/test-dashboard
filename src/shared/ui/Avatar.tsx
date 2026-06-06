import { useState } from 'react';
import styled from 'styled-components';

type Props = {
  name: string;
  src?: string | null;
  size?: number;
};

// Deterministic hue per name, so a channel keeps the same color across renders.
const AVATAR_COLORS =['#2563eb', '#7c3aed', '#db2777', '#ea580c', '#059669', '#0891b2'] as const;

const colorForName = (name: string): string => {
  const sum = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length] ?? AVATAR_COLORS[0];
};

const Wrapper = styled.div<{ $size: number; $bg: string }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $bg }) => $bg};
  color: #fff;
  font-weight: 700;
  font-size: ${({ $size }) => Math.round($size * 0.42)}px;
  user-select: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Avatar = ({ name, src, size = 44 }: Props) => {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;
  const letter = name.trim().charAt(0).toUpperCase() || '?';

  return (
    <Wrapper $size={size} $bg={colorForName(name)}>
      {showImage ? (
        <img src={src ?? undefined} alt={name} onError={() => setFailed(true)} />
      ) : (
        letter
      )}
    </Wrapper>
  );
};
