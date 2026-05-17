const { z } = require('zod');

/**
 * Environment Variables Schema
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().transform(v => parseInt(v, 10)).default('3000'),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
});

/**
 * Validates process.env against the schema.
 */
const validateEnv = () => {
  try {
    envSchema.parse(process.env);
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => err.path.join('.')).join(', ');
      console.error(`❌ [CRITICAL] Invalid environment variables: ${missingVars}`);
      process.exit(1);
    }
    throw error;
  }
};

module.exports = validateEnv;
