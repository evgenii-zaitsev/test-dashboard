import styled from 'styled-components';
import { POST_STATUSES } from '@/entities/post';
import {
  type StatusFilter,
  selectSearchQuery,
  selectSetSearchQuery,
  selectSetStatusFilter,
  selectSortDirection,
  selectStatusFilter,
  selectToggleSortDirection,
  useUiStore,
} from '@/store/ui';

const FILTER_OPTIONS: StatusFilter[] = ['ALL', ...POST_STATUSES];

const FILTER_LABEL: Record<StatusFilter, string> = {
  ALL: 'All',
  PENDING: 'Pending',
  PUBLISHED: 'Published',
  DRAFT: 'Draft',
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(3)};
`;

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(1)};
  padding: 4px;
  background: ${({ theme }) => theme.color.surfaceHover};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  min-width: 64px;
  padding: 6px 10px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: 600;
  color: ${({ theme, $active }) => ($active ? theme.color.text : theme.color.textMuted)};
  background: ${({ theme, $active }) => ($active ? theme.color.surface : 'transparent')};
  box-shadow: ${({ theme, $active }) => ($active ? theme.shadow.sm : 'none')};
  transition: background ${({ theme }) => theme.transition.base};
`;

const SearchRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space(2)};
`;

const Search = styled.input`
  flex: 1;
  padding: 9px 12px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.color.surface};
  color: ${({ theme }) => theme.color.text};
  font-size: ${({ theme }) => theme.font.size.md};

  &::placeholder {
    color: ${({ theme }) => theme.color.textMuted};
  }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.primary};
  }
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  white-space: nowrap;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.color.surface};
  color: ${({ theme }) => theme.color.textMuted};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.color.text};
  }
`;

export const PostFilters = () => {
  const statusFilter = useUiStore(selectStatusFilter);
  const setStatusFilter = useUiStore(selectSetStatusFilter);
  const searchQuery = useUiStore(selectSearchQuery);
  const setSearchQuery = useUiStore(selectSetSearchQuery);
  const sortDirection = useUiStore(selectSortDirection);
  const toggleSortDirection = useUiStore(selectToggleSortDirection);

  return (
    <Wrapper>
      <Tabs role="tablist">
        {FILTER_OPTIONS.map((option) => (
          <Tab
            key={option}
            role="tab"
            aria-selected={statusFilter === option}
            $active={statusFilter === option}
            onClick={() => setStatusFilter(option)}
          >
            {FILTER_LABEL[option]}
          </Tab>
        ))}
      </Tabs>

      <SearchRow>
        <Search
          type="search"
          placeholder="Search by title…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search posts by title"
        />
        <SortButton
          type="button"
          onClick={toggleSortDirection}
          aria-label="Toggle sort direction"
          title="Sort by date"
        >
          Date {sortDirection === 'desc' ? '↓' : '↑'}
        </SortButton>
      </SearchRow>
    </Wrapper>
  );
};
