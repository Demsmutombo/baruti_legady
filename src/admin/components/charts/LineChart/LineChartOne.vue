<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div class="-ml-4 min-w-[600px] xl:min-w-full pl-2">
      <VueApexCharts type="area" height="310" :options="chartOptions" :series="series" />
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
    data: testimonyByCategory.map((item) => item.count),
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
    categories: testimonyByCategory.map((item) => item.label),
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    title: { style: { fontSize: '0px' } },
  },
}))
</script>
