<template>
  <admin-layout>
    <page-breadcrumb page-title="Inscriptions visiteurs" />
    <p class="admin-page-desc mb-6">
      Formulaires remplis par les visiteurs sur le site public.
      <a
        href="/inscription"
        target="_blank"
        rel="noopener"
        class="ml-1 font-medium text-brand-600 hover:underline dark:text-brand-400"
      >
        Voir la page ↗
      </a>
    </p>

    <div class="admin-card">
      <div class="admin-card-header">
        <div>
          <p class="text-theme-sm text-gray-500 dark:text-gray-400">
            <span class="font-medium text-gray-800 dark:text-white/90">{{ filteredItems.length }}</span>
            inscription{{ filteredItems.length > 1 ? 's' : '' }}
            enregistrée{{ filteredItems.length > 1 ? 's' : '' }}
          </p>
        </div>
        <div class="admin-table-search-wrap w-full sm:max-w-xs">
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
          <input v-model="searchQuery" type="search" class="admin-table-search" placeholder="Rechercher…" />
        </div>
      </div>

      <div class="admin-data-table-scroll custom-scrollbar">
        <table class="admin-table admin-table--responsive min-w-full">
          <thead>
            <tr>
              <th><span class="admin-table-th">Date</span></th>
              <th><span class="admin-table-th">Nom complet</span></th>
              <th><span class="admin-table-th">Église</span></th>
              <th><span class="admin-table-th">Pays d'origine</span></th>
              <th><span class="admin-table-th">Téléphone</span></th>
              <th><span class="admin-table-th">Email</span></th>
              <th><span class="admin-table-th">Autre</span></th>
              <th class="w-20 text-right"><span class="admin-table-th">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!filteredItems.length">
              <td class="admin-table-td--empty" colspan="8">
                <div class="admin-empty-state">
                  <div
                    class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-2xl dark:bg-brand-500/15"
                  >
                    📋
                  </div>
                  <p class="font-medium text-gray-800 dark:text-white/90">
                    {{ searchQuery ? 'Aucun résultat' : 'Aucune inscription' }}
                  </p>
                  <p class="mt-1 max-w-sm text-theme-sm text-gray-500 dark:text-gray-400">
                    Les inscriptions des visiteurs apparaîtront ici dès qu'elles seront soumises.
                  </p>
                </div>
              </td>
            </tr>
            <tr v-for="item in filteredItems" :key="item.id">
              <td data-label="Date">
                <span class="admin-table-cell-text whitespace-nowrap">{{ formatDate(item.createdAt) }}</span>
              </td>
              <td data-label="Nom complet" class="admin-table-td--lead">
                <div class="admin-table-cell-lead">
                  <div class="admin-table-cell-avatar">{{ getInitials(item.fullName) }}</div>
                  <p class="admin-table-cell-title">{{ item.fullName }}</p>
                </div>
              </td>
              <td data-label="Église">
                <span class="admin-table-cell-text">{{ item.church }}</span>
              </td>
              <td data-label="Pays d'origine">
                <span class="admin-table-cell-text">{{ item.country }}</span>
              </td>
              <td data-label="Téléphone">
                <a :href="`tel:${item.phone}`" class="admin-table-cell-text hover:text-brand-600">{{ item.phone }}</a>
              </td>
              <td data-label="Email">
                <a :href="`mailto:${item.email}`" class="admin-table-cell-text hover:text-brand-600">{{ item.email }}</a>
              </td>
              <td data-label="Autre">
                <span class="admin-table-cell-text line-clamp-2 max-w-xs block">{{ item.other || '—' }}</span>
              </td>
              <td class="admin-table-td--actions text-right whitespace-nowrap" data-label="Actions">
                <button
                  type="button"
                  class="admin-table-action-btn admin-table-action-btn--danger"
                  title="Supprimer"
                  @click="removeItem(item)"
                >
                  <TrashIcon class="h-4 w-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import { computed, ref } from 'vue'
import AdminLayout from '@admin/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@admin/components/common/PageBreadcrumb.vue'
import { TrashIcon } from '@admin/icons'
import { useCmsStore } from '../../../composables/useCmsStore.js'

const cms = useCmsStore()
const searchQuery = ref('')

const items = computed(() =>
  [...cms.list('visitorRegistrations')].sort(
    (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
  ),
)

const filteredItems = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return items.value
  return items.value.filter((item) =>
    [item.fullName, item.church, item.country, item.phone, item.email, item.other]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(q)),
  )
})

function formatDate(value) {
  if (!value) return '—'
  return new Date(value).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getInitials(name) {
  return String(name || '?')
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('')
}

function removeItem(item) {
  if (!window.confirm(`Supprimer l'inscription de ${item.fullName} ?`)) return
  cms.remove('visitorRegistrations', item.id)
}
</script>
