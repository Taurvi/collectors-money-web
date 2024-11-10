import type { IUser } from '../schemas/app/user'
import type { IDbUser } from '../schemas/database/IDbUser'
import type { IMapper } from './IMapper'

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
      id: input.id,
      fullName: input.fullName,
      profilePicture: input.profilePicture,
      lastUpdatedBy: input.id,
    }
  }

  /**
    * @param {IDbUser} input - db user object
    * @returns {IUser} - user object
    */
  mapToApp(input: IDbUser): IUser {
    return {
      id: input.id,
      fullName: input.fullName,
      profilePicture: input.profilePicture,
    }
  }
}
