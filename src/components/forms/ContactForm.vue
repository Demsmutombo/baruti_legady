<script setup>
import { ref, watch } from 'vue'
import { useCmsStore } from '../../composables/useCmsStore.js'
import PublicFormModalTrigger from './PublicFormModalTrigger.vue'
import PublicFormShell from './PublicFormShell.vue'

defineProps({
  buttonLabel: { type: String, default: 'Envoyer un message' },
  buttonVariant: { type: String, default: 'primary' },
})

const modalOpen = defineModel('open', { type: Boolean, default: false })

const cms = useCmsStore()
const submitted = ref(false)
const saving = ref(false)

const form = ref({ name: '', email: '', message: '' })

function resetForm() {
  submitted.value = false
  form.value = { name: '', email: '', message: '' }
}

watch(modalOpen, (isOpen) => {
  if (!isOpen && submitted.value) resetForm()
})

function onSubmit() {
  if (saving.value) return
  saving.value = true

  cms.create('contactMessages', {
    name: form.value.name.trim(),
    email: form.value.email.trim(),
    message: form.value.message.trim(),
    createdAt: new Date().toISOString(),
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
      eyebrow="Écrire"
      title="Envoyer un message"
      subtitle="Une question, une demande de prière ou un commentaire pour la fondation."
      success-title="Message envoyé"
      success-message="Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais."
      :submitted="submitted"
      @reset="resetForm"
      @done="modalOpen = false"
    >
      <form class="public-form-grid" @submit.prevent="onSubmit">
        <div class="public-form-field public-form-field--full">
          <label class="public-form-label" for="contact-name">Nom *</label>
          <input id="contact-name" v-model="form.name" type="text" required class="public-form-input" />
        </div>
        <div class="public-form-field public-form-field--full">
          <label class="public-form-label" for="contact-email">Email *</label>
          <input id="contact-email" v-model="form.email" type="email" required class="public-form-input" />
        </div>
        <div class="public-form-field public-form-field--full">
          <label class="public-form-label" for="contact-message">Message *</label>
          <textarea
            id="contact-message"
            v-model="form.message"
            rows="5"
            required
            class="public-form-input public-form-textarea"
          />
        </div>
        <div class="public-form-field public-form-field--full">
          <button type="submit" class="public-form-btn" :disabled="saving">
            {{ saving ? 'Envoi…' : 'Envoyer' }}
          </button>
        </div>
      </form>
    </PublicFormShell>
  </PublicFormModalTrigger>
</template>
