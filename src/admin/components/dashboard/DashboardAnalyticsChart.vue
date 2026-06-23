<template>
  <div class="dash-chart-card">
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h3 class="dash-card-title">Analytics</h3>
        <p class="dash-card-subtitle">
          Statistiques du contenu du mémorial sur les 12 derniers mois
        </p>
      </div>
      <div class="dash-tab-group">
        <button
          v-for="tab in periods"
          :key="tab.key"
          type="button"
          class="dash-tab-btn"
          :class="activePeriod === tab.key ? 'dash-tab-btn-active' : 'dash-tab-btn-inactive'"
          @click="activePeriod = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <div class="min-w-[600px] pl-2">
        <VueApexCharts type="bar" height="280" :options="chartOptions" :series="series" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useAdminSiteData } from '@admin/data/site.js'
import { useAdminChartTheme } from '@admin/composables/useAdminChartTheme.js'

const { dashboardStats } = useAdminSiteData()
const { primary, baseChart, baseAxis, baseGrid, tooltipTheme } = useAdminChartTheme()
const activePeriod = ref('12months')

const periods = [
  { key: '12months', label: '12 mois' },
  { key: '30days', label: '30 jours' },
  { key: '7days', label: '7 jours' },
  { key: '24hours', label: '24 h' },
]

const monthLabels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']

const series = computed(() => {
  const total = dashboardStats.value.campaigns + dashboardStats.value.testimonies
  const base = Math.max(total, 12)

  if (activePeriod.value === '12months') {
    return [{ name: 'Contenu', data: monthLabels.map((_, i) => Math.round(base * (0.4 + (i % 5) * 0.12))) }]
  }
  if (activePeriod.value === '30days') {
    return [{ name: 'Contenu', data: Array.from({ length: 30 }, (_, i) => Math.round(base * (0.3 + (i % 7) * 0.08))) }]
  }
  if (activePeriod.value === '7days') {
    return [{ name: 'Contenu', data: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((_, i) => Math.round(base * (0.35 + i * 0.09))) }]
  }
  return [{ name: 'Contenu', data: Array.from({ length: 24 }, (_, i) => Math.round(base * (0.2 + (i % 6) * 0.1))) }]
})

const chartCategories = computed(() => {
  if (activePeriod.value === '12months') return monthLabels
  if (activePeriod.value === '30days') return Array.from({ length: 30 }, (_, i) => `${i + 1}`)
  if (activePeriod.value === '7days') return ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
  return Array.from({ length: 24 }, (_, i) => `${i}h`)
})

const chartOptions = computed(() => ({
  colors: [primary],
  chart: { ...baseChart.value, type: 'bar' },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: activePeriod.value === '12months' ? '55%' : '70%',
      borderRadius: 4,
      borderRadiusApplication: 'end',
    },
  },
  dataLabels: { enabled: false },
  stroke: { show: false },
  xaxis: { ...baseAxis.value, categories: chartCategories.value },
  yaxis: { tickAmount: 4, labels: baseAxis.value.labels },
  grid: baseGrid.value,
  legend: { show: false },
  tooltip: {
    theme: tooltipTheme.value,
    y: { formatter: (val) => `${val} entrées` },
  },
}))
</script>
