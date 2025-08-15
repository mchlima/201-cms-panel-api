import pino from 'pino';

const pinoLogger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
  level: process.env.LOG_LEVEL || 'info',
});

export class Logger {
  static info(...args: any[]) {
    pinoLogger.info(...(args as [any]));
  }

  static warn(...args: any[]) {
    pinoLogger.warn(...(args as [any]));
  }

  static debug(...args: any[]) {
    pinoLogger.debug(...(args as [any]));
  }

  static trace(...args: any[]) {
    pinoLogger.trace(...(args as [any]));
  }

  static fatal(...args: any[]) {
    pinoLogger.fatal(...(args as [any]));
  }

  static async error(err: any, msg?: string) {
    pinoLogger.error(err, msg);
  }
}

export default Logger;
