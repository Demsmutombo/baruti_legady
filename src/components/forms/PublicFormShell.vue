<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: 'Contribuer' },
  successTitle: { type: String, default: 'Merci pour votre contribution' },
  successMessage: { type: String, default: 'Votre message a bien été enregistré et sera visible sur le mémorial.' },
  submitted: { type: Boolean, default: false },
  inModal: { type: Boolean, default: false },
})

defineEmits(['reset', 'done'])
</script>

<template>
  <div class="public-form-shell" :class="{ 'public-form-shell--modal': inModal }">
    <div class="public-form-shell__header">
      <p class="public-form-shell__eyebrow">{{ eyebrow }}</p>
      <h2 class="public-form-shell__title">{{ title }}</h2>
      <div class="section-divider mx-auto mt-4 mb-4" />
      <p v-if="subtitle" class="public-form-shell__subtitle">{{ subtitle }}</p>
    </div>

    <div v-if="!submitted" class="public-form-shell__body">
      <slot />
    </div>

    <div v-else class="public-form-success">
      <div class="public-form-success__icon" aria-hidden="true">✓</div>
      <p class="public-form-success__title">{{ successTitle }}</p>
      <p class="public-form-success__message">{{ successMessage }}</p>
      <div class="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button type="button" class="public-form-btn public-form-btn--ghost" @click="$emit('reset')">
          Envoyer un autre message
        </button>
        <button v-if="inModal" type="button" class="public-form-btn" @click="$emit('done')">
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>
