import { useChannelsQuery } from '../api/useChannelsQuery';

/** Resolves a channel from the channels cache — no extra request. */
export const useSelectedChannel = (channelId: string | null) => {
  const { data: channels } = useChannelsQuery();
  return channels?.find((channel) => channel.id === channelId) ?? null;
};
