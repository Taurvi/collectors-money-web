import type { IDbAudit } from './IDbAudit'

export interface IDbExpense extends IDbAudit {
  id: string
  expenseId: string
  groupId: string
  expenseName: string
  expenseDescription: string
  targetUserId: string
  amount: number
}
