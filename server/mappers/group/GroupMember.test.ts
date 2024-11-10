import { beforeEach, describe, expect, it } from 'vitest'
import { GroupMemberMapper } from './GroupMemberMapper'
import type { IGroupMember } from '~~/server/schemas/app/groupMember'
import type { IDbGroupMember } from '~~/server/schemas/database/IDbGroupMember'

describe('GroupMemberMapper', () => {
  let sut: IMapper<IDbGroupMember, IGroupMember>

  beforeEach(() => {
    sut = new GroupMemberMapper()
  })

  describe('to db', () => {
    it('should map group member to db group member', () => {
      // arrange
      const input: IGroupMember = {
        userId: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        groupId: '44646461-f4bf-489a-99f0-a0788671b176',
        lastUpdatedBy: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
      }

      const expected: IDbGroupMember = {
        id: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        groupId: '44646461-f4bf-489a-99f0-a0788671b176',
        lastUpdatedBy: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
      }

      // act
      const response = sut.mapToDb(input)

      // assert
      expect(response).toStrictEqual(expected)
    })
  })

  describe('to groupMember', () => {
    it('should map db group member to group member', () => {
      // arrange
      const input: IDbGroupMember = {
        id: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        groupId: '44646461-f4bf-489a-99f0-a0788671b176',
        lastUpdatedBy: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
      }

      const expected: IGroupMember = {
        userId: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        groupId: '44646461-f4bf-489a-99f0-a0788671b176',
        lastUpdatedBy: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        createdAt: undefined,
        updatedAt: undefined,
      }

      // act
      const response = sut.mapToApp(input)

      // assert
      expect(response).toStrictEqual(expected)
    })
  })
})
