import type { IDbAudit } from './IDbAudit'

/**
 * db user object
 */
export interface IDbUser extends IDbAudit {
  id: string
  fullName: string
  profilePicture: string
}
