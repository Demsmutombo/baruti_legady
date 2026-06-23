<script setup>
import { ref, watch } from 'vue'
import { galleryCategories } from '../../data/content.js'
import { useCmsStore } from '../../composables/useCmsStore.js'
import PublicFormModalTrigger from './PublicFormModalTrigger.vue'
import PublicFormShell from './PublicFormShell.vue'
import MediaUploadField from './MediaUploadField.vue'

defineProps({
  buttonLabel: { type: String, default: 'Ajouter une photo' },
  buttonVariant: { type: String, default: 'primary' },
})

const modalOpen = defineModel('open', { type: Boolean, default: false })

const cms = useCmsStore()
const submitted = ref(false)
const saving = ref(false)

const categoryOptions = galleryCategories.filter((c) => c.id !== 'all')

const form = ref({
  author: '',
  caption: '',
  category: '',
  media: null,
})

function resetForm() {
  submitted.value = false
  form.value = { author: '', caption: '', category: '', media: null }
}

watch(modalOpen, (isOpen) => {
  if (!isOpen && submitted.value) resetForm()
})

async function onSubmit() {
  if (saving.value || !form.value.media?.mediaUrl) return
  saving.value = true

  cms.create('galleryItems', {
    caption: form.value.caption.trim(),
    category: form.value.category,
    customImage: form.value.media.mediaUrl,
    submittedBy: form.value.author.trim() || undefined,
    imageIndex: 1,
  })

  submitted.value = true
  saving.value = false
}
</script>

<template>
  <PublicFormModalTrigger
    v-model:open="modalOpen"
    :button-label="buttonLabel"
    :button-variant="buttonVariant"
  >
    <PublicFormShell
      in-modal
      eyebrow="Souvenirs partagés"
      title="Ajouter une photo à la galerie"
      subtitle="Contribuez avec une image du ministère, de l'église ou d'un moment marquant lié au Pasteur Baruti."
      success-title="Photo ajoutée"
      success-message="Votre souvenir est désormais visible dans la galerie du mémorial."
      :submitted="submitted"
      @reset="resetForm"
      @done="modalOpen = false"
    >
      <form class="public-form-grid" @submit.prevent="onSubmit">
        <div class="public-form-field">
          <label class="public-form-label" for="gallery-author">Votre nom</label>
          <input
            id="gallery-author"
            v-model="form.author"
            type="text"
            class="public-form-input"
            placeholder="Optionnel"
          />
        </div>

        <div class="public-form-field">
          <label class="public-form-label" for="gallery-category">Catégorie *</label>
          <select id="gallery-category" v-model="form.category" required class="public-form-input public-form-select">
            <option value="" disabled>Choisir une catégorie</option>
            <option v-for="cat in categoryOptions" :key="cat.id" :value="cat.id">
              {{ cat.label }}
            </option>
          </select>
        </div>

        <div class="public-form-field public-form-field--full">
          <label class="public-form-label" for="gallery-caption">Légende *</label>
          <input
            id="gallery-caption"
            v-model="form.caption"
            type="text"
            required
            class="public-form-input"
            placeholder="Décrivez brièvement ce moment"
          />
        </div>

        <div class="public-form-field public-form-field--full">
          <MediaUploadField
            v-model="form.media"
            label="Photo *"
            hint="JPG, PNG ou WebP — max. 4 Mo."
            images-only
          />
        </div>

        <div class="public-form-field public-form-field--full">
          <button type="submit" class="public-form-btn" :disabled="saving || !form.media">
            {{ saving ? 'Envoi…' : 'Ajouter à la galerie' }}
          </button>
        </div>
      </form>
    </PublicFormShell>
  </PublicFormModalTrigger>
</template>
