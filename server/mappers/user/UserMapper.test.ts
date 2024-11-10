import { beforeEach, describe, expect, it } from 'vitest'
import type { IUser } from '../../schemas/app/user'
import type { IDbUser } from '../../schemas/database/IDbUser'
import type { IMapper } from '../IMapper'
import { UserMapper } from './UserMapper'

describe('UserMapper', () => {
  let sut: IMapper<IDbUser, IUser>

  beforeEach(() => {
    sut = new UserMapper()
  })

  describe('to db', () => {
    it('should map user to db user', () => {
      // arrange
      const input: IUser = {
        userId: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        fullName: 'Orca Whale',
        profilePicture: 'https://whales.are/cool',
        lastUpdatedBy: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
      }
      const expected: IDbUser = {
        id: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        fullName: 'Orca Whale',
        profilePicture: 'https://whales.are/cool',
        lastUpdatedBy: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
      }

      // act
      const response = sut.mapToDb(input)

      // assert
      expect(response).toStrictEqual(expected)
    })
  })

  describe('to user', () => {
    it('should map db user to user', () => {
      // arrange
      const input: IDbUser = {
        id: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        fullName: 'Orca Whale',
        profilePicture: 'https://whales.are/cool',
        lastUpdatedBy: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
      }

      const expected: IUser = {
        userId: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
        fullName: 'Orca Whale',
        profilePicture: 'https://whales.are/cool',
        createdAt: undefined,
        updatedAt: undefined,
        lastUpdatedBy: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
      }

      // act
      const response = sut.mapToApp(input)

      // assert
      expect(response).toStrictEqual(expected)
    })
  })
})
