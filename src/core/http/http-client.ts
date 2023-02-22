export type Response<T> = {
  data: T;
  status?: number;
  statusText?: string;
  headers?: any
  config?: any;
  request?: any;
}

export type Request = {
  params?: any,
  headers?: any
}

export interface HttpClient {
  get<T = any>(url: string, request?: Request): Promise<Response<T>>;
  post<T = any>(url: string, data: any, request?: Request): Promise<Response<T>>;
  put<T = any>(url: string, data: any): Promise<Response<T>>;
}