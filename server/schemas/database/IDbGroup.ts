import type { IDbAudit } from './IDbAudit'

export interface IDbGroup extends IDbAudit {
  id: string
  groupId: string
  groupName: string
}
