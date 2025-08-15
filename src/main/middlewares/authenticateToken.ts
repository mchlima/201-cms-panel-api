import { UnauthorizedError } from '@/errors';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Recomenda-se declarar o tipo do payload para maior segurança
export interface AuthenticatedRequest extends Request {
  payload?: string | jwt.JwtPayload;
}

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export function authenticateToken(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7)
    : undefined;

  if (!token) {
    throw new UnauthorizedError('Token not provided', 'NO_TOKEN', 401);
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.payload = payload;
    next();
  } catch (err) {
    throw new UnauthorizedError(
      'Token invalid or expired',
      'INVALID_TOKEN',
      401
    );
  }
}
