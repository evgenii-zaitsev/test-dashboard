import type { Channel } from '@/entities/channel';
import type { Post } from '@/entities/post';
import { db } from '../db/mockDb';
import { clone, delay, maybeFail } from '../lib';

export async function fetchPostsByChannel(channelId: string): Promise<Post[]> {
  await delay();
  maybeFail('fetchPostsByChannel');
  return clone(db.posts.filter((post) => post.channelId === channelId));
}

export async function deletePost(postId: string): Promise<void> {
  await delay();

  const post = db.posts.find((p) => p.id === postId);
  db.posts = db.posts.filter((p) => p.id !== postId);

  // Keep the channel's counters in sync, like a real backend would.
  if (post) {
    const channel = db.channels.find((c) => c.id === post.channelId);
    if (channel) {
      const key = post.status.toLowerCase() as keyof Channel['postsCount'];
      channel.postsCount[key] = Math.max(0, channel.postsCount[key] - 1);
    }
  }
}
