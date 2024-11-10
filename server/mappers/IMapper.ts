/**
 * Interface for database/app mappers
 */
export interface IMapper<TDatabaseSchema, TAppSchema> {
  mapToDb(input: TAppSchema): TDatabaseSchema
  mapToApp(input: TDatabaseSchema): TAppSchema
}
