<template>
  <div
    class="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div
      class="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6"
    >
      <div class="flex justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Ministère pastoral</h3>
          <p class="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Plus de 50 ans au service du message de l'heure
          </p>
        </div>
      </div>
      <div class="relative max-h-[195px]">
        <div class="h-full">
          <div class="radial-bar-chart">
            <VueApexCharts type="radialBar" height="330" :options="chartOptions" :series="series" />
          </div>
        </div>
        <span
          class="absolute left-1/2 top-[85%] -translate-x-1/2 -translate-y-[85%] rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/15 dark:text-brand-400"
          >1973–2024</span
        >
      </div>
      <p class="mx-auto mt-1.5 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
        {{ pastor.message }}
      </p>
    </div>

    <div class="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
      <div>
        <p class="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
          Ministère
        </p>
        <p class="text-center text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
          51+ ans
        </p>
      </div>

      <div class="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

      <div>
        <p class="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
          Tabernacle
        </p>
        <p class="text-center text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
          Depuis 1990
        </p>
      </div>

      <div class="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

      <div>
        <p class="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
          Héritage
        </p>
        <p class="text-center text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
          1947–2024
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { ADMIN_CHART_PRIMARY } from '@admin/constants/theme'
import { useCmsStore } from '../../../composables/useCmsStore.js'

const cms = useCmsStore()
const pastor = cms.pastor

const series = [100]

const chartOptions = {
  colors: [ADMIN_CHART_PRIMARY],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    sparkline: { enabled: true },
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: { size: '80%' },
      track: {
        background: '#E4E7EC',
        strokeWidth: '100%',
        margin: 5,
      },
      dataLabels: {
        name: { show: false },
        value: {
          fontSize: '32px',
          fontWeight: '600',
          offsetY: 60,
          color: '#1D2939',
          formatter: () => '51+',
        },
      },
    },
  },
  fill: { type: 'solid', colors: [ADMIN_CHART_PRIMARY] },
  stroke: { lineCap: 'round' },
  labels: ['Ministère'],
}
</script>

<style scoped>
.radial-bar-chart {
  width: 100%;
  max-width: 330px;
  margin: 0 auto;
}
</style>
