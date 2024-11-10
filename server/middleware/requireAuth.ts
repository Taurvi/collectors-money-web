import { fetchAuthSession } from 'aws-amplify/auth/server'

export default defineEventHandler(async (event) => {
  if (event.path.startsWith('/api/')) {
    try {
      const session = await runAmplifyApi(event, contextSpec => fetchAuthSession(contextSpec))
      if (session.tokens == null && session.userSub == null) {
        setResponseStatus(event, 403)
        return {
          error: 'Access denied!',
        }
      }
    }
    catch {
      return {
        error: 'Access denied!',
      }
    }
  }
})
