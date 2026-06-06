import styled from 'styled-components';
import type { PostStatus } from '../model/types';

type Props = {
  status: PostStatus;
};

const STATUS_LABEL: Record<PostStatus, string> = {
  PENDING: 'Pending',
  PUBLISHED: 'Published',
  DRAFT: 'Draft',
};

const STATUS_THEME_KEY = {
  PENDING: 'pending',
  PUBLISHED: 'published',
  DRAFT: 'draft',
} as const;

const Badge = styled.span<{ $status: PostStatus }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 9px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: 600;
  letter-spacing: 0.02em;
  background: ${({ theme, $status }) => theme.status[STATUS_THEME_KEY[$status]].bg};
  color: ${({ theme, $status }) => theme.status[STATUS_THEME_KEY[$status]].fg};
`;

export const StatusBadge = ({ status }: Props) => (
  <Badge $status={status}>{STATUS_LABEL[status]}</Badge>
);
