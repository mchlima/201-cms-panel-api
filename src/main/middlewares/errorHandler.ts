import { Logger } from '@/shared/utils/Logger';
import { HttpResponse } from '@/presentation/protocols';
import {
  AppError,
  CriticalError,
  ZodValidationError,
} from '@/presentation/errors';
import { Request, Response, NextFunction } from 'express';

function formatValidationError(err: ZodValidationError): HttpResponse {
  return {
    statusCode: 400,
    error: {
      code: 'VALIDATION_ERROR',
      message: 'Validation failed',
      details: err.details,
    },
  };
}

function formatAppError(err: AppError): HttpResponse {
  return {
    statusCode: err.statusCode || 400,
    error: {
      code: err.code || 'APP_ERROR',
      message: err.message,
      context: err.context ?? null,
    },
  };
}

function formatCriticalError(err: CriticalError): HttpResponse {
  return {
    statusCode: err.statusCode,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An internal server error occurred.',
    },
  };
}

function formatGenericError(err: any): HttpResponse {
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
  let httpResponse: HttpResponse;

  if (err instanceof CriticalError) {
    httpResponse = formatCriticalError(err);
  } else if (err instanceof AppError) {
    httpResponse = formatAppError(err);
  } else if (err instanceof ZodValidationError) {
    httpResponse = formatValidationError(err);
  } else {
    httpResponse = formatGenericError(err);
  }

  Logger.error(err);

  res.status(httpResponse.statusCode).json(httpResponse.error);
}
