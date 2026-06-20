import { ref, computed } from 'vue'

const STORAGE_KEY = 'baruti-theme'
const theme = ref('light')

function applyTheme(value) {
  document.documentElement.classList.toggle('dark', value === 'dark')
  document.documentElement.dataset.theme = value
}

function readInitialTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* ignore */
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function initTheme() {
  theme.value = readInitialTheme()
  applyTheme(theme.value)
}

export function useTheme() {
  function setTheme(value) {
    if (value !== 'light' && value !== 'dark') return
    theme.value = value
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignore */
    }
    applyTheme(value)
  }

  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  const isDark = computed(() => theme.value === 'dark')

  return { theme, isDark, setTheme, toggleTheme }
}
