<script setup>
import { watch, onMounted, onUnmounted } from 'vue'

const open = defineModel('open', { type: Boolean, default: false })

const props = defineProps({
  buttonLabel: { type: String, required: true },
  buttonVariant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'outline'].includes(v),
  },
  autoOpenHash: { type: String, default: '' },
})

const emit = defineEmits(['close'])

function close() {
  open.value = false
}

function onKeydown(event) {
  if (event.key === 'Escape' && open.value) close()
}

watch(open, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if (!isOpen) emit('close')
})

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  if (props.autoOpenHash && window.location.hash === props.autoOpenHash) {
    open.value = true
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <button
    type="button"
    class="public-form-trigger-btn"
    :class="`public-form-trigger-btn--${buttonVariant}`"
    @click="open = true"
  >
    <slot name="button">{{ buttonLabel }}</slot>
  </button>

  <Teleport to="body">
    <Transition name="public-form-modal">
      <div
        v-if="open"
        class="public-form-modal-backdrop"
        role="dialog"
        aria-modal="true"
        @click.self="close"
      >
        <div class="public-form-modal-panel">
          <button type="button" class="public-form-modal-close" aria-label="Fermer" @click="close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <div class="public-form-modal-body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
