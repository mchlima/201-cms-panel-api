import { AppError } from './AppError';

export class ForbiddenError extends AppError {
  constructor(
    message = 'Forbidden access',
    code = 'FORBIDDEN',
    statusCode = 403,
    context?: Record<string, unknown>
  ) {
    super(code, message, statusCode, context);
    this.name = 'ForbiddenError';

    Object.setPrototypeOf(this, ForbiddenError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForbiddenError);
    }
  }
}
