<script setup>
import { ref, watch } from 'vue'
import { useCmsStore } from '../../composables/useCmsStore.js'
import PublicFormModalTrigger from './PublicFormModalTrigger.vue'
import PublicFormShell from './PublicFormShell.vue'
import MediaUploadField from './MediaUploadField.vue'

const props = defineProps({
  buttonLabel: { type: String, default: 'Laisser un hommage' },
  buttonVariant: { type: String, default: 'primary' },
  autoOpenHash: { type: String, default: '' },
})

const modalOpen = defineModel('open', { type: Boolean, default: false })

const cms = useCmsStore()
const submitted = ref(false)
const saving = ref(false)

const form = ref({
  author: '',
  role: '',
  message: '',
  media: null,
})

function resetForm() {
  submitted.value = false
  form.value = { author: '', role: '', message: '', media: null }
}

watch(modalOpen, (isOpen) => {
  if (!isOpen && submitted.value) resetForm()
})

async function onSubmit() {
  if (saving.value) return
  saving.value = true

  const payload = {
    author: form.value.author.trim(),
    role: form.value.role.trim(),
    message: form.value.message.trim(),
  }

  if (form.value.media) {
    payload.mediaType = form.value.media.mediaType
    payload.mediaUrl = form.value.media.mediaUrl
  }

  cms.create('hommages', payload)
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
      eyebrow="Livre de condoléances"
      title="Laissez un hommage"
      subtitle="Partagez un message, une photo ou une courte vidéo en mémoire du Révérend Pasteur Baruti Kasongo."
      success-title="Votre hommage a été publié"
      success-message="Merci d'avoir honoré sa mémoire. Votre message apparaît désormais dans le livre de condoléances."
      :submitted="submitted"
      @reset="resetForm"
      @done="modalOpen = false"
    >
      <form class="public-form-grid" @submit.prevent="onSubmit">
        <div class="public-form-field">
          <label class="public-form-label" for="hommage-author">Votre nom *</label>
          <input
            id="hommage-author"
            v-model="form.author"
            type="text"
            required
            class="public-form-input"
            placeholder="Ex. Marie Kabongo"
          />
        </div>

        <div class="public-form-field">
          <label class="public-form-label" for="hommage-role">Rôle ou affiliation *</label>
          <input
            id="hommage-role"
            v-model="form.role"
            type="text"
            required
            class="public-form-input"
            placeholder="Ex. Fidèle de Baruti Tabernacle"
          />
        </div>

        <div class="public-form-field public-form-field--full">
          <label class="public-form-label" for="hommage-message">Votre message *</label>
          <textarea
            id="hommage-message"
            v-model="form.message"
            rows="5"
            required
            class="public-form-input public-form-textarea"
            placeholder="Écrivez votre hommage, votre prière ou votre souvenir…"
          />
        </div>

        <div class="public-form-field public-form-field--full">
          <MediaUploadField v-model="form.media" label="Photo ou vidéo souvenir (optionnel)" />
        </div>

        <div class="public-form-field public-form-field--full">
          <button type="submit" class="public-form-btn" :disabled="saving">
            {{ saving ? 'Publication…' : 'Publier mon hommage' }}
          </button>
        </div>
      </form>
    </PublicFormShell>
  </PublicFormModalTrigger>
</template>
