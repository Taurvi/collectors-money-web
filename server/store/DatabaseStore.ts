import type { AmplifyServer } from 'aws-amplify/adapter-core'

export type IDatabaseResponse<TSchema> = { isSuccess: true, data: TSchema | null } | { isSuccess: false, errors: unknown }

/**
 * Interface for Database CRUD operations
 */
export interface IDatabaseStore<TSchema> {
  create(contextSpec: AmplifyServer.ContextSpec, input: TSchema): Promise<IDatabaseResponse<TSchema>>
  upsert(contextSpec: AmplifyServer.ContextSpec, input: TSchema): Promise<IDatabaseResponse<TSchema>>
  read(contextSpec: AmplifyServer.ContextSpec, id: string): Promise<IDatabaseResponse<TSchema>>
  update(contextSpec: AmplifyServer.ContextSpec, input: TSchema): Promise<IDatabaseResponse<TSchema>>
  delete(contextSpec: AmplifyServer.ContextSpec, id: string): Promise<IDatabaseResponse<TSchema>>
}
