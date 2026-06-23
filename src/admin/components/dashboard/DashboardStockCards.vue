<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-6">
    <div v-for="card in stockCards" :key="card.key" class="dash-stock-card">
      <div class="flex items-center gap-3">
        <div class="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100 dark:ring-gray-800">
          <img :src="card.image" :alt="card.title" class="h-full w-full object-cover" />
        </div>
        <div class="min-w-0">
          <p class="truncate text-sm font-bold text-deep-blue dark:text-white/90">{{ card.code }}</p>
          <p class="truncate text-theme-xs text-gray-500 dark:text-gray-400">{{ card.title }}</p>
        </div>
      </div>
      <div class="mt-5 flex items-end justify-between gap-2">
        <p class="text-xl font-bold text-deep-blue dark:text-white/90">{{ card.value }}</p>
        <span
          class="dash-trend-badge shrink-0"
          :class="card.trendUp ? 'dash-trend-up' : 'dash-trend-down'"
        >
          {{ card.trendUp ? '↑' : '↓' }} {{ card.trend }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAdminSiteData, bk } from '@admin/data/site.js'

const { dashboardStats } = useAdminSiteData()

const stockCards = computed(() => [
  {
    key: 'campaigns',
    code: 'Missions',
    title: 'Campagnes d\'évangélisation',
    value: dashboardStats.value.campaigns,
    trend: '11%',
    trendUp: true,
    image: bk(10),
  },
  {
    key: 'testimonies',
    code: 'Foi',
    title: 'Témoignages & miracles',
    value: dashboardStats.value.testimonies,
    trend: '9%',
    trendUp: true,
    image: bk(13),
  },
  {
    key: 'gallery',
    code: 'Médias',
    title: 'Galerie photos',
    value: dashboardStats.value.gallery,
    trend: '4%',
    trendUp: true,
    image: bk(16),
  },
  {
    key: 'hommages',
    code: 'Tributs',
    title: 'Hommages reçus',
    value: dashboardStats.value.hommages,
    trend: '2%',
    trendUp: false,
    image: bk(25),
  },
])
</script>
