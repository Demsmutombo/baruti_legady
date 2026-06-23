<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-6">
    <div
      v-for="metric in metrics"
      :key="metric.label"
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
    >
      <div
        class="flex items-center justify-center w-12 h-12 overflow-hidden rounded-xl bg-brand-50 dark:bg-gray-800"
      >
        <img
          v-if="metric.image"
          :src="metric.image"
          :alt="metric.label"
          class="h-full w-full object-cover"
        />
        <span v-else class="text-xl">{{ metric.icon }}</span>
      </div>

      <div class="mt-5">
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ metric.label }}</span>
        <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
          {{ metric.value }}
        </h4>
        <p class="mt-1 text-theme-xs text-gray-500 dark:text-gray-400">{{ metric.hint }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAdminSiteData, bk } from '@admin/data/site.js'

const { dashboardStats } = useAdminSiteData()

const metrics = computed(() => [
  {
    label: 'Campagnes',
    value: dashboardStats.value.campaigns,
    hint: 'Évangélisation 2005–2022',
    image: bk(10),
  },
  {
    label: 'Témoignages',
    value: dashboardStats.value.testimonies,
    hint: 'Guérisons, miracles, foi',
    image: bk(13),
  },
  {
    label: 'Galerie',
    value: dashboardStats.value.gallery,
    hint: 'Photos du ministère',
    image: bk(16),
  },
  {
    label: 'Hommages',
    value: dashboardStats.value.hommages,
    hint: 'Tributs recueillis',
    image: bk(25),
  },
])
</script>
