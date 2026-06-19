<script setup>
import { ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AOS from 'aos'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import SplashScreen from './components/SplashScreen.vue'

const route = useRoute()

// Uniquement au chargement complet : ouverture du site ou actualisation (F5 / bouton navigateur).
const showSplash = ref(true)

function onSplashComplete() {
  showSplash.value = false
}

function initAos() {
  AOS.init({ duration: 800, once: true, offset: 80 })
  setTimeout(() => AOS.refresh(), 150)
}

watch(showSplash, (visible) => {
  if (!visible) initAos()
})

watch(
  () => route.path,
  () => {
    if (!showSplash.value) {
      setTimeout(() => AOS.refresh(), 100)
    }
  }
)
</script>

<template>
  <SplashScreen v-if="showSplash" @complete="onSplashComplete" />

  <div v-if="!showSplash" class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
