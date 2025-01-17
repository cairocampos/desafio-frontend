import { Common } from "./common";
import { PageInfo } from "./page-info";
import { SearchItem } from "./search-items";
import { VideoCategoriesItems } from "./video-categories-items";

export namespace Youtube {
  export interface VideoCategories extends Common {
    items: VideoCategoriesItems[]
  }

  export interface Search extends Common, PageInfo {
    items: SearchItem[]
  }
}