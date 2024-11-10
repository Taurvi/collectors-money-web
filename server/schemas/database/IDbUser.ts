/**
 * db user object
 */
export interface IDbUser {
  id: string
  fullName: string
  profilePicture: string
  createdAt?: string
  updatedAt?: string
  lastUpdatedBy: string
}
