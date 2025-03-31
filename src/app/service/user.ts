import { AppDataSource } from '../database/connection'
import { User, userSchema } from '../database/schema/user'
import BaseService from './base'

export default class UserService extends BaseService<User> {
  constructor() {
    super({
      repository: AppDataSource.getRepository(User),
      schema: userSchema,
      model: 'user',
    })
  }
}
