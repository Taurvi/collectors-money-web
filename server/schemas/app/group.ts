import { z } from 'zod'
import { AUDIT_SCHEMA } from './audit'

/**
 * group object schema
 */
export const GROUP_SCHEMA = AUDIT_SCHEMA.extend({
  groupId: z.string().uuid(),
  groupName: z.string().min(1).max(128),
})

export type IGroup = z.infer<typeof GROUP_SCHEMA>
