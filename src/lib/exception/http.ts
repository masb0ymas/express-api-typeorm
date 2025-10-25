import { HttpStatus } from '../constant/http-status'
import { BaseError } from '../types/errors/base'

export class HttpException extends BaseError {
  constructor(
    readonly status: HttpStatus,
    readonly response?: string | Record<string, any>
  ) {
    const message = typeof response === 'string' ? response : 'HttpException'
    super(message)
  }
}
