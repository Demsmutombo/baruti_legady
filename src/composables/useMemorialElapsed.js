import { computed } from 'vue'
import { pastor } from '../data/content.js'

function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function useMemorialElapsed() {
  const departureDate = computed(() => startOfDay(`${pastor.deathDateISO}T00:00:00`))

  const today = computed(() => startOfDay(new Date()))

  const daysSinceDeparture = computed(() => {
    const ms = today.value - departureDate.value
    return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)))
  })

  const todayFormatted = computed(() =>
    today.value.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  )

  return {
    daysSinceDeparture,
    departureLabel: pastor.deathDate,
    departurePlace: pastor.deathPlace,
    todayFormatted,
  }
}
