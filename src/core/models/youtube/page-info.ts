export interface PageInfo {
  nextPageToken:string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  }
}