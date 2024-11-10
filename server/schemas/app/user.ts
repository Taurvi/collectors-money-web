import { z } from 'zod'

/**
 * user object schema
 */
export const USER_SCHEMA = z.object({
  id: z.string(),
  fullName: z.string(),
  profilePicture: z.string(),
})

export type IUser = z.infer<typeof USER_SCHEMA>
