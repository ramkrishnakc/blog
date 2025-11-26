import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from './core/logger.service';

@Injectable()
export class AppService {
  private readonly logger = new CustomLoggerService();

  getHello(): string {
    this.logger.error('Request received error', undefined, 'AppController');
    return 'Hello World!';
  }
}
