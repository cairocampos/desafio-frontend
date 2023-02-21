import { useOAuth } from '@/stores/oauth';
import { AxiosError } from 'axios'
import { createPinia } from 'pinia'

const pinia = createPinia()
const oauthStore = useOAuth(pinia)

const refreshToken = async () => {
  oauthStore.refreshToken();
}

const UNAUTHENTICATED = 401;
let isRefreshing = false;
export const errorHandler = async (error: AxiosError<any>) => {
  if(error.response?.status === UNAUTHENTICATED) {
    const errors: any[] = error.response?.data?.error?.errors || []
    const accessToken = oauthStore.getAccessToken()
    if(errors?.length) {
      if(accessToken && errors.find(error => error?.message === 'Invalid Credentials') && !isRefreshing) {
        isRefreshing = true;
        await refreshToken();
      }
    }
  }

  if(error?.response?.data?.error?.message) {
    alert(error?.response?.data?.error?.message)
  } 

  return Promise.reject(error)
}