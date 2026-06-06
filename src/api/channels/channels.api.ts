import type { Channel } from '@/entities/channel';
import { db } from '../db/mockDb';
import { clone, delay, maybeFail } from '../lib';

export async function fetchChannels(): Promise<Channel[]> {
  await delay();
  maybeFail('fetchChannels');
  return clone(db.channels);
}
