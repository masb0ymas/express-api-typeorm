import { User, UserAttributes } from '@database/entities/User'
import { validateUUID } from '@expresso/helpers/Formatter'
import useValidation from '@expresso/hooks/useValidation'
import { DtoFindAll } from '@expresso/interfaces/Paginate'
import ResponseError from '@expresso/modules/Response/ResponseError'
import { queryFiltered } from '@expresso/modules/TypeORMQuery'
import { Request } from 'express'
import _ from 'lodash'
import { getRepository } from 'typeorm'
import userSchema from './schema'

interface DtoPaginate extends DtoFindAll {
  data: User[]
}

class UserService {
  private static readonly entity = 'User'

  /**
   *
   * @param req
   * @returns
   */
  public static async findAll(req: Request): Promise<DtoPaginate> {
    const userRepository = getRepository(User)

    const query = userRepository
      .createQueryBuilder()
      .leftJoinAndSelect('User.Role', 'Role')
      .leftJoinAndSelect('User.Sessions', 'Session')
    const newQuery = queryFiltered(this.entity, query, req)

    const data = await newQuery
      .orderBy(`${this.entity}.createdAt`, 'DESC')
      .getMany()
    const total = await newQuery.getCount()

    return { message: `${total} data has been received.`, data, total }
  }

  /**
   *
   * @param id
   * @returns
   */
  public static async findById(id: string): Promise<User> {
    const userRepository = getRepository(User)

    const newId = validateUUID(id)
    const data = await userRepository.findOne({
      where: { id: newId },
      relations: ['Role', 'Sessions'],
    })

    if (!data) {
      throw new ResponseError.NotFound(
        'user data not found or has been deleted'
      )
    }

    return data
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async create(formData: UserAttributes): Promise<User> {
    const userRepository = getRepository(User)
    const data = new User()

    const value = useValidation(userSchema.create, formData)
    const newData = await userRepository.save({ ...data, ...value })

    return newData
  }

  /**
   *
   * @param id
   * @param formData
   * @returns
   */
  public static async update(
    id: string,
    formData: Partial<UserAttributes>
  ): Promise<User> {
    const userRepository = getRepository(User)
    const data = await this.findById(id)

    const value = useValidation(userSchema.create, {
      ...data,
      ...formData,
    })

    const newData = await userRepository.save({ ...data, ...value })

    return newData
  }

  /**
   *
   * @param id
   */
  public static async restore(id: string): Promise<void> {
    const userRepository = getRepository(User)

    const newId = validateUUID(id)
    await userRepository.restore(newId)
  }

  /**
   *
   * @param id
   */
  public static async softDelete(id: string): Promise<void> {
    const userRepository = getRepository(User)
    const data = await this.findById(id)

    await userRepository.softDelete(data.id)
  }

  /**
   *
   * @param id
   */
  public static async forceDelete(id: string): Promise<void> {
    const userRepository = getRepository(User)
    const data = await this.findById(id)

    await userRepository.delete(data.id)
  }

  /**
   * Multiple Force Delete
   * @param ids
   */
  public static async multipleRestore(ids: string[]): Promise<void> {
    const userRepository = getRepository(User)

    if (_.isEmpty(ids)) {
      throw new ResponseError.BadRequest('ids cannot be empty')
    }

    const query = userRepository
      .createQueryBuilder()
      .where('id IN (:...ids)', { ids: [...ids] })

    // restore record
    await query.restore().execute()
  }

  /**
   * Multiple Soft Delete
   * @param ids
   */
  public static async multipleSoftDelete(ids: string[]): Promise<void> {
    const userRepository = getRepository(User)

    if (_.isEmpty(ids)) {
      throw new ResponseError.BadRequest('ids cannot be empty')
    }

    const query = userRepository
      .createQueryBuilder()
      .where('id IN (:...ids)', { ids: [...ids] })

    // soft delete record
    await query.softDelete().execute()
  }

  /**
   * Multiple Force Delete
   * @param ids
   */
  public static async multipleForceDelete(ids: string[]): Promise<void> {
    const userRepository = getRepository(User)

    if (_.isEmpty(ids)) {
      throw new ResponseError.BadRequest('ids cannot be empty')
    }

    const query = userRepository
      .createQueryBuilder()
      .where('id IN (:...ids)', { ids: [...ids] })

    // delete record
    await query.delete().execute()
  }
}

export default UserService
