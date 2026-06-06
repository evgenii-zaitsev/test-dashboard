import styled from 'styled-components';
import { PostCard } from '@/entities/post';
import { DeletePostButton } from '@/features/delete-post';
import { useChannelPosts } from '@/features/post-filters';
import { EmptyState, ErrorState } from '@/shared/ui';
import { PostListSkeleton } from './PostListSkeleton';

type Props = {
  channelId: string;
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(3)};
`;

export const PostList = ({ channelId }: Props) => {
  const { visiblePosts, totalCount, isPending, isError, refetch } = useChannelPosts(channelId);

  if (isPending) return <PostListSkeleton />;

  if (isError) {
    return (
      <ErrorState
        title="Couldn’t load posts"
        message="The request failed. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  if (totalCount === 0) {
    return (
      <EmptyState
        icon="📝"
        title="No posts in this channel"
        description="When this channel has posts, they’ll appear here."
      />
    );
  }

  if (visiblePosts.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="Nothing matches your filters"
        description="Try a different status or clear the search."
      />
    );
  }

  return (
    <List>
      {visiblePosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          action={
            <DeletePostButton postId={post.id} channelId={channelId} postTitle={post.title} />
          }
        />
      ))}
    </List>
  );
};
