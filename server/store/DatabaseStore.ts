export type IDatabaseResponse<TSchema> = { isSuccess: true, data: TSchema | null } | { isSuccess: false, errors: unknown }

export interface IDatabaseStore<TSchema> {
  create(input: TSchema): Promise<IDatabaseResponse<TSchema>>
  read(id: string): Promise<IDatabaseResponse<TSchema>>
  update(input: TSchema): Promise<IDatabaseResponse<TSchema>>
  delete(id: string): Promise<IDatabaseResponse<TSchema>>
}
