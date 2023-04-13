import SessionService from '@apps/services/session.service'
import { extractToken, verifyToken } from '@core/helpers/token'
import { type NextFunction, type Request, type Response } from 'express'
import { printLog } from 'expresso-core'
import _ from 'lodash'

/**
 * Authorization
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function authorization(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> {
  const getToken = extractToken(req)

  // verify token
  const token = verifyToken(String(getToken))

  // check session from token header
  const getSession = await SessionService.getByToken(String(getToken))

  if (_.isEmpty(token?.data) || _.isEmpty(getSession)) {
    const logMessage = printLog('Permission :', 'Unauthorized', {
      label: 'error',
    })
    console.log(logMessage)

    return res
      .status(401)
      .json({ code: 401, message: 'Unauthorized, invalid jwt' })
  }

  req.setState({ userLogin: token?.data })
  next()
}

export default authorization
