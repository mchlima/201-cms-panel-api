import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ZodValidationError } from '@/errors';

type RequestPart = 'body' | 'query' | 'params';

export function validate(schema: ZodSchema<any>, part: RequestPart = 'body') {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[part]);
    if (!result.success) {
      throw new ZodValidationError(result.error);
    }
    req[part] = result.data;
    next();
  };
}
