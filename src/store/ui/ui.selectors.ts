import type { UiState } from './ui.store';

export const selectSelectedChannelId = (s: UiState) => s.selectedChannelId;
export const selectIsDrawerOpen = (s: UiState) => s.isDrawerOpen;
export const selectStatusFilter = (s: UiState) => s.statusFilter;
export const selectSearchQuery = (s: UiState) => s.searchQuery;
export const selectSortDirection = (s: UiState) => s.sortDirection;

export const selectOpenChannel = (s: UiState) => s.openChannel;
export const selectCloseDrawer = (s: UiState) => s.closeDrawer;
export const selectSetStatusFilter = (s: UiState) => s.setStatusFilter;
export const selectSetSearchQuery = (s: UiState) => s.setSearchQuery;
export const selectToggleSortDirection = (s: UiState) => s.toggleSortDirection;
