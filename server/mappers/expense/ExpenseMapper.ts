import type { IMapper } from '../IMapper'
import type { IDbExpense } from '~~/server/schemas/database/IDbExpense'
import { EXPENSE_SCHEMA, type IExpense } from '~~/server/schemas/app/expense'

export class ExpenseMapper implements IMapper<IDbExpense, IExpense> {
  mapToDb(input: IExpense): IDbExpense {
    return {
      id: input.ownerId,
      expenseId: input.expenseId,
      groupId: input.groupId,
      expenseName: input.expenseName,
      expenseDescription: input.expenseDescription,
      targetUserId: input.targetUserId,
      amount: input.amount,
      lastUpdatedBy: input.lastUpdatedBy,
    }
  }

  mapToApp(input: IDbExpense): IExpense {
    return EXPENSE_SCHEMA.parse({
      ownerId: input.id,
      expenseId: input.expenseId,
      groupId: input.groupId,
      expenseName: input.expenseName,
      expenseDescription: input.expenseDescription,
      targetUserId: input.targetUserId,
      amount: input.amount,
      lastUpdatedBy: input.lastUpdatedBy,
      updatedAt: input.updatedAt,
      createdAt: input.createdAt,
    })
  }
}
