import { createDatabase } from 'typeorm-extension'

import { logger } from '~/config/logger'

import { AppDataSource } from './connection'

async function createDB() {
  logger.info('Creating database...', AppDataSource.options.database as any)

  // create database
  await createDatabase({
    options: AppDataSource.options,
    initialDatabase: 'postgres',
    ifNotExist: true,
  })
}

createDB()
