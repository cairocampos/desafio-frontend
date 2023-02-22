export interface YoutubeSearchParams {
  part?: string;
  regionCode?: string;
  maxResults?: number;
  q?: string | null;
  pageToken?: string;
  videoCategoryId?: string,
  type?:string;
}