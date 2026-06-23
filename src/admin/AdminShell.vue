<template>
  <ThemeProvider>
    <SidebarProvider>
      <RouterView />
    </SidebarProvider>
  </ThemeProvider>
</template>

<script setup>
import ThemeProvider from '@admin/components/layout/ThemeProvider.vue'
import SidebarProvider from '@admin/components/layout/SidebarProvider.vue'

import '@admin/assets/main.css'
import '@admin/assets/auth-glass.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'
</script>
