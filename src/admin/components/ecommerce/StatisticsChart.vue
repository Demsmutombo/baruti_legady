<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6"
  >
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Témoignages par catégorie</h3>
      <p class="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
        Guérisons, miracles et faits du ministère documentés sur le site
      </p>
    </div>
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <div class="min-w-[500px] pl-2 -ml-4">
        <VueApexCharts type="area" height="310" :options="chartOptions" :series="series" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { ADMIN_CHART_PRIMARY } from '@admin/constants/theme'
import { useAdminSiteData } from '@admin/data/site.js'

const { testimonyByCategory } = useAdminSiteData()

const series = computed(() => [
  {
    name: 'Témoignages',
    data: testimonyByCategory.value.map((item) => item.count),
  },
])

const chartOptions = computed(() => ({
  legend: { show: false },
  colors: [ADMIN_CHART_PRIMARY],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'area',
    toolbar: { show: false },
  },
  fill: {
    gradient: {
      enabled: true,
      opacityFrom: 0.55,
      opacityTo: 0,
    },
  },
  stroke: { curve: 'smooth', width: 2 },
  markers: { size: 4 },
  grid: {
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } },
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: testimonyByCategory.value.map((item) => item.label),
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    title: { style: { fontSize: '0px' } },
    tickAmount: 4,
  },
  tooltip: {
    y: {
      formatter: (val) => `${val} témoignage${val > 1 ? 's' : ''}`,
    },
  },
}))
</script>
