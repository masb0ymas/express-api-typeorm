import { ObjectLiteral } from 'typeorm'
import { validate as uuidValidate } from 'uuid'

import { ApplyFilterParams, QueryFilters } from '../types/query-builder/filtered'
import { validate } from '../validate'

/**
 * Validate field name to prevent SQL injection
 */
function isValidFieldName(field: string): boolean {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(field)
}

/**
 * Apply filter
 */
export function applyFilter<T extends ObjectLiteral>({
  query,
  filters,
  model,
  options,
}: ApplyFilterParams<T>) {
  let filtered: QueryFilters[] = []

  if (Array.isArray(filters)) {
    filtered = filters
  } else {
    filtered = JSON.parse(filters) as QueryFilters[]
  }

  if (filtered.length > 0) {
    for (let i = 0; i < filtered.length; i += 1) {
      const item = filtered[i]

      // Validate field name to prevent SQL injection
      if (!isValidFieldName(item.id)) {
        continue // Skip invalid field names
      }

      const check_uuid = uuidValidate(item.value)
      const check_numeric = validate.number(item.value)
      const expect_number_uuid = !check_numeric && !check_uuid

      const postgres_driver = options?.type === 'postgres'
      const mysql_driver = ['mysql', 'mariadb'].includes(String(options?.type))

      if (check_uuid || check_numeric) {
        query.andWhere(`${model}.${item.id} = :${item.id}`, {
          [`${item.id}`]: `${item.value}`,
        })
      }

      if (mysql_driver && expect_number_uuid) {
        query.andWhere(`${model}.${item.id} LIKE :${item.id}`, {
          [`${item.id}`]: `%${item.value}%`,
        })
      }

      if (postgres_driver && expect_number_uuid) {
        query.andWhere(`${model}.${item.id} ILIKE :${item.id}`, {
          [`${item.id}`]: `%${item.value}%`,
        })
      }
    }
  }
}

