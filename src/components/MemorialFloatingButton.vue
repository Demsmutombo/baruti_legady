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
    <div v-show="isVisible" class="memorial-float fixed z-[90] bottom-5 right-4 sm:bottom-6 sm:right-5">
      <button
        type="button"
        class="memorial-float-btn group"
        :aria-expanded="open"
        aria-label="Voir le compteur de jours depuis le départ du Pasteur Baruti"
        @click="toggle"
      >
        <svg class="memorial-float-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="memorial-float-count">{{ daysSinceDeparture.toLocaleString('fr-FR') }}</span>
        <span class="memorial-float-label">{{ daysSinceDeparture === 1 ? 'jour' : 'jours' }}</span>
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
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.75rem 0.45rem 0.55rem;
  border-radius: 9999px;
  border: 1px solid rgb(201 162 39 / 0.45);
  background: rgb(15 40 71 / 0.92);
  backdrop-filter: blur(8px);
  box-shadow:
    0 4px 14px rgb(15 40 71 / 0.25),
    0 0 0 1px rgb(255 255 255 / 0.04) inset;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.memorial-float-btn:hover {
  border-color: rgb(201 162 39 / 0.85);
  background: rgb(26 58 92 / 0.96);
  box-shadow:
    0 6px 18px rgb(15 40 71 / 0.3),
    0 0 0 1px rgb(201 162 39 / 0.15) inset;
}

.memorial-float-icon {
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
  color: #c9a227;
}

.memorial-float-count {
  font-family: var(--font-display);
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  color: #e8d48b;
}

.memorial-float-label {
  font-family: var(--font-heading);
  font-size: 0.5625rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgb(255 255 255 / 0.55);
  transition: color 0.2s ease;
}

.memorial-float-btn:hover .memorial-float-label {
  color: rgb(232 212 139 / 0.85);
}

:global(.dark) .memorial-float-btn {
  background: rgb(15 40 71 / 0.94);
}

:global(html:not(.dark)) .memorial-float-btn {
  border-color: rgb(201 162 39 / 0.55);
  background: rgb(255 255 255 / 0.95);
  box-shadow:
    0 4px 16px rgb(15 40 71 / 0.12),
    0 0 0 1px rgb(15 40 71 / 0.06);
}

:global(html:not(.dark)) .memorial-float-count {
  color: #0f2847;
}

:global(html:not(.dark)) .memorial-float-label {
  color: rgb(15 40 71 / 0.5);
}

:global(html:not(.dark)) .memorial-float-btn:hover {
  background: #fff;
  border-color: #c9a227;
}

:global(html:not(.dark)) .memorial-float-btn:hover .memorial-float-label {
  color: rgb(15 40 71 / 0.7);
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
