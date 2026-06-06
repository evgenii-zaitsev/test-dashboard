import { useQuery } from '@tanstack/react-query';
import { postQueries } from './post.queries';

export const usePostsQuery = (channelId: string | null) =>
  useQuery({
    ...postQueries.byChannel(channelId ?? ''),
    // Skip the request until a channel is selected.
    enabled: Boolean(channelId),
  });
