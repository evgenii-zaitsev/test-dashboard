import { useMemo } from 'react';
import { usePostsQuery } from '@/entities/post';
import { useDebounce } from '@/shared/lib';
import {
  selectSearchQuery,
  selectSortDirection,
  selectStatusFilter,
  useUiStore,
} from '@/store/ui';
import { filterPosts } from '../lib/filterPosts';

/** A channel's posts with the current filter/search/sort applied (search debounced 300ms). */
export const useChannelPosts = (channelId: string) => {
  const query = usePostsQuery(channelId);

  const statusFilter = useUiStore(selectStatusFilter);
  const searchQuery = useUiStore(selectSearchQuery);
  const sortDirection = useUiStore(selectSortDirection);
  const debouncedSearch = useDebounce(searchQuery, 300);

  const visiblePosts = useMemo(() => {
    if (!query.data) return [];
    return filterPosts({
      posts: query.data,
      statusFilter,
      search: debouncedSearch,
      sortDirection,
    });
  }, [query.data, statusFilter, debouncedSearch, sortDirection]);

  return {
    ...query,
    totalCount: query.data?.length ?? 0,
    visiblePosts,
  };
};
