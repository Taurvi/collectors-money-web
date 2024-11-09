import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const userSchema = a.schema({
  User: a
    .model({
      id: a.id().required(),
      name: a.string(),
      profilePicture: a.string(),
    })
    .authorization(allow => [allow.authenticated('identityPool')]),
})

export type IUserSchema = ClientSchema<typeof userSchema>

export const data = defineData({
  schema: userSchema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
})
