import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { loadRoutes } from './loaders/routeLoader';
import { errorHandler } from './middlewares/errorHandler';
import { requestLogger } from './middlewares/requestLogger';
import { Logger } from './utils/Logger';
import { requestId } from './middlewares/requestId';

export function createApp() {
  const app = express();

  app.use(cors({ origin: '*' }));
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          connectSrc: ["'self'", 'https://backend.assisty24h.com.br'],
        },
      },
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(requestId);
  app.use(requestLogger);

  loadRoutes(app);

  app.use(errorHandler);

  return app;
}
