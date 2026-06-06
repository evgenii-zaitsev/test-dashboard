import styled from 'styled-components';
import type { ChannelMode } from '../model/types';

type Props = {
  mode: ChannelMode;
};

const MODE_LABEL: Record<ChannelMode, string> = {
  AUTOPOSTING: 'Autoposting',
  PREMODERATION: 'Premoderation',
};

const MODE_THEME_KEY = {
  AUTOPOSTING: 'autoposting',
  PREMODERATION: 'premoderation',
} as const;

const Badge = styled.span<{ $mode: ChannelMode }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: 600;
  background: ${({ theme, $mode }) => theme.mode[MODE_THEME_KEY[$mode]].bg};
  color: ${({ theme, $mode }) => theme.mode[MODE_THEME_KEY[$mode]].fg};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

export const ModeBadge = ({ mode }: Props) => <Badge $mode={mode}>{MODE_LABEL[mode]}</Badge>;
