<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-6">
    <div
      v-for="metric in metrics"
      :key="metric.label"
      class="dash-metric-card"
    >
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ metric.label }}</p>
      <div class="mt-3 flex flex-wrap items-center gap-2">
        <h4 class="text-2xl font-bold text-deep-blue dark:text-white/90">
          {{ metric.displayValue }}
        </h4>
        <span
          class="dash-trend-badge"
          :class="metric.trendUp ? 'dash-trend-up' : 'dash-trend-down'"
        >
          {{ metric.trendUp ? '↑' : '↓' }} {{ metric.trend }}
        </span>
        <span class="text-theme-xs text-gray-400 dark:text-gray-500">vs mois dernier</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAdminSiteData } from '@admin/data/site.js'

const { dashboardStats } = useAdminSiteData()

const metrics = computed(() => [
  {
    label: 'Campagnes',
    displayValue: dashboardStats.value.campaigns,
    trend: '12%',
    trendUp: true,
  },
  {
    label: 'Témoignages',
    displayValue: dashboardStats.value.testimonies,
    trend: '8%',
    trendUp: true,
  },
  {
    label: 'Photos galerie',
    displayValue: dashboardStats.value.gallery,
    trend: '15%',
    trendUp: true,
  },
  {
    label: 'Enseignements',
    displayValue: dashboardStats.value.teachings,
    trend: '5%',
    trendUp: true,
  },
])
</script>
