import dotenv from 'dotenv';

// Load environment variables from .env file
if (process.env.NODE_ENV === 'production') {
  dotenv.config();
} else {
  dotenv.config({ path: '.env.local' });
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLoggerService } from './core/logger.service';
import helmet from 'helmet';
import { AllExceptionsFilter } from './common/filters/exceptionFilters';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLoggerService(),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // other strict options
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(helmet());
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
