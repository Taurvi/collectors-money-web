import { getCurrentUser } from 'aws-amplify/auth/server'
import { runAmplifyApi } from '../utils/amplifyUtils'

export default defineEventHandler(async (event) => {
  const user = await runAmplifyApi(event, contextSpec => getCurrentUser(contextSpec))
  return user
})
