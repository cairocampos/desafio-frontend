import { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios'

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  return config;
}

export const errorHandler = (error: AxiosError) => {
  return Promise.reject(error)
}

export const registerInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(requestInterceptor)
  instance.interceptors.response.use(response => response, errorHandler)
}