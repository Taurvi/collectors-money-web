import type { EventHandlerRequest, H3Event } from 'h3'
import type { AmplifyServer, CookieStorage } from 'aws-amplify/adapter-core'
import {
  createAWSCredentialsAndIdentityIdProvider,
  createKeyValueStorageFromCookieStorageAdapter,
  createUserPoolsTokenProvider,
  runWithAmplifyServerContext,
} from 'aws-amplify/adapter-core'
import { parseAmplifyConfig } from 'aws-amplify/utils'

import type { LibraryOptions } from '@aws-amplify/core'

import outputs from '@@/amplify_outputs.json'

const amplifyConfig = parseAmplifyConfig(outputs)

function createCookieStorageAdapter(event: H3Event<EventHandlerRequest>): CookieStorage.Adapter {
  // `parseCookies`, `setCookie` and `deleteCookie` are Nuxt provided functions
  const readOnlyCookies = parseCookies(event)

  return {
    get(name) {
      if (readOnlyCookies[name]) {
        return { name, value: readOnlyCookies[name] }
      }
    },
    set(name, value, options) {
      setCookie(event, name, value, options)
    },
    delete(name) {
      deleteCookie(event, name)
    },
    getAll() {
      return Object.entries(readOnlyCookies).map(([name, value]) => {
        return { name, value }
      })
    },
  }
}

function createLibraryOptions(event: H3Event<EventHandlerRequest>): LibraryOptions {
  const cookieStorage = createCookieStorageAdapter(event)

  const keyValueStorage = createKeyValueStorageFromCookieStorageAdapter(cookieStorage)

  const tokenProvider = createUserPoolsTokenProvider(amplifyConfig.Auth!, keyValueStorage)

  const credentialsProvider = createAWSCredentialsAndIdentityIdProvider(amplifyConfig.Auth!, keyValueStorage)

  return {
    Auth: {
      tokenProvider,
      credentialsProvider,
    },
  }
}

export type RunAmplifyApiOperation<T> = (contextSpec: AmplifyServer.ContextSpec) => T | Promise<T>

export function runAmplifyApi<Result>(event: H3Event<EventHandlerRequest>, operation: RunAmplifyApiOperation<Result>) {
  const libraryOptions = createLibraryOptions(event)
  return runWithAmplifyServerContext<Result>(amplifyConfig, libraryOptions, operation)
}
