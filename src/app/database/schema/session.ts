import { z } from 'zod'

import { BaseSchema } from '../entity/base'

// Schema
export const sessionSchema = z.object({
  user_id: z
    .string({ message: 'user_id is required' })
    .uuid({ message: 'user_id must be a valid UUID' }),
  token: z
    .string({ message: 'token is required' })
    .min(3, { message: 'token must be at least 3 characters long' }),
  ip_address: z.string({ message: 'ip_address is required' }).nullable().optional(),
  device: z.string({ message: 'device is required' }).nullable().optional(),
  platform: z.string({ message: 'platform is required' }).nullable().optional(),
  user_agent: z.string({ message: 'user_agent is required' }).nullable().optional(),
  latitude: z.string({ message: 'latitude is required' }).nullable().optional(),
  longitude: z.string({ message: 'longitude is required' }).nullable().optional(),
})

// Type
export type SessionSchema = z.infer<typeof sessionSchema> & BaseSchema
