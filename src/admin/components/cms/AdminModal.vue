<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-99999 flex items-center justify-center overflow-y-auto no-scrollbar p-4 sm:p-6"
    >
      <div
        class="fixed inset-0 bg-gray-900/60 backdrop-blur-[6px] transition-opacity dark:bg-black/70"
        aria-hidden="true"
        @click="$emit('close')"
      />
      <div
        class="admin-modal-panel relative mx-auto w-full"
        :class="maxWidthClass"
        role="dialog"
        aria-modal="true"
      >
        <div v-if="title || $slots.header" class="admin-modal-header">
          <slot name="header">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">{{ title }}</h3>
                <p v-if="subtitle" class="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
                  {{ subtitle }}
                </p>
              </div>
              <button
                type="button"
                class="admin-btn-icon shrink-0"
                aria-label="Fermer"
                @click="$emit('close')"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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

        <div class="admin-modal-body">
          <slot />
        </div>

        <div v-if="$slots.footer" class="admin-modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  size: { type: String, default: 'md' },
})

defineEmits(['close'])

const maxWidthClass = computed(() => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-2xl',
    xl: 'max-w-3xl',
  }
  return sizes[props.size] || sizes.md
})
</script>
