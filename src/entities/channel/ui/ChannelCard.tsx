import styled from 'styled-components';
import { Avatar } from '@/shared/ui';
import { ModeBadge } from './ModeBadge';
import type { Channel } from '../model/types';

type Props = {
  channel: Channel;
  onClick: (channelId: string) => void;
};

const Card = styled.button`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(4)};
  width: 100%;
  padding: ${({ theme }) => theme.space(5)};
  text-align: left;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition: transform ${({ theme }) => theme.transition.base},
    box-shadow ${({ theme }) => theme.transition.base},
    border-color ${({ theme }) => theme.transition.base};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.md};
    border-color: ${({ theme }) => theme.color.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.primary};
    outline-offset: 2px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
`;

const Name = styled.h3`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
`;

const Counters = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space(2)};
`;

const Counter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: ${({ theme }) => theme.space(2)};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.color.surfaceHover};
`;

const CounterValue = styled.span`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
`;

const CounterLabel = styled.span`
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: 600;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.color.textMuted};
`;

export const ChannelCard = ({ channel, onClick }: Props) => (
  <Card type="button" onClick={() => onClick(channel.id)} aria-label={`Open ${channel.name}`}>
    <Header>
      <Avatar name={channel.name} src={channel.avatarUrl} />
      <div>
        <Name>{channel.name}</Name>
      </div>
    </Header>

    <ModeBadge mode={channel.mode} />

    <Counters>
      <Counter>
        <CounterValue>{channel.postsCount.pending}</CounterValue>
        <CounterLabel>PENDING</CounterLabel>
      </Counter>
      <Counter>
        <CounterValue>{channel.postsCount.published}</CounterValue>
        <CounterLabel>PUBLISHED</CounterLabel>
      </Counter>
      <Counter>
        <CounterValue>{channel.postsCount.draft}</CounterValue>
        <CounterLabel>DRAFT</CounterLabel>
      </Counter>
    </Counters>
  </Card>
);
