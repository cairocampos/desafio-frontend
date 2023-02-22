import { HttpClient, Request } from "@/core/http/http-client";
import {api} from './base'

export class AxiosAdapter implements HttpClient {
  async get<T = any>(url: string, request?: Request) {
    return api.get<T>(url, request)
  }

  async post<T = any>(url:string, data: any, request?: Request) {
    return api.post<T>(url, data, request)
  }

  async put<T = any>(url:string, data: any) {
    return api.put<T>(url, data)
  }
}