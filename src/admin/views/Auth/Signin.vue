<template>
  <AuthGlassLayout
    title="Connexion"
    subtitle="Espace d'administration — Baruti Legacy Foundation"
  >
    <form class="auth-glass-form" @submit.prevent="handleSubmit">
      <div class="auth-glass-field">
        <input
          v-model="email"
          type="email"
          id="email"
          class="auth-glass-input"
          placeholder="E-mail"
          autocomplete="email"
          required
        />
        <svg class="auth-glass-field-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 6h16v12H4V6zm8 6.5L6.5 9.5v5L12 15.5l5.5-1V9.5L12 12.5zM6 8l6 3.5L18 8H6z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div class="auth-glass-field">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          id="password"
          class="auth-glass-input"
          placeholder="Mot de passe"
          autocomplete="current-password"
          required
        />
        <button
          type="button"
          class="auth-glass-field-icon-btn"
          :aria-label="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
          @click="togglePasswordVisibility"
        >
          <svg v-if="!showPassword" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.0002 13.8619C7.23361 13.8619 4.86803 12.1372 3.92328 9.70241C4.86804 7.26761 7.23361 5.54297 10.0002 5.54297C12.7667 5.54297 15.1323 7.26762 16.0771 9.70243C15.1323 12.1372 12.7667 13.8619 10.0002 13.8619ZM10.0002 4.04297C6.48191 4.04297 3.49489 6.30917 2.4155 9.4593C2.3615 9.61687 2.3615 9.78794 2.41549 9.94552C3.49488 13.0957 6.48191 15.3619 10.0002 15.3619C13.5184 15.3619 16.5055 13.0957 17.5849 9.94555C17.6389 9.78797 17.6389 9.6169 17.5849 9.45932C16.5055 6.30919 13.5184 4.04297 10.0002 4.04297ZM9.99151 7.84413C8.96527 7.84413 8.13333 8.67606 8.13333 9.70231C8.13333 10.7286 8.96527 11.5605 9.99151 11.5605H10.0064C11.0326 11.5605 11.8646 10.7286 11.8646 9.70231C11.8646 8.67606 11.0326 7.84413 10.0064 7.84413H9.99151Z"
              fill="currentColor"
            />
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.63803 3.57709C4.34513 3.2842 3.87026 3.2842 3.57737 3.57709C3.28447 3.86999 3.28447 4.34486 3.57737 4.63775L4.85323 5.91362C3.74609 6.84199 2.89363 8.06395 2.4155 9.45936C2.3615 9.61694 2.3615 9.78801 2.41549 9.94558C3.49488 13.0957 6.48191 15.3619 10.0002 15.3619C11.255 15.3619 12.4422 15.0737 13.4994 14.5598L15.3625 16.4229C15.6554 16.7158 16.1302 16.7158 16.4231 16.4229C16.716 16.13 16.716 15.6551 16.4231 15.3622L4.63803 3.57709Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <div class="auth-glass-row">
        <label class="auth-glass-check" for="keepLoggedIn">
          <input v-model="keepLoggedIn" type="checkbox" id="keepLoggedIn" />
          Rester connecté
        </label>
        <router-link to="/admin/reset-password" class="auth-glass-link">
          Mot de passe oublié ?
        </router-link>
      </div>

      <button type="submit" class="auth-glass-submit">
        Connexion
      </button>
    </form>
  </AuthGlassLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthGlassLayout from '@admin/components/auth/AuthGlassLayout.vue'
import { login } from '@admin/composables/useAuth'

const router = useRouter()
const route = useRoute()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const keepLoggedIn = ref(true)

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

function handleSubmit() {
  login()
  router.push(typeof route.query.redirect === 'string' ? route.query.redirect : '/admin')
}
</script>
