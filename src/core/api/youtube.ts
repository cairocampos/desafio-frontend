import { inject } from 'vue'
import { HttpClient } from '../http/http-client'
import { Youtube } from '../models/youtube'
import {YoutubeSearchParams} from '@/core/dtos/youtube-search-params'

import searchJSON from '@/mocks/search.json'
import videoCategoriesJSON from '@/mocks/videoCategories.json'
import { UploadVideoInfo } from '../dtos/upload-video-info'

export function useYoutubeApi() {
  const http = inject<HttpClient>('http') as HttpClient
  const url = "/youtube/v3"

  const search = (params: YoutubeSearchParams) => {
    // return http.get<Youtube.Search>(`${url}/search`, {
    //   params: {
    //     ...params,
    //     part: 'snippet'
    //   }
    // })
    return new Promise<{data: Youtube.Search}>(resolve => {
      setTimeout(() => {
        resolve({
          data: searchJSON
        })
      }, 500)
    })
  }

  const videoCategories = () => {
    // return http.get<Youtube.VideoCategories>(`${url}/videoCategories`)
    return new Promise<{data: Youtube.VideoCategories}>(resolve => resolve({
      data: videoCategoriesJSON
    }))
  }

  const relatedVideos = (videoId?: string) => {
    return new Promise<{data: Youtube.Search}>(resolve => resolve({
      data: searchJSON
    }))
  }

  const insertVideoInfo = (data: UploadVideoInfo) => {
    return http.post(`${url}/videos?uploadType=resumable&part=snippet,status,contentDetails`, data);
    return new Promise(resolve => {
      resolve({
        headers: {
          origin: "http://example.com"
        }
      })
    })
  }

  const uploadMedia = (url: string, data: FormData) => {
    return http.put(`${url}`, data);

    return new Promise(resolve => resolve({
      data: {
        id: "Ap7s5PJjKhc"
      }
    }))
  }

  return {
    search,
    videoCategories,
    relatedVideos,
    insertVideoInfo,
    uploadMedia
  }
}