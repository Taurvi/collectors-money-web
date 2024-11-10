import { z } from 'zod'

export const GET_USER_PARAMS_SCHEMA = z.object({
  id: z.string().min(1).max(128).uuid(),
})
