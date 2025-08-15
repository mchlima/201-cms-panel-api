import { AppError } from './AppError';

export class BadRequestError extends AppError {
  constructor(
    message = 'Unhandled bad request error',
    code = 'BAD_REQUEST_ERROR',
    statusCode = 400,
    context?: Record<string, unknown>
  ) {
    super(code, message, statusCode, context);
    this.name = 'BadRequestError';

    Object.setPrototypeOf(this, BadRequestError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestError);
    }
  }
}
