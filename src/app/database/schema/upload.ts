import { z } from 'zod'
import { BaseSchema } from '../entity/base'

// Schema
export const uploadSchema = z.object({
  keyfile: z
    .string({ message: 'keyfile is required' })
    .min(3, { message: 'keyfile must be at least 3 characters long' }),
  filename: z
    .string({ message: 'filename is required' })
    .min(3, { message: 'filename must be at least 3 characters long' }),
  mimetype: z
    .string({ message: 'mimetype is required' })
    .min(3, { message: 'mimetype must be at least 3 characters long' }),
  size: z.number({ message: 'size is required' }).min(1, { message: 'size must be at least 1' }),
  signed_url: z
    .string({ message: 'signed_url is required' })
    .min(3, { message: 'signed_url must be at least 3 characters long' }),
  expiry_date_url: z.date({ message: 'expiry_date_url is required' }),
})

// Type
export type UploadSchema = z.infer<typeof uploadSchema> &
  Partial<BaseSchema> & {
    deleted_at?: Date | null
  }
