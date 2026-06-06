import styled, { keyframes } from 'styled-components';
import { PostFilters } from '@/features/post-filters';
import { useChannelDrawer } from '../model/useChannelDrawer';
import { PostList } from './PostList';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: ${({ theme }) => theme.color.overlay};
  animation: ${fadeIn} ${({ theme }) => theme.transition.base};
`;

const Panel = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  width: ${({ theme }) => theme.drawerWidth};
  max-width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.color.bg};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  animation: ${slideIn} ${({ theme }) => theme.transition.base};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 100%;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(2)};
  padding: ${({ theme }) => theme.space(4)} ${({ theme }) => theme.space(5)};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.surface};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background: transparent;
  color: ${({ theme }) => theme.color.textMuted};
  font-size: 20px;
  line-height: 1;

  &:hover {
    background: ${({ theme }) => theme.color.surfaceHover};
    color: ${({ theme }) => theme.color.text};
  }
`;

const FiltersBar = styled.div`
  padding: ${({ theme }) => theme.space(4)} ${({ theme }) => theme.space(5)};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.surface};
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.space(4)} ${({ theme }) => theme.space(5)};
`;

export const ChannelDrawer = () => {
  const { isOpen, selectedChannelId, channel, closeDrawer } = useChannelDrawer();

  if (!isOpen || !selectedChannelId) return null;

  return (
    <>
      <Overlay onClick={closeDrawer} />
      <Panel role="dialog" aria-modal="true" aria-label={channel?.name ?? 'Channel posts'}>
        <Header>
          <Title>{channel?.name ?? 'Channel'}</Title>
          <CloseButton type="button" onClick={closeDrawer} aria-label="Close drawer">
            ✕
          </CloseButton>
        </Header>

        <FiltersBar>
          <PostFilters />
        </FiltersBar>

        <Body>
          <PostList channelId={selectedChannelId} />
        </Body>
      </Panel>
    </>
  );
};
