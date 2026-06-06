export type ChannelMode = 'AUTOPOSTING' | 'PREMODERATION';

export interface ChannelPostsCount {
  pending: number;
  published: number;
  draft: number;
}

export interface Channel {
  id: string;
  name: string;
  avatarUrl: string | null;
  mode: ChannelMode;
  postsCount: ChannelPostsCount;
}
