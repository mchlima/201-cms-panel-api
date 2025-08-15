import { ZodError } from 'zod';
import { AppError } from './AppError';

export class ZodValidationError extends AppError {
  public readonly details: unknown;

  constructor(zodError: ZodError) {
    super('VALIDATION_ERROR', 'Validation error in the submitted data', 400, {
      issues: zodError.format(),
    });
    this.details = zodError.format();
    this.name = 'ZodValidationError';

    Object.setPrototypeOf(this, ZodValidationError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ZodValidationError);
    }
  }
}
