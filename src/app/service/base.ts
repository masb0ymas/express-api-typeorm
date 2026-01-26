import _ from 'lodash'
import { FindOneOptions, FindOptionsWhere, In, ObjectLiteral, Repository } from 'typeorm'
import { z } from 'zod'

import ErrorResponse from '~/lib/http/errors'
import { useQuery } from '~/lib/query-builder'
import { BaseServiceParams, DtoFindAll, FindParams } from '~/lib/types/services/base'
import { validate } from '~/lib/validate'

export default class BaseService<T extends ObjectLiteral> {
  public repository: Repository<T>
  private _schema: z.ZodType<any>
  protected _model: string

  constructor({ repository, schema, model }: BaseServiceParams<T>) {
    this.repository = repository
    this._schema = schema
    this._model = model
  }

  /**
   * Find all
   */
  async find({ page, pageSize, filtered = [], sorted = [] }: FindParams): Promise<DtoFindAll<T>> {
    const query = this.repository.createQueryBuilder(this._model)
    const newQuery = useQuery({
      query,
      model: this._model,
      reqQuery: { page, pageSize, filtered, sorted },
    })

    const data = await newQuery.getMany()
    const total = await newQuery.getCount()

    return { data, total }
  }

  /**
   * Find one
   */
  protected async _findOne(options: FindOneOptions<T>): Promise<T> {
    const record = await this.repository.findOne(options)

    if (!record) {
      throw new ErrorResponse.NotFound(`${this._model} not found`)
    }

    return record
  }

  /**
   * Find by id
   */
  async findById(id: string, options?: FindOneOptions<T>): Promise<T> {
    const newId = validate.uuid(id)

    return this._findOne({ where: { id: newId } as unknown as FindOptionsWhere<T>, ...options })
  }

  /**
   * Create
   */
  async create(data: T): Promise<T> {
    const values = this._schema.parse(data)
    return this.repository.save(values)
  }

  /**
   * Update
   */
  async update(id: string, data: T): Promise<T> {
    const record = await this.findById(id)

    const values = this._schema.parse({ ...record, ...data })
    return this.repository.save({ ...record, ...values })
  }

  /**
   * Restore
   */
  async restore(id: string) {
    const record = await this.findById(id, { withDeleted: true })
    await this.repository.restore(record.id)
  }

  /**
   * Soft delete
   */
  async softDelete(id: string) {
    const record = await this.findById(id)
    await this.repository.softDelete(record.id)
  }

  /**
   * Force delete
   */
  async forceDelete(id: string) {
    const record = await this.findById(id)
    await this.repository.delete(record.id)
  }

  /**
   * Validate ids
   */
  private _validateIds(ids: string[]): string[] {
    if (_.isEmpty(ids)) {
      throw new ErrorResponse.BadRequest('ids is required')
    }

    return ids.map(validate.uuid)
  }

  /**
   * Multiple restore
   */
  async multipleRestore(ids: string[]) {
    const newIds = this._validateIds(ids)

    await this.repository.restore({ id: In(newIds) } as unknown as FindOptionsWhere<T>)
  }

  /**
   * Multiple soft delete
   */
  async multipleSoftDelete(ids: string[]) {
    const newIds = this._validateIds(ids)

    await this.repository.softDelete({ id: In(newIds) } as unknown as FindOptionsWhere<T>)
  }

  /**
   * Multiple force delete
   */
  async multipleForceDelete(ids: string[]) {
    const newIds = this._validateIds(ids)

    await this.repository.delete({ id: In(newIds) } as unknown as FindOptionsWhere<T>)
  }
}
