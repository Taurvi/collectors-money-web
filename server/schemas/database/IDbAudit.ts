/**
 * db audit object
 */
export interface IDbAudit {
  createdAt?: string
  updatedAt?: string
  lastUpdatedBy?: string | null
}
