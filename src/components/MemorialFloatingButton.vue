<script setup>
import { ref, watch, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import MemorialDayCounter from './MemorialDayCounter.vue'
import { useMemorialElapsed } from '../composables/useMemorialElapsed.js'

const route = useRoute()
const open = ref(false)
const heroInView = ref(false)
const { daysSinceDeparture } = useMemorialElapsed()

let heroObserver = null

const isVisible = computed(() => route.path !== '/' || !heroInView.value)

function disconnectHeroObserver() {
  heroObserver?.disconnect()
  heroObserver = null
}

function bindHeroObserver() {
  disconnectHeroObserver()

  if (route.path !== '/') {
    heroInView.value = false
    return
  }

  heroInView.value = true

  nextTick(() => {
    const hero = document.getElementById('site-hero')
    if (!hero) return

    heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroInView.value = entry.isIntersecting
      },
      { threshold: 0 }
    )
    heroObserver.observe(hero)
  })
}

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function onKeydown(event) {
  if (event.key === 'Escape' && open.value) close()
}

watch(open, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

watch(() => route.path, bindHeroObserver)

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  bindHeroObserver()
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  disconnectHeroObserver()
  document.body.style.overflow = ''
})
</script>

<template>
  <Transition name="memorial-float-fade">
    <div v-show="isVisible" class="memorial-float fixed z-[90] bottom-6 right-4 sm:bottom-8 sm:right-6">
    <button
      type="button"
      class="memorial-float-btn group flex items-center gap-2 rounded-full border border-gold/50 bg-deep-blue px-4 py-3 shadow-lg transition-all duration-300 hover:border-gold hover:bg-deep-blue-light hover:shadow-xl hover:scale-105 sm:px-5 sm:py-3.5"
      :aria-expanded="open"
      aria-label="Voir le compteur de jours depuis le départ du Pasteur Baruti"
      @click="toggle"
    >
      <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold transition-colors group-hover:bg-gold/25">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>
      <span class="text-left leading-tight">
        <span class="block font-display text-xl font-bold tabular-nums text-gold sm:text-2xl">
          {{ daysSinceDeparture.toLocaleString('fr-FR') }}
        </span>
        <span class="block font-heading text-[10px] uppercase tracking-widest text-white/80 group-hover:text-gold-light">
          {{ daysSinceDeparture === 1 ? 'jour' : 'jours' }}
        </span>
      </span>
      <span
        class="pointer-events-none absolute -top-10 right-0 whitespace-nowrap rounded-md bg-deep-blue px-3 py-1.5 text-xs text-white shadow-md opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        Depuis son départ
      </span>
    </button>

    <Teleport to="body">
      <Transition name="memorial-modal">
        <div
          v-if="open"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Compteur mémorial"
          @click.self="close"
        >
          <div class="absolute inset-0 bg-deep-blue/90 backdrop-blur-sm" @click="close" />

          <div class="relative z-10 w-full max-w-lg" @click.stop>
            <button
              type="button"
              class="absolute -top-3 -right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-deep-blue shadow-lg transition-colors hover:bg-gold-light"
              aria-label="Fermer"
              @click="close"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <MemorialDayCounter variant="dark" />
          </div>
        </div>
      </Transition>
    </Teleport>
    </div>
  </Transition>
</template>

<style scoped>
.memorial-float-btn {
  position: relative;
}

.memorial-float-fade-enter-active,
.memorial-float-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.memorial-float-fade-enter-from,
.memorial-float-fade-leave-to {
  opacity: 0;
  transform: translateY(0.75rem);
}

.memorial-modal-enter-active,
.memorial-modal-leave-active {
  transition: opacity 0.25s ease;
}

.memorial-modal-enter-from,
.memorial-modal-leave-to {
  opacity: 0;
}
</style>
