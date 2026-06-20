import { ref, computed, onMounted, onUnmounted } from 'vue'
import { pastor } from '../data/content.js'

const MS_PER_DAY = 86_400_000
const now = ref(new Date())

let midnightTimer = null
let tickTimer = null
let clockUsers = 0

function parseLocalISODate(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function startOfLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/** Nombre de jours calendaires entre deux dates (fuseau local). */
function diffCalendarDays(from, to) {
  const fromDay = startOfLocalDay(from).getTime()
  const toDay = startOfLocalDay(to).getTime()
  return Math.round((toDay - fromDay) / MS_PER_DAY)
}

function scheduleMidnightUpdate() {
  clearTimeout(midnightTimer)

  const current = new Date()
  const nextMidnight = new Date(
    current.getFullYear(),
    current.getMonth(),
    current.getDate() + 1,
    0,
    0,
    1
  )

  midnightTimer = setTimeout(() => {
    now.value = new Date()
    scheduleMidnightUpdate()
  }, nextMidnight.getTime() - current.getTime())
}

function startMemorialClock() {
  clockUsers += 1
  if (clockUsers > 1) return

  now.value = new Date()
  scheduleMidnightUpdate()
  tickTimer = setInterval(() => {
    now.value = new Date()
  }, 60_000)
}

function stopMemorialClock() {
  clockUsers = Math.max(0, clockUsers - 1)
  if (clockUsers > 0) return

  clearTimeout(midnightTimer)
  clearInterval(tickTimer)
  midnightTimer = null
  tickTimer = null
}

export function useMemorialElapsed() {
  onMounted(startMemorialClock)
  onUnmounted(stopMemorialClock)

  const departureDate = computed(() => parseLocalISODate(pastor.deathDateISO))

  const daysSinceDeparture = computed(() => {
    const elapsed = diffCalendarDays(departureDate.value, now.value)
    if (elapsed < 0) return 0
    // Jour 1 = date du décès (comptage mémorial inclusif).
    return elapsed + 1
  })

  const todayFormatted = computed(() =>
    startOfLocalDay(now.value).toLocaleDateString('fr-FR', {
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
