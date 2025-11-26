import { NestFactory } from '@nestjs/core';

// Load environment variables from .env file
if (process.env.NODE_ENV === 'production') {
  process.loadEnvFile('.env');
} else {
  process.loadEnvFile('.env.local');
}
console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS); // For debugging purposes

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
