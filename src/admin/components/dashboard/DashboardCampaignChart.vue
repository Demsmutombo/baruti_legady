<template>
  <div class="dash-chart-card h-full">
    <div class="mb-4 flex items-center justify-between">
      <h3 class="dash-card-title">Campagnes</h3>
      <button type="button" class="dash-kebab-btn" aria-label="Options">
        <HorizontalDots />
      </button>
    </div>

    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <div class="min-w-[240px]">
        <VueApexCharts type="bar" height="220" :options="chartOptions" :series="series" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { HorizontalDots } from '@admin/icons'
import { useAdminSiteData } from '@admin/data/site.js'
import { useAdminChartTheme } from '@admin/composables/useAdminChartTheme.js'

const { campaignsByYear } = useAdminSiteData()
const { primary, baseChart, baseAxis, baseGrid, tooltipTheme } = useAdminChartTheme()

const series = computed(() => [
  {
    name: 'Campagnes',
    data: campaignsByYear.value.counts.length ? campaignsByYear.value.counts : [1, 2, 1, 3, 2, 1],
  },
])

const chartOptions = computed(() => ({
  colors: [primary],
  chart: { ...baseChart.value, type: 'bar' },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '45%',
      borderRadius: 6,
      borderRadiusApplication: 'end',
    },
  },
  dataLabels: { enabled: false },
  xaxis: {
    ...baseAxis.value,
    categories: campaignsByYear.value.years.length
      ? campaignsByYear.value.years
      : ['2005', '2010', '2015', '2018', '2020', '2022'],
    labels: { ...baseAxis.value.labels, style: { ...baseAxis.value.labels.style, fontSize: '11px' } },
  },
  yaxis: { tickAmount: 4, labels: baseAxis.value.labels },
  grid: baseGrid.value,
  legend: { show: false },
  tooltip: {
    theme: tooltipTheme.value,
    y: { formatter: (val) => `${val} campagne${val > 1 ? 's' : ''}` },
  },
}))
</script>
