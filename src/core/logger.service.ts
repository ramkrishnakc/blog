import { inspect } from 'node:util';
import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, transports, Logger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as path from 'node:path';
import * as fs from 'node:fs';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private readonly logger: Logger;
  myFormat = null;

  constructor() {
    const logDir = path.join(process.cwd(), 'logs');

    // Create log directory if it doesn't exist
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const transportOptions = {
      file: new DailyRotateFile({
        filename: path.join(logDir, 'app_log-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d', // Keep logs for 14 days
        auditFile: path.join(logDir, 'audit.json'),
        format: format.combine(format.timestamp(), format.json()),
      }),
      console: new transports.Console({
        format: format.combine(
          format.colorize(),
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.printf(({ timestamp, level, message, context }) => {
            const ctxt = typeof context === 'string' ? context : inspect(context, { depth: null });
            const prefix = context ? `[${ctxt}] ` : '';
            return `${String(timestamp)} [${level}] ${prefix}${String(message)}`;
          }),
        ),
      }),
    };

    this.logger = createLogger({
      level: 'info',
      levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6,
      },
      format: format.combine(format.timestamp(), format.errors({ stack: true }), format.json()),
      transports: [transportOptions.file, transportOptions.console],
      exceptionHandlers: [transportOptions.file, transportOptions.console],
      exitOnError: false,
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, err?: Error, context?: string) {
    this.logger.error(message, { stack: err?.stack, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }
}
