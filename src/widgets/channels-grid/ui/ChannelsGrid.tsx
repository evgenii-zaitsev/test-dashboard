import styled, { keyframes } from 'styled-components';
import { ChannelCard, useChannelsQuery } from '@/entities/channel';
import { EmptyState, ErrorState } from '@/shared/ui';
import { selectOpenChannel, useUiStore } from '@/store/ui';
import { ChannelCardSkeleton } from './ChannelCardSkeleton';

const SKELETON_COUNT = 6;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.space(4)};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Cell = styled.div<{ $index: number }>`
  animation: ${fadeUp} 0.32s ease both;
  animation-delay: ${({ $index }) => Math.min($index, 8) * 45}ms;
`;

export const ChannelsGrid = () => {
  const openChannel = useUiStore(selectOpenChannel);
  const { data: channels, isPending, isError, refetch } = useChannelsQuery();

  if (isPending) {
    return (
      <Grid>
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <ChannelCardSkeleton key={i} />
        ))}
      </Grid>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Couldn’t load channels"
        message="The request failed. This happens on purpose ~10% of the time."
        onRetry={() => refetch()}
      />
    );
  }

  if (channels.length === 0) {
    return <EmptyState title="No channels yet" description="There are no channels to display." />;
  }

  return (
    <Grid>
      {channels.map((channel, index) => (
        <Cell key={channel.id} $index={index}>
          <ChannelCard channel={channel} onClick={openChannel} />
        </Cell>
      ))}
    </Grid>
  );
};
