<template>
  <div class="auth-public-theme" :class="{ 'is-dark': isDark }">
    <div class="auth-page">
      <div class="auth-bg" aria-hidden="true">
        <img :src="heroImage" alt="" class="auth-bg-image" />
        <div class="auth-bg-overlay" />
      </div>

      <div class="auth-content">
        <div class="auth-topbar">
          <RouterLink to="/" class="auth-back">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M12.7083 5L7.5 10.2083L12.7083 15.4167"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Retour au site
          </RouterLink>

          <button
            type="button"
            class="auth-theme-toggle"
            :aria-label="isDark ? 'Activer le thème clair' : 'Activer le thème sombre'"
            @click="toggleTheme"
          >
            <svg
              v-if="isDark"
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <svg
              v-else
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>
        </div>

        <div class="auth-card">
          <RouterLink to="/" class="auth-brand">
            <span class="auth-brand-logo">
              <img :src="logoSrc" alt="Baruti Legacy Foundation" />
            </span>
            <span class="auth-brand-name font-display">Baruti Legacy</span>
          </RouterLink>

          <div class="section-divider auth-divider" />

          <h1 class="auth-title font-display">{{ title }}</h1>
          <p v-if="subtitle" class="auth-subtitle">{{ subtitle }}</p>

          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useTheme } from '../../../composables/useTheme.js'
import logoSrc from '../../../assets/anime.png'
import { heroImage } from '../../../data/images.js'

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})

const { isDark, toggleTheme } = useTheme()
</script>
