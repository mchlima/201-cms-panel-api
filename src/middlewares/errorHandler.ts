import { Logger } from '@/utils/Logger';
import { IHttpResponse } from '@/controllers';
import { AppError, CriticalError } from '@/errors';
import { Request, Response, NextFunction } from 'express';

function formatAppError(err: AppError): IHttpResponse {
  return {
    statusCode: err.statusCode || 400,
    error: {
      code: err.code || 'APP_ERROR',
      message: err.message,
      context: err.context ?? null,
    },
  };
}

function formatCriticalError(err: CriticalError): IHttpResponse {
  return {
    statusCode: err.statusCode,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An internal server error occurred.',
    },
  };
}

function formatGenericError(err: any): IHttpResponse {
  return {
    statusCode: 500,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message:
        'Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.',
    },
  };
}

export async function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let httpResponse: IHttpResponse;

  if (err instanceof CriticalError) {
    httpResponse = formatCriticalError(err);
  } else if (err instanceof AppError) {
    httpResponse = formatAppError(err);
  } else {
    httpResponse = formatGenericError(err);
  }

  Logger.error(err);

  res.status(httpResponse.statusCode).json(httpResponse.error);
}
