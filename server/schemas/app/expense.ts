import { z } from 'zod'
import { AUDIT_SCHEMA } from './audit'

/**
 * expense object schema
 */
export const EXPENSE_SCHEMA = AUDIT_SCHEMA.extend({
  expenseId: z.string().uuid(),
  groupId: z.string().uuid(),
  expenseName: z.string().min(1).max(128),
  expenseDescription: z.string().min(1).max(1024),
  targetUserId: z.string().uuid(),
  amount: z.number().min(0).max(2048),
})

export type IExpense = z.infer<typeof EXPENSE_SCHEMA>
