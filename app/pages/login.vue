<script setup lang="ts">
import { isLoggedIn } from '@/composables/auth'
import { useNuxtApp } from '#app/nuxt'

const app = useNuxtApp()
const checkIsLoggedIn = await isLoggedIn(app)

if (checkIsLoggedIn) {
  await app.$router.push('/profile')
}
else {
  await app.$router.push('/')
}
</script>

<template>
  <div />
</template>
