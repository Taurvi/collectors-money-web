import type { IDbAudit } from './IDbAudit'

export interface IDbGroupMember extends IDbAudit {
  groupId: string
}
