import { getUserStore } from '../../di/server-di'
import { GET_USER_PARAMS_SCHEMA } from '../../../server/schemas/api/getUserParams'

export default defineEventHandler(async (event) => {
  const userStore = getUserStore()
  const params = await getValidatedRouterParams(event, GET_USER_PARAMS_SCHEMA.parse)

  const response = await runAmplifyApi(event, async (contextSpec) => {
    return await userStore.read(contextSpec, params.id)
  })

  if (!response.isSuccess) {
    setResponseStatus(event, 503)
    return { errors: response.errors }
  }

  setResponseStatus(event, 200)
  return { data: response.data }
})
