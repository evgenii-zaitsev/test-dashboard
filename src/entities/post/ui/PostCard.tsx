import type { ReactNode } from 'react';
import styled from 'styled-components';
import { formatDate } from '@/shared/lib';
import { StatusBadge } from './StatusBadge';
import type { Post } from '../model/types';

type Props = {
  post: Post;
  /** Action slot (e.g. the delete button), so the card stays presentational. */
  action?: ReactNode;
};

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(2)};
  padding: ${({ theme }) => theme.space(4)};
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(2)};
`;

const Title = styled.h4`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
`;

const Content = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.color.textMuted};
  /* Clamp the preview to 3 lines. */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(2)};
  margin-top: ${({ theme }) => theme.space(1)};
`;

const Date_ = styled.span`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.color.textMuted};
`;

export const PostCard = ({ post, action }: Props) => (
  <Card>
    <TopRow>
      <Title>{post.title}</Title>
      <StatusBadge status={post.status} />
    </TopRow>
    <Content>{post.content}</Content>
    <Footer>
      <Date_>{formatDate(post.createdAt)}</Date_>
      {action}
    </Footer>
  </Card>
);
