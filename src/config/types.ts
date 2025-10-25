import '@dotenvx/dotenvx/config'

import z from 'zod'

export const ConfigSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test', 'staging']),
    APP_DEBUG: z.coerce.boolean().default(false),
    APP_PORT: z.coerce.number().int().default(8000),
    APP_NAME: z.string(),
    APP_URL: z.string(),
    APP_DEFAULT_PASS: z.string(),

    TYPEORM_CONNECTION: z.enum(['mysql', 'postgres', 'sqlite']),
    TYPEORM_HOST: z.string(),
    TYPEORM_PORT: z.coerce.number().int(),
    TYPEORM_USERNAME: z.string(),
    TYPEORM_PASSWORD: z.string(),
    TYPEORM_DATABASE: z.string(),
    TYPEORM_SYNCHRONIZE: z.coerce.boolean(),
    TYPEORM_LOGGING: z.coerce.boolean(),
    TYPEORM_MIGRATIONS_RUN: z.coerce.boolean(),
    TYPEORM_TIMEZONE: z.string(),

    STORAGE_PROVIDER: z.enum(['local', 's3', 'minio', 'gcs', 'aws']),
    STORAGE_HOST: z.string().optional(),
    STORAGE_PORT: z.coerce.number().int().optional(),
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
    MAIL_PORT: z.coerce.number().int().optional(),
    MAIL_FROM: z.string().optional(),
    MAIL_USERNAME: z.string().optional(),
    MAIL_PASSWORD: z.string().optional(),
    MAIL_ENCRYPTION: z.string().optional(),
  })
  .transform((val) => {
    return {
      app: {
        nodeEnv: val.NODE_ENV,
        debug: val.APP_DEBUG,
        port: val.APP_PORT,
        name: val.APP_NAME,
        url: val.APP_URL,
        defaultPass: val.APP_DEFAULT_PASS,
      },
      typeorm: {
        connection: val.TYPEORM_CONNECTION,
        host: val.TYPEORM_HOST,
        port: val.TYPEORM_PORT,
        username: val.TYPEORM_USERNAME,
        password: val.TYPEORM_PASSWORD,
        database: val.TYPEORM_DATABASE,
        synchronize: val.TYPEORM_SYNCHRONIZE,
        logging: val.TYPEORM_LOGGING,
        migrationsRun: val.TYPEORM_MIGRATIONS_RUN,
        timezone: val.TYPEORM_TIMEZONE,
      },
      storage: {
        provider: val.STORAGE_PROVIDER,
        host: val.STORAGE_HOST,
        port: val.STORAGE_PORT,
        accessKey: val.STORAGE_ACCESS_KEY,
        secretKey: val.STORAGE_SECRET_KEY,
        bucketName: val.STORAGE_BUCKET_NAME,
        region: val.STORAGE_REGION,
        signExpired: val.STORAGE_SIGN_EXPIRED,
        filepath: val.STORAGE_FILEPATH,
      },
      jwt: {
        secret: val.JWT_SECRET,
        expires: val.JWT_EXPIRES,
      },
      mail: {
        driver: val.MAIL_DRIVER,
        host: val.MAIL_HOST,
        port: val.MAIL_PORT,
        from: val.MAIL_FROM,
        username: val.MAIL_USERNAME,
        password: val.MAIL_PASSWORD,
        encryption: val.MAIL_ENCRYPTION,
      },
    }
  })
  .readonly()

export type Config = z.infer<typeof ConfigSchema>
export type AppConfig = Config['app']
export type TypeormConfig = Config['typeorm']
export type StorageConfig = Config['storage']
export type JwtConfig = Config['jwt']
export type MailConfig = Config['mail']
