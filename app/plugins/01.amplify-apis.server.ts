import type { FetchAuthSessionOptions, LibraryOptions } from '@aws-amplify/core'
import type {
  GraphQLOptionsV6,
  GraphQLResponseV6,
} from '@aws-amplify/api-graphql'
import {
  createAWSCredentialsAndIdentityIdProvider,
  createKeyValueStorageFromCookieStorageAdapter,
  createUserPoolsTokenProvider,
  runWithAmplifyServerContext,
} from 'aws-amplify/adapter-core'
import { fetchAuthSession, fetchUserAttributes, getCurrentUser } from 'aws-amplify/auth/server'
import { parseAmplifyConfig } from 'aws-amplify/utils'
import type { CookieRef } from 'nuxt/app'

import { generateClient } from 'aws-amplify/data/server'
import outputs from '../../amplify_outputs.json'
import type { ISchema } from '../../amplify/data/resource'

const amplifyConfig = parseAmplifyConfig(outputs)
const userPoolClientId = amplifyConfig.Auth!.Cognito.userPoolClientId
const lastAuthUserCookieName = `CognitoIdentityServiceProvider.${userPoolClientId}.LastAuthUser`

const client = generateClient<ISchema>({ config: amplifyConfig })

function getAmplifyAuthKeys(lastAuthUser: string) {
  return ['idToken', 'accessToken', 'refreshToken', 'clockDrift']
    .map(key => `CognitoIdentityServiceProvider.${userPoolClientId}.${lastAuthUser}.${key}`)
    .concat(lastAuthUserCookieName)
}

export default defineNuxtPlugin({
  name: 'AmplifyAPIs',
  enforce: 'pre',
  setup() {
    const expires = new Date()
    expires.setDate(expires.getDate() + 30)
    const lastAuthUserCookie = useCookie(lastAuthUserCookieName, {
      sameSite: 'lax',
      expires,
      secure: true,
    })
    const authKeys = lastAuthUserCookie.value ? getAmplifyAuthKeys(lastAuthUserCookie.value) : []
    const amplifyCookies = authKeys
      .map(name => ({
        name,
        cookieRef: useCookie(name, { sameSite: 'lax', expires, secure: true }),
      }))
      .reduce<Record<string, CookieRef<string | null | undefined>>>(
        (result, current) => ({
          ...result,
          [current.name]: current.cookieRef,
        }),
        {},
      )

    const keyValueStorage = createKeyValueStorageFromCookieStorageAdapter({
      get(name) {
        const cookieRef = amplifyCookies[name]

        if (cookieRef && cookieRef.value) {
          return { name, value: cookieRef.value }
        }

        return undefined
      },
      getAll() {
        return Object.entries(amplifyCookies).map(([name, cookieRef]) => {
          return { name, value: cookieRef.value ?? undefined }
        })
      },
      set(name, value) {
        const cookieRef = amplifyCookies[name]
        if (cookieRef) {
          cookieRef.value = value
        }
      },
      delete(name) {
        const cookieRef = amplifyCookies[name]

        if (cookieRef) {
          cookieRef.value = null
        }
      },
    })

    const tokenProvider = createUserPoolsTokenProvider(amplifyConfig.Auth!, keyValueStorage)
    const credentialsProvider = createAWSCredentialsAndIdentityIdProvider(amplifyConfig.Auth!, keyValueStorage)

    const libraryOptions: LibraryOptions = {
      Auth: {
        tokenProvider,
        credentialsProvider,
      },
    }

    function modelWrapper(models: Record<string, Record<string, (...args: any[]) => any>>) {
      const wrapped: Record<string, Record<string, () => any>> = {}
      for (const [modelName, functionMap] of Object.entries(models)) {
        wrapped[modelName] = {}

        for (const [functionName, func] of Object.entries(functionMap)) {
          wrapped[modelName][functionName] = (...args) => runWithAmplifyServerContext(
            amplifyConfig,
            libraryOptions,
            contextSpec => func(contextSpec, ...args),
          )
        }
      }
      return wrapped
    }

    return {
      provide: {
        Amplify: {
          Auth: {
            fetchAuthSession: (options: FetchAuthSessionOptions) =>
              runWithAmplifyServerContext(amplifyConfig, libraryOptions, contextSpec =>
                fetchAuthSession(contextSpec, options),
              ),
            fetchUserAttributes: () =>
              runWithAmplifyServerContext(amplifyConfig, libraryOptions, contextSpec => fetchUserAttributes(contextSpec)),
            getCurrentUser: () =>
              runWithAmplifyServerContext(amplifyConfig, libraryOptions, contextSpec => getCurrentUser(contextSpec)),
          },
          GraphQL: {
            client: {
              models: modelWrapper(client.models),
              // Follow this typing to ensure the`graphql` API return type can
              // be inferred correctly according to your queries and mutations
              graphql: <
                FALLBACK_TYPES = unknown,
                TYPED_GQL_STRING extends string = string,
              >(
                options: GraphQLOptionsV6<FALLBACK_TYPES, TYPED_GQL_STRING>,
                additionalHeaders?: Record<string, string>,
              ) =>
                runWithAmplifyServerContext<
                  GraphQLResponseV6<FALLBACK_TYPES, TYPED_GQL_STRING>
                >(amplifyConfig, libraryOptions, contextSpec =>
                  client.graphql(
                    contextSpec,
                    options,
                    additionalHeaders,
                  )),
            },
          },
        },
      },
    }
  },
})
