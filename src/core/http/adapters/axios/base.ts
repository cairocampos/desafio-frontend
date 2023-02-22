import axios from 'axios';
import { registerInterceptors } from '../../../http/adapters/axios/interceptors'

const isProduction = import.meta.env.PROD

const api = axios.create({
  baseURL: isProduction ? import.meta.env.VITE_GOOGLE_API_BASE_URL : '/api',
  params: {
    key: import.meta.env.VITE_GOOGLE_API_KEY
  }
});

registerInterceptors(api);

export {
  api
}