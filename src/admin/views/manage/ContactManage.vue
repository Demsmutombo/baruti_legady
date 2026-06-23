<template>
  <admin-layout>
    <page-breadcrumb page-title="Contact" />
    <p class="admin-page-desc mb-6">
      Coordonnées affichées dans le pied de page et la page Contact.
      <a href="/contact" target="_blank" rel="noopener" class="ml-1 font-medium text-brand-600 hover:underline dark:text-brand-400">
        Voir la page ↗
      </a>
    </p>

    <div class="admin-card max-w-2xl">
      <div class="admin-card-header">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Coordonnées</h3>
          <p class="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
            Informations de contact de l'église
          </p>
        </div>
      </div>
      <div class="admin-card-body">
        <form class="space-y-4" @submit.prevent="save">
          <div>
            <label class="admin-label">Église</label>
            <input v-model="form.church" type="text" class="admin-input" />
          </div>
          <div>
            <label class="admin-label">Adresse</label>
            <textarea v-model="form.address" rows="3" class="admin-textarea" />
          </div>
          <div>
            <label class="admin-label">Email</label>
            <input v-model="form.email" type="email" class="admin-input" />
          </div>
          <div class="flex justify-end border-t border-gray-100 pt-5 dark:border-gray-800">
            <button type="submit" class="admin-btn admin-btn-md admin-btn-primary">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import { reactive, watch } from 'vue'
import AdminLayout from '@admin/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@admin/components/common/PageBreadcrumb.vue'
import { useCmsStore } from '../../../composables/useCmsStore.js'

const cms = useCmsStore()
const form = reactive({ church: '', address: '', email: '' })

watch(
  () => cms.contact.value,
  (c) => Object.assign(form, { church: c.church, address: c.address, email: c.email }),
  { immediate: true, deep: true }
)

function save() {
  cms.updateContact({ ...form })
}
</script>
