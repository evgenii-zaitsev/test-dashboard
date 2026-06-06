import { create } from 'zustand';
import type { PostStatus } from '@/entities/post';

export type StatusFilter = 'ALL' | PostStatus;
export type SortDirection = 'desc' | 'asc';

export interface UiState {
  selectedChannelId: string | null;
  isDrawerOpen: boolean;
  statusFilter: StatusFilter;
  searchQuery: string;
  sortDirection: SortDirection;

  openChannel: (channelId: string) => void;
  closeDrawer: () => void;
  setStatusFilter: (filter: StatusFilter) => void;
  setSearchQuery: (query: string) => void;
  toggleSortDirection: () => void;
}

const initialFilters = {
  statusFilter: 'ALL' as StatusFilter,
  searchQuery: '',
  sortDirection: 'desc' as SortDirection,
};

// UI-only state. Server data (channels/posts) lives in TanStack Query, never here.
export const useUiStore = create<UiState>((set) => ({
  selectedChannelId: null,
  isDrawerOpen: false,
  ...initialFilters,

  // Opening a channel resets the filters so each drawer starts clean.
  openChannel: (channelId) =>
    set({ selectedChannelId: channelId, isDrawerOpen: true, ...initialFilters }),

  closeDrawer: () => set({ isDrawerOpen: false }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  toggleSortDirection: () =>
    set((state) => ({ sortDirection: state.sortDirection === 'desc' ? 'asc' : 'desc' })),
}));
