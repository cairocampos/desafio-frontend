import { HttpClient } from "@/core/http/http-client";
import {api} from './base'

export class AxiosAdapter implements HttpClient {
  async get<T = any>(url: string) {
    return api.get<T>(url)
  }
}