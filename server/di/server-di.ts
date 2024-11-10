import type { IMapper } from '../mappers/IMapper'
import { UserMapper } from '../mappers/user/UserMapper'
import type { IUser } from '../schemas/app/user'
import type { IDbUser } from '../schemas/database/IDbUser'
import type { IDatabaseStore } from '../store/DatabaseStore'
import { UserStore } from '../store/UserStore'

let userMapper: IMapper<IDbUser, IUser>
export const getUserMapper = function (): IMapper<IDbUser, IUser> {
  if (userMapper == null) {
    userMapper = new UserMapper()
  }
  return userMapper
}

let userStore: IDatabaseStore<IUser>
export const getUserStore = function (): IDatabaseStore<IUser> {
  if (userStore == null) {
    userStore = new UserStore(getUserMapper())
  }
  return userStore
}
