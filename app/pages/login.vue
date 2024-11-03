<script setup lang="ts">
import '@aws-amplify/ui-vue/styles.css'
import { Authenticator } from '@aws-amplify/ui-vue'
</script>

<template>
  <div>
    <Authenticator
      :social-providers="['facebook']"
      :hide-sign-up="true"
    />
  </div>
</template>
