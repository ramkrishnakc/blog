import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_OPTIONS, DB_URI } from './core/db';
import { UserModule } from './modules/user/user.module';
import { CustomLoggerService } from './core/logger.service';

@Module({
  imports: [MongooseModule.forRoot(DB_URI, DB_OPTIONS), UserModule],
  controllers: [],
  providers: [CustomLoggerService],
})
export class AppModule {}
