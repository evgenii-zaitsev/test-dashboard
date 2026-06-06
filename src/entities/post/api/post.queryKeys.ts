export const postKeys = {
  all: ['posts'] as const,
  byChannel: (channelId: string) => [...postKeys.all, channelId] as const,
};
