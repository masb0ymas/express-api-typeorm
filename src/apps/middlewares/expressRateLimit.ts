import { RATE_LIMIT } from '@config/env'
import HttpResponse from '@core/modules/response/HttpResponse'
import { type NextFunction, type Request, type Response } from 'express'
import {
  rateLimit,
  type Options,
  type RateLimitRequestHandler,
} from 'express-rate-limit'

/**
 * Express Rate Limit
 * @returns
 */
export const expressRateLimit = (): RateLimitRequestHandler => {
  return rateLimit({
    windowMs: 15 * 60 * 100, // 15 minutes
    max: RATE_LIMIT, // Limit each IP to 100 requests per `window`
    handler: (
      _req: Request,
      res: Response,
      _next: NextFunction,
      options: Options
    ) => {
      const httpResponse = HttpResponse.get({
        code: options.statusCode,
        message: options.message,
      })

      res.status(options.statusCode).json(httpResponse)
    },
  })
}
