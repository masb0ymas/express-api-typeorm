import type { ZodError } from 'zod'

import { BaseError } from '../types/errors/base'

export class ValidationException extends BaseError {
  constructor(readonly cause: ZodError) {
    super('Validation failed')
  }
}
