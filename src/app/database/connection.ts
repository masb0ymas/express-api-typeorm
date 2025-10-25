import 'reflect-metadata'

import { DataSource } from 'typeorm'

import { env } from '~/config/env'
import { logger } from '~/config/logger'

export const AppDataSource = new DataSource({
  type: env.typeorm.connection as 'mysql' | 'postgres',
  host: env.typeorm.host,
  port: env.typeorm.port,
  username: env.typeorm.username,
  password: env.typeorm.password,
  database: env.typeorm.database,
  synchronize: env.typeorm.synchronize,
  logging: env.typeorm.logging,
  migrationsRun: env.typeorm.migrationsRun,
  entities: [`${process.cwd()}/dist/app/database/entity/**/*{.js,.ts}`],
  migrations: [`${process.cwd()}/dist/app/database/migration/**/*{.js,.ts}`],
  subscribers: [`${process.cwd()}/dist/app/database/subscriber/**/*{.js,.ts}`],
})

export const initDatabase = async () => {
  try {
    const connection = await AppDataSource.initialize()
    logger.info(`Database connection established: ${connection.options.database}`)
  } catch (error: any) {
    logger.error(`Failed to initialize database: ${error.message}`)
    process.exit(1)
  }
}
