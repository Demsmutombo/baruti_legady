<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6"
  >
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Campagnes par année</h3>
        <p class="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
          Missions d'évangélisation du Pasteur Baruti Kasongo
        </p>
      </div>
    </div>

    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <div class="min-w-[320px] pl-2 -ml-5">
        <VueApexCharts type="bar" height="220" :options="chartOptions" :series="series" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { ADMIN_CHART_PRIMARY } from '@admin/constants/theme'
import { useAdminSiteData } from '@admin/data/site.js'

const { campaignsByYear } = useAdminSiteData()

const series = computed(() => [
  {
    name: 'Campagnes',
    data: campaignsByYear.value.counts,
  },
])

const chartOptions = computed(() => ({
  colors: [ADMIN_CHART_PRIMARY],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'bar',
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '45%',
      borderRadius: 5,
      borderRadiusApplication: 'end',
    },
  },
  dataLabels: { enabled: false },
  stroke: { show: true, width: 4, colors: ['transparent'] },
  xaxis: {
    categories: campaignsByYear.value.years,
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  legend: { show: false },
  yaxis: { title: false, tickAmount: 3 },
  grid: { yaxis: { lines: { show: true } } },
  fill: { opacity: 1 },
  tooltip: {
    y: {
      formatter: (val) => `${val} campagne${val > 1 ? 's' : ''}`,
    },
  },
}))
</script>
