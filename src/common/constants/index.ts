export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};
export const DEFAULT_USER_ROLE = USER_ROLES.USER;
// eslint-disable-next-line no-useless-escape
export const EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // nosonarjs

export const PASSWORD_SALT_ROUNDS = 10;
export const JWT_SECRET_KEY = 'your_jwt_secret_key';
export const JWT_EXPIRATION_TIME = '3600s'; // 1 hour
export const MONGODB_CONNECTION_STRING = 'mongodb://localhost:27017/petopia';
export const SERVER_PORT = 3000;
export const API_PREFIX = 'api/v1';
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOGIN_ATTEMPT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
export const PASSWORD_RESET_TOKEN_EXPIRATION_MS = 60 * 60 * 1000; // 1 hour
export const EMAIL_VERIFICATION_TOKEN_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours
export const SMTP_CONFIG = {
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: '',
    pass: '',
  },
};
export const DEFAULT_FROM_EMAIL = '';
export const LOG_LEVEL = 'info';
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
export const RATE_LIMIT_MAX_REQUESTS = 100; // max requests per window per IP
export const CORS_ALLOWED_ORIGINS = ['http://localhost:3000'];
export const SALT_ROUNDS = 10; // for password hashing
export const TOKEN_TYPE = {
  ACCESS: 'access',
  REFRESH: 'refresh',
};
export const TOKEN_EXPIRATION = {
  ACCESS: '15m',
  REFRESH: '7d',
};
export const PASSWORD_POLICY = {
  MIN_LENGTH: 8,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBERS: true,
  REQUIRE_SPECIAL_CHARACTERS: false,
};
