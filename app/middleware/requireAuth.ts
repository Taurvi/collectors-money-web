export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const app = useNuxtApp()
  const checkIsLoggedIn = await isLoggedIn(app)

  if (!checkIsLoggedIn) {
    return navigateTo('/', { redirectCode: 403 })
  }
})
