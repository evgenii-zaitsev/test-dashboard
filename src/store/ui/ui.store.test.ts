import { beforeEach, describe, expect, it } from 'vitest';
import {
  selectIsDrawerOpen,
  selectSelectedChannelId,
  selectStatusFilter,
  useUiStore,
} from './index';

const reset = () =>
  useUiStore.setState({
    selectedChannelId: null,
    isDrawerOpen: false,
    statusFilter: 'ALL',
    searchQuery: '',
    sortDirection: 'desc',
  });

describe('ui.store', () => {
  beforeEach(reset);

  it('openChannel selects the channel and opens the drawer', () => {
    useUiStore.getState().openChannel('ch_01');
    const state = useUiStore.getState();
    expect(selectSelectedChannelId(state)).toBe('ch_01');
    expect(selectIsDrawerOpen(state)).toBe(true);
  });

  it('openChannel resets filters/search/sort to defaults', () => {
    useUiStore.setState({ statusFilter: 'DRAFT', searchQuery: 'x', sortDirection: 'asc' });
    useUiStore.getState().openChannel('ch_02');
    const state = useUiStore.getState();
    expect(state.statusFilter).toBe('ALL');
    expect(state.searchQuery).toBe('');
    expect(state.sortDirection).toBe('desc');
  });

  it('closeDrawer hides the drawer but keeps the selected channel', () => {
    useUiStore.getState().openChannel('ch_01');
    useUiStore.getState().closeDrawer();
    const state = useUiStore.getState();
    expect(selectIsDrawerOpen(state)).toBe(false);
    expect(selectSelectedChannelId(state)).toBe('ch_01');
  });

  it('setStatusFilter updates the filter selector', () => {
    useUiStore.getState().setStatusFilter('PUBLISHED');
    expect(selectStatusFilter(useUiStore.getState())).toBe('PUBLISHED');
  });

  it('toggleSortDirection flips between desc and asc', () => {
    expect(useUiStore.getState().sortDirection).toBe('desc');
    useUiStore.getState().toggleSortDirection();
    expect(useUiStore.getState().sortDirection).toBe('asc');
    useUiStore.getState().toggleSortDirection();
    expect(useUiStore.getState().sortDirection).toBe('desc');
  });
});
