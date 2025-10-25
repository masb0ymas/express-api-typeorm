import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'

import { env } from '~/config/env'
import { asyncHandler } from '~/lib/async-handler'
import JwtToken from '~/lib/token/jwt'

import SessionService from '../service/session'

const jwt = new JwtToken({ secret: env.jwt.secret, expires: env.jwt.expires })
const sessionService = new SessionService()

export default function authorization() {
  return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = jwt.extract(req)
    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Unauthorized, cannot extract token from request',
      })
    }

    const decoded = jwt.verify(token)
    if (!decoded.data) {
      return res.status(401).json({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Unauthorized, invalid jwt',
      })
    }

    const session = await sessionService.findByUserToken({
      user_id: _.get(decoded, 'data.uid', ''),
      token,
    })

    req.setState({ userLoginState: decoded.data, session })
    next()
  })
}
