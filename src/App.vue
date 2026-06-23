<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AOS from 'aos'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import SplashScreen from './components/SplashScreen.vue'
import MemorialFloatingButton from './components/MemorialFloatingButton.vue'
import { useTheme } from './composables/useTheme.js'

const route = useRoute()
const { theme } = useTheme()

const authPublicPrefixes = ['/admin/signin', '/admin/reset-password']
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
const isAuthPublicRoute = computed(() =>
  authPublicPrefixes.some((prefix) => route.path.startsWith(prefix))
)
const showSplash = ref(!isAdminRoute.value)

function onSplashComplete() {
  showSplash.value = false
}

function initAos() {
  AOS.init({ duration: 800, once: true, offset: 80 })
  setTimeout(() => AOS.refresh(), 150)
}

function syncSiteDarkClass() {
  const allowPublicDark = !isAdminRoute.value || isAuthPublicRoute.value
  document.documentElement.classList.toggle('dark', allowPublicDark && theme.value === 'dark')
}

watch(showSplash, (visible) => {
  if (!visible) initAos()
})

watch(
  () => route.path,
  () => {
    if (isAdminRoute.value) {
      showSplash.value = false
    }

    if (!showSplash.value && !isAdminRoute.value) {
      setTimeout(() => AOS.refresh(), 100)
    }

    syncSiteDarkClass()
  }
)

watch(theme, syncSiteDarkClass)

onMounted(() => {
  syncSiteDarkClass()
})
</script>

<template>
  <SplashScreen v-if="showSplash && !isAdminRoute" @complete="onSplashComplete" />

  <RouterView v-if="isAdminRoute" />

  <div v-else-if="!showSplash" class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer />
    <MemorialFloatingButton />
  </div>
</template>
