<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
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

function onScroll() {
  isScrolled.value = window.scrollY > 40
}

function closeMenu() {
  isOpen.value = false
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-deep-blue/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5',
    ]"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-2.5 sm:gap-3 group" @click="closeMenu">
        <img
          :src="logoSrc"
          alt="Baruti Legacy Foundation"
          class="h-9 w-9 sm:h-10 sm:w-10 rounded-sm object-cover object-top shrink-0"
        />
        <span class="font-display text-white text-base sm:text-lg font-semibold group-hover:text-gold-light transition-colors leading-tight">
          Baruti Legacy
        </span>
      </RouterLink>

      <ul class="hidden xl:flex items-center gap-1">
        <li v-for="link in links" :key="link.to">
          <RouterLink
            :to="link.to"
            :class="[
              'px-3 py-2 text-sm rounded-md transition-colors',
              route.path === link.to
                ? 'text-gold font-medium'
                : 'text-white/80 hover:text-gold-light',
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
              'block px-4 py-3 rounded-lg text-sm transition-colors',
              route.path === link.to ? 'text-gold bg-white/5' : 'text-white/80 hover:bg-white/5',
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
