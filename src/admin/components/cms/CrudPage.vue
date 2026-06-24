<template>
  <component :is="embedded ? 'div' : AdminLayout">
    <!-- En-tête page -->
    <template v-if="!embedded">
      <page-breadcrumb :page-title="config.title" />
      <p class="admin-page-desc mb-6">{{ config.subtitle }}</p>
    </template>

    <!-- Carte principale CRUD -->
    <div class="admin-card">
      <div class="admin-card-header">
        <div>
          <h3 v-if="embedded" class="text-base font-semibold text-gray-800 dark:text-white/90">
            {{ config.title }}
          </h3>
          <p v-if="embedded && config.subtitle" class="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
            {{ config.subtitle }}
          </p>
          <p v-if="!embedded" class="text-theme-sm text-gray-500 dark:text-gray-400">
            <span class="font-medium text-gray-800 dark:text-white/90">{{ items.length }}</span>
            {{ items.length > 1 ? config.labelPlural || config.label + 's' : config.label || 'élément' }}
            enregistré{{ items.length > 1 ? 's' : '' }}
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <div class="admin-table-search-wrap w-full sm:mr-auto sm:max-w-xs">
            <svg
              class="admin-table-search-icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7.333 12.667A5.333 5.333 0 107.333 2a5.333 5.333 0 000 10.667zM14 14l-2.9-2.9"
                stroke="currentColor"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <input
              v-model="searchQuery"
              type="search"
              class="admin-table-search"
              placeholder="Rechercher…"
            />
          </div>
          <a
            v-if="config.publicPath"
            :href="config.publicPath"
            target="_blank"
            rel="noopener"
            class="admin-btn admin-btn-md admin-btn-outline"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="shrink-0">
              <path
                d="M12 2.667h2v2M7.333 8.667L14 2M10.667 2H14v3.333M6 2H3.333A1.333 1.333 0 002 3.333v9.334A1.333 1.333 0 003.333 14h9.334A1.333 1.333 0 0014 12.667V10"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Voir sur le site
          </a>
          <button type="button" class="admin-btn admin-btn-md admin-btn-primary" @click="openCreate">
            <PlusIcon class="h-4 w-4" />
            Ajouter
          </button>
        </div>
      </div>

      <div class="admin-data-table-scroll custom-scrollbar">
        <table class="admin-table admin-table--responsive min-w-full">
          <thead>
            <tr>
              <th v-for="col in config.columns" :key="col.key" :class="col.width">
                <span class="admin-table-th">{{ col.label }}</span>
              </th>
              <th class="w-28 text-right">
                <span class="admin-table-th">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!filteredItems.length">
              <td class="admin-table-td--empty" :colspan="config.columns.length + 1">
                <div class="admin-empty-state">
                  <div
                    class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-2xl dark:bg-brand-500/15"
                  >
                    📋
                  </div>
                  <p class="font-medium text-gray-800 dark:text-white/90">
                    {{ searchQuery ? 'Aucun résultat' : 'Aucun élément' }}
                  </p>
                  <p class="mt-1 max-w-sm text-theme-sm text-gray-500 dark:text-gray-400">
                    {{
                      searchQuery
                        ? 'Essayez un autre terme de recherche.'
                        : `Commencez par ajouter un ${config.label?.toLowerCase() || 'élément'} pour alimenter le site.`
                    }}
                  </p>
                  <button
                    v-if="!searchQuery"
                    type="button"
                    class="admin-btn admin-btn-md admin-btn-primary mt-5"
                    @click="openCreate"
                  >
                    <PlusIcon class="h-4 w-4" />
                    Ajouter
                  </button>
                </div>
              </td>
            </tr>
            <tr v-for="item in filteredItems" :key="item.id">
              <td
                v-for="(col, colIndex) in config.columns"
                :key="col.key"
                :data-label="col.label"
                :class="{ 'admin-table-td--lead': colIndex === 0 }"
              >
                <div v-if="col.type === 'image'" class="admin-table-cell-lead">
                  <div class="admin-table-cell-thumb">
                    <img :src="item.customImage || bk(item.imageIndex || 1)" alt="" />
                  </div>
                </div>
                <span v-else-if="col.format === 'category'" class="admin-table-status admin-table-status--brand">
                  {{ formatCategory(item[col.key]) }}
                </span>
                <span
                  v-else-if="col.format === 'galleryCategory'"
                  class="admin-table-status admin-table-status--neutral"
                >
                  {{ formatGalleryCategory(item[col.key]) }}
                </span>
                <span
                  v-else-if="col.format === 'ceremonyType'"
                  class="admin-table-status admin-table-status--warning"
                >
                  {{ formatCeremonyType(item[col.key]) }}
                </span>
                <div v-else-if="colIndex === 0" class="admin-table-cell-lead">
                  <div class="admin-table-cell-avatar">{{ getInitials(item[col.key]) }}</div>
                  <div class="min-w-0">
                    <p class="admin-table-cell-title">{{ item[col.key] }}</p>
                    <p v-if="getSecondaryLabel(item, col.key)" class="admin-table-cell-meta">
                      {{ getSecondaryLabel(item, col.key) }}
                    </p>
                  </div>
                </div>
                <span
                  v-else
                  class="admin-table-cell-text"
                  :class="{ 'line-clamp-2 max-w-md block': col.truncate }"
                >
                  {{ item[col.key] }}
                </span>
              </td>
              <td class="admin-table-td--actions text-right whitespace-nowrap" data-label="Actions">
                <div class="admin-table-actions">
                  <button
                    type="button"
                    class="admin-table-action-btn admin-table-action-btn--edit"
                    title="Modifier"
                    @click="openEdit(item)"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M11.333 2a1.414 1.414 0 012 2L5.333 12l-2.667.667L3.333 10l8-8z"
                        stroke="currentColor"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="admin-table-action-btn admin-table-action-btn--danger"
                    title="Supprimer"
                    @click="openDelete(item)"
                  >
                    <TrashIcon class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal création / édition -->
    <admin-modal
      :open="modalOpen"
      :title="(editingId ? 'Modifier' : 'Ajouter') + ' — ' + config.label"
      :editing-label="editingId ? 'Modification' : 'Nouvel élément'"
      subtitle="Les modifications sont enregistrées localement et visibles sur le site public."
      size="lg"
      @close="closeModal"
    >
      <form id="crud-form" class="admin-crud-form" @submit.prevent="save">
        <div class="admin-crud-form__grid">
          <div
            v-for="field in config.fields"
            :key="field.key"
            class="admin-form-field"
            :class="{ 'admin-form-field--full': isFullWidthField(field) }"
          >
            <label class="admin-label" :class="{ 'admin-label-required': field.required }">
              {{ field.label }}
            </label>

            <select
              v-if="field.type === 'select'"
              v-model="form[field.key]"
              class="admin-select"
              :required="field.required"
            >
              <option v-for="opt in field.options" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>

            <textarea
              v-else-if="field.type === 'textarea'"
              v-model="form[field.key]"
              :rows="field.rows || 3"
              class="admin-textarea"
              :required="field.required"
              :placeholder="field.placeholder"
            />

            <div
              v-else-if="field.type === 'imageIndex'"
              class="admin-form-image-picker flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50/80 p-3 dark:border-gray-700 dark:bg-white/[0.03] sm:flex-row sm:items-center"
            >
              <div class="flex-1">
                <select v-model.number="form[field.key]" class="admin-select" required>
                  <option v-for="n in bkImages.length" :key="n" :value="n">
                    Photo bk ({{ n }})
                  </option>
                </select>
              </div>
              <img
                :src="bk(form[field.key] || 1)"
                alt="Aperçu"
                class="h-24 w-24 shrink-0 rounded-xl object-cover ring-2 ring-brand-500/25"
              />
            </div>

            <input
              v-else
              v-model="form[field.key]"
              type="text"
              class="admin-input"
              :required="field.required"
              :placeholder="field.placeholder"
            />
          </div>
        </div>
      </form>

      <template #footer>
        <button type="button" class="admin-btn admin-btn-md admin-btn-outline" @click="closeModal">
          Annuler
        </button>
        <button type="submit" form="crud-form" class="admin-btn admin-btn-md admin-btn-primary">
          Enregistrer
        </button>
      </template>
    </admin-modal>

    <!-- Modal confirmation suppression -->
    <admin-modal
      :open="deleteOpen"
      title="Confirmer la suppression"
      :subtitle="deleteLabel ? `Voulez-vous supprimer « ${deleteLabel} » ? Cette action est irréversible.` : ''"
      size="sm"
      @close="closeDelete"
    >
      <p class="text-theme-sm text-gray-600 dark:text-gray-400">
        L'élément sera retiré du site public immédiatement.
      </p>
      <template #footer>
        <button type="button" class="admin-btn admin-btn-md admin-btn-outline" @click="closeDelete">
          Annuler
        </button>
        <button type="button" class="admin-btn admin-btn-md admin-btn-danger-solid" @click="executeDelete">
          Supprimer
        </button>
      </template>
    </admin-modal>
  </component>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import AdminLayout from '@admin/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@admin/components/common/PageBreadcrumb.vue'
