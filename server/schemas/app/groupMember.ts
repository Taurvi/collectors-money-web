import { z } from 'zod'
import { AUDIT_SCHEMA } from './audit'

export const GROUP_MEMBER_SCHEMA = AUDIT_SCHEMA.extend({
  groupId: z.string().uuid(),
})

export type IGroupMember = z.infer<typeof GROUP_MEMBER_SCHEMA>
