<script setup>
import { useMemorialElapsed } from '../composables/useMemorialElapsed.js'

defineProps({
  variant: {
    type: String,
    default: 'light',
    validator: (v) => ['light', 'dark'].includes(v),
  },
})

const { daysSinceDeparture, departureLabel, departurePlace, todayFormatted } =
  useMemorialElapsed()
</script>

<template>
  <div
    :class="[
      'memorial-counter rounded-xl border px-6 py-8 sm:px-10 sm:py-10 text-center',
      variant === 'dark'
        ? 'border-white/15 bg-white/5 text-white'
        : 'border-gold/30 bg-white shadow-sm',
    ]"
  >
    <p
      :class="[
        'font-heading text-xs uppercase tracking-[0.25em] mb-4',
        variant === 'dark' ? 'text-gold-light' : 'text-gold',
      ]"
    >
      Depuis son départ
    </p>

    <p
      :class="[
        'font-display font-bold leading-none tabular-nums',
        variant === 'dark' ? 'text-gold text-6xl sm:text-7xl' : 'text-deep-blue text-6xl sm:text-7xl',
      ]"
    >
      {{ daysSinceDeparture.toLocaleString('fr-FR') }}
    </p>

    <p
      :class="[
        'font-heading mt-3 text-lg sm:text-xl',
        variant === 'dark' ? 'text-white/90' : 'text-deep-blue',
      ]"
    >
      {{ daysSinceDeparture === 1 ? 'jour' : 'jours' }}
    </p>

    <div
      :class="[
        'mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm',
        variant === 'dark' ? 'text-white/70' : 'text-muted',
      ]"
    >
      <span>{{ departureLabel }} · {{ departurePlace }}</span>
      <span class="hidden sm:inline text-gold">→</span>
      <span>Aujourd'hui · {{ todayFormatted }}</span>
    </div>
  </div>
</template>
