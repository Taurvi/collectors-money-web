import { getCurrentUser } from 'aws-amplify/auth/server'
import { runAmplifyApi } from '../../../utils/amplifyUtils'
import { getUserStore } from '../../../di/server-di'

export default defineEventHandler(async (event) => {
  const userStore = getUserStore()
  const user = await runAmplifyApi(event, contextSpec => getCurrentUser(contextSpec))

  const response = await runAmplifyApi(event, async (contextSpec) => {
    return await userStore.read(contextSpec, user.userId)
  })

  if (!response.isSuccess) {
    setResponseStatus(event, 503)
    return { errors: response.errors }
  }

  setResponseStatus(event, 200)
  return { data: response.data }
})
