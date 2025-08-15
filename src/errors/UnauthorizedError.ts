import { AppError } from './AppError';

export class UnauthorizedError extends AppError {
  constructor(
    message = 'Acesso não autorizado',
    code = 'UNAUTHORIZED',
    statusCode = 401,
    context?: Record<string, unknown>
  ) {
    super(code, message, statusCode, context);
    this.name = 'UnauthorizedError';

    Object.setPrototypeOf(this, UnauthorizedError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError);
    }
  }
}
