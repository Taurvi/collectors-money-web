import { beforeEach, describe, expect, it } from 'vitest'
import type { IUser } from '../schemas/app/user'
import { RECORD_TYPE_SCHEMA } from '../schemas/database/recordType'
import type { IDbUser } from '../schemas/database/IDbUser'
import { UserMapper } from './UserMapper'
import type { IMapper } from './IMapper'

describe('UserMapper', () => {
  let sut: IMapper<IDbUser, IUser>

  beforeEach(() => {
    sut = new UserMapper()
  })

  it('should map user to db', () => {
    // arrange
    const input: IUser = {
      id: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
      fullName: 'Orca Whale',
      profilePicture: 'https://whales.are/cool',
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

  it('should map user to db', () => {
    // arrange
    const input: IDbUser = {
      id: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
      fullName: 'Orca Whale',
      profilePicture: 'https://whales.are/cool',
      lastUpdatedBy: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
    }

    const expected: IUser = {
      id: '586b3a12-ceb1-42d7-9d70-b14b5a94ded6',
      fullName: 'Orca Whale',
      profilePicture: 'https://whales.are/cool',
    }

    // act
    const response = sut.mapToApp(input)

    // assert
    expect(response).toStrictEqual(expected)
  })
})
