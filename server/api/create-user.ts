import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth/server'
import { client } from '../utils/amplifyUtils'

export default defineEventHandler(async (event) => {
  const user = await runAmplifyApi(event, contextSpec => getCurrentUser(contextSpec))
  const session = await runAmplifyApi(event, contextSpec => fetchAuthSession(contextSpec))
  const fullName = session.tokens?.idToken?.payload.name as string
  const picture = session.tokens?.idToken?.payload?.picture
  const pictureJson = JSON.parse(picture as unknown as string)

  const response = await runAmplifyApi(event, async (contextSpec) => {
    const current = new Date().toISOString()
    const response = await client.models.Primary.list(contextSpec, {
      id: user.userId,
      recordType: { beginsWith: 'user' },
    })

    console.log(response)

    if (response.data == null || response.data.length === 0 || response.errors) {
      return await client.models.Primary.create(contextSpec, {
        id: user.userId,
        recordType: `user:${current}`,
        fullName: fullName,
        profilePicture: pictureJson.data.url,
        lastUpdatedBy: user.userId,
      })
    }

    return { data: response.data[0], errors: response.errors, extensions: response.extensions, nextToken: response.nextToken }
  })

  if (response.errors) {
    setResponseStatus(event, 503)
    return { errors: response.errors }
  }

  return response.data
})
