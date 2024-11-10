import { z } from 'zod'

/**
 * audit object schema
 */
export const AUDIT_SCHEMA = z.object({
  updatedAt: z.coerce.date().optional(),
  createdAt: z.coerce.date().optional(),
  lastUpdatedBy: z.string().nullish().default(null),
})

export type IBase = z.infer<typeof AUDIT_SCHEMA>
