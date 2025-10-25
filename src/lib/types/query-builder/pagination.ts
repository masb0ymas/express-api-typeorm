import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'

export type CalculatePageSizeParams = {
  pageSize: number
  limit: number
}

export type ApplyPaginationParams<T extends ObjectLiteral> = {
  query: SelectQueryBuilder<T>
  page: number
  pageSize: number
  limit?: number
}
