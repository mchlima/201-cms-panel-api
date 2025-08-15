import { AppError } from './AppError';

export class ConflictError extends AppError {
  constructor(
    message = 'Resource conflict',
    code = 'CONFLICT',
    statusCode = 409,
    context?: Record<string, unknown>
  ) {
    super(code, message, statusCode, context);
    this.name = 'ConflictError';

    Object.setPrototypeOf(this, ConflictError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConflictError);
    }
  }
}
