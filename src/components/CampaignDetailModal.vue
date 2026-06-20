<script setup>
defineProps({
  campaign: { type: Object, default: null },
  open: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="open && campaign"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        :aria-label="`Détails — ${campaign.region}`"
        @click.self="emit('close')"
      >
        <div class="absolute inset-0 bg-deep-blue/90 backdrop-blur-sm" @click="emit('close')" />

        <div
          class="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl"
          @click.stop
        >
          <button
            type="button"
            class="absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-deep-blue/80 text-white transition-colors hover:bg-deep-blue"
            aria-label="Fermer"
            @click="emit('close')"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="aspect-[16/10] overflow-hidden rounded-t-xl bg-deep-blue">
            <img
              :src="campaign.image"
              :alt="campaign.region"
              class="h-full w-full object-cover object-top"
            />
          </div>

          <div class="p-6 sm:p-8">
            <p class="font-heading text-xs uppercase tracking-widest text-gold mb-2">
              {{ campaign.year }} · {{ campaign.country }}
            </p>
            <h2 class="font-display text-2xl sm:text-3xl font-bold text-deep-blue mb-4">
              {{ campaign.region }}
            </h2>
            <p class="text-muted leading-relaxed text-base">
              {{ campaign.description }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
