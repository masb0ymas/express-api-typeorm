import { logErrServer, logServer } from '@core/helpers/formatter'
import ResponseError from '@core/modules/response/ResponseError'
import { type Headers } from 'gaxios'
import { google } from 'googleapis'
import _ from 'lodash'
import nodemailer, {
  type SendMailOptions,
  type SentMessageInfo,
} from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'
import {
  APP_NAME,
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
  MAIL_AUTH_TYPE,
  MAIL_DRIVER,
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_PORT,
  MAIL_USERNAME,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URL,
  OAUTH_REFRESH_TOKEN,
} from './env'

interface SendMailOptionsEntity {
  dest: string
  subject: string
  text: string
}

const isMailgunAPI = !_.isEmpty(MAILGUN_API_KEY) && !_.isEmpty(MAILGUN_DOMAIN)

class MailProvider {
  private _mailConfig: SentMessageInfo
  private _mailOptions: SendMailOptions

  constructor() {
    this._mailConfig = {}
    this._mailOptions = {}
  }

  /**
   * Set Mail Config
   * @returns
   */
  private _setMailConfig(): SentMessageInfo {
    const configTransport: SentMessageInfo = {
      service: MAIL_DRIVER,
      auth: {
        user: '',
      },
    }

    // Use Google OAuth
    if (MAIL_AUTH_TYPE === 'OAuth2') {
      const oauth2Client = new google.auth.OAuth2(
        OAUTH_CLIENT_ID,
        OAUTH_CLIENT_SECRET,
        OAUTH_REDIRECT_URL
      )

      oauth2Client.setCredentials({
        refresh_token: OAUTH_REFRESH_TOKEN,
      })

      const accessToken = async (): Promise<Headers> => {
        const result = await oauth2Client.getRequestHeaders()
        return result
      }

      configTransport.auth.user = MAIL_USERNAME
      configTransport.auth.type = MAIL_AUTH_TYPE
      configTransport.auth.clientId = OAUTH_CLIENT_ID
      configTransport.auth.clientSecret = OAUTH_CLIENT_SECRET
      configTransport.auth.refreshToken = OAUTH_REFRESH_TOKEN
      configTransport.auth.accessToken = accessToken()
    } else if (isMailgunAPI) {
      // SMTP with Mailgun API
      configTransport.auth.api_key = MAILGUN_API_KEY
      configTransport.auth.domain = MAILGUN_DOMAIN
    } else {
      // SMTP Default
      configTransport.host = MAIL_HOST
      configTransport.port = MAIL_PORT
      configTransport.auth.user = MAIL_USERNAME
      configTransport.auth.pass = MAIL_PASSWORD
    }

    return configTransport
  }

  /**
   * Set Mail Options
   * @param params
   * @returns
   */
  private _setMailOptions({
    dest,
    subject,
    text,
  }: SendMailOptionsEntity): SendMailOptions {
    const result = {
      from: `${APP_NAME} <${MAIL_USERNAME}>`,
      to: dest,
      subject,
      html: text,
    }

    return result
  }

  /**
   * Send Mail Config Transporter
   * @param params
   */
  private _sendMail({ dest, subject, text }: SendMailOptionsEntity): void {
    this._mailConfig = isMailgunAPI
      ? mg(this._setMailConfig())
      : this._setMailConfig()

    this._mailOptions = this._setMailOptions({ dest, subject, text })

    // Nodemailer Transport
    const transporter = nodemailer.createTransport(this._mailConfig)

    transporter.sendMail(this._mailOptions, (err, info) => {
      if (err) {
        const errMessage = `Something went wrong!, ${err.message}`
        console.log(logErrServer('Nodemailer Error: ', errMessage))

        throw new ResponseError.BadRequest(errMessage)
      }

      const message = 'email has been sent'
      console.log(logServer('Nodemailer: ', `Success, ${message}`), info)
    })
  }

  /**
   *  ```sh
   * Send Mail
   * ```
   * @param to
   * @param subject
   * @param template
   */
  public send(to: string | string[], subject: string, template: string): void {
    const dest: string = Array.isArray(to) ? to.join(',') : to
    const text: string = template

    // send an e-mail
    this._sendMail({ dest, subject, text })
  }
}

export default MailProvider
