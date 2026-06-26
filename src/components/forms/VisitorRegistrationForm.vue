<script setup>
import { ref } from 'vue'
import { useCmsStore } from '../../composables/useCmsStore.js'
import PublicFormShell from './PublicFormShell.vue'

const cms = useCmsStore()
const submitted = ref(false)
const saving = ref(false)

const form = ref({
  fullName: '',
  church: '',
  country: '',
  phone: '',
  email: '',
  other: '',
})

function resetForm() {
  submitted.value = false
  form.value = {
    fullName: '',
    church: '',
    country: '',
    phone: '',
    email: '',
    other: '',
  }
}

function onSubmit() {
  if (saving.value) return
  saving.value = true

  cms.create('visitorRegistrations', {
    fullName: form.value.fullName.trim(),
    church: form.value.church.trim(),
    country: form.value.country.trim(),
    phone: form.value.phone.trim(),
    email: form.value.email.trim(),
    other: form.value.other.trim(),
    createdAt: new Date().toISOString(),
  })

  submitted.value = true
  saving.value = false
}
</script>

<template>
  <PublicFormShell
    eyebrow="Visiteurs"
    title="Formulaire d'inscription"
    subtitle="Merci de renseigner vos coordonnées pour que nous puissions vous accueillir et rester en contact."
    success-title="Inscription enregistrée"
    success-message="Votre inscription a bien été prise en compte. Nous avons hâte de vous accueillir."
    :submitted="submitted"
    @reset="resetForm"
  >
    <form class="public-form-grid" @submit.prevent="onSubmit">
      <div class="public-form-field public-form-field--full">
        <label class="public-form-label" for="visitor-fullName">Nom complet *</label>
        <input
          id="visitor-fullName"
          v-model="form.fullName"
          type="text"
          required
          autocomplete="name"
          class="public-form-input"
          placeholder="Prénom et nom"
        />
      </div>

      <div class="public-form-field public-form-field--full">
        <label class="public-form-label" for="visitor-church">Église *</label>
        <input
          id="visitor-church"
          v-model="form.church"
          type="text"
          required
          class="public-form-input"
          placeholder="Nom de votre assemblée ou paroisse"
        />
      </div>

      <div class="public-form-field public-form-field--full">
        <label class="public-form-label" for="visitor-country">Pays d'origine *</label>
        <input
          id="visitor-country"
          v-model="form.country"
          type="text"
          required
          autocomplete="country-name"
          class="public-form-input"
          placeholder="Ex. République Démocratique du Congo"
        />
      </div>

      <div class="public-form-field public-form-field--full">
        <label class="public-form-label" for="visitor-phone">Téléphone *</label>
        <input
          id="visitor-phone"
          v-model="form.phone"
          type="tel"
          required
          autocomplete="tel"
          class="public-form-input"
          placeholder="+243 …"
        />
      </div>

      <div class="public-form-field public-form-field--full">
        <label class="public-form-label" for="visitor-email">Email *</label>
        <input
          id="visitor-email"
          v-model="form.email"
          type="email"
          required
          autocomplete="email"
          class="public-form-input"
          placeholder="votre@email.com"
        />
      </div>

      <div class="public-form-field public-form-field--full">
        <label class="public-form-label" for="visitor-other">Autre</label>
        <p class="public-form-hint mb-2">Informations complémentaires (optionnel)</p>
        <textarea
          id="visitor-other"
          v-model="form.other"
          rows="4"
          class="public-form-input public-form-textarea"
          placeholder="Commentaires, besoins particuliers, date de visite…"
        />
      </div>

      <div class="public-form-field public-form-field--full">
        <button type="submit" class="public-form-btn" :disabled="saving">
          {{ saving ? 'Envoi…' : 'S\'inscrire' }}
        </button>
      </div>
    </form>
  </PublicFormShell>
</template>
