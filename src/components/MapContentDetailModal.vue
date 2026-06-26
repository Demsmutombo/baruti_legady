<script setup>
import { computed } from 'vue'
import { testimonyCategoryLabels } from '../data/testimonies.js'
import { enrichCampaignLocation, enrichTestimonyLocation, enrichHommageLocation } from '../data/mapLocations.js'

const props = defineProps({
  type: { type: String, default: null },
  item: { type: Object, default: null },
  open: { type: Boolean, default: false },
})

defineEmits(['close'])

const labels = {
  campagnes: 'Campagne',
  temoignages: 'Témoignage',
  hommages: 'Hommage',
}

const placeLabel = computed(() => {
  if (!props.item) return ''
  if (props.type === 'campagnes') {
    return enrichCampaignLocation(props.item).placeLabel || props.item.region
  }
  if (props.type === 'temoignages') {
    return enrichTestimonyLocation(props.item).placeLabel || props.item.location
  }
  if (props.type === 'hommages') {
    return enrichHommageLocation(props.item).placeLabel || props.item.location
  }
  return ''
})

const categoryLabel = computed(() => {
  if (props.type !== 'temoignages' || !props.item?.category) return ''
  return testimonyCategoryLabels[props.item.category] || props.item.category
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="open && item && type"
        class="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        :aria-label="`${labels[type]} — ${type === 'hommages' ? item.author : item.title || item.region}`"
        @click.self="$emit('close')"
      >
        <div class="absolute inset-0 bg-deep-blue/90 backdrop-blur-sm" @click="$emit('close')" />

        <div
          class="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hidden rounded-xl bg-white shadow-2xl"
          @click.stop
        >
          <button
            type="button"
            class="absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-deep-blue/80 text-white transition-colors hover:bg-deep-blue"
            aria-label="Fermer"
            @click="$emit('close')"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div v-if="type === 'campagnes'" class="aspect-[16/10] overflow-hidden rounded-t-xl bg-deep-blue">
            <img
              :src="item.image"
              :alt="item.region"
              class="h-full w-full object-cover object-top"
            />
          </div>

          <div
            v-else
            class="rounded-t-xl px-6 pt-8 pb-4 sm:px-8"
            :class="type === 'temoignages' ? 'bg-[#1b7a4e]/10' : 'bg-[#7c5cbf]/10'"
          >
            <p class="font-heading text-xs uppercase tracking-widest text-gold mb-2">
              {{ labels[type] }}
              <template v-if="placeLabel"> · {{ placeLabel }}</template>
            </p>
          </div>

          <div class="p-6 sm:p-8">
            <template v-if="type === 'campagnes'">
              <p class="font-heading text-xs uppercase tracking-widest text-gold mb-2">
                {{ item.year }} · {{ item.country }}
              </p>
              <h2 class="font-display text-2xl sm:text-3xl font-bold text-deep-blue mb-4">
                {{ item.region }}
              </h2>
              <p class="text-muted leading-relaxed text-base">{{ item.description }}</p>
            </template>

            <template v-else-if="type === 'temoignages'">
              <span
                v-if="categoryLabel"
                class="inline-block text-xs font-medium text-gold uppercase tracking-wider mb-3"
              >
                {{ categoryLabel }}
              </span>
              <h2 class="font-display text-2xl sm:text-3xl font-bold text-deep-blue mb-4">
                {{ item.title }}
              </h2>
              <p class="text-muted leading-relaxed text-base whitespace-pre-line">{{ item.text }}</p>

              <div v-if="item.mediaUrl" class="mt-6 rounded-lg overflow-hidden">
                <img v-if="item.mediaType === 'image'" :src="item.mediaUrl" :alt="item.title" class="w-full h-auto" />
                <video v-else-if="item.mediaType === 'video'" :src="item.mediaUrl" controls class="w-full" />
              </div>

              <p v-if="item.author" class="mt-6 pt-4 border-t border-gray-100 text-sm font-medium text-muted">
                — {{ item.author }}
              </p>
            </template>

            <template v-else-if="type === 'hommages'">
              <h2 class="font-display text-2xl sm:text-3xl font-bold text-deep-blue mb-2">
                {{ item.author }}
              </h2>
              <p class="text-sm text-muted mb-6">{{ item.role }}</p>

              <div v-if="item.mediaUrl" class="mb-6 rounded-lg overflow-hidden">
                <img
                  v-if="item.mediaType === 'image'"
                  :src="item.mediaUrl"
                  :alt="`Souvenir de ${item.author}`"
                  class="w-full h-auto"
                />
                <video v-else-if="item.mediaType === 'video'" :src="item.mediaUrl" controls class="w-full" />
              </div>

              <blockquote class="text-deep-blue/80 italic leading-relaxed text-lg">
                « {{ item.message }} »
              </blockquote>
            </template>
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
