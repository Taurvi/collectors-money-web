<script setup>
import { useSeoMeta, useHead } from '@unhead/vue'

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en',
  },
})

const title = 'Money Collectors'
const description
        = 'A beta application for managing group expenses.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui-pro-starter.nuxt.dev/social-card.png',
  twitterImage: 'https://ui-pro-starter.nuxt.dev/social-card.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <HeaderNavigation />

  <UMain>
    <NuxtPage />
  </UMain>

  <UFooter>
    <template #center>
      Copyright © {{ new Date().getFullYear() }} Stephen Rimbakusumo
    </template>
  </UFooter>
</template>
