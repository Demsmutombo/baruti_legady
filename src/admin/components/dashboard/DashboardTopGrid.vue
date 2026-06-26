<template>
  <div class="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-3">
    <!-- Sections principales -->
    <admin-data-table title="Sections du site">
      <table class="admin-table admin-table--responsive w-full">
        <thead>
          <tr>
            <th><span class="admin-table-th">Section</span></th>
            <th class="text-right"><span class="admin-table-th">Éléments</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in topSections" :key="row.label">
            <td class="admin-table-td--lead" data-label="Section">
              <span class="admin-table-cell-title">{{ row.label }}</span>
            </td>
            <td class="text-right sm:text-right" data-label="Éléments">
              <span class="admin-table-cell-text">{{ row.count }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link to="/admin/campagnes" class="dash-report-btn mx-5 mb-5 mt-2 block sm:mx-6">
        Rapport des sections
        <span aria-hidden="true">→</span>
      </router-link>
    </admin-data-table>

    <!-- Pages populaires -->
    <admin-data-table title="Pages du mémorial">
      <table class="admin-table admin-table--responsive w-full">
        <thead>
          <tr>
            <th><span class="admin-table-th">Page</span></th>
            <th class="text-right"><span class="admin-table-th">Contenu</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in topPages" :key="row.path">
            <td class="admin-table-td--lead" data-label="Page">
              <span class="admin-table-cell-title">{{ row.path }}</span>
            </td>
            <td class="text-right sm:text-right" data-label="Contenu">
              <span class="admin-table-cell-text">{{ row.count }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <a href="/" target="_blank" rel="noopener" class="dash-report-btn mx-5 mb-5 mt-2 block sm:mx-6">
        Voir le site public
        <span aria-hidden="true">→</span>
      </a>
    </admin-data-table>

    <!-- Activité mémorial -->
    <div class="dash-chart-card">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="dash-card-title">Contenu actif</h3>
        <button type="button" class="dash-kebab-btn" aria-label="Options">
          <HorizontalDots />
        </button>
      </div>

      <div class="mb-4 flex items-center gap-2">
        <span class="relative flex h-2.5 w-2.5">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
          <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-500" />
        </span>
        <span class="text-2xl font-bold text-gray-800 dark:text-white/90">{{ totalContent }}</span>
        <span class="text-theme-sm text-gray-500 dark:text-gray-400">entrées publiées</span>
      </div>

      <div class="mb-5 overflow-hidden rounded-xl dash-sparkline-wrap p-2">
        <VueApexCharts type="area" height="100" :options="sparkOptions" :series="sparkSeries" />
      </div>

      <div class="grid grid-cols-3 divide-x divide-gray-100 dark:divide-gray-800">
        <div v-for="stat in activityStats" :key="stat.label" class="px-2 text-center first:pl-0 last:pr-0">
          <p class="text-lg font-bold text-gray-800 dark:text-white/90">{{ stat.value }}</p>
          <p class="mt-0.5 text-theme-xs text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import AdminDataTable from '@admin/components/common/AdminDataTable.vue'
import { siteSections } from '@admin/config/crud.js'
import { useCmsStore } from '../../../composables/useCmsStore.js'
import { useAdminChartTheme } from '@admin/composables/useAdminChartTheme.js'
import { ADMIN_CHART_FILL_FROM, ADMIN_CHART_FILL_TO } from '@admin/constants/theme'

const { primary } = useAdminChartTheme()

const cms = useCmsStore()

const countMap = computed(() => {
  const s = cms.stats.value
  return {
    accueil: s.highlights,
    biographie: s.biographyEvents + s.biographyChapters,
    ministere: s.ministrySections,
    campagnes: s.campaigns,
    carte: s.campaigns + s.testimonies + s.hommages,
    temoignages: s.testimonies,
    enseignements: s.teachings,
    hommages: s.hommages,
    ceremonies: s.ceremonies,
    galerie: s.gallery,
    inscriptions: s.visitorRegistrations,
    contact: 1,
  }
})

const topSections = computed(() =>
  siteSections
    .filter((s) => s.key !== 'dashboard')
    .slice(0, 4)
    .map((s) => ({
      label: s.label,
      count: countMap.value[s.key] ?? 0,
    }))
)

const topPages = computed(() => [
  { path: '/biographie', count: countMap.value.biographie },
  { path: '/campagnes', count: countMap.value.campagnes },
  { path: '/temoignages', count: countMap.value.temoignages },
  { path: '/galerie', count: countMap.value.galerie },
])

const totalContent = computed(() => {
  const s = cms.stats.value
  return s.campaigns + s.testimonies + s.teachings + s.hommages + s.gallery
})

const activityStats = computed(() => [
  { label: 'Campagnes', value: cms.stats.value.campaigns },
  { label: 'Témoignages', value: cms.stats.value.testimonies },
  { label: 'Galerie', value: cms.stats.value.gallery },
])

const sparkSeries = [{ name: 'Activité', data: [22, 28, 25, 32, 30, 38, 35, 42, 40, 45] }]

const sparkOptions = computed(() => ({
  chart: {
    fontFamily: 'Outfit, sans-serif',
    sparkline: { enabled: true },
    toolbar: { show: false },
  },
  stroke: { curve: 'smooth', width: 2 },
  fill: {
    type: 'gradient',
    gradient: {
      opacityFrom: 0.4,
      opacityTo: 0.05,
      colorStops: [
        { offset: 0, color: ADMIN_CHART_FILL_FROM, opacity: 1 },
        { offset: 100, color: ADMIN_CHART_FILL_TO, opacity: 0.1 },
      ],
    },
  },
  colors: [primary],
  tooltip: { enabled: false },
}))
</script>
