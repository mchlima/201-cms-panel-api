import { AppError } from './AppError';

export class CriticalError extends AppError {
  constructor(
    message = 'Unhandled critical error',
    code = 'CRITICAL_ERROR',
    statusCode = 500,
    context?: Record<string, unknown>
  ) {
    super(code, message, statusCode, context);
    this.name = 'CriticalError';

    Object.setPrototypeOf(this, CriticalError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CriticalError);
    }
  }
}
