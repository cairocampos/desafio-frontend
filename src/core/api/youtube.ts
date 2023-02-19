import { AxiosResponse } from 'axios'
import { inject } from 'vue'
import { HttpClient } from '../http/http-client'
import { Youtube } from '../models/youtube'

import searchJSON from '@/mocks/search.json'
import videoCategoriesJSON from '@/mocks/videoCategories.json'

export function useYoutubeApi() {
  const http = inject<HttpClient>('http') as HttpClient
  const url = "/youtube/v3"

  const search = () => {
    // return http.get<Youtube.Search>(`${url}/search`)
    return new Promise<{data: Youtube.Search}>(resolve => resolve({
      data: searchJSON
    }))
  }

  const videoCategories = () => {
    // return http.get<Youtube.VideoCategories>(`${url}/videoCategories`)
    return new Promise<{data: Youtube.VideoCategories}>(resolve => resolve({
      data: videoCategoriesJSON
    }))
  }

  return {
    search,
    videoCategories
  }
}