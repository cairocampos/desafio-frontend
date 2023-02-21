import { HttpClient } from "@/core/http/http-client";
import {api} from './base'

export class AxiosAdapter implements HttpClient {
  async get<T = any>(url: string) {
    return api.get<T>(url)
  }

  async post<T = any>(url:string, data: any) {
    return api.post<T>(url, data)
  }

  async put<T = any>(url:string, data: any) {
    return api.put<T>(url, data)
  }
}