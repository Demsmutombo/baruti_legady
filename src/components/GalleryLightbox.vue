<script setup>
import { watch, onMounted, onUnmounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Keyboard } from 'swiper/modules'
import 'swiper/css/navigation'

const props = defineProps({
  items: { type: Array, default: () => [] },
  startIndex: { type: Number, default: 0 },
  open: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])

const modules = [Navigation, Keyboard]

function onKeydown(event) {
  if (event.key === 'Escape' && props.open) {
    emit('close')
  }
}

watch(
  () => props.open,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
)

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div
        v-if="open && items.length"
        class="fixed inset-0 z-[100] flex flex-col bg-deep-blue/95 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-label="Diaporama galerie"
      >
        <div class="flex shrink-0 items-center justify-between px-4 py-4 sm:px-6">
          <p class="font-heading text-sm uppercase tracking-widest text-gold">
            Diaporama
          </p>
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
            aria-label="Fermer le diaporama"
            @click="emit('close')"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex flex-1 min-h-0 items-center px-2 pb-6 sm:px-8">
          <Swiper
            :key="`${startIndex}-${items.length}`"
            :modules="modules"
            :initial-slide="startIndex"
            :slides-per-view="1"
            :space-between="16"
            :navigation="true"
            :keyboard="{ enabled: true }"
            :loop="items.length > 1"
            class="gallery-lightbox-swiper w-full h-full max-h-[70vh]"
          >
            <SwiperSlide v-for="item in items" :key="item.id">
              <div class="flex h-full flex-col items-center justify-center gap-4">
                <img
                  :src="item.image"
                  :alt="item.caption"
                  class="max-h-[60vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
                />
                <p class="max-w-2xl px-4 text-center text-sm text-white/90 sm:text-base">
                  {{ item.caption }}
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.25s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

:deep(.gallery-lightbox-swiper .swiper-button-next),
:deep(.gallery-lightbox-swiper .swiper-button-prev) {
  color: #c9a227;
}

:deep(.gallery-lightbox-swiper .swiper-button-next::after),
:deep(.gallery-lightbox-swiper .swiper-button-prev::after) {
  font-size: 1.5rem;
}
</style>
