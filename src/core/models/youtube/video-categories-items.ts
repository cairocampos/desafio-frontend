import { Common } from './common';

export interface VideoCategoriesItems extends Common {
  id: string,
  snippet: {
    title: string
    assignable: boolean,
    channelId: string
  }
}