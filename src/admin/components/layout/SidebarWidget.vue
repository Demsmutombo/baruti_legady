<template>
  <div
    class="admin-sidebar-widget rounded-2xl border border-gray-200 bg-gray-50 px-3 py-4 text-center dark:border-gray-800 dark:bg-white/[0.05]"
  >
    <h3 class="admin-widget-title mb-1.5 text-sm font-bold text-gray-900 dark:text-white/90">
      Baruti Legacy
    </h3>
    <p class="admin-menu-subtitle mb-4 text-[11px] leading-snug text-gray-600 dark:text-gray-400">
      Gérez le mémorial en ligne
    </p>
    <a
      href="/"
      target="_blank"
      rel="noopener noreferrer"
      class="admin-sidebar-public-btn inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-theme-sm font-semibold shadow-theme-xs transition"
      @click="closeMobileSidebar"
    >
      Voir le site public
      <span aria-hidden="true">↗</span>
    </a>
  </div>
</template>

<script setup>
import { useSidebar } from '@admin/composables/useSidebar'

const { closeMobileSidebar } = useSidebar()
</script>

<style scoped>
.admin-sidebar-public-btn {
  background-color: #0f2847;
  color: #ffffff;
}

.admin-sidebar-public-btn:hover {
  background-color: #1a3a5c;
}

:global(.admin-app.dark) .admin-sidebar-public-btn {
  background-color: #c9a227;
  color: #0f2847;
}

:global(.admin-app.dark) .admin-sidebar-public-btn:hover {
  background-color: #dcc45a;
}
</style>
