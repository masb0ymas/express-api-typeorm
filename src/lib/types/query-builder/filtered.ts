import { DataSourceOptions, ObjectLiteral, SelectQueryBuilder } from 'typeorm'

export type ApplyFilterParams<T extends ObjectLiteral> = {
  query: SelectQueryBuilder<T>
  filters: QueryFilters[] | string
  model: string
  options?: DataSourceOptions
}

export type QueryFilters = {
  id: string
  value: string
}
