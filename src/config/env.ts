import '@dotenvx/dotenvx'

import z from 'zod'

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test', 'staging']),
  APP_PORT: z.number().nonnegative(),
  APP_NAME: z.string(),
  APP_URL: z.string(),
  APP_DEFAULT_PASS: z.string(),

  TYPEORM_CONNECTION: z.string(),
  TYPEORM_HOST: z.string(),
  TYPEORM_PORT: z.number().nonnegative(),
  TYPEORM_USERNAME: z.string(),
  TYPEORM_PASSWORD: z.string(),
  TYPEORM_DATABASE: z.string(),
  TYPEORM_SYNCHRONIZE: z.boolean(),
  TYPEORM_LOGGING: z.boolean(),
  TYPEORM_MIGRATIONS_RUN: z.boolean(),
  TYPEORM_TIMEZONE: z.string(),

  STORAGE_PROVIDER: z.string(),
  STORAGE_HOST: z.string().optional(),
  STORAGE_PORT: z.number().nonnegative().optional(),
  STORAGE_ACCESS_KEY: z.string().optional(),
  STORAGE_SECRET_KEY: z.string().optional(),
  STORAGE_BUCKET_NAME: z.string().optional(),
  STORAGE_REGION: z.string().optional(),
  STORAGE_SIGN_EXPIRED: z.string().optional(),
  STORAGE_FILEPATH: z.string().optional(),

  JWT_SECRET: z.string(),
  JWT_EXPIRES: z.string(),

  MAIL_DRIVER: z.string().optional(),
  MAIL_HOST: z.string().optional(),
  MAIL_PORT: z.number().nonnegative().optional(),
  MAIL_FROM: z.string().optional(),
  MAIL_USERNAME: z.string().optional(),
  MAIL_PASSWORD: z.string().optional(),
  MAIL_ENCRYPTION: z.string().optional(),
})

const parsed = EnvSchema.safeParse(process.env)

if (!parsed.success) {
  throw new Error('Invalid environment variables')
}

export const env = parsed.data
