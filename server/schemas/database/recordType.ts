import { z } from 'zod'

/**
 * Enum for db record types
 */
const RECORD_TYPE = {
  USER: 'user',
  GROUP: 'group',
  GROUP_MEMBER: 'group_member',
  EXPENSE: 'expense',
} as const

export const RECORD_TYPE_SCHEMA = z.nativeEnum(RECORD_TYPE)
export type IRecordType = z.infer<typeof RECORD_TYPE_SCHEMA>
