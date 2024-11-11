import { z } from 'zod'
import { AUDIT_SCHEMA } from './audit'

/**
 * user object schema
 */
export const USER_SCHEMA = AUDIT_SCHEMA.extend({
  fullName: z.string(),
  profilePicture: z.string(),
})
export type IUser = z.infer<typeof USER_SCHEMA>
