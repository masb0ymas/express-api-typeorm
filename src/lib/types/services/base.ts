import { ObjectLiteral, Repository } from 'typeorm'
import { z } from 'zod'

import { QueryFilters } from '../query-builder/filtered'
import { QuerySorts } from '../query-builder/sorted'

export type BaseServiceParams<T extends ObjectLiteral> = {
  repository: Repository<T>
  schema: z.ZodType<any>
  model: string
}

export type FindParams = {
  page: number
  pageSize: number
  filtered?: QueryFilters[]
  sorted?: QuerySorts[]
}

export type DtoFindAll<T extends ObjectLiteral> = {
  data: T[]
  total: number
}
