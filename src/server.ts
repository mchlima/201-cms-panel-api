import { Server } from 'http';
import { createApp } from './app';
import { connectToDatabase, disconnectFromDatabase } from './database';
import { Logger } from './utils/Logger';
import Agenda from 'agenda';

const MONGODB_URI = process.env.MONGODB_URI || '';
const PORT = process.env.PORT || 3000;
let server: Server | undefined;

connectToDatabase(MONGODB_URI)
  .then(async () => {
    Logger.debug('[MongoDB] connected successfully');

    Logger.info(`[server] enabled`);
    const app = createApp();
    server = app.listen(PORT, () => {
      Logger.info(`[server]🚀 Server is running on port ${PORT}`);
    });

    process.on('uncaughtException', err => {
      // console.error('Uncaught Exception:', err);
      // Idealmente logue e finalize com grace period, ou reinicie via PM2/forever
      // process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      // console.error('Unhandled Rejection:', reason);
      // Idem acima
      // process.exit(1);
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await disconnectFromDatabase();

      if (server) {
        server.close(() => {
          Logger.info('[server] shut down gracefully.');
          process.exit(0);
        });
      }
    });
    process.on('SIGTERM', async () => {
      await disconnectFromDatabase();

      if (server) {
        server.close(() => {
          Logger.info('[server] Shutting down server...');
          process.exit(0);
        });
      }
    });
  })
  .catch(error => {
    Logger.error('[MongoDB] Error connecting to database:', error);
    process.exit(1);
  });
