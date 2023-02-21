import { useOAuth } from '@/stores/oauth';
import { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { createPinia } from 'pinia'
import { errorHandler } from './error-handler';

const pinia = createPinia()
const oauthStore = useOAuth(pinia)

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const accessToken = oauthStore.getAccessToken()
  if(config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config;
}

export const registerInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(requestInterceptor)
  instance.interceptors.response.use(response => response, errorHandler)
}