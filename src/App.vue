<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AOS from 'aos'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import SplashScreen from './components/SplashScreen.vue'

const route = useRoute()

// Affiché à chaque : ouverture, actualisation (F5), navigation interne, retour navigateur.
const showSplash = ref(true)
const splashKey = ref(0)

function onSplashComplete() {
  showSplash.value = false
}

function initAos() {
  AOS.init({ duration: 800, once: true, offset: 80 })
  setTimeout(() => AOS.refresh(), 150)
}

function replaySplash() {
  splashKey.value += 1
  showSplash.value = true
  window.scrollTo({ top: 0, behavior: 'instant' })
}

function onPageShow(event) {
  // Rejoue l'intro si la page est restaurée depuis le cache navigateur (retour arrière)
  if (event.persisted) {
    replaySplash()
  }
}

onMounted(() => {
  window.addEventListener('pageshow', onPageShow)
})

onUnmounted(() => {
  window.removeEventListener('pageshow', onPageShow)
})

watch(showSplash, (visible) => {
  if (!visible) initAos()
})

watch(
  () => route.fullPath,
  () => {
    replaySplash()
  }
)
</script>

<template>
  <SplashScreen v-if="showSplash" :key="splashKey" @complete="onSplashComplete" />

  <div v-if="!showSplash" class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
