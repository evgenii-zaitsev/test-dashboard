import { queryOptions } from '@tanstack/react-query';
import { fetchChannels } from '@/api';
import { channelKeys } from './channel.queryKeys';

export const channelQueries = {
  list: () =>
    queryOptions({
      queryKey: channelKeys.list(),
      queryFn: fetchChannels,
    }),
};
