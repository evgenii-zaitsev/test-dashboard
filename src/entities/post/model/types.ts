export type PostStatus = 'PENDING' | 'PUBLISHED' | 'DRAFT';

export const POST_STATUSES: readonly PostStatus[] = ['PENDING', 'PUBLISHED', 'DRAFT'] as const;

export interface Post {
  id: string;
  channelId: string;
  title: string;
  content: string;
  status: PostStatus;
  /** ISO 8601, e.g. 2026-06-06T09:00:00.000Z */
  createdAt: string;
}
