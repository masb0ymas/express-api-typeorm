import { env } from '~/config/env'

/**
 * Check if storage is enabled
 */
export function storageExists(): boolean {
  switch (env.storage.provider) {
    case 'minio':
      return Boolean(
        env.storage.host && env.storage.bucketName && env.storage.accessKey && env.storage.secretKey
      )

    case 's3':
      return Boolean(env.storage.bucketName && env.storage.accessKey && env.storage.secretKey)

    case 'gcs':
      return Boolean(env.storage.accessKey && env.storage.bucketName && env.storage.filepath)

    default:
      return false
  }
}

/**
 * Check if mail is enabled
 */
export function mailExists(): boolean {
  return Boolean(
    env.mail.host && env.mail.port && env.mail.username && env.mail.password && env.mail.from
  )
}
