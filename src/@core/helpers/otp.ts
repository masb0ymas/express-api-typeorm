import { EXPIRED_OTP, SECRET_OTP } from '@config/env'
import RedisProvider from '@config/redis'
import crypto from 'crypto'
import ms from 'ms'

interface HashOTPEntity {
  phone: string
  otp: string | number
}

interface VerifyHashOTPEntity extends HashOTPEntity {
  hash: string
}

const redisProvider = new RedisProvider()

/**
 * Get Random OTP
 * @returns
 */
export function getRandomOTP(): string {
  // which stores all digits
  const digits = '0123456789'
  let otp = ''

  for (let i = 0; i < 6; i += 1) {
    otp += digits[Math.floor(Math.random() * 10)]
  }

  return otp
}

/**
 *
 * @param params
 * @returns
 */
export function createHashOTP({ phone, otp }: HashOTPEntity): string {
  const ttl = ms(EXPIRED_OTP) // 5 Minutes in miliseconds
  const expires = Date.now() + Number(ttl) // timestamp to 5 minutes in the future
  const data = `${phone}.${otp}.${expires}` // phone.otp.expiry_timestamp

  const hash = crypto
    .createHmac('sha256', String(SECRET_OTP))
    .update(data)
    .digest('hex') // creating SHA256 hash of the data
  const result = `${hash}.${expires}` // Hash.expires, format to send to the user

  return result
}

/**
 *
 * @param params
 * @returns
 */
export function verifyHashOTP(params: VerifyHashOTPEntity): boolean {
  const { phone, otp, hash } = params
  const [hashValue, expires] = hash.split('.')

  // Check if expiry time has passed
  const now = Date.now()
  if (now > parseInt(expires)) return false

  // Calculate new hash with the same key and the same algorithm
  const data = `${phone}.${otp}.${expires}`
  const newHash = crypto
    .createHmac('sha256', String(SECRET_OTP))
    .update(data)
    .digest('hex')

  // Match the hashes
  if (newHash === hashValue) {
    return true
  }

  return false
}

/**
 *
 * @param params
 */
export async function takeOverOTP(params: HashOTPEntity): Promise<void> {
  const { phone, otp } = params

  const keyRedis = `${phone}`
  const expires = ms('10m')
  const limit = 5

  const getRedis: string | null = await redisProvider.get(keyRedis)

  let storeRedis = []

  // Get Cache
  if (!getRedis) {
    storeRedis = [otp]
  } else {
    storeRedis = [...getRedis, otp]
  }

  // Check Takeover Verify OTP
  if (storeRedis.length >= limit) {
    throw new Error(
      'you have entered the wrong otp, please try again in 10 minutes'
    )
  }

  console.log({ storeRedis })

  // Set Redis
  await redisProvider.set({
    key: keyRedis,
    data: JSON.stringify(storeRedis),
    options: { timeout: expires },
  })
}
