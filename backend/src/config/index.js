const zod = require('zod');
require('dotenv').config();

const configSchema = zod.object({
  PORT: zod.string().default('3000'),
  NODE_ENV: zod.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: zod.string().url(),
  REDIS_URL: zod.string().url(),
  JWT_SECRET: zod.string().min(32),
  JWT_REFRESH_SECRET: zod.string().min(32),
  RATE_LIMIT_WINDOW_MS: zod.string().transform(Number).default('900000'), // 15 mins
  RATE_LIMIT_MAX: zod.string().transform(Number).default('100'),
  PIPED_WHITELIST: zod.string().default('pipedapi.kavin.rocks,pipedapi.rivo.gg'),
});

const result = configSchema.safeParse(process.env);

if (!result.success) {
  console.error('❌ Invalid environment configuration:', result.error.format());
  process.exit(1);
}

module.exports = {
  port: result.data.PORT,
  env: result.data.NODE_ENV,
  db: {
    url: result.data.DATABASE_URL,
  },
  redis: {
    url: result.data.REDIS_URL,
  },
  jwt: {
    secret: result.data.JWT_SECRET,
    refreshSecret: result.data.JWT_REFRESH_SECRET,
  },
  rateLimit: {
    windowMs: result.data.RATE_LIMIT_WINDOW_MS,
    max: result.data.RATE_LIMIT_MAX,
  },
  piped: {
    whitelist: result.data.PIPED_WHITELIST.split(','),
  },
  instanceManager: {
    checkIntervalMs: 60000 * 5, // 5 minutes
    requestTimeoutMs: 5000,
    maxFailures: 3,
    blacklistDurationMs: 60000 * 30, // 30 minutes
    discoveryUrl: 'https://piped.video/instances.json',
  },
  cache: {
    ttl: {
      homeFeed: 60 * 10, // 10 mins
      trending: 60 * 30, // 30 mins
      metadata: 60 * 60 * 2, // 2 hours
      suggestions: 60 * 60 * 24, // 24 hours
      search: 60 * 15, // 15 mins
    }
  }
};
