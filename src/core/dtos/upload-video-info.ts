export interface UploadVideoInfo {
  snippet: {
    title: string
    description: string
  },
  status: {
    privacyStatus: string,
    embeddable: boolean
  }
}