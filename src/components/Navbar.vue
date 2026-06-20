<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import logoSrc from '../assets/anime.png'

const route = useRoute()
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

function navLinkClass(isActive) {
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
      useSolidNav
        ? 'bg-deep-blue/98 backdrop-blur-md shadow-lg border-b border-white/10 py-3'
        : 'bg-transparent py-5',
    ]"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-2.5 sm:gap-3 group" @click="closeMenu">
        <img
          :src="logoSrc"
          alt="Baruti Legacy Foundation"
          class="h-14 w-14 shrink-0 rounded-full object-cover object-top sm:h-16 sm:w-16"
        />
        <span class="font-display text-white text-base sm:text-lg font-semibold group-hover:text-gold-light transition-colors leading-tight">
          Baruti Legacy
        </span>
      </RouterLink>

      <ul class="hidden xl:flex items-center gap-0.5">
        <li v-for="link in links" :key="link.to">
          <RouterLink
            :to="link.to"
            :class="[
              'rounded-md px-3 py-2 text-sm font-medium transition-colors',
              navLinkClass(route.path === link.to),
            ]"
          >
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>

      <button
        class="xl:hidden text-white p-2"
        aria-label="Menu"
        @click="isOpen = !isOpen"
      >
        <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <div
      v-if="isOpen"
      class="xl:hidden bg-deep-blue/98 backdrop-blur-md border-t border-white/10"
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
