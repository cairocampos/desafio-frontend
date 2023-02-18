import { Common } from "./common";
import { Thumbnail } from "./thumbnail";

export interface SearchItems extends Common {
  id: {
    kind: string;
    videoId: string;
  },
  snippet: {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: {
      default: Thumbnail
      medium: Thumbnail
      high: Thumbnail
    }
    channelTitle: string
    liveBroadcastContent: string
    publishTime: string
  }
}