<template>
  <slot></slot>
</template>

<script setup>
import { useSidebarProvider } from '@admin/composables/useSidebar'

useSidebarProvider()
</script>
