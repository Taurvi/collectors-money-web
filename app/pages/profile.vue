<script setup lang="ts">
definePageMeta({
  middleware: ['require-auth']
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel
      :width="300"
      :resizable="{ min: 200, max: 400 }"
    >
      <SidebarNavigation />
    </UDashboardPanel>
  </UDashboardPage>
</template>
