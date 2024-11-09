<script setup lang="ts">
const links = [{
  label: 'Create Group',
  icon: 'mdi:group-add',
  to: '/components/vertical-navigation'
}, {
  label: 'Vertical Navigation',
  icon: 'mdi:',
  to: '/components/vertical-navigation'
}, {
  label: 'Command Palette',
  icon: 'i-heroicons-command-line',
  to: '/components/command-palette'
}]
</script>

<template>
  <UDashboardSidebar>
    <UDashboardSidebarLinks :links="links" />
  </UDashboardSidebar>
</template>
