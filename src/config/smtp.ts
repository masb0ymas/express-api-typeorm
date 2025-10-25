import Nodemailer from '~/lib/smtp/nodemailer'

import { env } from './env'

export const smtp = new Nodemailer({
  transporter: {
    host: env.mail.host,
    port: env.mail.port,
    secure: env.mail.encryption === 'ssl',
    auth: {
      user: env.mail.username,
      pass: env.mail.password,
    },
  },
  defaults: {
    from: env.mail.from,
  },
})
