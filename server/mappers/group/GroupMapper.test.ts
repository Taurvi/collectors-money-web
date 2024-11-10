import { beforeEach, describe, expect, it } from 'vitest'
import type { IMapper } from '../IMapper'
import type { IGroup } from '../../../server/schemas/app/group'
import type { IDbGroup } from '../../../server/schemas/database/IDbGroup'
import { GroupMapper } from './GroupMapper'

describe('GroupMapper', () => {
  let sut: IMapper<IDbGroup, IGroup>

  beforeEach(() => {
    sut = new GroupMapper()
  })

  describe('to db', () => {
    it('should map group to db group', () => {
      // arrange
      const input: IGroup = {
        ownerUserId: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        groupId: '44646461-f4bf-489a-99f0-a0788671b176',
        groupName: 'whale family',
        lastUpdatedBy: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
      }

      const expected: IDbGroup = {
        id: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        groupId: '44646461-f4bf-489a-99f0-a0788671b176',
        groupName: 'whale family',
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
        lastUpdatedBy: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
      }

      const expected: IGroup = {
        ownerUserId: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        groupId: '44646461-f4bf-489a-99f0-a0788671b176',
        groupName: 'whale family',
        lastUpdatedBy: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        updatedAt: undefined,
        createdAt: undefined,
      }

      // act
      const response = sut.mapToApp(input)

      // assert
      expect(response).toStrictEqual(expected)
    })
  })
})
