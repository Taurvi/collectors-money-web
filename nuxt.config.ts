// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

  modules: ['@nuxt/eslint', '@nuxt/ui', 'nuxt-eslint-auto-explicit-import', '@vueuse/nuxt', '@nuxt/test-utils/module'],

  devtools: {
    enabled: true,
  },
  ui: {
    global: true,
  },

  sourcemap: false,

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-11-03',

  nitro: {
    prerender: {
      ignore: ['/profile'],
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
