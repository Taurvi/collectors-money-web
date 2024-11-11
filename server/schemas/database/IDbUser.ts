import type { IDbAudit } from './IDbAudit'

/**
 * db user object
 */
export interface IDbUser extends IDbAudit {
  fullName: string
  profilePicture: string
}
