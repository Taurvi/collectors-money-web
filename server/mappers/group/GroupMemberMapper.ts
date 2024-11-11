import { GROUP_MEMBER_SCHEMA, type IGroupMember } from '../../schemas/app/groupMember'
import type { IDbGroupMember } from '../../schemas/database/IDbGroupMember'
import type { IMapper } from '../IMapper'

export class GroupMemberMapper implements IMapper<IDbGroupMember, IGroupMember> {
  public mapToDb(input: IGroupMember): IDbGroupMember {
    return {
      id: input.userId,
      groupId: input.groupId,
      createdAt: input.createdAt.toISOString(),
      updatedAt: input.updatedAt.toISOString(),
      lastUpdatedBy: input.lastUpdatedBy,
    }
  }

  public mapToApp(input: IDbGroupMember): IGroupMember {
    return GROUP_MEMBER_SCHEMA.parse({
      userId: input.id,
      groupId: input.groupId,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      lastUpdatedBy: input.lastUpdatedBy,
    })
  }
}
