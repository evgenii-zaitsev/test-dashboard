import { useState } from 'react';
import { Button, ConfirmModal, Spinner } from '@/shared/ui';
import { useDeletePostMutation } from '../api/useDeletePostMutation';

type Props = {
  postId: string;
  channelId: string;
  postTitle: string;
};

export const DeletePostButton = ({ postId, channelId, postTitle }: Props) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { mutate, isPending } = useDeletePostMutation();

  const handleConfirm = () => {
    mutate(
      { postId, channelId },
      { onSettled: () => setConfirmOpen(false) },
    );
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setConfirmOpen(true)}
        disabled={isPending}
        aria-label={`Delete post ${postTitle}`}
      >
        {isPending ? <Spinner /> : '🗑'} Delete
      </Button>

      <ConfirmModal
        open={confirmOpen}
        title="Delete this post?"
        description="This action can’t be undone."
        confirmLabel="Delete"
        isConfirming={isPending}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};
