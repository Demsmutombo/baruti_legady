<template>
  <admin-layout>
    <page-breadcrumb page-title="Biographie" />
    <p class="admin-page-desc mb-6">
      Contenu biographique du mémorial.
      <a href="/biographie" target="_blank" rel="noopener" class="ml-1 font-medium text-brand-600 hover:underline dark:text-brand-400">
        Voir la page ↗
      </a>
    </p>

    <div class="mb-6 flex flex-wrap gap-2">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        class="admin-tab"
        :class="activeTab === tab.id ? 'admin-tab-active' : 'admin-tab-inactive'"
        @click="goToTab(tab.id)"
      >
        {{ tab.label }}
      </button>
    </div>

    <div v-if="activeTab === 'essentials'" class="admin-card">
      <div class="admin-card-header">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Informations essentielles</h3>
          <p class="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">Données clés de la biographie</p>
        </div>
      </div>
      <div class="admin-card-body">
        <form class="grid grid-cols-1 gap-4 lg:grid-cols-2" @submit.prevent="saveEssentials">
          <div>
            <label class="admin-label">Titre complet</label>
            <input v-model="essentialsForm.fullTitle" type="text" class="admin-input" />
          </div>
          <div>
            <label class="admin-label">Surnom</label>
            <input v-model="essentialsForm.nickname" type="text" class="admin-input" />
          </div>
          <div>
            <label class="admin-label">Église</label>
            <input v-model="essentialsForm.church" type="text" class="admin-input" />
          </div>
          <div>
            <label class="admin-label">Épouse</label>
            <input v-model="essentialsForm.spouse" type="text" class="admin-input" />
          </div>
          <div>
            <label class="admin-label">Années de ministère</label>
            <input v-model="essentialsForm.ministryYears" type="text" class="admin-input" />
          </div>
          <div class="lg:col-span-2 flex justify-end border-t border-gray-100 pt-5 dark:border-gray-800">
            <button type="submit" class="admin-btn admin-btn-md admin-btn-primary">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>

    <crud-page
      v-else
      :resource-key="activeTab"
      :config="crudResources[activeTab]"
      embedded
    />
  </admin-layout>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@admin/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@admin/components/common/PageBreadcrumb.vue'
import CrudPage from '@admin/components/cms/CrudPage.vue'
import { crudResources } from '@admin/config/crud.js'
import { useCmsStore } from '../../../composables/useCmsStore.js'

const route = useRoute()
const router = useRouter()
const cms = useCmsStore()

const tabIds = ['essentials', 'biographyEvents', 'biographyChapters', 'nameMeanings']
const activeTab = ref('essentials')

const tabs = [
  { id: 'essentials', label: 'Essentiels' },
  { id: 'biographyEvents', label: 'Frise chronologique' },
  { id: 'biographyChapters', label: 'Chapitres' },
  { id: 'nameMeanings', label: 'Noms' },
]

const essentialsForm = reactive({})

watch(
  () => route.query.tab,
  (tab) => {
    if (typeof tab === 'string' && tabIds.includes(tab)) {
      activeTab.value = tab
    } else {
      activeTab.value = 'essentials'
    }
  },
  { immediate: true }
)

function goToTab(tabId) {
  router.push({
    path: '/admin/biographie',
    query: tabId === 'essentials' ? {} : { tab: tabId },
  })
}

watch(
  () => cms.biographyEssentials.value,
  (data) => Object.assign(essentialsForm, data),
  { immediate: true, deep: true }
)

function saveEssentials() {
  cms.updateBiographyEssentials({ ...essentialsForm })
}
</script>
