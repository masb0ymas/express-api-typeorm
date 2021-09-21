import HttpResponse from '@expresso/modules/Response/HttpResponse'
import ResponseError from '@expresso/modules/Response/ResponseError'
import { BASE_URL_SERVER } from '@config/BaseURL'
import Express, { Request, Response } from 'express'
import v1Route from '@routes/v1'

const { NODE_ENV } = process.env
const route = Express.Router()

/**
 * Index Route
 */
route.get('/', function (req: Request, res: Response) {
  let responseData: any = {
    message: 'Express built in TypeORM',
    maintaner: 'masb0ymas, <n.fajri@outlook.com>',
    source: 'https://github.com/masb0ymas/expresso-typeorm',
  }

  if (NODE_ENV !== 'production') {
    responseData = {
      ...responseData,
      docs: `${BASE_URL_SERVER}/v1/api-docs`,
    }
  }

  const httpResponse = HttpResponse.get(responseData)
  return res.json(httpResponse)
})

/* Forbidden Page. */
route.get('/v1', function (req: Request, res: Response) {
  throw new ResponseError.Forbidden(
    `Forbidden, wrong access endpoint: ${req.url}`
  )
})

route.use('/v1', v1Route)

export default route
