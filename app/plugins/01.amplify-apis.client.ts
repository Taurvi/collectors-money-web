import { Amplify } from 'aws-amplify'
import { fetchAuthSession, fetchUserAttributes, getCurrentUser, signInWithRedirect, signOut } from 'aws-amplify/auth'
import outputs from '../../amplify_outputs.json'

if (import.meta.client) {
  Amplify.configure(outputs, { ssr: true })
}

export default defineNuxtPlugin({
  name: 'AmplifyAPIs',
  enforce: 'pre',
  setup() {
    return {
      provide: {
        Amplify: {
          Auth: {
            fetchAuthSession,
            fetchUserAttributes,
            signInWithRedirect,
            signOut,
            getCurrentUser,
          },
        },
      },
    }
  },
})
