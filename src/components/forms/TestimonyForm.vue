<script setup>
import { ref, watch } from 'vue'
import { testimonyCategoryOptions } from '../../data/testimonies.js'
import { useCmsStore } from '../../composables/useCmsStore.js'
import PublicFormModalTrigger from './PublicFormModalTrigger.vue'
import PublicFormShell from './PublicFormShell.vue'
import MediaUploadField from './MediaUploadField.vue'

const props = defineProps({
  buttonLabel: { type: String, default: 'Déposer un témoignage' },
  buttonVariant: { type: String, default: 'primary' },
  autoOpenHash: { type: String, default: '' },
})

const modalOpen = defineModel('open', { type: Boolean, default: false })

const cms = useCmsStore()
const submitted = ref(false)
const saving = ref(false)

const form = ref({
  author: '',
  title: '',
  category: '',
  text: '',
  media: null,
})

function resetForm() {
  submitted.value = false
  form.value = { author: '', title: '', category: '', text: '', media: null }
}

watch(modalOpen, (isOpen) => {
  if (!isOpen && submitted.value) resetForm()
})

async function onSubmit() {
  if (saving.value) return
  saving.value = true

  const payload = {
    author: form.value.author.trim(),
    title: form.value.title.trim(),
    category: form.value.category,
    text: form.value.text.trim(),
  }

  if (form.value.media) {
    payload.mediaType = form.value.media.mediaType
    payload.mediaUrl = form.value.media.mediaUrl
  }

  cms.create('testimonies', payload)
  submitted.value = true
  saving.value = false
}
</script>

<template>
  <PublicFormModalTrigger
    v-model:open="modalOpen"
    :button-label="buttonLabel"
    :button-variant="buttonVariant"
    :auto-open-hash="autoOpenHash"
  >
    <PublicFormShell
      in-modal
      eyebrow="Partager votre foi"
      title="Déposer un témoignage"
      subtitle="Racontez un miracle, une guérison ou une expérience vécue à travers le ministère du Pasteur Baruti. Vous pouvez joindre une image ou une vidéo."
      success-title="Témoignage enregistré"
      success-message="Merci d'avoir partagé votre expérience de foi. Elle enrichit la mémoire vivante de ce ministère."
      :submitted="submitted"
      @reset="resetForm"
      @done="modalOpen = false"
    >
      <form class="public-form-grid" @submit.prevent="onSubmit">
        <div class="public-form-field">
          <label class="public-form-label" for="testimony-author">Votre nom *</label>
          <input
            id="testimony-author"
            v-model="form.author"
            type="text"
            required
            class="public-form-input"
            placeholder="Ex. Jean Mukendi"
          />
        </div>

        <div class="public-form-field">
          <label class="public-form-label" for="testimony-category">Catégorie *</label>
          <select id="testimony-category" v-model="form.category" required class="public-form-input public-form-select">
            <option value="" disabled>Choisir une catégorie</option>
            <option v-for="opt in testimonyCategoryOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </select>
        </div>

        <div class="public-form-field public-form-field--full">
          <label class="public-form-label" for="testimony-title">Titre du témoignage *</label>
          <input
            id="testimony-title"
            v-model="form.title"
            type="text"
            required
            class="public-form-input"
            placeholder="Ex. Une guérison miraculeuse"
          />
        </div>

        <div class="public-form-field public-form-field--full">
          <label class="public-form-label" for="testimony-text">Votre témoignage *</label>
          <textarea
            id="testimony-text"
            v-model="form.text"
            rows="6"
            required
            class="public-form-input public-form-textarea"
            placeholder="Décrivez ce que Dieu a accompli…"
          />
        </div>

        <div class="public-form-field public-form-field--full">
          <MediaUploadField v-model="form.media" />
        </div>

        <div class="public-form-field public-form-field--full">
          <button type="submit" class="public-form-btn" :disabled="saving">
            {{ saving ? 'Envoi…' : 'Publier mon témoignage' }}
          </button>
        </div>
      </form>
    </PublicFormShell>
  </PublicFormModalTrigger>
</template>
