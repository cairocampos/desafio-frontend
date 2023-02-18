import axios from 'axios';
import { registerInterceptors } from '../../../http/adapters/axios/interceptors'

const api = axios.create({
  baseURL: import.meta.env.VITE_GOOGLE_API_BASE_URL,
  params: {
    key: import.meta.env.VITE_GOOGLE_API_KEY
  }
});

registerInterceptors(api);

export {
  api
}