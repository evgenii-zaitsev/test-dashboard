import { describe, expect, it } from 'vitest';
import type { Post } from '@/entities/post';
import { filterPosts } from './filterPosts';

const posts: Post[] = [
  { id: '1', channelId: 'c', title: 'React tips', content: '', status: 'PUBLISHED', createdAt: '2026-06-01T00:00:00.000Z' },
  { id: '2', channelId: 'c', title: 'Vue guide', content: '', status: 'DRAFT', createdAt: '2026-06-03T00:00:00.000Z' },
  { id: '3', channelId: 'c', title: 'React hooks deep dive', content: '', status: 'PENDING', createdAt: '2026-06-02T00:00:00.000Z' },
];

describe('filterPosts', () => {
  it('returns all posts (sorted desc by date) when filter is ALL and no search', () => {
    const result = filterPosts({ posts, statusFilter: 'ALL', search: '', sortDirection: 'desc' });
    expect(result.map((p) => p.id)).toEqual(['2', '3', '1']);
  });

  it('filters by status', () => {
    const result = filterPosts({ posts, statusFilter: 'DRAFT', search: '', sortDirection: 'desc' });
    expect(result.map((p) => p.id)).toEqual(['2']);
  });

  it('searches by title case-insensitively', () => {
    const result = filterPosts({ posts, statusFilter: 'ALL', search: 'react', sortDirection: 'asc' });
    expect(result.map((p) => p.id)).toEqual(['1', '3']);
  });

  it('combines status filter and search', () => {
    const result = filterPosts({ posts, statusFilter: 'PENDING', search: 'react', sortDirection: 'desc' });
    expect(result.map((p) => p.id)).toEqual(['3']);
  });

  it('sorts ascending when requested', () => {
    const result = filterPosts({ posts, statusFilter: 'ALL', search: '', sortDirection: 'asc' });
    expect(result.map((p) => p.id)).toEqual(['1', '3', '2']);
  });
});
