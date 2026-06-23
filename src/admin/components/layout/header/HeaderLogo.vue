<template>
  <router-link to="/admin" class="flex min-w-0 items-center gap-2">
    <img
      :src="pastorPortrait"
      alt="Baruti Legacy Foundation"
      class="h-9 w-9 rounded-full object-cover ring-2 ring-brand-500/30"
    />
    <span class="text-sm font-semibold text-deep-blue admin-brand-title">Baruti Legacy</span>
  </router-link>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { pastorPortrait } from '@admin/data/site.js'
</script>
