export interface HttpRequest<T = any> {
  body?: T;
  params?: any;
  query?: any;
  headers?: any;
  payload?: {
    userId: string;
  };
  user?: any;
}

export interface HttpResponse<R = any> {
  statusCode: number;
  body?: R;
  error?: any;
}

export interface Controller<T = any, R = any> {
  handle(request: HttpRequest<T>): Promise<HttpResponse<R>>;
}
