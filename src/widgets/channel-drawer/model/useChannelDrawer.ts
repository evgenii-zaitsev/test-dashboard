import { useEffect } from 'react';
import { useSelectedChannel } from '@/entities/channel';
import {
  selectCloseDrawer,
  selectIsDrawerOpen,
  selectSelectedChannelId,
  useUiStore,
} from '@/store/ui';

/** Drawer state + the channel it points at, plus Escape-to-close and scroll lock. */
export const useChannelDrawer = () => {
  const isOpen = useUiStore(selectIsDrawerOpen);
  const selectedChannelId = useUiStore(selectSelectedChannelId);
  const closeDrawer = useUiStore(selectCloseDrawer);
  const channel = useSelectedChannel(selectedChannelId);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeDrawer]);

  return { isOpen, selectedChannelId, channel, closeDrawer };
};
