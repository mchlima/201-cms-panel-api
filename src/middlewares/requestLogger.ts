import { Request, Response, NextFunction } from 'express';
import Logger from '@/utils/Logger';

// Função utilitária para filtrar informações sensíveis do corpo
function sanitizeBody(body: any) {
  if (!body) return body;
  const copy = { ...body };
  // Liste aqui campos sensíveis
  if (copy.password) copy.password = '[REDACTED]';
  if (copy.token) copy.token = '[REDACTED]';
  return copy;
}

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = process.hrtime();

  // Para capturar o body da resposta
  const originalSend = res.send.bind(res);
  let responseBody: any;

  res.send = function (body: any) {
    responseBody = body;
    return originalSend(body);
  };

  res.on('finish', () => {
    const duration = process.hrtime(start);
    const ms = duration[0] * 1e3 + duration[1] / 1e6;

    Logger.info(
      `[${req.method}] ${req.originalUrl} - ${res.statusCode} - ${ms.toFixed(
        2
      )}ms - IP: ${req.ip} - ${req.requestId}`
    );
  });

  next();
};