import AdminModal from '@admin/components/cms/AdminModal.vue'
import { PlusIcon, TrashIcon } from '@admin/icons'
import { useCmsStore } from '../../../composables/useCmsStore.js'
import { bk, bkImages } from '../../../data/images.js'
import { testimonyCategoryOptions, galleryCategoryOptions, ceremonyTypeOptions } from '@admin/config/crud.js'

const props = defineProps({
  resourceKey: { type: String, required: true },
  config: { type: Object, required: true },
  embedded: { type: Boolean, default: false },
})

const cms = useCmsStore()
const modalOpen = ref(false)
const deleteOpen = ref(false)
const editingId = ref(null)
const deleteTarget = ref(null)
const searchQuery = ref('')
const form = reactive({})

const items = computed(() => cms.list(props.config.collection))

const filteredItems = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return items.value
  return items.value.filter((item) =>
    props.config.columns.some((col) => {
      const val = item[col.key]
      return val != null && String(val).toLowerCase().includes(q)
    })
  )
})

function getSecondaryLabel(item, currentKey) {
  for (const key of ['author', 'email', 'description', 'year', 'country']) {
    if (key !== currentKey && item[key]) {
      const val = String(item[key])
      return val.length > 48 ? `${val.slice(0, 48)}…` : val
    }
  }
  return ''
}

