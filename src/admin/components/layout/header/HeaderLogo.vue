<template>
  <router-link to="/admin" class="flex min-w-0 items-center gap-2">
    <img
      :src="logoSrc"
      alt="Baruti Legacy Foundation"
      class="h-9 w-9 rounded-full object-cover object-top ring-2 ring-brand-500/30"
    />
    <span class="text-sm font-semibold text-deep-blue admin-brand-title">Baruti Legacy</span>
  </router-link>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import logoSrc from '../../../../assets/anime.png'
</script>
