import type { IDbAudit } from './IDbAudit'

export interface IDbGroup extends IDbAudit {
  groupId: string
  groupName: string
}
