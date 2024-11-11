import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { IMapper } from '../IMapper'
import type { IExpense } from '../../../server/schemas/app/expense'
import type { IDbExpense } from '../../../server/schemas/database/IDbExpense'
import { ExpenseMapper } from './ExpenseMapper'

describe('ExpenseMapper', () => {
  const mockDate = new Date(1337)
  let sut: IMapper<IDbExpense, IExpense>

  beforeEach(() => {
    vi.resetAllMocks()
    vi.useFakeTimers()
    vi.setSystemTime(mockDate)
    sut = new ExpenseMapper()
  })

  describe('to db', () => {
    it('should map expense to db expense', () => {
      // arrange
      const input: IExpense = {
        userId: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        expenseId: 'aaffd8b2-aecf-4fce-9c0f-154b4287a80a',
        groupId: '44646461-f4bf-489a-99f0-a0788671b176',
        expenseName: 'whale food',
        expenseDescription: 'whales like food',
        targetUserId: 'a01e4cf6-de69-403a-8dad-1fa9677a8ab1',
        amount: 13.37,
        createdAt: mockDate,
        updatedAt: mockDate,
        lastUpdatedBy: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
      }

      const expected: IDbExpense = {
        id: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        expenseId: 'aaffd8b2-aecf-4fce-9c0f-154b4287a80a',
        groupId: '44646461-f4bf-489a-99f0-a0788671b176',
        expenseName: 'whale food',
        expenseDescription: 'whales like food',
        targetUserId: 'a01e4cf6-de69-403a-8dad-1fa9677a8ab1',
        amount: 13.37,
        createdAt: mockDate.toISOString(),
        updatedAt: mockDate.toISOString(),
        lastUpdatedBy: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
      }

      // act
      const response = sut.mapToDb(input)

      // assert
      expect(response).toStrictEqual(expected)
    })
  })

  describe('to expense', () => {
    it('should map db expense to expense', () => {
      // arrange
      const input: IDbExpense = {
        id: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        expenseId: 'aaffd8b2-aecf-4fce-9c0f-154b4287a80a',
        groupId: '44646461-f4bf-489a-99f0-a0788671b176',
        expenseName: 'whale food',
        expenseDescription: 'whales like food',
        targetUserId: 'a01e4cf6-de69-403a-8dad-1fa9677a8ab1',
        amount: 13.37,
        createdAt: mockDate.toISOString(),
        updatedAt: mockDate.toISOString(),
        lastUpdatedBy: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
      }

      const expected: IExpense = {
        userId: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        expenseId: 'aaffd8b2-aecf-4fce-9c0f-154b4287a80a',
        groupId: '44646461-f4bf-489a-99f0-a0788671b176',
        expenseName: 'whale food',
        expenseDescription: 'whales like food',
        targetUserId: 'a01e4cf6-de69-403a-8dad-1fa9677a8ab1',
        amount: 13.37,
        createdAt: mockDate,
        updatedAt: mockDate,
        lastUpdatedBy: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
      }

      // act
      const response = sut.mapToApp(input)

      // assert
      expect(response).toStrictEqual(expected)
    })
  })
})
