import { inject } from 'vue'
import { HttpClient } from '../http/http-client'
import { Youtube } from '../models/youtube'
import {YoutubeSearchParams} from '@/core/dtos/youtube-search-params'

import searchJSON from '@/mocks/search.json'
import { UploadVideoInfo } from '../dtos/upload-video-info'
import { removeEmptyPropertiesFromObject } from '../helpers'

export function useYoutubeApi() {
  const http = inject<HttpClient>('http') as HttpClient
  const url = "/youtube/v3"

  const search = (params: YoutubeSearchParams) => {
    const requestParams = Object.assign(params, {
      part: 'snippet',
      maxResults: 50,
      type: 'video'
    })

    return http.get<Youtube.Search>(`${url}/search`, {
      params: removeEmptyPropertiesFromObject(requestParams),
    })
  }

  const videoCategories = () => {
    return http.get<Youtube.VideoCategories>(`${url}/videoCategories`, {
      params: {
        regionCode: 'BR',
        part: 'snippet'
      }
    })
  }

  const relatedVideos = (videoId?: string) => {
    return new Promise<{data: Youtube.Search}>(resolve => resolve({
      data: searchJSON
    }))
  }

  const insertVideoInfo = (data: UploadVideoInfo, file: File) => {
    return http.post(`/upload${url}/videos`, data, {
      params: {
        uploadType: "resumable",
        part: "snippet,status,contentDetails"
      },
      headers: {
        'X-Upload-Content-Length': file.size + '',
        'X-Upload-Content-Type': 'video/*' 
      }
    });
  }

  const uploadMedia = (url: string, data: File) => {
    return http.put<{id:string}>(`${url}`, data);
  }

  return {
    search,
    videoCategories,
    relatedVideos,
    insertVideoInfo,
    uploadMedia
  }
}