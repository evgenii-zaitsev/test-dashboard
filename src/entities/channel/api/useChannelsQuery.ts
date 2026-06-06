import { useQuery } from '@tanstack/react-query';
import { channelQueries } from './channel.queries';

export const useChannelsQuery = () => useQuery(channelQueries.list());