function getInitials(text) {
  if (!text) return '—'
  return String(text)
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

const deleteLabel = computed(() => {
  const item = deleteTarget.value
  if (!item) return ''
  return item.title || item.author || item.region || item.caption || item.name || 'cet élément'
})

function emptyForm() {
  props.config.fields.forEach((field) => {
    if (field.type === 'imageIndex') form[field.key] = 1
    else if (field.type === 'select' && field.options?.length) form[field.key] = field.options[0].value
    else form[field.key] = ''
  })
}

watch(
  () => props.resourceKey,
  () => emptyForm(),
  { immediate: true }
)

function formatCategory(value) {
  return testimonyCategoryOptions.find((o) => o.value === value)?.label || value
}

function formatGalleryCategory(value) {
  return galleryCategoryOptions.find((o) => o.value === value)?.label || value
}

function formatCeremonyType(value) {
  return ceremonyTypeOptions.find((o) => o.value === value)?.label || value
}

const halfWidthFieldKeys = new Set(['date', 'time', 'location', 'city', 'year', 'region', 'country'])

function isFullWidthField(field) {
  if (field.full || field.col === 'full') return true
  if (field.col === 'half') return false
  if (field.type === 'textarea' || field.type === 'imageIndex') return true
  return !halfWidthFieldKeys.has(field.key)
}

function openCreate() {
  editingId.value = null
  emptyForm()
  modalOpen.value = true
}

function openEdit(item) {
  editingId.value = item.id
  props.config.fields.forEach((field) => {
    form[field.key] = item[field.key] ?? ''
  })
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
}

function openDelete(item) {
  deleteTarget.value = item
  deleteOpen.value = true
}

function closeDelete() {
  deleteOpen.value = false
  deleteTarget.value = null
}

function save() {
  const payload = {}
  props.config.fields.forEach((field) => {
    payload[field.key] = form[field.key]
  })

  if (editingId.value) {
    cms.update(props.config.collection, editingId.value, payload)
  } else {
    cms.create(props.config.collection, payload)
  }
  closeModal()
}

function executeDelete() {
  if (deleteTarget.value) {
    cms.remove(props.config.collection, deleteTarget.value.id)
  }
  closeDelete()
}
</script>
