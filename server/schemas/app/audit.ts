import { z } from 'zod'

/**
 * audit object schema
 */
export const AUDIT_SCHEMA = z.object({
  userId: z.string().uuid(),
  updatedAt: z.coerce.date().optional().default(new Date()),
  createdAt: z.coerce.date().optional().default(new Date()),
  lastUpdatedBy: z.string().nullish().default(null),
})

export type IAudit = z.infer<typeof AUDIT_SCHEMA>
