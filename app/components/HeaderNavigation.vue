<script setup lang="ts">
import { useAuthenticator } from '@aws-amplify/ui-vue'

const auth = useAuthenticator()
const session = await useNuxtApp().$Amplify.Auth.fetchAuthSession()

const isSignedIn = computed(() => {
  return auth.authStatus === 'authenticated' && session.tokens != null
})

const profileName = computed(() => {
  return session.tokens?.idToken?.payload.name
})

const profilePic = computed(() => {
  const picture = session.tokens?.idToken?.payload?.picture
  const pictureJson = JSON.parse(picture as unknown as string)
  return pictureJson.data.url
})

async function signOutHandler() {
  await auth.signOut()
  await useNuxtApp().$router.push('/')
}
</script>

<template>
  <UHeader>
    <template #logo>
      Nuxt UI Pro <UBadge
        label="Starter"
        variant="subtle"
        class="mb-0.5"
      />
    </template>

    <template #right>
      <div v-if="isSignedIn">
        <UButton
          aria-label="Profile button"
          color="gray"
          variant="ghost"
          @click="$router.push('/profile')"
        >
          <UAvatar
            size="sm"
            icon="i-material-symbols:account-circle-outline"
            :src="profilePic"
            alt="Avatar"
          />
          {{ profileName }}
        </UButton>
      </div>
      <div v-if="isSignedIn">
        <UButton
          icon="i-material-symbols:logout-rounded"
          aria-label="Sign out button"
          color="gray"
          variant="ghost"
          @click="signOutHandler"
        >
          Sign Out
        </UButton>
      </div>
      <div v-if="!isSignedIn">
        <UButton
          icon="i-material-symbols:login-rounded"
          aria-label="Sign in button"
          color="gray"
          variant="ghost"
          @click="$router.push('/login')"
        >
          Log In
        </UButton>
      </div>

      <UColorModeButton />

      <UButton
        to="https://github.com/Taurvi/collectors-money-web"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="gray"
        variant="ghost"
      />
    </template>
  </UHeader>
</template>
