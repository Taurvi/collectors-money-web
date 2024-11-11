import type { IMapper } from '../mappers/IMapper'
import { UserMapper } from '../mappers/user/UserMapper'
import type { IUser } from '../schemas/app/user'
import type { IDbUser } from '../schemas/database/IDbUser'
import { RECORD_TYPE_SCHEMA } from '../schemas/database/recordType'
import { DatabaseStore, type IDatabaseStore } from '../store/DatabaseStore'

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
    userStore = new DatabaseStore<IDbUser, IUser>(getUserMapper(), RECORD_TYPE_SCHEMA.enum.USER)
  }
  return userStore
}
