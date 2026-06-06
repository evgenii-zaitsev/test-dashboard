import type { Post } from '@/entities/post';
import type { SortDirection, StatusFilter } from '@/store/ui';

type Args = {
  posts: Post[];
  statusFilter: StatusFilter;
  search: string;
  sortDirection: SortDirection;
};

export function filterPosts({ posts, statusFilter, search, sortDirection }: Args): Post[] {
  const normalizedSearch = search.trim().toLowerCase();

  const filtered = posts.filter((post) => {
    const matchesStatus = statusFilter === 'ALL' || post.status === statusFilter;
    const matchesSearch =
      normalizedSearch === '' || post.title.toLowerCase().includes(normalizedSearch);
    return matchesStatus && matchesSearch;
  });

  return filtered.sort((a, b) => {
    const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return sortDirection === 'asc' ? diff : -diff;
  });
}
