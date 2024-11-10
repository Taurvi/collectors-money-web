import type { IMapper } from '../IMapper'
import { GROUP_SCHEMA, type IGroup } from '../../../server/schemas/app/group'
import type { IDbGroup } from '../../../server/schemas/database/IDbGroup'

/**
 * Maps user object
 */
export class GroupMapper implements IMapper<IDbGroup, IGroup> {
  /**
    * @param {IGroup} input - group object
    * @returns {IDbGroup} - db group object
    */
  public mapToDb(input: IGroup): IDbGroup {
    return {
      id: input.ownerUserId,
      groupId: input.groupId,
      groupName: input.groupName,
      lastUpdatedBy: input.lastUpdatedBy ?? null,
    }
  }

  /**
    * @param {IDbGroup} input - db group object
    * @returns {IGroup} - group object
    */
  public mapToApp(input: IDbGroup): IGroup {
    return GROUP_SCHEMA.parse({
      ownerUserId: input.id,
      groupId: input.groupId,
      groupName: input.groupName,
      updatedAt: input.updatedAt,
      createdAt: input.createdAt,
      lastUpdatedBy: input.lastUpdatedBy,
    })
  }
}
