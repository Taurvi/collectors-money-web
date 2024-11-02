// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    extends: ["@nuxt/ui-pro"],

    modules: ["@nuxt/eslint", "@nuxt/ui"],

    routeRules: {
        "/": { swr: true },
    },

    devtools: {
        enabled: true,
    },

    future: {
        compatibilityVersion: 4,
    },

    eslint: {
        config: {
            stylistic: {
                commaDangle: "never",
                braceStyle: "1tbs",
            },
        },
    },

    compatibilityDate: "2024-07-11",
});
