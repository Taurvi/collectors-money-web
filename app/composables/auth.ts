import type { AuthSession } from 'aws-amplify/auth'
import type { NuxtApp } from '#app'

export const loginWithFacebook = async function (app: NuxtApp) {
  return await app.$Amplify.Auth.signInWithRedirect({ provider: 'Facebook' })
}

export const getSession = async function (app: NuxtApp): Promise<AuthSession> {
  return await app.$Amplify.Auth.fetchAuthSession()
}

export const logOut = async function (app: NuxtApp): Promise<void> {
  await app.$Amplify.Auth.signOut()
  await app.$router.push('/')
}

export const isLoggedIn = async function (app: NuxtApp): Promise<boolean> {
  const session = await getSession(app)
  return session.tokens != null && session.userSub != null
}

export const redirectIfNotLoggedIn = async function (app: NuxtApp): Promise<void> {
  const session = await isLoggedIn(app)
  if (!session) {
    await app.$router.push('/')
  }
}
