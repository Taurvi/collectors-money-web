import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { IMapper } from '../IMapper'
import type { IGroup } from '../../../server/schemas/app/group'
import type { IDbGroup } from '../../../server/schemas/database/IDbGroup'
import { GroupMapper } from './GroupMapper'

describe('GroupMapper', () => {
  const mockDate = new Date(1337)
  let sut: IMapper<IDbGroup, IGroup>

  beforeEach(() => {
    vi.resetAllMocks()
    vi.useFakeTimers()
    vi.setSystemTime(mockDate)
    sut = new GroupMapper()
  })

  describe('to db', () => {
    it('should map group to db group', () => {
      // arrange
      const input: IGroup = {
        userId: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        groupId: '44646461-f4bf-489a-99f0-a0788671b176',
        groupName: 'whale family',
        createdAt: mockDate,
        updatedAt: mockDate,
        lastUpdatedBy: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
      }

      const expected: IDbGroup = {
        id: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        groupId: '44646461-f4bf-489a-99f0-a0788671b176',
        groupName: 'whale family',
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

  describe('to group', () => {
    it('should map db group to group', () => {
      // arrange
      const input: IDbGroup = {
        id: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        groupId: '44646461-f4bf-489a-99f0-a0788671b176',
        groupName: 'whale family',
        createdAt: mockDate.toISOString(),
        updatedAt: mockDate.toISOString(),
        lastUpdatedBy: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
      }

      const expected: IGroup = {
        userId: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        groupId: '44646461-f4bf-489a-99f0-a0788671b176',
        groupName: 'whale family',
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
