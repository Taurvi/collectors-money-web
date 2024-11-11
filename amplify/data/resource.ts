import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

/**
 * @see https://docs.amplify.aws/vue/build-a-backend/data/
 */
const schema = a.schema({
  Primary: a
    .model({
      id: a.string().required(),
      recordType: a.string().required(),
      fullName: a.string(),
      profilePicture: a.string(),
      lastUpdatedBy: a.string(),
      groupId: a.string(),
      groupName: a.string(),
      expenseId: a.string(),
      expenseName: a.string(),
      expenseDescription: a.string(),
      targetUserId: a.string(),
      amount: a.float(),
      updatedAt: a.datetime(),
      createdAt: a.datetime(),
    })
    .identifier(['id', 'recordType'])
    .secondaryIndexes(index => [index('groupId').sortKeys(['id', 'recordType']).queryField('byGroupId'), index('expenseId').sortKeys(['id']).queryField('byExpenseId'), index('expenseId').sortKeys(['targetUserId']).queryField('byExpenseIdAndTargetUserId')])
    .authorization(allow => [allow.owner(), allow.authenticated('userPools').to(['read', 'update'])]),
})

export type ISchema = ClientSchema<typeof schema>

export const data = defineData({
  schema: schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
})
