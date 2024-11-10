import type { AmplifyServer } from 'aws-amplify/adapter-core'
import type { IMapper } from '../mappers/IMapper'
import type { IUser } from '../schemas/app/user'
import type { IDbUser } from '../schemas/database/IDbUser'
import { client } from '../utils/amplifyUtils'
import { RECORD_TYPE_SCHEMA } from '../schemas/database/recordType'
import type { IDatabaseResponse, IDatabaseStore } from './DatabaseStore'

/**
 * CRUD operations for User object
 */
export class UserStore implements IDatabaseStore<IUser> {
  private readonly mapper: IMapper<IDbUser, IUser>

  constructor(mapper: IMapper<IDbUser, IUser>) {
    this.mapper = mapper
  }

  /**
    * @param {AmplifyServer.ContextSpec} contextSpec - from Amplify API request, contains auth info
    * @param {IUser} input - user object
    * @returns {Promise<IDatabaseResponse<IUser>>} - Response from the database with user object
    */
  public async create(contextSpec: AmplifyServer.ContextSpec, input: IUser): Promise<IDatabaseResponse<IUser>> {
    const currentDate = new Date().toISOString()
    const recordType = `${RECORD_TYPE_SCHEMA.enum.USER}::${currentDate}`
    const dbInput = this.mapper.mapToDb(input)
    const response = await client.models.Primary.create(contextSpec, { ...dbInput, recordType: recordType })
    if (response.errors) {
      return {
        isSuccess: false,
        errors: response.errors,
      }
    }
    return {
      isSuccess: true,
      data: input,
    }
  }

  /**
    * @param {AmplifyServer.ContextSpec} _contextSpec - from Amplify API request, contains auth info
    * @param {IUser} _input - user object
    * @returns {Promise<IDatabaseResponse<IUser>>} - Response from the database with user object
    * @throws {Error} - Not implemented
    */
  public async upsert(_contextSpec: AmplifyServer.ContextSpec, _input: IUser): Promise<IDatabaseResponse<IUser>> {
    throw new Error ('not implemented')
  }

  /**
    * @param {AmplifyServer.ContextSpec} contextSpec - from Amplify API request, contains auth info
    * @param {string} id - user id
    * @returns {Promise<IDatabaseResponse<IUser>>} - Response from the database with user object or null if not found
    */
  public async read(contextSpec: AmplifyServer.ContextSpec, id: string): Promise<IDatabaseResponse<IUser>> {
    const response = await client.models.Primary.list(contextSpec, {
      id: id,
      recordType: { beginsWith: RECORD_TYPE_SCHEMA.enum.USER },
      limit: 1,
    })

    if (response.errors) {
      return {
        isSuccess: false,
        errors: response.errors,
      }
    }

    if (response.data == null || response.data.length === 0) {
      return {
        isSuccess: true,
        data: null,
      }
    }

    return {
      isSuccess: true,
      data: this.mapper.mapToApp(response.data[0] as IDbUser),
    }
  }

  /**
    * @param {AmplifyServer.ContextSpec} _contextSpec - from Amplify API request, contains auth info
    * @param {IUser} _input - user object
    * @returns {Promise<IDatabaseResponse<IUser>>} - Response from the database with user object
    * @throws {Error} - Not implemented
    */
  public async update(_contextSpec: AmplifyServer.ContextSpec, _input: IUser): Promise<IDatabaseResponse<IUser>> {
    throw new Error ('not implemented')
  }

  /**
    * @param {AmplifyServer.ContextSpec} _contextSpec - from Amplify API request, contains auth info
    * @param {string} _id - user object
    * @returns {Promise<IDatabaseResponse<IUser>>} - Response from the database with user object
    * @throws {Error} - Not implemented
    */
  public async delete(_contextSpec: AmplifyServer.ContextSpec, _id: string): Promise<IDatabaseResponse<IUser>> {
    throw new Error ('not implemented')
  }
}
