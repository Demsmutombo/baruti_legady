<template>
  <admin-layout>
    <page-breadcrumb page-title="Carte du ministère" />
    <p class="admin-page-desc mb-6">
      Visualisez campagnes, témoignages et hommages sur la carte interactive. Cliquez sur un point pour
      consulter le détail.
      <a
        href="/carte"
        target="_blank"
        rel="noopener"
        class="ml-1 font-medium text-brand-600 hover:underline dark:text-brand-400"
      >
        Voir sur le site ↗
      </a>
    </p>

    <div class="admin-card admin-card--flush overflow-hidden">
      <div class="admin-card-body p-4 sm:p-6">
        <MinistryMap
          :campaigns="cms.campaigns.value"
          :testimonies="cms.testimonies.value"
          :hommages="cms.hommages.value"
          @select="openDetail"
        />
      </div>
    </div>

    <MapContentDetailModal
      :type="detailType"
      :item="detailItem"
      :open="detailOpen"
      @close="closeDetail"
    />
  </admin-layout>
</template>

<script setup>
import { onUnmounted, ref, watch } from 'vue'
import AdminLayout from '@admin/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@admin/components/common/PageBreadcrumb.vue'
import MinistryMap from '../../../components/MinistryMap.vue'
import MapContentDetailModal from '../../../components/MapContentDetailModal.vue'
import { useCmsStore } from '../../../composables/useCmsStore.js'

const cms = useCmsStore()

const detailType = ref(null)
const detailItem = ref(null)
const detailOpen = ref(false)

function openDetail({ type, item }) {
  detailType.value = type
  detailItem.value = item
  detailOpen.value = true
}

function closeDetail() {
  detailOpen.value = false
}

watch(detailOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.admin-card--flush :deep(.campaign-map) {
  border: none;
  box-shadow: none;
  background: transparent;
}
</style>
