<template>
  <header class="admin-header sticky top-0 z-9999 w-full border-b shadow-theme-sm">
    <div class="flex items-center justify-between gap-3 px-4 py-3 lg:gap-4 lg:px-6 lg:py-4">
      <!-- Gauche : menu + recherche -->
      <div class="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          class="admin-header-btn flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border lg:h-11 lg:w-11"
          :class="{ 'bg-gray-100 dark:bg-white/10': isMobileOpen }"
          aria-label="Menu"
          @click="handleToggle"
        >
          <svg
            v-if="isMobileOpen"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <svg v-else width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <SearchBar />
      </div>

      <!-- Droite : thème, notifications, profil -->
      <div class="flex shrink-0 items-center gap-2 sm:gap-3">
        <ThemeToggler />
        <NotificationMenu />
        <UserMenu />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useSidebar } from '@admin/composables/useSidebar'
import ThemeToggler from '../common/ThemeToggler.vue'
import SearchBar from './header/SearchBar.vue'
import NotificationMenu from './header/NotificationMenu.vue'
import UserMenu from './header/UserMenu.vue'

const { toggleSidebar, isMobileOpen } = useSidebar()

function handleToggle() {
  toggleSidebar()
}
</script>
