import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    payload?: any | { userId: string };
    requestId?: string;
  }
}
