import { CriticalError } from './CriticalError';

export class DependencyError extends CriticalError {
  constructor(
    message = 'Unhandled dependency error',
    code = 'DEPENDENCY_ERROR',
    statusCode = 500,
    context?: Record<string, unknown>
  ) {
    super(code, message, statusCode, context);
    this.name = 'DependencyError';

    Object.setPrototypeOf(this, DependencyError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DependencyError);
    }
  }
}
