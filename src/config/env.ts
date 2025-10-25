import '@dotenvx/dotenvx/config'

import { ConfigSchema } from './types'

const parsed = ConfigSchema.safeParse(process.env)

if (!parsed.success) {
  console.log(parsed.error)
  throw new Error('Invalid environment variables')
}

export const env = parsed.data
