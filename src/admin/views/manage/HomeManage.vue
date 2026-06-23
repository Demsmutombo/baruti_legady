<template>
  <admin-layout>
    <page-breadcrumb page-title="Accueil" />
    <p class="admin-page-desc mb-6">
      Textes de la page d'accueil et piliers du ministère.
      <a href="/" target="_blank" rel="noopener" class="ml-1 font-medium text-brand-600 hover:underline dark:text-brand-400">
        Voir la page ↗
      </a>
    </p>

    <div class="admin-card mb-8">
      <div class="admin-card-header">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Informations principales</h3>
          <p class="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
            Textes affichés sur la page d'accueil du mémorial
          </p>
        </div>
      </div>
      <div class="admin-card-body">
        <form class="grid grid-cols-1 gap-4 lg:grid-cols-2" @submit.prevent="savePastor">
          <div v-for="field in pastorFields" :key="field.key" :class="field.full ? 'lg:col-span-2' : ''">
            <label class="admin-label">{{ field.label }}</label>
            <textarea
              v-if="field.type === 'textarea'"
              v-model="pastorForm[field.key]"
              :rows="field.rows || 3"
              class="admin-textarea"
            />
            <input
              v-else
              v-model="pastorForm[field.key]"
              type="text"
              class="admin-input"
            />
          </div>
          <div class="lg:col-span-2 flex justify-end border-t border-gray-100 pt-5 dark:border-gray-800">
            <button type="submit" class="admin-btn admin-btn-md admin-btn-primary">
              Enregistrer l'accueil
            </button>
          </div>
        </form>
      </div>
    </div>

    <crud-page resource-key="highlights" :config="highlightsConfig" embedded />
  </admin-layout>
</template>

<script setup>
import { reactive, watch } from 'vue'
import AdminLayout from '@admin/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@admin/components/common/PageBreadcrumb.vue'
import CrudPage from '@admin/components/cms/CrudPage.vue'
import { crudResources } from '@admin/config/crud.js'
import { useCmsStore } from '../../../composables/useCmsStore.js'

const cms = useCmsStore()
const highlightsConfig = crudResources.highlights

const pastorFields = [
  { key: 'shortName', label: 'Nom court' },
  { key: 'title', label: 'Titre' },
  { key: 'nickname', label: 'Surnom' },
  { key: 'quote', label: 'Citation', type: 'textarea', rows: 2 },
  { key: 'message', label: 'Message du ministère', type: 'textarea', rows: 3, full: true },
  { key: 'obituaryIntro', label: 'Introduction mémorial', type: 'textarea', rows: 4, full: true },
]

const pastorForm = reactive({})

watch(
  () => cms.pastor.value,
  (p) => {
    pastorFields.forEach((f) => {
      pastorForm[f.key] = p[f.key] ?? ''
    })
  },
  { immediate: true, deep: true }
)

function savePastor() {
  cms.updatePastor({ ...pastorForm })
}
</script>
