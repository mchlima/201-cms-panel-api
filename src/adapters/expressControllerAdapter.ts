import { Request, Response, NextFunction } from 'express';
import { IController } from '@/controllers/IController';

export const expressControllerAdapter = (controller: IController) => {
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
