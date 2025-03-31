import express, { Request, Response } from 'express'
import { asyncHandler } from '~/lib/async-handler'
import HttpResponse from '~/lib/http/response'
import RoleService from '../service/role'

const route = express.Router()
const service = new RoleService()

route.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const records = await service.find()
    const httpResponse = HttpResponse.get({ data: records })
    res.status(200).json(httpResponse)
  })
)

route.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.getParams()
    const record = await service.findById(id)
    const httpResponse = HttpResponse.get({ data: record })
    res.status(200).json(httpResponse)
  })
)

route.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const values = req.getBody()
    const record = await service.create(values)
    const httpResponse = HttpResponse.created({ data: record })
    res.status(201).json(httpResponse)
  })
)

route.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.getParams()
    const values = req.getBody()
    const record = await service.update(id, values)
    const httpResponse = HttpResponse.updated({ data: record })
    res.status(200).json(httpResponse)
  })
)

route.put(
  '/restore/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.getParams()
    await service.restore(id)
    const httpResponse = HttpResponse.updated({})
    res.status(200).json(httpResponse)
  })
)

route.delete(
  '/soft-delete/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.getParams()
    await service.softDelete(id)
    const httpResponse = HttpResponse.deleted({})
    res.status(200).json(httpResponse)
  })
)

route.delete(
  '/force-delete/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.getParams()
    await service.forceDelete(id)
    const httpResponse = HttpResponse.deleted({})
    res.status(200).json(httpResponse)
  })
)

export { route as RoleHandler }
