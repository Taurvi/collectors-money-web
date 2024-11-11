/**
 * db audit object
 */
export interface IDbAudit {
  id: string
  createdAt?: string
  updatedAt?: string
  lastUpdatedBy?: string | null
}
