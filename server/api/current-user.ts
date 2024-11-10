import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth/server'
import { runAmplifyApi } from '../utils/amplifyUtils'

export default defineEventHandler(async (event) => {
  const user = await runAmplifyApi(event, contextSpec => getCurrentUser(contextSpec))
  const session = await runAmplifyApi(event, contextSpec => fetchAuthSession(contextSpec))
  const fullName = session.tokens?.idToken?.payload.name as string
  const picture = session.tokens?.idToken?.payload?.picture
  const pictureJson = JSON.parse(picture as unknown as string)

  return { ...user, fullName, profilePicture: pictureJson.data.url }
})
