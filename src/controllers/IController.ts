export interface IHttpRequest<T = any> {
  body?: T;
  params?: any;
  query?: any;
  headers?: any;
  payload?: any;
  user?: any;
}

export interface IHttpResponse<R = any> {
  statusCode: number;
  body?: R;
  error?: any;
}

export interface IController<T = any, R = any> {
  handle(request: IHttpRequest<T>): Promise<IHttpResponse<R>>;
}
