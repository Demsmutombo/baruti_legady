<template>
  <aside
    :class="[
      'admin-sidebar fixed top-0 left-0 z-99999 flex h-screen flex-col overflow-hidden border-r border-gray-200 transition-all duration-300 ease-in-out lg:mt-0',
      {
        'mt-16 lg:mt-0': true,
        'w-[290px] px-4': isExpanded || isMobileOpen || isHovered,
        'w-[90px] px-2 lg:w-[90px]': !isExpanded && !isHovered && !isMobileOpen,
        'translate-x-0': isMobileOpen,
        '-translate-x-full lg:translate-x-0': !isMobileOpen,
      },
    ]"
    @mouseenter="!isExpanded && (isHovered = true)"
    @mouseleave="isHovered = false"
  >
    <!-- Toute la sidebar scrollable (logo → dernier bouton) -->
    <div class="custom-scrollbar min-h-0 flex-1 overflow-y-auto px-1 py-6">
      <router-link
        to="/admin"
        :class="['mb-6 flex items-center gap-3', showLabels ? 'justify-start' : 'justify-center']"
      >
        <span
          class="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-brand-500 shadow-theme-xs"
        >
          <img :src="logoSrc" alt="" class="h-full w-full object-cover" />
        </span>
        <span
          v-if="showLabels"
          class="text-xl font-semibold text-gray-800 admin-brand-title dark:text-white/90"
        >
          Baruti Legacy
        </span>
      </router-link>

      <p
        v-if="showLabels"
        class="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400 admin-menu-section"
      >
        Menu
      </p>
      <p v-else class="mb-3 flex justify-center text-gray-400">
        <HorizontalDots />
      </p>

      <ul class="flex flex-col gap-1.5">
        <li v-for="item in menuItems" :key="item.path">
          <router-link
            :to="item.path"
            :title="!showLabels ? item.name : undefined"
            :class="[
              'admin-nav-btn group',
              isActive(item.path) ? 'admin-nav-btn-active' : 'admin-nav-btn-inactive',
              !showLabels ? 'justify-center px-2' : '',
            ]"
          >
            <span
              :class="[
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors',
                isActive(item.path)
                  ? 'bg-brand-500/15 text-brand-600 dark:bg-brand-500/20 dark:text-gold-light'
                  : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 dark:bg-white/5 dark:text-gray-400 dark:group-hover:bg-white/10',
              ]"
            >
              <component :is="item.icon" class="h-[18px] w-[18px]" />
            </span>
            <span v-if="showLabels" class="min-w-0 flex-1 truncate">{{ item.name }}</span>
            <span
              v-if="showLabels && item.badge"
              class="shrink-0 rounded-full bg-success-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-success-700"
            >
              {{ item.badge }}
            </span>
          </router-link>
        </li>
      </ul>

      <div v-if="showLabels" class="mt-5 space-y-3 pb-2">
        <sidebar-widget />
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  GridIcon,
  HomeIcon,
  UserCircleIcon,
  PageIcon,
  BoxIcon,
  ChatIcon,
  DocsIcon,
  MailIcon,
  ListIcon,
  BoxCubeIcon,
  HorizontalDots,
} from '../../icons'
import { useSidebar } from '@admin/composables/useSidebar'
import { pastorPortrait } from '@admin/data/site.js'
import SidebarWidget from './SidebarWidget.vue'

const route = useRoute()
const logoSrc = pastorPortrait
const { isExpanded, isMobileOpen, isHovered } = useSidebar()

const showLabels = computed(() => isExpanded.value || isHovered.value || isMobileOpen.value)

const menuItems = [
  { name: 'Tableau de bord', path: '/admin', icon: GridIcon },
  { name: 'Accueil', path: '/admin/accueil', icon: HomeIcon },
  { name: 'Biographie', path: '/admin/biographie', icon: UserCircleIcon },
  { name: 'Ministère', path: '/admin/ministere', icon: PageIcon },
  { name: 'Campagnes', path: '/admin/campagnes', icon: BoxIcon },
  { name: 'Témoignages', path: '/admin/temoignages', icon: ChatIcon },
  { name: 'Enseignements', path: '/admin/enseignements', icon: DocsIcon },
  { name: 'Hommages', path: '/admin/hommages', icon: ListIcon },
  { name: 'Galerie', path: '/admin/galerie', icon: BoxCubeIcon, badge: 'NEW' },
  { name: 'Contact', path: '/admin/contact', icon: MailIcon },
]

function isActive(path) {
  if (path === '/admin') return route.path === '/admin' || route.path === '/admin/'
  return route.path.startsWith(path)
}
</script>
