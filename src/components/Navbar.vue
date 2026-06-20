<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import logoSrc from '../assets/anime.png'
import { useTheme } from '../composables/useTheme.js'

const route = useRoute()
const { theme, isDark, toggleTheme } = useTheme()
const isOpen = ref(false)
const isScrolled = ref(false)

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/biographie', label: 'Biographie' },
  { to: '/ministere', label: 'Ministère' },
  { to: '/campagnes', label: 'Campagnes' },
  { to: '/temoignages', label: 'Témoignages' },
  { to: '/enseignements', label: 'Enseignements' },
  { to: '/hommages', label: 'Hommages' },
  { to: '/galerie', label: 'Galerie' },
  { to: '/contact', label: 'Contact' },
]

const useSolidNav = computed(() => isScrolled.value || route.path !== '/')

const headerClass = computed(() => {
  if (isDark.value) {
    return useSolidNav.value
      ? 'bg-deep-blue/98 backdrop-blur-md shadow-lg border-b border-white/10 py-3'
      : 'bg-transparent py-5'
  }

  return 'bg-white/98 backdrop-blur-md shadow-lg border-b border-gray-200 py-3'
})

function navLinkClass(isActive) {
  if (!isDark.value) {
    return isActive
      ? 'bg-gold text-deep-blue font-semibold shadow-sm'
      : 'text-deep-blue hover:bg-deep-blue/5 hover:text-gold'
  }

  if (useSolidNav.value) {
    return isActive
      ? 'bg-gold text-deep-blue font-semibold shadow-sm'
      : 'text-white hover:bg-white/10 hover:text-gold-light'
  }

  return isActive
    ? 'bg-white/15 text-gold font-semibold'
    : 'text-white hover:bg-white/10 hover:text-gold-light'
}

function mobileLinkClass(isActive) {
  if (!isDark.value) {
    return isActive
      ? 'bg-gold text-deep-blue font-semibold'
      : 'text-deep-blue hover:bg-deep-blue/5 hover:text-gold'
  }

  if (isActive) {
    return 'text-deep-blue bg-gold font-semibold'
  }

  return 'text-white hover:bg-white/10 hover:text-gold-light'
}

function onScroll() {
  isScrolled.value = window.scrollY > 40
}

function closeMenu() {
  isOpen.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll)
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      headerClass,
    ]"
  >
    <nav class="max-w-7xl mx-auto flex min-w-0 items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8 xl:grid xl:grid-cols-[auto_1fr_auto] xl:items-center xl:gap-4">
      <RouterLink to="/" class="group flex shrink-0 items-center gap-2 sm:gap-3" @click="closeMenu">
        <img
          :src="logoSrc"
          alt="Baruti Legacy Foundation"
          class="h-12 w-12 shrink-0 rounded-full object-cover object-top sm:h-14 sm:w-14"
        />
        <span
          :class="[
            'hidden font-display text-base font-semibold leading-tight transition-colors sm:inline sm:text-lg',
            isDark
              ? 'text-white group-hover:text-gold-light'
              : 'text-deep-blue group-hover:text-gold',
          ]"
        >
          Baruti Legacy
        </span>
      </RouterLink>

      <ul class="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex xl:min-w-0">
        <li v-for="link in links" :key="link.to">
          <RouterLink
            :to="link.to"
            :class="[
              'rounded-md px-2 py-2 text-sm font-medium transition-colors lg:px-2.5',
              navLinkClass(route.path === link.to),
            ]"
          >
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>

      <div class="ml-auto flex shrink-0 items-center gap-2 xl:ml-0 xl:justify-end">
        <button
          :class="[
            'p-2 xl:hidden',
            isDark ? 'text-white' : 'text-deep-blue',
          ]"
          aria-label="Menu"
          @click="isOpen = !isOpen"
        >
          <svg v-if="!isOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <button
          type="button"
          :class="[
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 shadow-md transition-colors',
            isDark
              ? 'border-gold bg-gold text-deep-blue hover:bg-gold-light'
              : 'border-deep-blue bg-deep-blue text-white hover:bg-deep-blue-light',
          ]"
          :aria-label="theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'"
          :title="theme === 'dark' ? 'Thème clair' : 'Thème sombre'"
          @click="toggleTheme"
        >
          <svg
            v-if="theme === 'dark'"
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
    </nav>

    <div
      v-if="isOpen"
      :class="[
        'xl:hidden backdrop-blur-md border-t',
        isDark
          ? 'bg-deep-blue/98 border-white/10'
          : 'bg-white/98 border-gray-200',
      ]"
    >
      <ul class="px-4 py-4 space-y-1">
        <li v-for="link in links" :key="link.to">
          <RouterLink
            :to="link.to"
            :class="[
              'block rounded-lg px-4 py-3 text-sm font-medium transition-colors',
              mobileLinkClass(route.path === link.to),
            ]"
            @click="closeMenu"
          >
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>
