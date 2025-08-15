import Logger from '@/shared/utils/Logger';
import { Express } from 'express';
import fs from 'fs';
import path from 'path';

export function loadRoutes(app: Express) {
  const routesPath = path.join(__dirname, '../routes');
  const routeFiles = fs
    .readdirSync(routesPath)
    .filter(
      file =>
        (file.endsWith('.ts') || file.endsWith('.js')) &&
        !file.endsWith('.d.ts') &&
        !file.startsWith('.')
    );

  for (const file of routeFiles) {
    try {
      const filePath = path.join(routesPath, file);
      const { default: route, prefix } = require(filePath);
      console.log(routeFiles);
      if (!route) {
        Logger.warn(`[route] ${file} does not export a default route`);
        continue;
      }

      const routePrefix = prefix || '/';
      app.use(routePrefix, route);

      Logger.info(`[route] ${routePrefix}`);
    } catch (err) {
      Logger.warn(err, `[route] ${file}`);
    }
  }
}
