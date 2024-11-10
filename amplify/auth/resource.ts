import { defineAuth, secret } from '@aws-amplify/backend'

/**
 * @see https://docs.amplify.aws/vue/build-a-backend/auth/
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      facebook: {
        clientId: secret('FACEBOOK_CLIENT_ID'),
        clientSecret: secret('FACEBOOK_CLIENT_SECRET'),
        scopes: ['email, public_profile'],
        attributeMapping: {
          email: 'email',
          fullname: 'name',
          profilePicture: 'picture',
        },
      },
      callbackUrls: ['http://localhost:3000/login', 'https://oauth.pstmn.io/v1/callback'],
      logoutUrls: ['http://localhost:3000/'],
    },
  },
})
