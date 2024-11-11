import { USER_SCHEMA, type IUser } from '../../schemas/app/user'
import type { IDbUser } from '../../schemas/database/IDbUser'
import type { IMapper } from '../IMapper'

/**
 * Maps user object
 */
export class UserMapper implements IMapper<IDbUser, IUser> {
  /**
    * @param {IUser} input - user object
    * @returns {IDbUser} - db user object
    */
  mapToDb(input: IUser): IDbUser {
    return {
      id: input.userId,
      fullName: input.fullName,
      profilePicture: input.profilePicture,
      createdAt: input.createdAt.toISOString(),
      updatedAt: input.updatedAt.toISOString(),
      lastUpdatedBy: input.lastUpdatedBy,
    }
  }

  /**
    * @param {IDbUser} input - db user object
    * @returns {IUser} - user object
    */
  mapToApp(input: IDbUser): IUser {
    return USER_SCHEMA.parse({
      userId: input.id,
      fullName: input.fullName,
      profilePicture: input.profilePicture,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      lastUpdatedBy: input.lastUpdatedBy,
    })
  }
}
