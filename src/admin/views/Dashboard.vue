<template>
  <admin-layout>
    <page-breadcrumb page-title="Tableau de bord" />

    <!-- En-tête style Sales Dashboard -->
    <div class="dash-page-header mb-6">
      <div>
        <h1 class="dash-card-title text-xl sm:text-2xl">Tableau de bord</h1>
        <p class="dash-card-subtitle">
          Gérez le contenu du mémorial Baruti Legacy Foundation en temps réel
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <a
          href="/"
          target="_blank"
          rel="noopener"
          class="dash-header-btn"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12 2.667h2v2M7.333 8.667L14 2M10.667 2H14v3.333M6 2H3.333A1.333 1.333 0 002 3.333v9.334A1.333 1.333 0 003.333 14h9.334A1.333 1.333 0 0014 12.667V10"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
            />
          </svg>
          Site public
        </a>
        <router-link to="/admin/campagnes" class="dash-header-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 4h12M4 8h8M6 12h4"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
            />
          </svg>
          Filtrer
        </router-link>
        <router-link to="/admin/biographie" class="dash-header-btn dash-header-btn-primary">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 12V4M8 4L5 7M8 4l3 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
          </svg>
          Gérer le contenu
        </router-link>
      </div>
    </div>

    <!-- Cartes stock (style portfolio) -->
    <dashboard-stock-cards class="mb-6" />

    <!-- Métriques analytics -->
    <dashboard-metric-cards class="mb-6" />

    <!-- Graphique analytics principal -->
    <dashboard-analytics-chart class="mb-6" />

    <!-- Performance + Campagnes -->
    <div class="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
      <div class="xl:col-span-7">
        <dashboard-performance-chart />
      </div>
      <div class="xl:col-span-5">
        <dashboard-campaign-chart />
      </div>
    </div>

    <!-- Top sections / pages / activité -->
    <dashboard-top-grid class="mb-6" />

    <!-- Accès rapide sections -->
    <div class="dash-chart-card mb-6">
      <div class="mb-5">
        <h3 class="dash-card-title">Gestion du site</h3>
        <p class="dash-card-subtitle">
          Accédez rapidement à chaque section du mémorial
        </p>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <router-link
          v-for="section in manageableSections"
          :key="section.path"
          :to="section.path"
          class="admin-section-card group block"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-3">
              <span
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg group-hover:bg-brand-50 dark:bg-white/[0.05] dark:group-hover:bg-brand-500/15"
              >
                {{ sectionIcons[section.key] || '📄' }}
              </span>
              <div>
                <h3 class="font-semibold text-deep-blue group-hover:text-brand-600 dark:text-white/90 dark:group-hover:text-gold-light">
                  {{ section.label }}
                </h3>
                <p class="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
                  {{ section.count }} élément{{ section.count > 1 ? 's' : '' }}
                </p>
              </div>
            </div>
            <span class="admin-badge shrink-0">Gérer</span>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Campagnes récentes -->
    <recent-orders />
  </admin-layout>
</template>

<script setup>
import { computed } from 'vue'
import AdminLayout from '@admin/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@admin/components/common/PageBreadcrumb.vue'
import DashboardStockCards from '@admin/components/dashboard/DashboardStockCards.vue'
import DashboardMetricCards from '@admin/components/dashboard/DashboardMetricCards.vue'
import DashboardAnalyticsChart from '@admin/components/dashboard/DashboardAnalyticsChart.vue'
import DashboardPerformanceChart from '@admin/components/dashboard/DashboardPerformanceChart.vue'
import DashboardCampaignChart from '@admin/components/dashboard/DashboardCampaignChart.vue'
import DashboardTopGrid from '@admin/components/dashboard/DashboardTopGrid.vue'
import RecentOrders from '@admin/components/ecommerce/RecentOrders.vue'
import { siteSections } from '@admin/config/crud.js'
import { useCmsStore } from '../../composables/useCmsStore.js'

const cms = useCmsStore()

const sectionIcons = {
  accueil: '🏠',
  biographie: '👤',
  ministere: '✝',
  campagnes: '🌍',
  carte: '🗺',
  temoignages: '💬',
  enseignements: '📖',
  hommages: '🕊',
  ceremonies: '🕯',
  galerie: '🖼',
  inscriptions: '👥',
  contact: '✉',
}

const countMap = computed(() => {
  const s = cms.stats.value
  return {
    accueil: s.highlights,
    biographie: s.biographyEvents + s.biographyChapters + cms.list('nameMeanings').length,
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

const manageableSections = computed(() =>
  siteSections
    .filter((s) => s.key !== 'dashboard')
    .map((s) => ({
      ...s,
      count: countMap.value[s.key] ?? 0,
    }))
)
</script>
