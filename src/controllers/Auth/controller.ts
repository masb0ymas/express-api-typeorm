import { APP_LANG } from '@config/env'
import { i18nConfig } from '@config/i18n'
import asyncHandler from '@core/helpers/asyncHandler'
import { extractToken } from '@core/helpers/token'
import HttpResponse from '@core/modules/response/HttpResponse'
import ResponseError from '@core/modules/response/ResponseError'
import { type UserLoginAttributes } from '@database/entities/User'
import authorization from '@middlewares/authorization'
import route from '@routes/v1'
import { type Request, type Response } from 'express'
import { type TOptions } from 'i18next'
import AuthService from './service'

route.post(
  '/auth/sign-up',
  asyncHandler(async function signUp(req: Request, res: Response) {
    const { lang } = req.getQuery()
    const defaultLang = lang ?? APP_LANG
    const i18nOpt: string | TOptions = { lng: defaultLang }

    const formData = req.getBody()

    const data = await AuthService.signUp(formData)
    const message = i18nConfig.t('success.register', i18nOpt)

    const httpResponse = HttpResponse.get({ data, message })
    res.status(200).json(httpResponse)
  })
)

route.post(
  '/auth/sign-in',
  asyncHandler(async function signIn(req: Request, res: Response) {
    const { lang } = req.getQuery()
    const defaultLang = lang ?? APP_LANG

    const formData = req.getBody()

    const data = await AuthService.signIn(formData, { lang: defaultLang })
    const httpResponse = HttpResponse.get(data)

    res
      .status(200)
      .cookie('token', data.accessToken, {
        maxAge: Number(data.expiresIn) * 1000,
        httpOnly: true,
        path: '/v1',
        secure: process.env.NODE_ENV === 'production',
      })
      .json(httpResponse)
  })
)

route.get(
  '/auth/verify-session',
  authorization,
  asyncHandler(async function verifySession(req: Request, res: Response) {
    const { lang } = req.getQuery()
    const defaultLang = lang ?? APP_LANG

    const token = extractToken(req)
    const userLogin = req.getState('userLogin') as UserLoginAttributes

    const data = await AuthService.verifySession(userLogin.uid, String(token), {
      lang: defaultLang,
    })

    const httpResponse = HttpResponse.get({ data })
    res.status(200).json(httpResponse)
  })
)

route.post(
  '/logout',
  authorization,
  asyncHandler(async function logout(req: Request, res: Response) {
    const { lang } = req.getQuery()
    const defaultLang = lang ?? APP_LANG
    const i18nOpt: string | TOptions = { lng: defaultLang }

    const formData = req.getBody()
    const token = extractToken(req)
    const userLogin = req.getState('userLogin') as UserLoginAttributes

    // check user login not same user id at formData
    if (userLogin.uid !== formData.UserId) {
      const message = i18nConfig.t('errors.invalid_user_login', i18nOpt)
      throw new ResponseError.BadRequest(message)
    }

    const message = await AuthService.logout(userLogin.uid, String(token), {
      lang: defaultLang,
    })

    const httpResponse = HttpResponse.get({ message })
    res.status(200).clearCookie('token', { path: '/v1' }).json(httpResponse)
  })
)
