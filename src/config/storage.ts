import Storage from '~/lib/storage'
import { S3StorageParams, StorageType } from '~/lib/storage/types'

import { env } from './env'

export const storage = Storage.create({
  storageType: env.storage.provider as StorageType,
  params: {
    access_key: env.storage.accessKey,
    secret_key: env.storage.secretKey,
    bucket: env.storage.bucketName,
    expires: env.storage.signExpired,
    region: env.storage.region,
  } as S3StorageParams, // Change this type for using S3, GCS or MinIO
})
