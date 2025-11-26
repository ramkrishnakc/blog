import { MongooseModuleOptions } from '@nestjs/mongoose';

const { DB_NAME, DB_USER, DB_PASS } = process.env;

export const DB_URI = `mongodb://${DB_USER}:${DB_PASS}@127.0.0.1:27017/${DB_NAME}?authSource=admin`;

export const DB_OPTIONS: MongooseModuleOptions = {
  dbName: DB_NAME,
  connectTimeoutMS: 10000, // 10 seconds
  socketTimeoutMS: 45000, // 45 seconds
  serverSelectionTimeoutMS: 5000, // 5 seconds
  heartbeatFrequencyMS: 10000, // 10 seconds
  retryDelay: 500, // 0.5 seconds
  retryAttempts: 3,
  retryWrites: true,
  w: 'majority',
  ssl: false,
};
