import styled from 'styled-components';
import { ThemeToggle } from '@/features/theme-toggle';
import { ChannelDrawer } from '@/widgets/channel-drawer';
import { ChannelsGrid } from '@/widgets/channels-grid';

const Page = styled.div`
  min-height: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space(8)} ${({ theme }) => theme.space(6)};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    padding: ${({ theme }) => theme.space(5)} ${({ theme }) => theme.space(4)};
  }
`;

const Header = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(3)};
  margin-bottom: ${({ theme }) => theme.space(7)};
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(1)};
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.color.textMuted};
`;

export const DashboardPage = () => (
  <Page>
    <Header>
      <Heading>
        <Title>Channels Dashboard</Title>
        <Subtitle>Manage your Telegram channels and their posts.</Subtitle>
      </Heading>
      <ThemeToggle />
    </Header>

    <ChannelsGrid />
    <ChannelDrawer />
  </Page>
);
