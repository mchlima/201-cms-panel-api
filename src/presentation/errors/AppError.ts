export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly context?: Record<string, unknown> | null;

  constructor(
    code: string,
    message: string,
    statusCode?: number,
    context?: Record<string, unknown> | null
  ) {
    super(message || 'An application error occurred');
    this.code = code || 'APP_ERROR';
    this.statusCode = statusCode || 400;
    this.context = context || {};
    this.name = 'AppError';

    Object.setPrototypeOf(this, AppError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}
