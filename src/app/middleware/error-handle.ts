import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import multer from 'multer'

import ErrorResponse from '~/lib/http/errors'

interface DtoErrorResponse {
  statusCode: number
  error: string
  message: string
}

function generateErrorResponse(err: Error, statusCode: number): DtoErrorResponse {
  return _.isObject(err.message)
    ? err.message
    : { statusCode, error: err.name, message: err.message }
}

export default function expressErrorHandle(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // catch error from multer
  if (err instanceof multer.MulterError) {
    res.status(400).json(generateErrorResponse(err, 400))
    return
  }

  // catch from global error
  if (err instanceof ErrorResponse.BaseResponse) {
    res.status(err.statusCode).json(generateErrorResponse(err, err.statusCode))
    return
  }

  // Fallback for unhandled errors
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  res.status(statusCode).json({
    statusCode,
    error: err.name || 'Error',
    message,
  })
}
