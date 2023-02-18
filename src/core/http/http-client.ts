type Response<T> = {
  data: T;
  status: number;
  statusText: string;
  headers: any
  config: any;
  request?: any;
}

export interface HttpClient {
  get<T = any>(url: string): Promise<Response<T>>;
}