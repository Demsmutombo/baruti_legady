<template>
  <div class="dash-chart-card h-full">
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h3 class="dash-card-title">Performance du ministère</h3>
        <p class="dash-card-subtitle">
          Évolution des campagnes et témoignages publiés
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
      <div class="min-w-[320px]">
        <VueApexCharts type="area" height="260" :options="chartOptions" :series="series" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useAdminSiteData } from '@admin/data/site.js'
import { useAdminChartTheme } from '@admin/composables/useAdminChartTheme.js'
import { ADMIN_CHART_FILL_FROM, ADMIN_CHART_FILL_TO } from '@admin/constants/theme'

const { campaignsByYear, testimonyByCategory } = useAdminSiteData()
const { primary, baseChart, baseAxis, baseGrid, tooltipTheme } = useAdminChartTheme()
const activePeriod = ref('monthly')

const periods = [
  { key: 'monthly', label: 'Mensuel' },
  { key: 'quarterly', label: 'Trimestriel' },
  { key: 'annually', label: 'Annuel' },
]

const series = computed(() => {
  if (activePeriod.value === 'annually') {
    return [{ name: 'Campagnes', data: campaignsByYear.value.counts.length ? campaignsByYear.value.counts : [2, 3, 1, 2] }]
  }
  if (activePeriod.value === 'quarterly') {
    const counts = testimonyByCategory.value.map((t) => t.count)
    return [{ name: 'Témoignages', data: counts.length ? counts : [3, 4, 2, 3] }]
  }
  return [{ name: 'Activité', data: [28, 35, 32, 40, 38, 45, 42, 48, 44, 50, 47, 52] }]
})

const chartCategories = computed(() => {
  if (activePeriod.value === 'annually') {
    return campaignsByYear.value.years.length ? campaignsByYear.value.years : ['2005', '2010', '2015', '2020']
  }
  if (activePeriod.value === 'quarterly') {
    return testimonyByCategory.value.map((t) => t.label) || ['T1', 'T2', 'T3', 'T4']
  }
  return ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
})

const chartOptions = computed(() => ({
  colors: [primary],
  chart: { ...baseChart.value, type: 'area' },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.55,
      opacityTo: 0.05,
      colorStops: [
        { offset: 0, color: ADMIN_CHART_FILL_FROM, opacity: 1 },
        { offset: 100, color: ADMIN_CHART_FILL_TO, opacity: 0.1 },
      ],
    },
  },
  stroke: { curve: 'smooth', width: 2 },
  dataLabels: { enabled: false },
  markers: { size: 0, hover: { size: 4 } },
  xaxis: { ...baseAxis.value, categories: chartCategories.value },
  yaxis: { tickAmount: 4, labels: baseAxis.value.labels },
  grid: baseGrid.value,
  legend: { show: false },
  tooltip: { theme: tooltipTheme.value },
}))
</script>
