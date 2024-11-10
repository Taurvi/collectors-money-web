import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
  Primary: a
    .model({
      id: a.string().required(),
      recordType: a.string().required(),
      fullName: a.string(),
      profilePicture: a.string(),
      lastUpdatedBy: a.string().required(),
    })
    .identifier(['id', 'recordType'])
    .authorization(allow => [allow.owner(), allow.authenticated('userPools').to(['read', 'update'])]),
})

export type ISchema = ClientSchema<typeof schema>

export const data = defineData({
  schema: schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
})
