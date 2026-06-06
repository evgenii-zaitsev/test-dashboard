import { queryOptions } from '@tanstack/react-query';
import { fetchPostsByChannel } from '@/api';
import { postKeys } from './post.queryKeys';

export const postQueries = {
  byChannel: (channelId: string) =>
    queryOptions({
      queryKey: postKeys.byChannel(channelId),
      queryFn: () => fetchPostsByChannel(channelId),
    }),
};
