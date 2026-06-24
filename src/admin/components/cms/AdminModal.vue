<template>
  <Teleport to="body">
    <Transition name="admin-modal">
      <div
        v-if="open"
        class="admin-modal-overlay"
        role="presentation"
      >
        <div
          class="admin-modal-backdrop"
          aria-hidden="true"
          @click="$emit('close')"
        />

        <div
          class="admin-modal-panel"
          :class="maxWidthClass"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? 'admin-modal-title' : undefined"
        >
          <div class="admin-modal-accent" aria-hidden="true" />

          <div v-if="title || $slots.header" class="admin-modal-header">
            <slot name="header">
              <div class="flex items-start justify-between gap-4">
                <div class="min-w-0">
                  <p class="admin-modal-eyebrow">{{ editingLabel }}</p>
                  <h3 id="admin-modal-title" class="admin-modal-title">{{ title }}</h3>
                  <p v-if="subtitle" class="admin-modal-subtitle">
                    {{ subtitle }}
                  </p>
                </div>
                <button
                  type="button"
                  class="admin-modal-close"
                  aria-label="Fermer"
                  @click="$emit('close')"
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M12 4L4 12M4 4L12 12"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>
            </slot>
          </div>

          <div class="admin-modal-body no-scrollbar">
            <slot />
          </div>

          <div v-if="$slots.footer" class="admin-modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  size: { type: String, default: 'md' },
  editingLabel: { type: String, default: 'Formulaire' },
})

const emit = defineEmits(['close'])

const maxWidthClass = computed(() => {
  const sizes = {
    sm: 'admin-modal-panel--sm',
    md: 'admin-modal-panel--md',
    lg: 'admin-modal-panel--lg',
    xl: 'admin-modal-panel--xl',
  }
  return sizes[props.size] || sizes.md
})

function onKeydown(event) {
  if (event.key === 'Escape' && props.open) {
    emit('close')
  }
}

watch(
  () => props.open,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  },
)

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>
