<script setup lang="ts">
import { computed } from 'vue'
import { Hub } from 'aws-amplify/utils'
import { loginWithFacebook, logOut, isLoggedIn, getSession } from '@/composables/auth'

const app = useNuxtApp()
const session = await getSession(app)
const checkIsLoggedIn = await isLoggedIn(app)

const isSignedIn = computed(() => {
  return checkIsLoggedIn
})

const triggerLogin = async function (): Promise<void> {
  await loginWithFacebook(app)
}

const triggerLogOut = async function (): Promise<void> {
  await logOut(app)
}

const profileName = computed(() => {
  const fullName = session.tokens?.idToken?.payload.name as string
  if (fullName == null) {
    return ''
  }
  const split = fullName.split(' ')
  return split[0]
})

const profilePic = computed(() => {
  const picture = session.tokens?.idToken?.payload?.picture
  const pictureJson = JSON.parse(picture as unknown as string)
  return pictureJson.data.url
})

Hub.listen('auth', (data) => {
  console.log(data.payload)
})
</script>

<template>
  <UHeader>
    <template #logo>
      Money Collectors<UBadge
        label="Beta"
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
          @click="triggerLogOut"
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
          @click="triggerLogin"
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
