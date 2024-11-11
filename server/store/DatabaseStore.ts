import type { AmplifyServer } from 'aws-amplify/adapter-core'
import type { IMapper } from '../mappers/IMapper'
import type { IRecordType } from '../schemas/database/recordType'
import type { IDbAudit } from '../schemas/database/IDbAudit'
import type { IAudit } from '../schemas/app/audit'

export type IDatabaseResponse<TSchema> = { isSuccess: true, data: TSchema | null } | { isSuccess: false, errors: unknown }
export type IPaginatedDatabaseReponse<TSchema> = { isSuccess: true, data: Array<TSchema> | null, nextPageToken: string | null | undefined } | { isSuccess: false, errors: unknown }
/**
 * Interface for Database CRUD operations
 */
export interface IDatabaseStore<TAppSchema extends IAudit> {
  create(contextSpec: AmplifyServer.ContextSpec, input: TAppSchema): Promise<IDatabaseResponse<TAppSchema>>
  upsert(contextSpec: AmplifyServer.ContextSpec, input: TAppSchema): Promise<IDatabaseResponse<TAppSchema>>
  read(contextSpec: AmplifyServer.ContextSpec, id: string): Promise<IDatabaseResponse<TAppSchema>>
  readPage(contextSpec: AmplifyServer.ContextSpec, id: string, limit: number, nextToken?: string): Promise<IPaginatedDatabaseReponse<TAppSchema>>
  update(contextSpec: AmplifyServer.ContextSpec, input: TAppSchema): Promise<IDatabaseResponse<TAppSchema>>
  delete(contextSpec: AmplifyServer.ContextSpec, id: string): Promise<IDatabaseResponse<TAppSchema>>
}

export class DatabaseStore<TDbSchema extends IDbAudit, TAppSchema extends IAudit> implements IDatabaseStore<TAppSchema> {
  private readonly mapper: IMapper<TDbSchema, TAppSchema>
  private readonly recordType: IRecordType

  constructor(mapper: IMapper<TDbSchema, TAppSchema>, recordType: IRecordType) {
    this.mapper = mapper
    this.recordType = recordType
  }

  public async create(contextSpec: AmplifyServer.ContextSpec, input: TAppSchema): Promise<IDatabaseResponse<TAppSchema>> {
    const currentDate = new Date().toISOString()
    const recordType = `${this.recordType}::${currentDate}`
    const dbInput = this.mapper.mapToDb({ ...input })

    const response = await client.models.Primary.create(contextSpec, { ...dbInput, recordType: recordType })

    if (response.errors) {
      return {
        isSuccess: false,
        errors: response.errors,
      }
    }
    return {
      isSuccess: true,
      data: this.mapper.mapToApp(response.data as unknown as TDbSchema),
    }
  }

  public async upsert(contextSpec: AmplifyServer.ContextSpec, input: TAppSchema): Promise<IDatabaseResponse<TAppSchema>> {
    const dbRecord = this.mapper.mapToDb(input)
    const recordType = `${this.recordType}::${dbRecord.createdAt}`

    const response = await client.models.Primary.update(contextSpec, { ...dbRecord, recordType })

    if (response.errors || response.data == null) {
      return {
        isSuccess: false,
        errors: response.errors,
      }
    }

    return {
      isSuccess: true,
      data: this.mapper.mapToApp(response.data as unknown as TDbSchema),
    }
  }

  public async read(contextSpec: AmplifyServer.ContextSpec, id: string): Promise<IDatabaseResponse<TAppSchema>> {
    const response = await this.getSingleRecord(contextSpec, id)

    if (!response.isSuccess) {
      return {
        isSuccess: false,
        errors: response.errors,
      }
    }

    if (response.data == null) {
      return {
        isSuccess: true,
        data: null,
      }
    }

    return {
      isSuccess: true,
      data: this.mapper.mapToApp(response.data),
    }
  }

  private async getSingleRecord(contextSpec: AmplifyServer.ContextSpec, id: string): Promise<IDatabaseResponse<IDbGroupMember>> {
    const response = await client.models.Primary.list(contextSpec, {
      id: id,
      recordType: { beginsWith: this.recordType },
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
      data: response.data[0] as unknown as TDbSchema,
    }
  }

  public async readPage(contextSpec: AmplifyServer.ContextSpec, id: string, limit: number, nextToken?: string): Promise<IPaginatedDatabaseReponse<TAppSchema>> {
    const response = await client.models.Primary.list(contextSpec, {
      id: id,
      recordType: { beginsWith: this.recordType },
      limit: limit,
      nextToken: nextToken,
    })

    if (response.errors) {
      return {
        isSuccess: false,
        errors: response.errors,
      }
    }

    if (response.data == null) {
      return {
        isSuccess: true,
        data: null,
        nextPageToken: response.nextToken,
      }
    }

    const mappedResponse = response.data.map(dbGroupMember => this.mapper.mapToApp(dbGroupMember as unknown as TDbSchema))
    return {
      isSuccess: true,
      data: mappedResponse,
      nextPageToken: response.nextToken,
    }
  }

  public async update(contextSpec: AmplifyServer.ContextSpec, input: TAppSchema): Promise<IDatabaseResponse<TAppSchema>> {
    const currentDate = new Date().toISOString()
    const recordType = `${this.recordType}::${currentDate}`
    const dbInput = this.mapper.mapToDb({ ...input, lastUpdatedBy: input.userId })

    const response = await client.models.Primary.update(contextSpec, { ...dbInput, recordType: recordType })

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

  public async delete(contextSpec: AmplifyServer.ContextSpec, id: string): Promise<IDatabaseResponse<TAppSchema>> {
    const record = await this.getSingleRecord(contextSpec, id)

    if (!record.isSuccess) {
      return {
        isSuccess: false,
        errors: record.errors,
      }
    }

    if (record.data == null) {
      return {
        isSuccess: true,
        data: null,
      }
    }

    const recordType = `${this.recordType}::${record.data.createdAt}`
    const response = await client.models.Primary.delete(contextSpec, {
      id: id,
      recordType: recordType,
    })

    if (response.errors) {
      return {
        isSuccess: false,
        errors: response.errors,
      }
    }

    return {
      isSuccess: true,
      data: this.mapper.mapToApp(record.data),
    }
  }
}
