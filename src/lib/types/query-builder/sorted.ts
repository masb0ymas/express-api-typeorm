import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'

export type ApplySortParams<T extends ObjectLiteral> = {
  query: SelectQueryBuilder<T>
  sorts: any
  model: string
  orderKey?: string
}

export type QuerySorts = {
  sort: string
  order: 'ASC' | 'DESC'
}
