import { Decrypter } from '@/data/protocols/cryptography';
import { UnauthorizedError } from '@/presentation/errors';
import { NextFunction, Request, Response } from 'express';

export const authMiddleware = (decrypter: Decrypter) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.get('Authorization')?.split(' ')[1];

    if (!token) throw new UnauthorizedError('TOKEN_NOT_PROVIDED');

    try {
      const payload = await decrypter.decrypt(token);
      req.payload = payload;
      next();
    } catch (error) {
      throw new UnauthorizedError('INVALID_TOKEN');
    }
  };
};
