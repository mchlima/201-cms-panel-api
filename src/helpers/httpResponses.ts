import { IHttpResponse } from '@/controllers/IController';

export const ok = <T = any>(body: T): IHttpResponse<T> => {
  return { statusCode: 200, body };
};

export const created = <T = any>(body: T): IHttpResponse<T> => {
  return { statusCode: 201, body };
};

export const noContent = <T = any>(body: T): IHttpResponse<T> => {
  return { statusCode: 204, body };
};

export const badRequest = (
  message: string = 'Bad Request'
): IHttpResponse<{ error: string }> => {
  return { statusCode: 400, body: { error: message } };
};

export const unauthorized = (
  message: string = 'Unauthorized'
): IHttpResponse<{ error: string }> => {
  return { statusCode: 401, body: { error: message } };
};

export const forbidden = (
  message: string = 'Forbidden'
): IHttpResponse<{ error: string }> => {
  return { statusCode: 403, body: { error: message } };
};

export const notFound = (
  message: string = 'Not Found'
): IHttpResponse<{ error: string }> => {
  return { statusCode: 404, body: { error: message } };
};

export const serverError = (
  message: string = 'Internal Server Error'
): IHttpResponse<{ error: string }> => {
  return { statusCode: 500, body: { error: message } };
};
