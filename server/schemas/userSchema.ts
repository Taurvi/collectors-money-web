import { z } from 'zod'

export const USER_SCHEMA = z.object({
  id: z.string(),
  fullName: z.string(),
  profilePicture: z.string(),
})

export type IUserSchema = z.infer<typeof USER_SCHEMA>
