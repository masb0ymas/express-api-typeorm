import { DataSourceOptions, ObjectLiteral, SelectQueryBuilder } from 'typeorm'

import { QueryFilters } from './filtered'
import { QuerySorts } from './sorted'

type RequestQuery = {
  filtered?: QueryFilters[]
  sorted?: QuerySorts[]
  page?: string | number
  pageSize?: string | number
  [key: string]: any
}

type QueryOptions = {
  limit?: number
  orderKey?: string
}

export type QueryParams<T extends ObjectLiteral> = {
  model: string
  query: SelectQueryBuilder<T>
  reqQuery: RequestQuery
  options?: QueryOptions
}

export type QueryBuilderParams<T extends ObjectLiteral> = {
  params: QueryParams<T>
  options?: DataSourceOptions
}
