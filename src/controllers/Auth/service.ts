import SessionService from '@controllers/Session/service'
import userSchema from '@controllers/User/schema'
import UserService from '@controllers/User/service'
import {
  LoginAttributes,
  User,
  UserLoginAttributes,
  UserPost,
} from '@entity/User'
import ConstRole from '@expresso/constants/ConstRole'
import { validateEmpty } from '@expresso/helpers/Formatter'
import SendMail from '@expresso/helpers/SendMail'
import { generateAccessToken, verifyAccessToken } from '@expresso/helpers/Token'
import useValidation from '@expresso/hooks/useValidation'
import ResponseError from '@expresso/modules/Response/ResponseError'
import _ from 'lodash'
import { getRepository } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

interface DtoLogin {
  tokenType: string
  user: {
    uid: string
  }
  accessToken: string
  expiresIn: number
  message: string
}

class AuthService {
  /**
   *
   * @param formData
   * @returns
   */
  public static async signUp(formData: UserPost): Promise<User> {
    const userRepository = getRepository(User)
    const randomToken = generateAccessToken({ uuid: uuidv4() })

    const newFormData = {
      ...formData,
      tokenVerify: randomToken.accessToken,
      RoleId: ConstRole.ID_USER,
    }

    const value = useValidation(userSchema.register, newFormData)

    const formRegistration = {
      ...value,
      phone: validateEmpty(formData.phone),
      password: value.confirmNewPassword,
    }

    const data = new User()
    const newData = await userRepository.save({ ...data, ...formRegistration })

    // send email notification
    SendMail.AccountRegistration({
      email: value.email,
      fullName: `${value.firstName} ${value.lastName}`,
      token: randomToken.accessToken,
    })

    return newData
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async signIn(formData: LoginAttributes): Promise<DtoLogin> {
    const userRepository = getRepository(User)
    const value = useValidation(userSchema.login, formData)

    const getUser = await userRepository.findOne({
      select: ['id', 'email', 'isActive', 'password', 'RoleId'],
      where: { email: value.email },
    })

    // check user account
    if (!getUser) {
      throw new ResponseError.NotFound('account not found or has been deleted')
    }

    // check active account
    if (!getUser.isActive) {
      throw new ResponseError.BadRequest(
        'please check your email account to verify your email and continue the registration process.'
      )
    }

    const matchPassword = await getUser.comparePassword(value.password)

    // compare password
    if (!matchPassword) {
      throw new ResponseError.BadRequest('incorrect email or password')
    }

    const payloadToken = { uid: getUser.id }
    const accessToken = generateAccessToken(payloadToken)

    const newData = {
      message: 'Login successfully',
      ...accessToken,
      tokenType: 'Bearer',
      user: payloadToken,
    }

    return newData
  }

  /**
   *
   * @param UserId
   * @param token
   * @returns
   */
  public static async verifySession(
    UserId: string,
    token: string
  ): Promise<User | null> {
    const getSession = await SessionService.findByUserToken(UserId, token)
    const verifyToken = verifyAccessToken(getSession.token)

    const userToken = verifyToken?.data as UserLoginAttributes

    if (!_.isEmpty(userToken.uid)) {
      const getUser = await UserService.findById(userToken.uid)

      return getUser
    }

    return null
  }

  /**
   *
   * @param UserId
   * @param token
   * @returns
   */
  public static async logout(UserId: string, token: string): Promise<string> {
    const getUser = await UserService.findById(UserId)

    // clean session
    await SessionService.deleteByUserToken(getUser.id, token)
    const message = 'You have logged out of the application'

    return message
  }
}

export default AuthService
