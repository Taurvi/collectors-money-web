import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource'
import { data } from './data/resource'

/**
 * @see https://docs.amplify.aws/vue/build-a-backend/
 */
const backend = defineBackend({
  auth,
  data,
})

const { cfnUserPool } = backend.auth.resources.cfnResources

cfnUserPool.adminCreateUserConfig = {
  allowAdminCreateUserOnly: true,
}
