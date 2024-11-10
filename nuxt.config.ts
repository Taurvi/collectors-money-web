// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

  modules: ['@nuxt/eslint', '@nuxt/ui', 'nuxt-eslint-auto-explicit-import', '@vueuse/nuxt'],

  devtools: {
    enabled: true,
  },
  ui: {
    global: true,
  },

  // https://github.com/nuxt/nuxt/issues/25411
  // routeRules: {
  //     "/": { swr: true },
  // },

  sourcemap: false,

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-11-03',

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
