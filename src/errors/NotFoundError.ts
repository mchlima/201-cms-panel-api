import { AppError } from './AppError';

export class NotFoundError extends AppError {
  constructor(
    message = 'Resource not found',
    code = 'NOT_FOUND',
    statusCode = 404,
    context?: Record<string, unknown>
  ) {
    super(code, message, statusCode, context);
    this.name = 'NotFoundError';

    Object.setPrototypeOf(this, NotFoundError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }
  }
}
