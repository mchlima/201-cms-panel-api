import { Request, Response, NextFunction } from 'express';
import { Controller } from '@/presentation/protocols';

export const expressControllerAdapter = (controller: Controller) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const httpRequest = {
        body: req.body || {},
        params: req.params || {},
        query: req.query || {},
        headers: req.headers || {},
        payload: req.payload || {},
      };

      const httpResponse = await controller.handle(httpRequest);

      res.status(httpResponse.statusCode || 500).json(httpResponse.body ?? {});
    } catch (error) {
      next(error);
    }
  };
};
