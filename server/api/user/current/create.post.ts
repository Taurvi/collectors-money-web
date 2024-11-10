import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth/server'
import { getUserStore } from '../../../di/server-di'
import { USER_SCHEMA } from '../../../schemas/app/user'

export default defineEventHandler(async (event) => {
  const userStore = getUserStore()
  const user = await runAmplifyApi(event, contextSpec => getCurrentUser(contextSpec))

  const response = await runAmplifyApi(event, async (contextSpec) => {
    const dbStoreReadUserResponse = await userStore.read(contextSpec, user.userId)

    if (dbStoreReadUserResponse.isSuccess && dbStoreReadUserResponse.data != null) {
      return dbStoreReadUserResponse
    }

    const session = await runAmplifyApi(event, contextSpec => fetchAuthSession(contextSpec))
    const fullName = session.tokens?.idToken?.payload.name as string
    const picture = session.tokens?.idToken?.payload?.picture
    const pictureJson = JSON.parse(picture as unknown as string)
    const pictureUrl = pictureJson.data.url

    const userObject = USER_SCHEMA.parse({
      id: user.userId,
      fullName: fullName,
      profilePicture: pictureUrl,
    })

    const dbStoreCreateUserResponse = await userStore.create(contextSpec, userObject)
    return dbStoreCreateUserResponse
  })

  if (!response.isSuccess) {
    setResponseStatus(event, 503)
    return { errors: response.errors }
  }

  setResponseStatus(event, 200)
  return { data: response.data }
})
