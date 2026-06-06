import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '@/api';
import { channelKeys } from '@/entities/channel';
import type { Post } from '@/entities/post';
import { postKeys } from '@/entities/post';

type Variables = {
  postId: string;
  channelId: string;
};

type Context = {
  previousPosts: Post[] | undefined;
};

/** Optimistic delete: the post is removed from the cache immediately and restored on error. */
export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Variables, Context>({
    mutationFn: ({ postId }) => deletePost(postId),

    onMutate: async ({ postId, channelId }) => {
      const key = postKeys.byChannel(channelId);
      // Cancel in-flight refetches so they don't overwrite the optimistic state.
      await queryClient.cancelQueries({ queryKey: key });

      const previousPosts = queryClient.getQueryData<Post[]>(key);
      queryClient.setQueryData<Post[]>(key, (old) =>
        (old ?? []).filter((post) => post.id !== postId),
      );

      return { previousPosts };
    },

    onError: (_error, { channelId }, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(postKeys.byChannel(channelId), context.previousPosts);
      }
    },

    onSettled: (_data, _error, { channelId }) => {
      queryClient.invalidateQueries({ queryKey: postKeys.byChannel(channelId) });
      queryClient.invalidateQueries({ queryKey: channelKeys.all });
    },
  });
};
