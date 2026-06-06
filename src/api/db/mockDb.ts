import type { Channel } from '@/entities/channel';
import type { Post, PostStatus } from '@/entities/post';

interface ChannelSeed {
  id: string;
  name: string;
  avatarUrl: string | null;
  mode: Channel['mode'];
  /** Post counts per status. An empty object yields an empty channel. */
  posts: Partial<Record<PostStatus, number>>;
}

const CHANNEL_SEEDS: ChannelSeed[] = [
  {
    id: 'ch_01',
    name: 'Tech News',
    avatarUrl: 'https://i.pravatar.cc/120?img=12',
    mode: 'AUTOPOSTING',
    posts: { PUBLISHED: 4, PENDING: 2, DRAFT: 1 },
  },
  {
    id: 'ch_02',
    name: 'Design Daily',
    avatarUrl: null,
    mode: 'PREMODERATION',
    posts: { PUBLISHED: 2, PENDING: 3, DRAFT: 2 },
  },
  {
    id: 'ch_03',
    name: 'Startup Digest',
    avatarUrl: 'https://i.pravatar.cc/120?img=33',
    mode: 'AUTOPOSTING',
    posts: { PUBLISHED: 5, PENDING: 1, DRAFT: 2 },
  },
  {
    id: 'ch_04',
    name: 'Crypto Watch',
    avatarUrl: null,
    mode: 'PREMODERATION',
    posts: { PUBLISHED: 3, PENDING: 2, DRAFT: 1 },
  },
  {
    id: 'ch_05',
    name: 'Marketing Hub',
    avatarUrl: 'https://i.pravatar.cc/120?img=58',
    mode: 'AUTOPOSTING',
    posts: { PUBLISHED: 3, PENDING: 3, DRAFT: 2 },
  },
  {
    // Intentionally empty — drives the empty state.
    id: 'ch_06',
    name: 'Quiet Channel',
    avatarUrl: null,
    mode: 'PREMODERATION',
    posts: {},
  },
];

const TITLE_FRAGMENTS = [
  'Breaking: a new milestone reached',
  'Weekly roundup and key takeaways',
  'How we shipped this in record time',
  'Deep dive into the latest release',
  '5 things you should know today',
  'Behind the scenes of our process',
  'What changed and why it matters',
  'A practical guide for beginners',
  'Lessons learned from the trenches',
  'The future is closer than you think',
];

const CONTENT_FRAGMENTS = [
  'In this post we walk through the details and explain the reasoning behind every decision, so you can apply the same approach to your own work.',
  'There has been a lot of discussion lately, and we wanted to share our perspective along with concrete examples and a few cautionary notes.',
  'We spent the last few weeks experimenting with different approaches. Here is a summary of what worked, what did not, and what surprised us.',
  'This is a longer read that covers the background, the current state of things, and where we believe the space is heading over the next year.',
  'Short version: it works. Longer version: there are trade-offs worth understanding before you commit to this path in production.',
];

const dateForIndex = (globalIndex: number): string => {
  const base = Date.UTC(2026, 5, 6, 9, 0, 0);
  const dayMs = 24 * 60 * 60 * 1000;
  const offset = (globalIndex * 1.7 + (globalIndex % 5)) * dayMs;
  return new Date(base - offset).toISOString();
};

function buildPosts(): Post[] {
  const posts: Post[] = [];
  let globalIndex = 0;

  for (const channel of CHANNEL_SEEDS) {
    let postInChannel = 0;
    for (const status of ['PUBLISHED', 'PENDING', 'DRAFT'] as PostStatus[]) {
      const count = channel.posts[status] ?? 0;
      for (let i = 0; i < count; i += 1) {
        const titleSeed = (globalIndex + postInChannel) % TITLE_FRAGMENTS.length;
        const contentSeed = (globalIndex + i) % CONTENT_FRAGMENTS.length;
        posts.push({
          id: `${channel.id}_post_${postInChannel + 1}`,
          channelId: channel.id,
          title: `${channel.name}: ${TITLE_FRAGMENTS[titleSeed]}`,
          content: `${CONTENT_FRAGMENTS[contentSeed]} ${CONTENT_FRAGMENTS[(contentSeed + 2) % CONTENT_FRAGMENTS.length]}`,
          status,
          createdAt: dateForIndex(globalIndex),
        });
        globalIndex += 1;
        postInChannel += 1;
      }
    }
  }

  return posts;
}

function buildChannels(): Channel[] {
  return CHANNEL_SEEDS.map((seed) => ({
    id: seed.id,
    name: seed.name,
    avatarUrl: seed.avatarUrl,
    mode: seed.mode,
    postsCount: {
      pending: seed.posts.PENDING ?? 0,
      published: seed.posts.PUBLISHED ?? 0,
      draft: seed.posts.DRAFT ?? 0,
    },
  }));
}

/** Mutable in-memory "database" — deletions persist for the session. */
export const db = {
  channels: buildChannels(),
  posts: buildPosts(),
};
