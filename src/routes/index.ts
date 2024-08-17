import express, { Request, Response } from 'express'
import { env } from '~/config/env'
import { BASE_URL_SERVER } from '~/core/constant/baseUrl'
import HttpResponse from '~/core/modules/response/HttpResponse'
import { formatDateTime } from '~/core/utils/date'
import { require } from '~/core/utils/file'
import { v1Routes } from './api/v1'

const expressVersion = require('express/package').version
const route = express.Router()

route.get('/', (req: Request, res: Response) => {
  let responseData: any = {
    message: 'expresso TypeORM',
    maintaner: 'masb0ymas, <n.fajri@mail.com>',
    source: 'https://github.com/masb0ymas/expresso-typeorm',
  }

  if (env.NODE_ENV !== 'production') {
    responseData = {
      ...responseData,
      docs: `${BASE_URL_SERVER}/v1/api-docs`,
    }
  }

  const httpResponse = HttpResponse.get(responseData)
  return res.status(200).json(httpResponse)
})

route.get('/health', (req: Request, res: Response) => {
  const startUsage = process.cpuUsage()

  const status = {
    uptime: process.uptime(),
    timezone: 'ID',
    date: formatDateTime(new Date()),
    node: process.version,
    express: expressVersion,
    platform: process.platform,
    cpu_usage: process.cpuUsage(startUsage),
  }

  const httpResponse = HttpResponse.get({
    message: 'Server Uptime',
    data: status,
  })
  return res.status(200).json(httpResponse)
})

route.use('/v1', v1Routes)

export { route as Routes }
