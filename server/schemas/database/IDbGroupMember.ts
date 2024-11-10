import type { IDbAudit } from './IDbAudit'

export interface IDbGroupMember extends IDbAudit {
  id: string
  groupId: string
}
