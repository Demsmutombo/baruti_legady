<template>
  <div class="admin-app" :class="{ dark: isDarkMode }">
    <slot />
  </div>
</template>

<script setup>
import { ref, provide, onMounted, watch, computed } from 'vue'

const STORAGE_KEY = 'baruti-admin-theme'
const theme = ref('light')
const isInitialized = ref(false)

const isDarkMode = computed(() => theme.value === 'dark')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

onMounted(() => {
  try {
    const savedTheme = localStorage.getItem(STORAGE_KEY)
    if (savedTheme === 'light' || savedTheme === 'dark') {
      theme.value = savedTheme
    }
  } catch {
    /* ignore */
  }
  isInitialized.value = true
  syncAdminShellTheme()
})

watch([theme, isInitialized], ([newTheme, newIsInitialized]) => {
  if (!newIsInitialized) return
  try {
    localStorage.setItem(STORAGE_KEY, newTheme)
  } catch {
    /* ignore */
  }
  syncAdminShellTheme()
})

function syncAdminShellTheme() {
  /* L'admin utilise .admin-app.dark — pas html.dark (évite fond jaune/crème) */
  document.documentElement.classList.remove('dark')
}

provide('theme', {
  isDarkMode,
  toggleTheme,
})
</script>

<script>
import { inject } from 'vue'

export function useTheme() {
  const theme = inject('theme')
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return theme
}
</script>
